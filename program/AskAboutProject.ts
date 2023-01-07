import { handleStoreReply } from "../handler/handleStoreReply";
import { useRunLangNodeAsync } from "../h/useRunLangNodeAsync";
import askAboutProject from "../resp/askAboutProject";

const AskAboutProject: ProgramNode = (threadProps: ThreadProps) => {
  console.log("running ask about project");

  const runLangNode = useRunLangNodeAsync(threadProps);

  return async () => {
    const dialogResponder: LanguageNode = {
      promptTemplate: askAboutProject,
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

export default AskAboutProject;
