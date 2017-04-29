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
                    console.error(error);

                    return res.sendStatus(500);
                } else {
                    res.tpl.cardList = result;
                    
                    return next();
                }
            });
    };

};