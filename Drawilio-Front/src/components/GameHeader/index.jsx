import { useNavigate } from "react-router-dom";
import styles from "../../css/topGameHeader.module.css";
import Timer from "../Timer";

const home = require("../../Assets/images/home-full.png").default;

const GameHeader = ({
  gameId,
  socketUser,
  socketScore,
  setGameId,
  currentWord,
  currentRound,
  counter,
}) => {
  const navigate = useNavigate();
  const handleHomeBtn = () => {
    setGameId(null);
    navigate(`/Rooms`);
  };
  return (
    <>
      {socketUser && (
        <div>
          <p>
            {socketUser} SCORE : <span>{socketScore}</span>
          </p>
        </div>
      )}

      {currentWord && (
        <div>
          Current word
          <span style={{ letterSpacing: "5px", paddingLeft: 10 }}>
            {currentWord}
          </span>
        </div>
      )}
      <div>Round : {currentRound}</div>
      <Timer seconds={counter} />

      <div>
        <img
          className={styles.homeBtn}
          onClick={handleHomeBtn}
          src={home}
          alt=""
        />
      </div>
    </>
  );
};
export default GameHeader;
