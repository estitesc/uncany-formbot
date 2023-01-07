import { sendMessage } from "../lib/twilio";
import { createThreadReplyAndEmbed } from "../model/threadReplyData";
import { getUserData } from "../model/userData";

export const handleStoreReply = async (
  uid: string,
  threadRef: any,
  body: string,
  threadData: any,
  subthreadId?: string
) => {
  console.log("entering handle store reply", body);
  const interviewOrChallengeSubthreadId =
    threadData?.interviewOrChallenge == "CHALLENGE" ? "CHALLENGE" : "INTERVIEW";
  const subthreadIdToUse = subthreadId
    ? subthreadId
    : interviewOrChallengeSubthreadId;

  console.log("subthreadIdToUse is", subthreadIdToUse);

  const result = await createThreadReplyAndEmbed(
    uid,
    threadRef,
    threadData.id,
    body,
    subthreadIdToUse
  );

  const userData: any = await getUserData(uid);
  if (threadData?.type === "text" && userData?.phone) {
    console.log("sending text message via twilio");
    await sendMessage(body, userData.phone);
  }

  return body;
};
