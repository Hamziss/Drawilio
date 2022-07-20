import "./UserAvatar.css";
const sql = require("../../Assets/images/sql.png").default;
const green = require("../../Assets/images/green.png").default;
const blonde = require("../../Assets/images/blonde.png").default;
const haj = require("../../Assets/images/haj.png").default;
const assassin = require("../../Assets/images/assassin.png").default;
const bg = require("../../Assets/images/bg.png").default;
const bluegirl = require("../../Assets/images/bluegirl.png").default;
const fee = require("../../Assets/images/fee.png").default;
const snk = require("../../Assets/images/snk.png").default;
const UserAvatar = ({ user }) => {
  var src = sql;
  console.log(user);
  switch (user.picture) {
    case "0":
      src = sql;
      break;
    case "1":
      src = green;
      break;
    case "2":
      src = blonde;
      break;
    case "3":
      src = haj;
      break;
    case "4":
      src = assassin;
      break;
    case "5":
      src = bg;
      break;
    case "6":
      src = bluegirl;
      break;
    case "7":
      src = fee;
      break;
    case "8":
      src = snk;
      break;
    default:
      src = snk;
      break;
  }
  return (
    <>
      <img
        src={src}
        alt={user.name}
        title={user.name}
        className={"avatar"}
      ></img>
    </>
  );
};

export default UserAvatar;
