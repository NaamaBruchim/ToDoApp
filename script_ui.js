const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todosListWrapper = document.getElementById("todos-list-wrapper");

renderTodoList();


todoInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        handleTitleAddition();
    }
});

addBtn.addEventListener("click", handleTitleAddition);

function handleTitleAddition() {
    let titles = splitTitle(todoInput.value);
    for (let i = 0; i < titles.length; i++) {
        if (isTitleExists(titles[i])) {
            alert(`oops, ${titles[i]} is already exists`);
        } else {
            addTodo(titles[i]);
        }
    }
    todoInput.value = "";
    renderTodoList();
}

function splitTitle(title) {
    return title.split(",");
}

function renderTodoList() {
    let todos = getTodos();

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
        <li  class="list-group-item d-flex justify-content-between">
            <input class="form-check-input me-1" type="checkbox" onchange="changeTodoIsDoneItem(${todos[i].id},this.checked)" id="todo-input-id-${todos[i].id}" value="" ${todos[i].isDone ? 'checked' : '' }>
            <label class="form-check-label flex-fill ${todos[i].isDone ? 'text-decoration-line-through' : '' }" for="todo-input-id-${todos[i].id}">${todos[i].title}</label>
            <i class="p-0 bi bi-trash text-danger btn"  onclick="removeTodoItem(${todos[i].id})"></i>
        </li>`;
    }

    html += `
    <li class="list-group-item d-flex justify-content-center">
    <i class="bi bi-trash-fill btn bg-warning flex-fill" onclick="clearAllChecked()">Clear only checked</i>
    <i class="bi bi-trash-fill btn bg-danger-subtle flex-fill border-danger-subtle" onclick="clearAllTodos()">Clear all todos</i>    
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

function clearAllChecked() {
    clearChecked();
    renderTodoList();
}