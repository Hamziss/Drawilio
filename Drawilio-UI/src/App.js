import { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ReactComponent as Svg } from "./Assets/svg/SmallHero.svg";
import { Landing } from "./Pages/Landing";
import Rooms from "./Pages/Rooms/Rooms";

import PlayArea from "./Pages/GameRoom/PlayArea";

function App() {
  const [roomID, setGameId] = useState(null);
  const [skin, setSkin] = useState("");
  const [action, setaction] = useState("");

  return (
    <Router>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/" className="homebutton">
          <Svg />
        </a>
        {roomID && <div className="roomName">Room Name : {roomID}</div>}
      </div>
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route
          path="/Rooms"
          exact
          element={
            <Rooms
              skin={skin}
              roomId={roomID}
              setaction={setaction}
              setSkin={setSkin}
              setroomID={setGameId}
            />
          }
        ></Route>
        <Route
          path="/:roomId"
          element={
            <>
              <PlayArea
                curGameId={roomID}
                playerName={localStorage.getItem("username")}
                picture={skin}
                action={action}
                setGameId={setGameId}
              />
            </>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
