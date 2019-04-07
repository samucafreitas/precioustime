var tasks = [];

// To save objects using localStorage
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
}

Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
}

createTask = () => {
    var taskDescription = document.getElementById("todo-footer-input").value;

    var task = {
        id: idGenerator(),
        data: {
            description: taskDescription
        },
        isChecked: false
    };

    tasks.push(task);
    localStorageTask();
    updateTodo();
}

updateTodo = () => {
    var list = '<ol id="todo-ol">';
    tasks.map(task => {
        if (task.isChecked === true) {
            list += '<li id-data='+ task.id + '>' 
                    + '<button id="x-btn" onclick="deleteTask(' + task.id + ')">X</button>' 
                    + '<input id="check-input" type="checkbox" onclick="checkedTask(' + task.id + ')" checked><strike>' 
                    + '<span id="desc-span" onclick="checkedTask(' + task.id + ')">' + task.data.description + '</span>'
                    + '</strike>' 
                + '</li>';
        } else {
            list += '<li id-data='+ task.id + '>' 
                    + '<button id="x-btn" onclick="deleteTask(' + task.id + ')">X</button>' 
                    + '<input id="check-input" type="checkbox" onclick="checkedTask(' + task.id + ')">' 
                    + '<span id="desc-span" onclick="checkedTask(' + task.id + ')">' + task.data.description + '</span>'
                + '</li>';
        }
    });
    list += '</ol>';

    document.getElementById('todo-list').innerHTML = list;

    apiPOST(tasks);
}

idGenerator = () => {
    var timestamp = new Date();
    const id = timestamp.getHours().toString()
            + timestamp.getMinutes().toString()
            + timestamp.getSeconds().toString()
            + timestamp.getMilliseconds().toString();
    return id;
}

pressEnter = (ev) => {
    var desc = document.getElementById("todo-footer-input");

    if(ev.keyCode == 13 && desc.value !== '') {
        createTask();
        desc.value = '';
    }
}

checkedTask = (id) => {
    tasks = tasks.map(task => {
        if (parseInt(task.id) === id) {
            task.isChecked = !task.isChecked;
        }
        return task;
    });
    localStorageTask();
    updateTodo();
}

deleteTask = (id) => {
    tasks = tasks.filter((task) => {if (parseInt(task.id) !== id) return task});
    localStorageTask();
    updateTodo();
}

const populateTodoList = () => {
    tasks = localStorage.getObj('tasks') || [];
    var mainFocus = localStorage.getItem('mainFocus') || '';
    updateTodo();
    updateMainFocus(mainFocus);
}

const localStorageTask = () => {
    localStorage.setObj('tasks', tasks);
}

const updateMainFocus = (main) => {
    document.getElementById('main-subject').value = main;
}

const createMainFocus = () => {
    var main = document.getElementById('main-subject').value;
    localStorage.setItem('mainFocus', main);
}

$(document).on('input', '#main-subject', () => createMainFocus());

const apiPOST = (data) => {
    $.ajax({
        method: 'POST',
        url: '/todos',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json' 
    });
}