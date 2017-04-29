const CardModel = require('../../model/card');
/**
 * Törli a válaszobjektumban lévő kártya entitást.
 */
module.exports = () => {

    return (req, res, next) => {
        CardModel.findByIdAndRemove(res.tpl.card.id, (error, result) => {
            if(error) {
                console.error(error);

                return res.sendStatus(500);
            } else {
                return next();
            }
        });
    };

};