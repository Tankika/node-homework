const renderMW = require("../middleware/generic/render");

const getDeckMW = require("../middleware/deck/getDeck");
const getDeckListMW = require("../middleware/deck/getDeckList");
const updateDeckMW = require("../middleware/deck/updateDeck");
const deleteDeckMW = require("../middleware/deck/deleteDeck");

const getCardListByIdMW = require("../middleware/card/getCardListById");

module.exports = (app) => {

    app.get('/index', 
        getDeckListMW(),
        renderMW('index')
    );

    app.get('/deck/create', 
        getDeckMW(),
        renderMW('deck_edit')
    );

    app.get('/deck/:deckId', 
        getDeckMW(),
        renderMW('deck_edit')
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