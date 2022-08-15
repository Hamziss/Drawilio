import { chooseAvatar } from "../StartGame/helper";
import "./UserAvatar.css";

const UserAvatar = ({ user }) => {
  const src = chooseAvatar(user.picture);
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
