import _ from "lodash";
import { DateTime } from "luxon";
import { formatTime, gmtToUtc } from "./timeFormatter";

export const combineMessageAndReply = (messages: any, replies: any) => {
  let merged: any[] = [];
  Object.values(messages).forEach((messageData: any) => {
    merged.push({ ...messageData, source: "user" });
  });
  Object.values(replies).forEach((replyData: any) => {
    merged.push({ ...replyData, source: "bot" });
  });

  if (merged.length == 0) {
    return [];
  }
  return _.sortBy(merged, "createdAt");
};

export const combineMessageAndReplyAndFilter = (
  messages: any,
  replies: any,
  subthreadId: string
) => {
  let merged: any[] = [];
  Object.values(messages).forEach((messageData: any) => {
    if (messageData.subthreadId == subthreadId) {
      merged.push({ ...messageData, source: "user" });
    }
  });
  Object.values(replies).forEach((replyData: any) => {
    if (replyData.subthreadId == subthreadId) {
      merged.push({ ...replyData, source: "bot" });
    }
  });

  if (merged.length == 0) {
    return [];
  }
  return _.sortBy(merged, "createdAt");
};

export const mapLinesToDialogWTimestamp = (lines: any, config: any = {}) => {
  const dialog = lines.map((message: any) => {
    const timezoneUtc = gmtToUtc(config.timezoneGmt || "GMT-0:00");
    const messageTime = DateTime.fromSeconds(message.createdAt, {
      zone: timezoneUtc,
    });
    const formattedTime = formatTime(messageTime);

    if (message.source == "user") {
      return `HUMAN (${formattedTime}): ${message.body}`;
    } else {
      return `AI (${formattedTime}): ${message.body}`;
    }
  });
  const dialogString = dialog.join("\n");
  return dialogString;
};

export const mapLinesToDialog = (lines: any, config: any = {}) => {
  const dialog = lines.map((message: any) => {
    const timezoneUtc = gmtToUtc(config.timezoneGmt || "GMT-0:00");
    const messageTime = DateTime.fromSeconds(message.createdAt.seconds, {
      zone: timezoneUtc,
    });
    const formattedTime = formatTime(messageTime);

    const agent1name = config.flipDialog ? "AI" : "HUMAN";
    const agent2name = config.flipDialog ? "HUMAN" : "AI";

    if (message.source == "user") {
      return config.withTimestamp
        ? `${agent1name} (${formattedTime}): ${message.body}`
        : `${agent1name}: ${message.body}`;
    } else {
      return config.withTimestamp
        ? `${agent2name} (${formattedTime}): ${message.body}`
        : `${agent2name}: ${message.body}`;
    }
  });
  const dialogString = dialog.join("\n");
  return dialogString;
};

export const combineToDialog = (messages: any, replies: any) => {
  const combined = combineMessageAndReply(messages, replies);
  return mapLinesToDialog(combined);
};

export const combineNLinesToDialog = (
  messages: any,
  replies: any,
  numLines: number,
  config: any,
  threadData: any
) => {
  const combined = combineMessageAndReplyAndFilter(
    messages,
    replies,
    threadData.interviewOrChallenge || "INTERVIEW"
  );
  const amountToSlice = numLines < combined.length ? numLines : combined.length;
  return mapLinesToDialog(combined.slice(-amountToSlice), config);
};

export const getLastMessage = (messageData: any) => {
  const messages: any[] = Object.values(messageData);
  return _.last(_.sortBy(messages, "createdAt"));
};
