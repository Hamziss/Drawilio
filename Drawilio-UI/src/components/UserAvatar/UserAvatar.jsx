import { skinsArray } from "../../utils/skinsArray"
import "./UserAvatar.css"

const UserAvatar = ({ user }) => {
	const src = skinsArray[user.picture]
	return (
		<>
			<img src={src} alt={user.name} title={user.name} className="avatar"></img>
		</>
	)
}

export default UserAvatar
