import advanceConvo from "../../driver/convoManager";
import {
  createThread,
  getThreadData,
  getThreadRef,
  setThreadDataFromRef,
} from "../../model/threadData";
import {
  createMessageAndEmbed,
  createThreadMessage,
} from "../../model/threadMessageData";
import {
  createUser,
  getUserByPhone,
  getUserData,
  setPhone,
  setUserData,
} from "../../model/userData";
import { getSubthreadId } from "../../util/subthreadHelper";

const recTwilio = async (req: any, res: any) => {
  console.log("Message Received, body is", req.body);

  try {
    const fromPhone = req.body.From;
    // Get user by phone number
    const users = await getUserByPhone(fromPhone);
    console.log("users is", users);
    let uid;
    // Create a new user if one didn't already exist.
    if (Object.keys(users).length === 0) {
      uid = await createUser();
      if (uid) {
        setPhone(uid, fromPhone);
        const threadId = await createThread(uid, "text", "DEMO_ONBOARD");
        if (threadId) {
          setUserData(uid, {
            userSource: "textIn",
            twilioThreadId: threadId,
          });
          // const threadRef = getThreadRef(uid, threadId);
          // await setThreadDataFromRef(threadRef, { programId: "demo-bot-root" });
        }
      }
    } else {
      uid = Object.keys(users)[0];
    }

    if (uid && req.body.Body) {
      let threadId;
      const user = await getUserData(uid);
      if (user?.twilioThreadId) {
        threadId = user.twilioThreadId;
      } else {
        threadId = await createThread(uid, "text", "DEMO_ONBOARD");
        await setUserData(uid, { twilioThreadId: threadId });
      }

      // await createThreadMessage(uid, threadId, req.body.Body);
      const threadData: any = await getThreadData(uid, threadId);
      const subthreadId = getSubthreadId(threadData, req.body.Body);
      await createMessageAndEmbed(uid, threadId, req.body.Body, subthreadId);

      await advanceConvo(uid, "text", threadId);

      res.status(200).json({ result: "Convo advanced!" });
    } else {
      res
        .status(400)
        .json({ error: "Userid or message body missing in twilio receipt." });
    }
  } catch (e) {
    console.error("Error adding document: ", e);
    res.status(400).json({ error: "Error writing document." });
  }
};

export default recTwilio;
