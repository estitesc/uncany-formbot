import { handleStoreReply } from "../handler/handleStoreReply";
import { useRunLangNodeAsync } from "../h/useRunLangNodeAsync";
import askAboutTeam from "../resp/askAboutTeam";

const AskAboutTeam: ProgramNode = (threadProps: ThreadProps) => {
  console.log("running ask about Team");

  const runLangNode = useRunLangNodeAsync(threadProps);

  return async () => {
    const dialogResponder: LanguageNode = {
      promptTemplate: askAboutTeam,
      gptConfig: {
        temperature: 0.9,
        max_tokens: 100,
        stop: "HUMAN",
      },
      completionHandler: handleStoreReply,
    };

    await runLangNode(dialogResponder);
  };
};

export default AskAboutTeam;
