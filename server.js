//DEPENDENCY IMPORTS
const express = require('express')
const { MongoClient } = require('mongodb')
const toDoListApp = express();
const connectionString = 'mongodb+srv://soumil_123:soumil_123@cluster0.zsix5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const bodyParser = require("body-parser");
require('./dotenv')

//MIDDLE WARE CONFIGS
toDoListApp.use(bodyParser.json());
toDoListApp.use(bodyParser.urlencoded({ extended: false }));
toDoListApp.use(express.static('public'));

MongoClient.connect(connectionString, (err, client) => {
    // ERROR HANDLING
    if (err) {
        return console.error(err);
    }
    //RETRIEVE THE DB
    const toDoListDB = client.db('to-do-list');
    const tasksCollection = toDoListDB.collection('tasks');
    console.log('Database connected');

    //GET
    toDoListApp.get('/', (req, res) => {
        tasksCollection.find({}).toArray()
            .then(tasks => {
                res.render('index.ejs', { tasks: tasks });
            })
            .catch(err => console.error(err));
    });

    //CREATE Task
    toDoListApp.post('/createTask', (req, res) => {
        tasksCollection.insertOne(req.body)
            .then(result => { res.redirect('/') })
            .catch(error => console.error(error));
    });

    //UPDATE Task
    toDoListApp.put('/updateTask', (req, res) => {
        console.log('put called');
        tasksCollection.findOneAndUpdate(
            {
                taskName: req.body.updateTaskName
            },
            {
                $set: {
                    taskName: req.body.newTaskName
                }
            },
            {
                upsert: true
            }
        )
        .then(result => res.redirect('/'))
        .catch(error => console.error(error));
    })

    //DELETE Task
    toDoListApp.delete('/deleteTask', (req, res) => {
        tasksCollection.findOneAndDelete(
            {
                taskName: req.body.deleteTaskName
            }
        )
        .then(result => {
            if(result.deletedCount === 0) {
                return res.send('delete failed')
            }
            else {
                return res.redirect('/')
            }
        })
        .catch(error => console.error(error));
    })
});

toDoListApp.listen(5500, () => {
    console.log('server is up on 5500');
})