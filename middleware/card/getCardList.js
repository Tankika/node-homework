const CardModel = require('../../model/card');
/**
 * Megkeresi és beleteszi a válaszba a szerveren tárolt összes kártyát
 */
module.exports = () => {

    return (req, res, next) => {
        CardModel
            .find()
            .exec((error, result) => {
                if(error) {
                    res.tpl.error.push(error.message);
                } else {
                    res.tpl.cardList = result;
                }
                return next();
            });
    };

};