/**
 * Megkeresi és beleteszi a válaszba a szerveren tárolt összes paklit
 */
module.exports = () => {

    return (req, res, next) => {
        res.tpl.deckList = [{
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
        }];

        return next();
    };

};