import { useState } from "react";
import { Link } from "react-router-dom";
import { BackButton } from "../../components/BackButton";
import CreateRoom from "../../components/CreateRoom";
import JoinRoom from "../../components/JoinRoom";
import Progress from "../../components/ProgressBar/Progress";
import { SwiperSkin } from "../../components/SkinSwiper";
import { StartGame } from "../../components/StartGame";
const Rooms = ({ setSkin, setroomID, skin, setaction }) => {
  const [createRoom, setCreateRoom] = useState(false);
  const [joinRoom, setJoinRoom] = useState(false);
  const [StartRoom, setStartRoom] = useState(false);

  return (
    <>
      <Progress />
      {StartRoom ? (
        <StartGame
          setStartRoom={setStartRoom}
          setJoinRoom={setJoinRoom}
          setCreateRoom={setCreateRoom}
          skin={skin}
        />
      ) : createRoom ? (
        <CreateRoom
          setroomID={setroomID}
          setCreateRoom={setCreateRoom}
          setStartGame={setStartRoom}
        />
      ) : joinRoom ? (
        <JoinRoom
          setroomID={setroomID}
          setJoinRoom={setJoinRoom}
          setStartGame={setStartRoom}
        />
      ) : (
        <>
          <SwiperSkin setSkin={setSkin} />
          <h1 className="username">{localStorage.getItem("username")}</h1>
          <div className="RoomsContainer">
            <div className="createcontainer">
              <div
                onClick={() => {
                  setaction("create");
                  setCreateRoom(true);
                }}
                className="RoomsButton"
              >
                <span>CREATE ROOM</span>
              </div>
            </div>
            <div className="JoinContainer">
              <div
                onClick={() => {
                  setaction("join");
                  setJoinRoom(true);
                }}
                className="RoomsButton"
              >
                <span>JOIN ROOM</span>
              </div>
            </div>
          </div>
          <Link style={{ marginTop: "auto" }} to="/">
            <BackButton />
          </Link>
        </>
      )}
    </>
  );
};

export default Rooms;
