var tasks = [];

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
    updateTodo();
}

updateTodo = () => {
    var list = '<ol id="todo-ol">';
    tasks.map(task => {
        if (task.isChecked === true) {
            list += '<li id-data='+ task.id + '>' 
                    + '<input type="checkbox" onclick="checkedTask(' + task.id + ')" checked><strike>' 
                    + '<span>' + task.data.description + '</span>'
                    + '</strike>' 
                    + '<button>X</button>' 
                + '</li>';
        } else {
            list += '<li id-data='+ task.id + '>' 
                    + '<input type="checkbox" onclick="checkedTask(' + task.id + ')">' 
                    + '<span>' + task.data.description + '</span>'
                    + '<button>X</button>' 
                + '</li>';
        }
    });
    list += '</ol>';
    document.getElementById("todo-list").innerHTML = list;
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

    updateTodo();
}