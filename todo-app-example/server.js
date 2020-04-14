/**
Client (Front-end) 
En yta för lista alla todos (ul-tagg)
Ett inputfält och en knapp för att lägga till en ny todo

Webserver (Node.js)
Servar HTML, CSS och JS

API endpoints:
/api/todo/add - Lägg till en todo - Method: POST

/api/todo/get - Hämta alla todos - Method: GET

Database (Lowdb)
Sparar alla todos

{
   todos: [
       { todo: String, id: Number }
   ] 
}
 **/

const low = require('lowdb');
const express = require('express');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json')
const database = low(adapter)
const app = express();
let id = 0;

app.use(express.static('public'));

function initDatabase() {
    database.defaults({ todos: [] }).write();
}

function addTodo(todoName) {
    id++;
    database.get('todos').push({ todo: todoName, id: id }).write();
}

function getTodos() {
    return database.get('todos').value();
}

app.post('/api/todo/add', (req, res) => {
    console.log(req.url);
    const todo = req.query.todo;
    addTodo(todo);

    let response = {
        success: true,
        message: 'Todo added!'
    }

    res.send(JSON.stringify(response));
})

app.get('/api/todo/get', (req, res) => {
    let allTodos = getTodos();
    res.send(JSON.stringify(allTodos));
});

initDatabase();

app.listen(8000);
