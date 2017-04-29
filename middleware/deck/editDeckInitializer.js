module.exports = () => {

    return (req, res, next) => {
        res.tpl.deck = {};
        res.tpl.cardListById = [];

        return next();
    };

};