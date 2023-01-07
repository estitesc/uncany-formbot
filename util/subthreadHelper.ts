import _ from "lodash";
export const getSubthreadId = (threadData: any, body: string) => {
  let subthreadId =
    threadData?.interviewOrChallenge == "CHALLENGE" ? "CHALLENGE" : "INTERVIEW";
  if (
    [
      "Interview",
      "INTERVIEW",
      "interview",
      "easter egg",
      "Easter egg",
      "EASTER EGG",
    ].includes(body)
  ) {
    subthreadId = "TRANSITION";
  }

  return subthreadId;
};
