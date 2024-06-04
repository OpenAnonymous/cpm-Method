import Task from "./module/object.task.UI.js"

const taskname = document.getElementById('taskname');
const tasktime = document.getElementById('tasktime');
const summit = document.getElementById('submit');
const caculate = document.getElementById('caculate');

const tasknamel = document.getElementsByClassName('tasknamel')[0];   
const tasktimel = document.getElementsByClassName('tasktimel')[0];
const taskdependency = document.getElementsByClassName('taskdependency')[0]

const reset = document.getElementsByClassName('reset')[0];


let tasks = [];
let dependencies = [];
function handleSubmit(e) {
    e ? e.preventDefault() : null

    if (tasks.some((task) => task.name === taskname.value)) {
        alert('this task is existing , PLS typing a new task');
        return;
    }
    else {
        let task = {
            name: taskname.value,
            time: tasktime.value,
        }


        if (task.name && task.time) {
            console.log(task.name + ' ' + task.time);
            tasks.push(new Task(task.name, task.time, "li", null, tasknamel, tasktimel, taskdependency, tasks.length === 0 ? true : false, task));
        }
    }
    tasks[tasks.length - 1].create();
}

function handleReset(){
    tasks = [];
    tasknamel.innerHTML = '<li>taskname</li>';
    tasktimel.innerHTML = '<li>time of done</li>';
    taskdependency.innerHTML = '<li>dependencies</li>';
}

summit.addEventListener('click',handleSubmit);
reset.addEventListener('click',handleReset);