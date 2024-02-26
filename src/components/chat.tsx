interface ChatProps {
  player: "X" | "O" | null;
}

const Chat: React.FC<ChatProps> = ({ player }) => {
  return (
    <div className="chat">
      <div className="chat-header">
        <div className="chat-icon">{player}</div>
        <div className="chat-name">Player {player}</div>
      </div>
      <div className="chat-body">
        <div className="chat-messages-section">
          <div className="chat-incoming-message">
            Incoming Message
            <div className="chat-message-time">18:12</div>
          </div>
          <div className="chat-incoming-message">
            Incoming Message
            <div className="chat-message-time">18:12</div>
          </div>
          <div className="chat-outcoming-message">
            Outcoming Message
            <div className="chat-message-time">18:12</div>
          </div>
          <div className="chat-outcoming-message">
            Outcoming Message
            <div className="chat-message-time">18:12</div>
          </div>
        </div>
        <div className="chat-input-section">
          <input className="chat-input" placeholder="Message" type="text" />
          <button className="chat-send-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
