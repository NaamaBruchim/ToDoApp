const TODOS_LS_KEY = "todos";
const CURRENT_TODO_ID_LS_KEY = "current-todo-id";

let todos = getCurrentState(TODOS_LS_KEY, []);
let id = getCurrentState(CURRENT_TODO_ID_LS_KEY, 0);


export function getTodos() {
    return todos;
}

export function addTodo(title) {
    let todo = {
        id: id++,
        title: title,
        isDone: false,
        createdAt: new Date()
    };
    todos.push(todo);
    return todo;
};

export function removeTodo(id) {
    const index = findIndexById(id);
    return todos.splice(index, 1)[0];
}

export function removeAllTodo() {
    todos.splice(0, todos.length);

    return getTodos();
}

export function changeTodoIsDone(id, isDone) {
    const index = findIndexById(id);
    let todo = todos[index];
    todo.isDone = isDone;
    return todo;
}

export function isTitleExists(title) {
    return todos.some(todo => todo.title === title);
}

export function clearChecked() {
    todos = todos.filter(todo => todo.isDone === false);
    return getTodos();
}

function findIndexById(id) {
    const index = todos.findIndex(todo => {
        return todo.id === id;
    });
    return index;
}