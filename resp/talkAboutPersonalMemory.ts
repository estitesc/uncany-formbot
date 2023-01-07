const talkAboutPersonalMemory = (
  dialog: string,
  config: any,
  threadData: any
) => {
  const { selDialogBlocks } = config;

  const renderDialogBlocks = selDialogBlocks.map((block: string) => {
    return `{${block}}\n\n`;
  });

  return `The AI has a conversation with the HUMAN.

  Rules for the AI:

  If the AI doesn't know the answer to a question, it can respond by saying it does not know, or it can ask the human a follow up question to get more information.

  Here are PREVIOUS CONVERSATIONS that the HUMAN had with the AI:

  ${renderDialogBlocks}

  Here is the current conversation:

  ${dialog}
  AI: `;
};

export default talkAboutPersonalMemory;
