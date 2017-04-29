const DeckModel = require('../../model/deck');
/**
 * Megkeresi és beleteszi a válaszba a szerveren tárolt összes paklit
 */
module.exports = () => {

    return (req, res, next) => {
        DeckModel
            .find()
            .populate('cards')
            .exec((error, result) => {
                if(error) {
                    console.error(error);

                    return res.sendStatus(500);
                } else {
                    res.tpl.deckList = result;
                    
                    return next();
                }
            });
    };

};