const _ = require('lodash');

module.exports = () => {

    return (req, res, next) => {
        if(_.isArray(res.tpl.cardList) && _.isObject(res.tpl.deck) && _.isArray(res.tpl.deck.cards)) {
            _.pullAllWith(res.tpl.cardList, res.tpl.deck.cards, (card1, card2) => card1.equals(card2));
        }

        return next();
    };

};