// import express from 'express';

const express = require('express');

const PORT = 8080;

const app = express();
app.get('/', (req, res, next) => {
    res.send('Hello World!');
});

const server = app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
});
