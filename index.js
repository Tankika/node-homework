// import express from 'express';
const express = require('express');

const PORT = 8080;

const app = express();
app.use('/', express.static('public'));

const server = app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
});
