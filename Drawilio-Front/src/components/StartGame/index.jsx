import { useNavigate } from "react-router-dom";
import { ReactComponent as StartSvg } from "../../Assets/svg/Start.svg";
import { BackButton } from "../BackButton";

const sql = require("../../Assets/images/sql.png").default;
const green = require("../../Assets/images/green.png").default;
const blonde = require("../../Assets/images/blonde.png").default;
const haj = require("../../Assets/images/haj.png").default;
const assassin = require("../../Assets/images/assassin.png").default;
const bg = require("../../Assets/images/bg.png").default;
const bluegirl = require("../../Assets/images/bluegirl.png").default;
const fee = require("../../Assets/images/fee.png").default;
const snk = require("../../Assets/images/snk.png").default;

export const StartGame = (props) => {
  let navigate = useNavigate();
  var src = sql;
  switch (props.skin) {
    case 0:
      src = sql;
      break;
    case 1:
      src = green;
      break;
    case 2:
      src = blonde;
      break;
    case 3:
      src = haj;
      break;
    case 4:
      src = assassin;
      break;
    case 5:
      src = bg;
      break;
    case 6:
      src = bluegirl;
      break;
    case 7:
      src = fee;
      break;
    case 8:
      src = snk;
      break;
    default:
      src = snk;
      break;
  }
  const handleStartButton = () => {
    navigate(`/${localStorage.getItem("roomId")}`);
  };
  return (
    <>
      <div className="wrapper">
        <img src={src} alt="" className="ChosenSkin" />
        <h1 className="username StartUserName">
          {localStorage.getItem("username")}
        </h1>

        <button onClick={handleStartButton}>
          <StartSvg />
        </button>
      </div>
      <div
        onClick={() => {
          props.setJoinRoom(false);
          props.setCreateRoom(false);
          props.setStartRoom(false);
        }}
      >
        <BackButton />
      </div>
    </>
  );
};
