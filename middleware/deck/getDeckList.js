const DeckModel = require('../../model/deck');
/**
 * Megkeresi és beleteszi a válaszba a szerveren tárolt összes paklit
 */
module.exports = () => {

    return (req, res, next) => {
        DeckModel
            .find()
            .exec((error, result) => {
                if(error) {
                    res.tpl.error.push(error.message);
                } else {
                    res.tpl.deckList = result;
                }
                return next();
            });
    };

};