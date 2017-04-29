module.exports = () => {

    return (req, res, next) => {
        res.tpl.deck = {};

        return next();
    };

};