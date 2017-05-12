var async = require('async'),
    _ = require('lodash'),
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
                if(result) {
                    callback(new Error('Ezzel a névvel már szerepel kártya a rendszerben!'));
                } else {
                    callback(null);
                }
            },
            (callback) => {
                var card = new CardModel();
                card.name = req.body.name;
                card.mana = req.body.mana;
                card.attack = req.body.attack;
                card.defense = req.body.defense;

                card.save(callback);
            }
        ], (error, result) => {
            if(error) {
                if(error.errors) {
                    Object.keys(error.errors).forEach(function(key) {
                        res.tpl.error.push(error.errors[key].message);
                    });
                } else if(error.message) {
                    res.tpl.error.push(error.message);
                }
            }

            return next();
        });
    };

};