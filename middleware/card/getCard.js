const CardModel = require('../../model/card');
/**
 * Megkeresi a rendszerben a megadott id-val lévő kártyát.
 * Ha nem található a rendszerben az id-val kártya, hibát jelzünk.
 */
module.exports = () => {

    return (req, res, next) => {
        CardModel
            .findById(req.params.cardId)
            .exec((error, result) => {
                if(!error && result) {
                    res.tpl.card = result;

                    return next();
                } else {
                    console.warn(error || ("A megadott id-val nincs kártya a rendszerben: " + req.params.cardId));
                    
                    res.sendStatus(404);
                }
            });
    };

};