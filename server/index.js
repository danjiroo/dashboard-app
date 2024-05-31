/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
}));

app.use(bodyParser.json());

mongoose
    // mongodb+srv://danquesadaiii:<password>@cluster0.tuxzziy.mongodb.net/
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.tuxzziy.mongodb.net/dashboard-app?retryWrites=true&w=majority`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected successfully...'))
    .catch(err => console.log(err));

mongoose.set('debug', true);
    
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/tasks', require('./routes/api/tasks'));
app.use('/api/assignedTasks', require('./routes/api/assignedTasks'));

app.get('/', (req, res) => {
    res.send('Welcome to the workbin server!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to port: ${port}`));  