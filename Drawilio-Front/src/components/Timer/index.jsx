import React from "react";

const Timer = ({ seconds }) => {
  return <div>Timer: {seconds < 10 ? `0${seconds}` : seconds} </div>;
};
export default Timer;
