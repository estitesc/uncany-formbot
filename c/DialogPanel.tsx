import * as React from "react";
import BuildContext from "../contexts/BuildContext";
import SessionUserContext from "../contexts/SessionUserContext";
import { listenThreadMessages } from "../model/threadMessageData";
import { listenThreadReplies } from "../model/threadReplyData";
import { combineMessageAndReply } from "../util/dialogHelper";
import BuildBub from "./BuildBub";

const DialogPanel: React.FC = () => {
  const [messages, setMessages] = React.useState([""]);
  const [replies, setReplies] = React.useState([""]);
  const { threadId } = React.useContext(BuildContext);
  const { userId } = React.useContext(SessionUserContext);
  const scrollEndRef = React.useRef(undefined as any);

  React.useEffect(() => {
    if (!threadId || !userId) {
      return;
    }
    const unsub = listenThreadMessages(userId, threadId, (messages: any) => {
      setMessages(messages);
    });
    return unsub;
  }, [threadId, userId]);

  React.useEffect(() => {
    if (!threadId || !userId) {
      return;
    }
    const unsub = listenThreadReplies(userId, threadId, (replies: any) => {
      setReplies(replies);
    });
    return unsub;
  }, [threadId, userId]);

  const mergedMessageAndReply = React.useMemo(() => {
    return combineMessageAndReply(messages, replies);
  }, [messages, replies]);

  const scrollToBottom = () => {
    if (scrollEndRef.current) {
      scrollEndRef.current.scrollIntoView(false);
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [mergedMessageAndReply]);

  return (
    <div
      style={{
        backgroundColor: "#2B1D12",
        flex: 1,
        maxHeight: `calc(100vh - 188px)`,
        overflow: "scroll",
        width: "100%",
      }}
    >
      {threadId ? (
        mergedMessageAndReply.map((message: any, index: number) => {
          return (
            <BuildBub
              message={message}
              sender={message.source == "user" ? "HUMAN" : "AI"}
              senderColor={message.source == "user" ? "#78C1DD" : "#F69292"}
              content={message.body}
              isFromUser={message.source == "user"}
              index={index}
              key={index}
            />
          );
        })
      ) : (
        <div
          style={{
            padding: 12,
            marginLeft: 12,
            marginRight: 12,
            fontFamily: "Inconsolata",
            fontSize: 14,
            color: "#fbfbf8",
          }}
        >
          Select or create a thread to begin.
        </div>
      )}
      <div ref={scrollEndRef} />
    </div>
  );
};

export default DialogPanel;
