const DeckModel = require('../../model/deck');
/**
 * Törli a válaszobjektumban kapott paklit.
 */
module.exports = () => {

    return (req, res, next) => {
        DeckModel.findByIdAndRemove(res.tpl.deck.id, (error, result) => {
            if(error) {
                console.error(error);

                return res.sendStatus(500);
            } else {
                return next();
            }
        });
    };

};