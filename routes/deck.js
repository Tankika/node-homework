const renderMW = require("../middleware/generic/render");

const getDeckMW = require("../middleware/deck/getDeck");
const getDeckListMW = require("../middleware/deck/getDeckList");
const updateDeckMW = require("../middleware/deck/updateDeck");
const deleteDeckMW = require("../middleware/deck/deleteDeck");

const getCardList = require("../middleware/card/getCardList");
const getCardListByIdMW = require("../middleware/card/getCardListById");

module.exports = (app) => {

    app.get('/index', 
        getDeckListMW(),
        renderMW('index')
    );

    app.get('/deck/create',
        (req, res, next) => {
            res.tpl.deck = {};
            res.tpl.cardListById = [];

            return next();
        },
        getCardList(),
        renderMW('deck_edit/deck_edit')
    );

    app.get('/deck/:deckId', 
        getDeckMW(),
        getCardList(),
        getCardListByIdMW(),
        renderMW('deck_edit/deck_edit')
    );

    app.post('/deck',
        getCardListByIdMW(),
        updateDeckMW(),
        (req, res, next) => {
            res.redirect('/index');
        }
    );

    app.put('/deck/:deckId',
        getDeckMW(),
        getCardListByIdMW(),
        updateDeckMW(),
        (req, res, next) => {
            res.redirect('/index');
        }
    );

    app.delete('/deck/:deckId', 
        getDeckMW(),
        getCardListByIdMW(),
        deleteDeckMW(),
        (req, res, next) => {
            res.sendStatus(200);
        }
    );

}