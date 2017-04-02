/**
 * A kérésben kapott id-k alapján megkeresi a rendszerben tárolt kártyákat.
 * Ha van legallább egy olyan id, amihez nem található kártya, akkor hibát jelzünk
 */
module.exports = () => {

    return (req, res, next) => {
        res.tpl.cardListById = res.tpl.cardList ? res.tpl.cardList.splice(0, 2) : [];

        return next();
    };

};