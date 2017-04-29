const renderMW = require("../middleware/generic/render");

const addedCardsFilter = require("../middleware/deck/addedCardsFilter");
const editDeckInitializer = require("../middleware/deck/editDeckInitializer");
const editDeckErrorHandler = require("../middleware/deck/editDeckErrorHandler");
const getDeckMW = require("../middleware/deck/getDeck");
const getDeckListMW = require("../middleware/deck/getDeckList");
const updateDeckMW = require("../middleware/deck/updateDeck");
const deleteDeckMW = require("../middleware/deck/deleteDeck");

const getCardList = require("../middleware/card/getCardList");

module.exports = (app) => {

    app.get('/index', 
        getDeckListMW(),
        renderMW('index')
    );

    app.get('/deck/create',
        editDeckInitializer(),
        getCardList(),
        renderMW('deck_edit/deck_edit')
    );

    app.get('/deck/:deckId',
        editDeckInitializer(),
        getDeckMW(),
        getCardList(),
        addedCardsFilter(),
        renderMW('deck_edit/deck_edit')
    );

    app.post('/deck',
        updateDeckMW(),
        editDeckErrorHandler(),
        editDeckInitializer(),
        getCardList(),
        renderMW('deck_edit/deck_edit')
    );

    app.post('/deck/:deckId',
        getDeckMW(),
        updateDeckMW(),
        editDeckErrorHandler(),
        editDeckInitializer(),
        getCardList(),
        renderMW('deck_edit/deck_edit')
    );

    app.delete('/deck/:deckId', 
        getDeckMW(),
        deleteDeckMW(),
        (req, res, next) => {
            res.sendStatus(200);
        }
    );

}