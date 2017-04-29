module.exports = () => {

    return (req, res, next) => {
        if(res.tpl.error.length) {
            next();
        } else {
            res.redirect('/index');
        }
    };

};