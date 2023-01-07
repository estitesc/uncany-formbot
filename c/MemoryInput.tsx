import * as React from "react";
import BuildContext from "../contexts/BuildContext";
import SessionUserContext from "../contexts/SessionUserContext";
import { getThreadRef, setThreadDataFromRef } from "../model/threadData";

const MemoryInput: React.FC = () => {
  const [instructions, setInstructions] = React.useState("");

  const { userId } = React.useContext(SessionUserContext);
  const { threadId } = React.useContext(BuildContext);

  const applyUpdate = () => {
    const threadRef = getThreadRef(userId, threadId);
    setThreadDataFromRef(threadRef, {
      humanSimInstructions: instructions,
    });
  };

  const speak = async () => {
    const response = await fetch("/api/readAndReplyThread", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: userId, threadId }),
    });
  };

  const handleKeydown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyUpdate();
    }
  };

  return (
    <div style={{ margin: "0 24px" }}>
      <div>
        <textarea
          style={{
            width: 220,
            height: 200,
            fontSize: 16,
            fontFamily: "Inter",
            backgroundColor: "#E7DFDA",
          }}
          value={instructions}
          onKeyDown={handleKeydown}
          onChange={(e: any) => setInstructions(e.target.value)}
        />
      </div>
      <div style={{ display: "flex" }}>
        <button
          onClick={applyUpdate}
          style={{
            backgroundColor: "#4BA3D2",
            fontFamily: "Inter",
            fontSize: 18,
            marginLeft: 10,
            padding: 12,
            paddingRight: 18,
            paddingLeft: 18,
            borderRadius: 8,
            color: "#F9F7F5",
            borderWidth: 0,
          }}
        >
          apply
        </button>
        <button
          onClick={speak}
          style={{
            backgroundColor: "#4BA3D2",
            fontFamily: "Inter",
            fontSize: 18,
            marginLeft: 10,
            padding: 12,
            paddingRight: 18,
            paddingLeft: 18,
            borderRadius: 8,
            color: "#F9F7F5",
            borderWidth: 0,
          }}
        >
          speak
        </button>
      </div>
    </div>
  );
};

export default MemoryInput;
