const async = require('async'),
    DeckModel = require('../../model/deck'),
    mongoose = require('mongoose');
/**
 * Ha a válasz objektumban már létezik egy pakli, akkor frissíti az adatait.
 * Ha még nem létezik ilyen objektum, akkor létrehoz egy újat a megadott adatokkal.
 * Ezen kívül a megadott kártyák és a pakli között perzisztens kapcsolatot hoz létre.
 * A névnek és a kasztnak töltve kell lennie és a névnek egyedinek kell lennie, különben hibát jelzünk.
 */
module.exports = () => {

    return (req, res, next) => {
        async.waterfall([
            (callback) => {
                DeckModel.findOne({
                    name: req.body.name
                }, callback);
            },
            (result, callback) => {
                if(result) {
                    callback(new Error('Ezzel a névvel már szerepel pakli a rendszerben!'));
                } else {
                    callback(null);
                }
            },
            (callback) => {
                var deck = new DeckModel();
                deck.name = req.body.name;
                deck.class = req.body.class;
                deck.dateOfModification = Date.now();

                if("added_cards" in req.body) {
                    const addedCards = Array.isArray(req.body.added_cards) ? req.body.added_cards : [req.body.added_cards];
                    addedCards.forEach(cardId => {
                        deck.cards.push(mongoose.Types.ObjectId(cardId));
                    });
                }

                deck.save(callback);
            }
        ], (error, result) => {
            if(error) {
                res.tpl.error.push(error.message);
            }

            return next();
        });
    };

};