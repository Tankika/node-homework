/**
 * Megkeresi és beleteszi a válaszba a szerveren tárolt összes kártyát
 */
module.exports = () => {

    return (req, res, next) => {
        res.tpl.cardList = [{
            id: 1,
            name: "Azure Drake",
            mana: 5,
            attack: 4,
            defence: 4
        }, {
            id: 2,
            name: "Ragnaros",
            mana: 8,
            attack: 8,
            defence: 8
        }, {
            id: 3,
            name: "Wisp",
            mana: 0,
            attack: 1,
            defence: 1
        }, {
            id: 4,
            name: "Elven Archer",
            mana: 1,
            attack: 1,
            defence: 1
        }, {
            id: 3,
            name: "Fireball",
            mana: 4
        }];

        return next();
    };

};