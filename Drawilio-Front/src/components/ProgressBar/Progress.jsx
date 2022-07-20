import React from "react";
import { useLocation } from "react-router-dom";
import classes from "./Progress.module.css";
const Progress = () => {
  const location = useLocation();
  return (
    <>
      <div className={classes.progresscontainer}>
        <div className="n1" style={{ backgroundColor: "#ffc700" }}></div>
        <div
          className="n2"
          style={{
            backgroundColor: location.pathname === "/" ? "#faf1ac" : "#ffc700",
          }}
        ></div>
        <div
          className="n3"
          style={{
            backgroundColor:
              location.pathname === "/Rooms/StartGame" ? "#ffc700" : "#faf1ac",
          }}
        ></div>
      </div>
    </>
  );
};

export default Progress;
