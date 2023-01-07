import { setThreadDataFromRef } from "../model/threadData";
import AskAboutProgress from "./AskAboutProgress";
import AskAboutProject from "./AskAboutProject";
import AskAboutPurpose from "./AskAboutPurpose";
import AskAboutTeam from "./AskAboutTeam";
import CheckHasTeam from "./CheckHasTeam";
import ConcludeInterview from "./ConcludeInterview";
import EvolveApplication from "./EvolveApplication";

const incrementInterviewCycles = (threadProps: ThreadProps) => {
  setThreadDataFromRef(threadProps.threadRef, {
    cyclesInInterviewState:
      (threadProps.threadData?.cyclesInInterviewState || 0) + 1,
  });
};

const switchOnIncrement = (
  threadProps: ThreadProps,
  stage: string,
  threshhold: number
) => {
  if (threadProps.threadData.cyclesInInterviewState >= threshhold) {
    setThreadDataFromRef(threadProps.threadRef, {
      interviewStage: stage,
      cyclesInInterviewState: 0,
    });
  }
};

const switchToConcludeAndEndInterview = (threadProps: ThreadProps) => {
  if (threadProps.threadData.cyclesInInterviewState >= 4) {
    setThreadDataFromRef(threadProps.threadRef, {
      interviewStage: "COMPLETED",
      cyclesInInterviewState: 0,
    });
    return true;
  }
  return false;
};

const Interview: ProgramNode = (threadProps: ThreadProps) => {
  console.log("running Interview");

  return async () => {
    incrementInterviewCycles(threadProps);

    if (threadProps.threadData.interviewStage == "PROJECT") {
      await AskAboutProject(threadProps)();
      switchOnIncrement(threadProps, "PURPOSE", 3);
    }
    if (threadProps.threadData.interviewStage == "PURPOSE") {
      await AskAboutPurpose(threadProps)();
      switchOnIncrement(threadProps, "TEAM", 3);
    }
    if (threadProps.threadData.interviewStage == "TEAM") {
      const hasTeamResult = await CheckHasTeam(threadProps)();
      console.log("result of hasTeam is", hasTeamResult);

      if (hasTeamResult?.hasTeam == "SOLO") {
        setThreadDataFromRef(threadProps.threadRef, {
          interviewStage: "PROGRESS",
          cyclesInInterviewState: 0,
        });
        threadProps.threadData.interviewStage = "PROGRESS";
      } else {
        await AskAboutTeam(threadProps)();
        switchOnIncrement(threadProps, "PROGRESS", 3);
      }
    }
    if (threadProps.threadData.interviewStage == "PROGRESS") {
      if (switchToConcludeAndEndInterview(threadProps)) {
        await ConcludeInterview(threadProps)();
        return;
      } else {
        await AskAboutProgress(threadProps)();
      }
    }

    // This really should pull from the latest thread data, not the stale threadProps from above
    await EvolveApplication(threadProps)();
  };
};

export default Interview;
