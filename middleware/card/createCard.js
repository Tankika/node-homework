const async = require('async'),
    CardModel = require('../../model/card');
/**
 * Ellenőrzi létezik-e már a megadott néven kártya
 *  - Ha igen, maradunk a jelenlegi oldalon és jelezzük a hibát
 *  - Ha nem, létrehozunk egy új kártyát a megadott adatottakkal és újratöltjük az oldalt
 */
module.exports = () => {

    return (req, res, next) => {
        async.waterfall([
            (callback) => {
                CardModel.findOne({
                    name: req.body.name
                }, callback);
            },
            (result, callback) => {
                var card = new CardModel();
                card.name = req.body.name;
                card.mana = req.body.mana;
                card.attack = req.body.attack;
                card.defense = req.body.defense;

                if(result) {
                    callback(new Error('Ezzel a névvel már szerepel kártya a rendszerben!'));
                } else {
                    card.save(callback);
                }
            }
        ], (error, result) => {
            if(error) {
                res.tpl.error.push(error.message);
            }

            return next();
        });
    };

};