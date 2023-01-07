import React from "react";
import _ from "lodash";
import type { NextPage } from "next";
import { createMessageAndEmbed } from "../model/threadMessageData";
import HeadWithFonts from "../c/HeadWithFonts";
import MessageInput from "../c/MessageInput";
import { createUser, userExists } from "../model/userData";
import MarkBarSimple from "../c/MarkBarSimple";
import FunctionBar from "../c/FunctionBar";
import BuildContext from "../contexts/BuildContext";
import SessionUserContext from "../contexts/SessionUserContext";
import SimpleSideBar from "../c/SimpleSideBar";
import DialogPanel from "../c/DialogPanel";
import useIsDesktop from "../h/useIsDesktop";
import PleaseDesktop from "../c/PleaseDesktop";
import { apiPath } from "../lib/embedApiCaller";
import { getThreadData } from "../model/threadData";
import { getSubthreadId } from "../util/subthreadHelper";

const Dialog: NextPage = () => {
  const { userId, setUserId } = React.useContext(SessionUserContext);
  const { threadId, setSelMessages } = React.useContext(BuildContext);

  const isDesktop = useIsDesktop();

  React.useEffect(() => {
    setSelMessages([]);
  }, [setSelMessages, threadId]);

  const createNewUser = React.useCallback(async () => {
    const newUserId = await createUser();
    // We need to store the user data in localStorage
    if (newUserId) {
      localStorage.setItem("membotUserId", newUserId);
      setUserId(newUserId);
      console.log("new created", newUserId);
    }
  }, []);

  const loadUserId = React.useCallback(async () => {
    const storedUserId = localStorage.getItem("membotUserId");
    console.log("got stored User Id ", storedUserId);

    if (!storedUserId) {
      console.log("none stored, creating new");
      createNewUser();
      return;
    }

    const userDoesExist = await userExists(storedUserId);

    if (userDoesExist) {
      console.log("found existing, setting id");
      setUserId(storedUserId);
    } else {
      console.log("no corresponding db entry, creating new");
      createNewUser();
    }
  }, [createNewUser]);

  React.useEffect(() => {
    loadUserId();
  }, [loadUserId]);

  const sendMessage = async (message: string) => {
    if (!message.length) {
      return;
    }
    const threadData: any = await getThreadData(userId, threadId);
    const subthreadId = getSubthreadId(threadData, message);
    await createMessageAndEmbed(userId, threadId, message, subthreadId);

    const response = await fetch(`${apiPath}/readAndReplyThread`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: userId, threadId }),
    });
    const data = await response.json();
    console.log("response from api", data);
  };

  if (!isDesktop) {
    return <PleaseDesktop />;
  }

  return (
    <div>
      <HeadWithFonts />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#fbfbf8",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MarkBarSimple />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <SimpleSideBar />
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FunctionBar />
            <DialogPanel />
            <MessageInput sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
