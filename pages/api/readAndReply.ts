import _ from "lodash";
import advanceConvo from "../../driver/convoManager";

const readAndReply = async (req: any, res: any) => {
  const uid = req.body.uid || req.query.uid;
  const threadId = req.body.threadId || req.query.threadId;

  if (!uid) {
    res.status(400).json({ error: "No userId provided." });
    return;
  }

  try {
    console.log("threadID in read and reply is", threadId);

    await advanceConvo(uid, "text", threadId);
    res.status(200).json({ result: "Doc written!" });
  } catch (e) {
    res.status(400).json({ error: "Error generating completion." });
  }
};

export default readAndReply;
