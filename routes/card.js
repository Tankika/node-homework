const renderMW = require("../middleware/generic/render");

const createCardMW = require("../middleware/card/createCard");
const getCardListMW = require("../middleware/card/getCardList");
const getCardMW = require("../middleware/card/getCard");
const deleteCardMW = require("../middleware/card/deleteCard");
const getDeckMW = require("../middleware/deck/getDeck");

module.exports = (app) => {

    app.get('/card', 
        getCardListMW(),
        renderMW('cards/cards')
    );

    app.post('/card', 
        createCardMW(),
        getCardListMW(),
        renderMW('cards/cards')
    );

    app.delete('/card/:cardId', 
        getCardMW(),
        deleteCardMW(),
        (req, res, next) => {
            res.send(200);
        }
    );

}