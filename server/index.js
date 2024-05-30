/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

mongoose
    // mongodb+srv://danquesadaiii:<password>@cluster0.tuxzziy.mongodb.net/
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.tuxzziy.mongodb.net/dashboard-app?retryWrites=true&w=majority`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected successfully...'))
    .catch(err => console.log(err));

    mongoose.set('debug', true);
    
app.use('/users', require('./routes/api/users'));
app.use('/auth', require('./routes/api/auth'));
app.use('/tasks', require('./routes/api/tasks'));
app.use('/assignedTasks', require('./routes/api/assignedTasks'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to port: ${port}`));