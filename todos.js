const TODOS_LS_KEY = "todos";
const CURRENT_TODO_ID_LS_KEY = "current-todo-id";

let todos = getCurrentState(TODOS_LS_KEY, []);
let id = getCurrentState(CURRENT_TODO_ID_LS_KEY, 0);


function getTodos() {
    return todos;
}

function addTodo(title) {
    let todo = {
        id: id++,
        title: title,
        isDone: false,
        createdAt: new Date()
    };
    todos.push(todo);
    return todo;
};

function removeTodo(id) {
    const index = findIndexById(id);
    return todos.splice(index, 1)[0];
}

function removeAllTodo() {
    todos.splice(0, todos.length);

    return getTodos();
}

function changeTodoIsDone(id, isDone) {
    const index = findIndexById(id);
    let todo = todos[index];
    todo.isDone = isDone;
    return todo;
}

function isTitleExists(title) {
    return todos.some(todo => todo.title === title);
}

function clearChecked() {
    todos = todos.filter(todo => todo.isDone === false);
    return getTodos();
}

function findIndexById(id) {
    const index = todos.findIndex(todo => {
        return todo.id === id;
    });
    return index;
}