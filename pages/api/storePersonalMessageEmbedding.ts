import _ from "lodash";
import { fetchEmbedding } from "../../lib/apiFetcher";
import { createGlobalMessage } from "../../model/messageData";
import { getThreadRef } from "../../model/threadData";
import { setMessageDataFromThreadRef } from "../../model/threadMessageData";
import { setReplyDataFromThreadRef } from "../../model/threadReplyData";

const storePersonalMessageEmbedding = async (req: any, res: any) => {
  // console.log("running store personal message embedding", req.body);
  const uid = req.body.uid || req.query.uid;
  const threadId = req.body.threadId || req.query.threadId;
  const messageId = req.body.messageId || req.query.messageId;
  const body = req.body.body || req.query.body;
  const senderType = req.body.senderType || req.query.senderType || "user";

  if (!uid || !threadId || !messageId || !body) {
    res.status(400).json({ error: "Missing parameters." });
    return;
  }

  try {
    let decoratedBody = body;

    const threadRef = getThreadRef(uid, threadId);

    const embedding = await fetchEmbedding(body);

    if (senderType == "user") {
      await setMessageDataFromThreadRef(threadRef, messageId, {
        embedding,
      });
    } else {
      await setReplyDataFromThreadRef(threadRef, messageId, {
        embedding,
      });
    }

    await createGlobalMessage(
      uid,
      threadId,
      messageId,
      body,
      decoratedBody,
      embedding,
      senderType
    );
    console.log("added global message");
    res.status(200).json({ result: "" });
  } catch (e) {
    res.status(400).json({ error: "Error generating completion." });
  }
};

export default storePersonalMessageEmbedding;
