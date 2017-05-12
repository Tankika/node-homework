var DeckModel = require('../../model/deck');
/**
 * A megadott paraméter id alapján megpróbálja megkeresni a paklit. Ha megtalálja beleteszi a válaszba, ha nem, jelzi a hibát.
 * @param deckId
 */
module.exports = () => {

    return (req, res, next) => {
        DeckModel
            .findById(req.params.deckId)
            .populate('cards')
            .exec((error, result) => {
                if(!error && result) {
                    res.tpl.deck = result;

                    return next();
                } else {
                    console.warn(error || ("A megadott id-val nincs pakli a rendszerben: " + req.params.deckId));
                    
                    res.sendStatus(404);
                }
            });
    };

};