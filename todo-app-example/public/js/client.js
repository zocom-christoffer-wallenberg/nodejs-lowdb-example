function displayTodos(todos) {
    const todosContainer = document.querySelector('#todos');
    todosContainer.innerHTML = '';

    for(todo of todos) {
        const todoElem = document.createElement('li');
        todoElem.innerHTML = todo.todo;
        todosContainer.append(todoElem);
    }
}

async function getTodos() {
    const url = 'http://localhost:8000/api/todo/get';

    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    displayTodos(data);
}

async function postTodo(todo) {
    const url = `http://localhost:8000/api/todo/add?todo=${todo}`

    const response = await fetch(url, { method: 'POST' });
    const data = await response.json();
    
    getTodos();
}

document.querySelector('#add-todo').addEventListener('click', () => {
    let todo = document.querySelector('#todo').value;
    postTodo(todo);
});

getTodos();