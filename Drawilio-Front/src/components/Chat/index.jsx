import { useEffect, useRef } from "react";
import { ReactComponent as ButtonNewMessage } from "../../Assets/svg/buttonNewMessage.svg";
import ChatMessage from "./ChatMessage";
import styles from "./style.module.css";
const Chat = (props) => {
  const chatScrollDiv = useRef();

  const scrollToBottom = () => {
    if (chatScrollDiv.current) {
      chatScrollDiv.current.scrollTo(0, chatScrollDiv.current.scrollHeight);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.chatMessages]);

  return (
    <>
      <div className={styles.chats}>
        <ul ref={chatScrollDiv}>
          {!!props.chatMessages.length &&
            props.chatMessages.map((item, i) => (
              <li key={i}>
                <ChatMessage message={item} />
              </li>
            ))}
        </ul>
        <form className={styles.messageForm} onSubmit={props.handleNewMessage}>
          <button
            type="submit"
            onClick={props.handleNewMessage}
            className="send-message-button"
          >
            <ButtonNewMessage />
          </button>
          <input
            type="text"
            value={props.inputBarText}
            onChange={props.handleChangeMessage}
            placeholder="Type your guess here"
            className="new-message-input-field"
          />
        </form>
      </div>
    </>
  );
};

export default Chat;
