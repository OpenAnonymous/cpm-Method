import Task from "./module/object.task.UI.js"
import SimpleTask from "./module/object.logic.Task.js";
import drawNetwork from './module/canvas.js';

const taskname = document.getElementById('taskname');
const tasktime = document.getElementById('tasktime');
const summit = document.getElementById('submit');
const caculate = document.getElementById('caculate');

const tasknamel = document.getElementsByClassName('tasknamel')[0];   
const tasktimel = document.getElementsByClassName('tasktimel')[0];
const taskdependency = document.getElementsByClassName('taskdependency')[0]

const reset = document.getElementsByClassName('reset')[0];
const wrapitem = document.getElementsByClassName('wrap-item')[0];
export const h = wrapitem.getBoundingClientRect().height
let taskUis = [];
const tasks = [];
function handleSubmit(e) {
    e ? e.preventDefault() : null

    if (taskUis.some((task) => task.name === taskname.value)) {
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
            taskUis.push(new Task(task.name, task.time, "li", null, tasknamel, tasktimel, taskdependency, taskUis.length === 0 ? true : false, task));
            tasks.push(new SimpleTask(task.name, task.time));
        }
    }
    taskUis[taskUis.length - 1].create();
    console.log(tasks);
}

function handleReset(){
    location.reload(true);
}

function handleCaculate(e) {
    e.preventDefault();

    let dependencies = Array.from(document.getElementsByClassName("dependency"));

    dependencies.forEach((dp, index) => {
        if (dp.value) {
            let depenTasks = dp.value.trim().split(",").map(depen => depen.trim());
            let taskDependencies = depenTasks.map(depenName => {
                return tasks.find(task => task.name === depenName);
            }).filter(task => task !== undefined);
            
            if (taskDependencies.length > 0) {
                tasks[index].dependencies = taskDependencies;
            }
        }
    });

    tasks.forEach(task => {
        task.dependencies.forEach(dependency => {
            if (dependency) {
                dependency.reverseDependencies.push(task);
            }
        });
    });

    // Tính toán các giá trị ES, EF, LS, LF
    const projectDuration = Math.max(...tasks.map(task => task.EF()));

    // Xóa các phần tử trước đó trong danh sách
    document.querySelector('.b1 ul').innerHTML = '';
    document.querySelector('.b2 ul').innerHTML = '';

    tasks.forEach(task => {
        const es = task.ES();
        const ef = task.EF();
        const ls = task.LS(projectDuration);
        const lf = task.LF(projectDuration);

        // Cập nhật giao diện
        const esElement = document.createElement('li');
        esElement.innerHTML = `ES${task.name} = ${es}`;
        document.querySelector('.b1 ul').appendChild(esElement);

        const efElement = document.createElement('li');
        efElement.innerHTML = `EF${task.name} = ${ef}`;
        document.querySelector('.b1 ul').appendChild(efElement);

        const lsElement = document.createElement('li');
        lsElement.innerHTML = `LS${task.name} = ${ls}`;
        document.querySelector('.b2 ul').appendChild(lsElement);

        const lfElement = document.createElement('li');
        lfElement.innerHTML = `LF${task.name} = ${lf}`;
        document.querySelector('.b2 ul').appendChild(lfElement);
    });

    console.log(tasks);
    drawNetwork(tasks);
}


summit.addEventListener('click',handleSubmit);
reset.addEventListener('click',handleReset);
caculate.addEventListener('click',handleCaculate);
