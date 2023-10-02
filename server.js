const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})  .then(() => console.log("Connected to DB"))
    .catch((error) => console.log(error));

app.use(userRoutes);
app.use(todoRoutes);

app.listen(3001, ()=> {
    console.log("Server Started at port 3001");
})