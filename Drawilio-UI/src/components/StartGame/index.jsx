import { useNavigate } from "react-router-dom"
import { ReactComponent as StartSvg } from "../../Assets/svg/Start.svg"
import { skinsArray } from "../../utils/skinsArray"
import { BackButton } from "../BackButton"

export const StartGame = ({
	skin,
	setJoinRoom,
	setStartRoom,
	setCreateRoom,
}) => {
	let navigate = useNavigate()

	const src = skinsArray[skin]
	const handleStartButton = () => {
		navigate(`/${localStorage.getItem("roomId")}`)
	}
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
					setJoinRoom(false)
					setCreateRoom(false)
					setStartRoom(false)
				}}
			>
				<BackButton />
			</div>
		</>
	)
}
