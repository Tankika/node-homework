const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Card = db.model('Card', {
    name: {
        type: String,
        required: true,
    },
    mana: {
        type: Number,
        required: true,
    },
    attack: Number,
    defense: Number,
});

module.exports = Card;
