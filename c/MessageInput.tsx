import * as React from "react";

interface MessageInputProps {
  sendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ sendMessage }) => {
  const [message, setMessage] = React.useState("");

  const sendAndClear = () => {
    console.log("is this even happening");
    setMessage("");
    sendMessage(message);
  };

  const handleKeydown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendAndClear();
    }
  };

  return (
    <div
      style={{
        height: 80,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        backgroundColor: "#150F09",
      }}
    >
      <div style={{ display: "flex", marginLeft: 24, marginRight: 24 }}>
        <div>
          <textarea
            style={{
              width: 280,
              fontSize: 16,
              fontFamily: "Inter",
              backgroundColor: "#E7DFDA",
              height: 45,
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
            }}
            value={message}
            onKeyDown={handleKeydown}
            onChange={(e: any) => setMessage(e.target.value)}
          />
        </div>
        <button
          onClick={sendAndClear}
          style={{
            backgroundColor: "#4BA3D2",
            fontFamily: "Inconsolata",
            fontSize: 18,
            marginBottom: 6,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            paddingRight: 8,
            color: "#F9F7F5",
            borderWidth: 0,
          }}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
