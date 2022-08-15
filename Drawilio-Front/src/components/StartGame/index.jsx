import { useNavigate } from "react-router-dom";
import { ReactComponent as StartSvg } from "../../Assets/svg/Start.svg";
import { BackButton } from "../BackButton";
import { chooseAvatar } from "./helper";

export const StartGame = (props) => {
  let navigate = useNavigate();
  const src = chooseAvatar(props.skin);

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
