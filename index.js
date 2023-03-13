const express = require('express');
const app = express()
const cors = require('cors')
const morgan = require('morgan');
const http = require('http')
const server = http.createServer(app);
require('dotenv').config();

const PORT = process.env.PORT || 4001

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
    res.send({ message: 'root path Awesome it works 🐻' });
});

// app.use('/api', require('./routes/api.route'));

app.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
});