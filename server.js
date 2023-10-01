const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./modules/Todo')
const todoRoutes = require('./routes/todoRoutes')

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})  .then(() => console.log("Connected to DB"))
    .catch((error) => console.log(error));


app.use(todoRoutes);




app.listen(3001, ()=> {
    console.log("Server Started at port 3001");
})