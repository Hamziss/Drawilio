import classes from "../../css/playerList.module.css"
import { Spinner } from "../Spinner"
import UserAvatar from "../UserAvatar/UserAvatar"
import "./UserAvatar.css"

const PlayerList = ({ players, action }) => {
	return players.length > 0 ? (
		<div className={classes.userContainer}>
			<ul className={classes.userlist}>
				{players.map((player, index) => (
					<li key={index} className={classes.userbox}>
						<UserAvatar user={player} />
						<div style={{ paddingLeft: "11px" }}>
							<span className={classes.failingStarName}>{player.username}</span>
							<div>
								<b className={classes.score}>{player.score}</b>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	) : (
		<div>
			{action === "create" ? <Spinner /> : "There is no one else in this room"}
		</div>
	)
}

export default PlayerList
