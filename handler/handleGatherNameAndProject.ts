import { procNameAndProject } from "../inter/findNameAndProject";
import { setThreadDataFromRef } from "../model/threadData";

export const handleGatherNameAndProject = async (
  uid: string,
  threadRef: any,
  completion: string
) => {
  const result = procNameAndProject(completion);
  console.log("result is", result);

  if (result.applicantNameValid) {
    await setThreadDataFromRef(threadRef, {
      applicantName: result.applicantName,
    });
  }
  if (result.projectNameValid) {
    await setThreadDataFromRef(threadRef, { projectName: result.projectName });
  }
};
