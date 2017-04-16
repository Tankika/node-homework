const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Deck = db.model('Deck', {
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    dateOfModification: {
        type: Number,
        required: true,
    },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }],
});

Deck.schema.path('cards').validate((cards) => {
    if(30 < cards.length) {
        return false;
    } else {
        return true;
    }
}, 'Maximum 30 kártya lehet egy pakliban!');

module.exports = Deck;
