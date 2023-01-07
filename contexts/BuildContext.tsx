import * as React from "react";

export const defaultBuild: any = {
  threadId: "DEFAULT",
  selMessages: [],
  selNodeId: "",
  selProgramId: "",
  sideBarMode: "THREAD",
};

const BuildContext = React.createContext({
  threadId: defaultBuild.threadId,
  setThreadId: (threadId: string) => {},
  handleSelectLine: (messageId: string) => {},
  selMessages: defaultBuild.selMessages,
  setSelMessages: (selMessages: string[]) => {},
  selNodeId: defaultBuild.selNodeId,
  setSelNodeId: (selNodeId: string) => {},
  selProgramId: defaultBuild.selProgramId,
  setSelProgramId: (selProgramId: string) => {},
  sideBarMode: "",
  setSideBarMode: (sideBarMode: string) => {},
});

export default BuildContext;
