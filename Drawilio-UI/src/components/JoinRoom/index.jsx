import { ReactComponent as NextBtn } from "../../Assets/svg/NextButton.svg"
import { BackButton } from "../BackButton"

const JoinRoom = ({ setStartGame, setJoinRoom }) => {
	function inputHandler(event) {
		localStorage.setItem("roomId", event.target.value.toLowerCase())
		if (event.key === "Enter" && event.target.value !== "") {
			setStartGame(true)
			setJoinRoom(false)
		}
		if (event.target.value !== "") {
			document.getElementById("NextBtn").setAttribute("style", "display:block;")
		} else {
			document.getElementById("NextBtn").setAttribute("style", "display:none;")
		}
	}

	return (
		<>
			<h1 className="CreateHero">JOIN ROOM</h1>
			<div className="CreateWrapper">
				<div className="inputRoomContainer">
					<input
						type="text"
						required
						className="InputRoom"
						onChange={inputHandler}
						onKeyPress={inputHandler}
						placeholder="ROOM NAME"
					/>
				</div>

				<div
					className="Back"
					onClick={() => {
						setStartGame(true)
						setJoinRoom(false)
					}}
					id="NextBtn"
				>
					<NextBtn />
				</div>
			</div>

			<div style={{ marginTop: "auto" }} onClick={() => setJoinRoom(false)}>
				<BackButton />
			</div>
			<div className="background"></div>
		</>
	)
}

export default JoinRoom
