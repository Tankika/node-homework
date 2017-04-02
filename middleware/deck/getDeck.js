/**
 * A megadott paraméter id alapján megpróbálja megkeresni a paklit. Ha megtalálja beleteszi a válaszba, ha nem, jelzi a hibát.
 * @param userId
 */
module.exports = () => {

    return (req, res, next) => {
        res.tpl.deck = [{
            id: 1,
            name: "Aggro",
            class: "Shaman",
            cardCount: "12",
            dateOfModification: "1992-03-07T20:00"
        }, {
            id: 2,
            name: "Pirate",
            class: "Warrior",
            cardCount: "0",
            dateOfModification: "1989-09-14T09:00"
        }, {
            id: 3,
            name: "Dragon",
            class: "Priest",
            cardCount: "30",
            dateOfModification: "2016-12-16T18:00"
        }].find((item) => {
            return item.id === parseInt(req.params.deckId, 10);
        });

        return next();
    };

};