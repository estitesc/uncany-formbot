import { setThreadDataFromRef } from "../model/threadData";
import GatherNameAndProject from "./GatherNameAndProject";
import Interview from "./Interview";
import PostInterview from "./PostInterview";

const Root: ProgramNode = (threadProps: ThreadProps) => {
  console.log("running Root");

  return async () => {
    if (
      !threadProps.threadData.applicantName ||
      !threadProps.threadData.projectName
    ) {
      await GatherNameAndProject(threadProps)();
      return;
    } else if (!threadProps.threadData.interviewStage) {
      setThreadDataFromRef(threadProps.threadRef, {
        interviewOrChallenge: "INTERVIEW",
        interviewStage: "PROJECT",
      });

      threadProps.threadData.interviewOrChallenge = "INTERVIEW";
      threadProps.threadData.interviewStage = "PROJECT";
    }

    if (threadProps.threadData.interviewStage == "COMPLETED") {
      await PostInterview(threadProps)();
      return;
    } else {
      await Interview(threadProps)();
      return;
    }
  };
};

export default Root;
