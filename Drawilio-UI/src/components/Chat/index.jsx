import { useEffect, useRef } from "react"
import { ReactComponent as ButtonNewMessage } from "../../Assets/svg/buttonNewMessage.svg"
import ChatMessage from "./ChatMessage"
import styles from "./style.module.css"
const Chat = ({
	chatMessages,
	handleNewMessage,
	handleChangeMessage,
	inputBarText,
}) => {
	const chatScrollDiv = useRef()

	const scrollToBottom = () => {
		if (chatScrollDiv.current) {
			chatScrollDiv.current.scrollTo(0, chatScrollDiv.current.scrollHeight)
		}
	}

	useEffect(() => {
		scrollToBottom()
	}, [chatMessages])

	return (
		<>
			<div className={styles.chats}>
				<ul ref={chatScrollDiv}>
					{!!chatMessages.length &&
						chatMessages.map((item, i) => (
							<li key={i}>
								<ChatMessage message={item} />
							</li>
						))}
				</ul>
				<form className={styles.messageForm} onSubmit={handleNewMessage}>
					<button
						type="submit"
						onClick={handleNewMessage}
						className="send-message-button"
					>
						<ButtonNewMessage />
					</button>
					<input
						type="text"
						value={inputBarText}
						onChange={handleChangeMessage}
						placeholder="Type your guess here"
						className="new-message-input-field"
					/>
				</form>
			</div>
		</>
	)
}

export default Chat
