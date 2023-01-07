import { cosineSimilarity } from "./math";
import { fetchEmbedding } from "../lib/apiFetcher";
import { getUserMessages } from "../model/messageData";
import {
  getThreadData,
  getThreadRef,
  setThreadDataFromRef,
} from "../model/threadData";
import { getThreadMessageData } from "../model/threadMessageData";
import { getThreadReplyData } from "../model/threadReplyData";
import { decorateBody } from "../util/messageDecorator";

const DIALOG_LINES = 6;
const SIMILARITY_THRESHOLD = 0.8;
const BUFFER_LENGTH = 8;
const DIALOG_BUFFER_LENGTH = 10;

const updateTopNMessages = (
  topNMessages: any[],
  newValue: any,
  take: number
) => {
  topNMessages.push(newValue);
  topNMessages.sort((a, b) => b.similarity - a.similarity);
  return topNMessages.slice(0, take);
};

const getLastLine = (text: string) => {
  const lines = text.split(":");
  return lines[lines.length - 1];
};

const isDistant = (messageId: string, messageIdInc: number) => {
  return messageIdInc - parseInt(messageId) > DIALOG_BUFFER_LENGTH;
};

// Next steps
// De-duplicate message buffer content in case similar areas are targeted
// Prefer recent memory over old memory but don't totally factor out old memories

export const getRelevantDialogBlocks = async (
  dialog: string,
  threadData: any,
  userId: string
) => {
  console.log("is running dialog block embeddings", new Date());

  const lastLine = getLastLine(dialog);
  const lastLineEmbedding = await fetchEmbedding(lastLine);
  // console.log("lastLineEmbedding are", lastLineEmbedding);

  const messages: any[] = await getUserMessages(userId);
  // console.log("messages are", messages);

  let topTenMessages = [
    { similarity: 0, message: {} },
    { similarity: 0, message: {} },
    { similarity: 0, message: {} },
    { similarity: 0, message: {} },
    { similarity: 0, message: {} },
    { similarity: 0, message: {} },
    { similarity: 0, message: {} },
    { similarity: 0, message: {} },
    { similarity: 0, message: {} },
    { similarity: 0, message: {} },
  ];
  for (const message of Object.values(messages)) {
    if (
      message.embedding &&
      lastLineEmbedding != message.embedding &&
      isDistant(message.threadMessageId, threadData.messageIdInc)
    ) {
      const similarity = cosineSimilarity(lastLineEmbedding, message.embedding);
      topTenMessages = updateTopNMessages(
        topTenMessages,
        { similarity, message },
        10
      );
    }
  }

  console.log("top ten messages are", topTenMessages, new Date());

  // Filter for matches with > 0.8 similarity
  let top3Messages = topTenMessages.slice(0, 3);
  let filteredMessages = top3Messages.filter(
    (m) => m.similarity > SIMILARITY_THRESHOLD
  );
  console.log("filtered messages", top3Messages, new Date());

  let selectDialogBlocks: string[] = [];
  if (filteredMessages.length > 0) {
    for (const message of filteredMessages) {
      const messageData: any = message.message;
      if (parseInt(messageData.threadMessageId) > 0) {
        let targetIndex = parseInt(messageData.threadMessageId) - 2;
        if (targetIndex < 1) targetIndex = 1;

        let dialogBlock = "";
        for (let i = targetIndex; i < targetIndex + DIALOG_LINES; i++) {
          console.log("params", userId, messageData.threadId, i.toString());
          const messageMatch = await getThreadMessageData(
            messageData.userId,
            messageData.threadId,
            i.toString()
          );
          const replyMatch = await getThreadReplyData(
            messageData.userId,
            messageData.threadId,
            i.toString()
          );
          if (messageMatch) {
            // console.log("got message match", messageMatch);
            const matchThreadData = await getThreadData(
              messageData.userId,
              messageData.threadId
            );

            const decoratedBody = decorateBody(
              messageMatch.body,
              matchThreadData
            );
            dialogBlock += `${decoratedBody}\n`;
          }
          if (replyMatch) {
            // console.log("got reply match", replyMatch);
            dialogBlock += "AI: " + replyMatch?.body + "\n";
          }
        }
        console.log("dialog block is", dialogBlock);

        selectDialogBlocks.push(dialogBlock);
      }
    }
  }
  console.log("selected blocks are", selectDialogBlocks);
  // Once you get the top related message, expand it into dialog strings you can use as prompt context

  const currentBuffer: string[] = threadData.relevanceBuffer || [];
  const newBuffer = [...selectDialogBlocks, ...currentBuffer].slice(
    0,
    BUFFER_LENGTH
  );
  const threadRef = getThreadRef(userId, threadData.id);
  setThreadDataFromRef(threadRef, { relevanceBuffer: newBuffer });

  return { selectDialogBlocks: newBuffer };
};
