import React from "react"
import { useNavigate } from "react-router-dom"
import HeroImage from "../../Assets/images/Group 2913.png"
import Preloader from "../../components/Preloader"
import Progress from "../../components/ProgressBar/Progress"
export const Landing = (props) => {
	let navigate = useNavigate()

	function handleKeyDown(e) {
		if (e.key === "Enter" && e.target.value !== "") {
			navigate("/Rooms")
		}
	}
	function inputHandler(event) {
		localStorage.setItem("username", event.target.value)
	}

	return (
		<>
			<Preloader />
			<Progress />
			<div className="hero-title">
				<div className="gamename two">
					<img src={HeroImage} alt="drawilio" />
				</div>
				<div className="inputContainer">
					<input
						id="inputname"
						type="text"
						placeholder="NICKNAME"
						onChange={inputHandler}
						required
						className="inputNickname"
						onKeyPress={(e) => handleKeyDown(e)}
					/>
				</div>
			</div>
		</>
	)
}
