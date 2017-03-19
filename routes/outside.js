const mainRedirectMW = require("../middleware/generic/mainRedirect");

module.exports = (app) => {

    app.use(
        mainRedirectMW()
    );
}