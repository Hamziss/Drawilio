const sql = require("../../Assets/images/sql.png").default;
const green = require("../../Assets/images/green.png").default;
const blonde = require("../../Assets/images/blonde.png").default;
const haj = require("../../Assets/images/haj.png").default;
const assassin = require("../../Assets/images/assassin.png").default;
const bg = require("../../Assets/images/bg.png").default;
const bluegirl = require("../../Assets/images/bluegirl.png").default;
const fee = require("../../Assets/images/fee.png").default;
const snk = require("../../Assets/images/snk.png").default;

export const chooseAvatar = (skin) => {
    switch (skin) {
        case 0:
            return sql;
        case 1:
            return green;
        case 2:
            return blonde;
        case 3:
            return haj;
        case 4:
            return assassin;
        case 5:
            return bg;
        case 6:
            return bluegirl;
        case 7:
            return fee;
        case 8:
            return snk;
        default:
            return snk;
    }
}