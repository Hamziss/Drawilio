import React from "react"
import classes from "./Preloader.module.css"
const Preloader = () => {
	return (
		<>
			<div className={classes.preloader}>
				<h1 className={classes.gamename}> Drawilio </h1>
				<div className={classes.progressbar}>
					<span className={classes.bar}>
						<span className={classes.progress}></span>
					</span>
				</div>
			</div>
		</>
	)
}

export default Preloader
