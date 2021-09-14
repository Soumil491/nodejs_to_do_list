const updateButton = document.querySelector('#update');
const deleteButton = document.querySelector('#delete');

updateButton.addEventListener('click',() => {
    console.log('update triggered');
    const updatedTask = {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            updateTaskName: document.querySelector('#update-task').value,
            newTaskName: document.querySelector('#new-task').value
        })
    }
    fetch('/updateTask', updatedTask)
    .then(res => {
        if(res.ok) return res.json();
    })
    // .then(response => {
    //     window.location.reload();
    // })
});

deleteButton.addEventListener('click', () => {
    console.log('delete triggered');
    const deleteTask = {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            deleteTaskName: document.querySelector('#deleteTaskName').value
        })
    }
    fetch('/deleteTask', deleteTask)
    .then(res => {
        if(res.ok) return res.json();
    })
    .then(response => {
        if(response === 'delete failed')
        console.log('delete failed')
    })
    .catch(error => {console.error(error)});
});