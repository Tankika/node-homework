const path = require('path'),
    moment = require('moment');

/**
 * Rendereli a megadott template-et a válaszban érkező adatok alapján
 */
module.exports = (viewName) => {

    return (req, res, next) => {
        res.render(viewName, {
            tpl: res.tpl,
            moment: moment
        });
    };

};