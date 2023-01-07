import * as React from "react";
import BuildContext from "../contexts/BuildContext";
import SessionUserContext from "../contexts/SessionUserContext";
import { createNamedThread } from "../model/threadData";
import SmallButton from "./SmallButton";

const ResetThreadButton: React.FC = () => {
  const { userId } = React.useContext(SessionUserContext);
  console.log("session user id is", userId);
  const { setThreadId, threadId } = React.useContext(BuildContext);

  const onClick = React.useCallback(async () => {
    console.log("resetting thread", userId);
    const newThreadId = await createNamedThread(userId, "build", "INIT");
    console.log("create thread", newThreadId);
    setThreadId(newThreadId || "DEFAULT");
  }, [setThreadId, userId]);

  return (
    <SmallButton
      onClick={onClick}
      label={threadId ? "reset thread" : "start thread"}
    />
  );
};

export default ResetThreadButton;
