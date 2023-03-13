const express = require('express');
const app = express()
const cors = require('cors')
const morgan = require('morgan');
const http = require('http')
const server = http.createServer(app);
const mongoose = require('mongoose')
require('dotenv').config();

const PORT = process.env.PORT || 4001

const home = require("./routes/home")

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));


mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://other:1234@cluster0.hv7pxi6.mongodb.net/?retryWrites=true&w=majority')
        .then(() => console.log('connect dai leaw'))
        .catch((err) => console.error(err));

app.get('/', async (req, res, next) => {
    res.send({ message: 'root path Awesome it works 🐻' });
});

app.use('/api', home);

// app.use('/api', require('./routes/api.route'));

app.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
});