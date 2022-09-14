import classes from "./style.module.css"

const ChatMessage = ({ message }) => {
	return (
		<div
			className={`${classes.messageItem} ${message.ownedByCurrentUser} ? ${classes.myMessage} : ${classes.receivedMessage} 
      `}
		>
			<div className={classes.messageBodyContainer}>
				{
					<div
						className={`${classes.messageUsername} ${message.ownedByCurrentUser} ? ${classes.myMessageUsername} : ""
            `}
					>
						{message.username}
					</div>
				}
				<div className={classes.messageBody}>{message.msg}</div>
			</div>
		</div>
	)
}

export default ChatMessage
