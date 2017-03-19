const path = require('path');

/**
 * Rendereli a megadott template-et a válaszban érkező adatok alapján
 */
module.exports = (viewName) => {

    return (req, res, next) => {
        var filePath = path.join(__dirname, '..', '..', 'views', viewName + '.html');

        return res.sendFile(filePath);
    };

};