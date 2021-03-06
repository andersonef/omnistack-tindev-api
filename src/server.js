const dotenv = require('dotenv');
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');


dotenv.config();
const server = express();

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);