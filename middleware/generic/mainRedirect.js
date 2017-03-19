/**
 * Minden nem kezelt route-ot visszairányít a kezdőoldalra
 */
module.exports = function () {

    return function (req, res, next) {
        return res.redirect('/index');
    };

};