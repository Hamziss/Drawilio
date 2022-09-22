require('dotenv').config();
const consola = require("consola");
const express = require('express');
const http = require('http');
const socket = require('./util/socket');

const app = express();
const ioServer = new http.createServer(app);
socket.init(ioServer);

app.use((req, res, next) => {   
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');    
    next();
});


app.get("/hello", (req, res) => {
    res.send("world");
});

ioServer.listen(process.env.PORT, () => {
    consola.success(`Listening for sockets on port ${process.env.PORT}`)
});
