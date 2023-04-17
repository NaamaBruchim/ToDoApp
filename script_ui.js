renderTodoList();

let addBtn = document.getElementById("add-btn");
let todoInput = document.getElementById("todo-input");

todoInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

addBtn.addEventListener("click", function() {
    addTodo(todoInput.value);
    todoInput.value = "";
    renderTodoList();
});

function renderTodoList() {
    let todos = getTodos();

    let todosListWrapper = document.getElementById("todos-list-wrapper");

    if (todos.length > 0) {
        todosListWrapper.innerHTML = renderTodoListItems(todos);
    } else {
        todosListWrapper.innerHTML = renderNoTodos();
    }
}

function renderNoTodos() {
    let html = `
    <div class="container text-success text-center fs-3 border p-1 border-success rounded text-bg-warning">
        <p class="fw-bold">Great Job!</p>
        <p>No more todos for you...</p>
    </div>`;

    return html;
}

function renderTodoListItems(todos) {
    let html = '<ul class="list-group">';

    for (let i = 0; i < todos.length; i++) {
        html += `
        <li class="list-group-item d-flex justify-content-between">
            <input class="form-check-input me-1" type="checkbox" onchange="changeTodoIsDoneItem(${todos[i].id},this.checked)" id="todo-input-id-${todos[i].id}" value="" ${todos[i].isDone ? 'checked' : '' }>
            <label class="form-check-label flex-fill ${todos[i].isDone ? 'text-decoration-line-through' : '' }" for="todo-input-id-${todos[i].id}">${todos[i].title}</label>
            <i class="p-0 bi bi-trash text-danger btn" onclick="removeTodoItem(${todos[i].id})"></i>
        </li>`;
    }

    html += `
    <li class="list-group-item d-flex justify-content-center">
        <i class="bi bi-trash-fill btn bg-danger-subtle flex-fill" onclick="clearAllTodos()">Clear all todos</i>
    </li>`;

    html += '</ul>';

    return html;
}

function changeTodoIsDoneItem(id, isDone) {
    changeTodoIsDone(id, isDone);
    renderTodoList();
}

function removeTodoItem(id) {
    removeTodo(id);
    renderTodoList();
}

function clearAllTodos() {
    removeAllTodo();
    renderTodoList();
}