import * as React from "react";
import BuildContext from "./BuildContext";

interface BuildProviderProps {
  children?: React.ReactNode;
}

const BuildProvider: React.FC<BuildProviderProps> = ({ children }) => {
  const [threadId, setThreadId] = React.useState("");
  const [selMessages, setSelMessages] = React.useState<any[]>([]);
  const [selNodeId, setSelNodeId] = React.useState("");
  const [selProgramId, setSelProgramId] = React.useState("");
  const [sideBarMode, setSideBarMode] = React.useState("THREAD");

  const handleSelectLine = (message: any) => {
    const selMessageIds = selMessages.map((m) => m.id);
    if (selMessageIds.includes(message.id)) {
      setSelMessages(selMessages.filter((i) => i.id !== message.id));
    } else {
      setSelMessages([...selMessages, message]);
    }
  };

  return (
    <BuildContext.Provider
      value={{
        threadId,
        setThreadId,
        handleSelectLine,
        selMessages,
        setSelMessages,
        selNodeId,
        setSelNodeId,
        sideBarMode,
        setSideBarMode,
        selProgramId,
        setSelProgramId,
      }}
    >
      {children}
    </BuildContext.Provider>
  );
};

export default BuildProvider;
