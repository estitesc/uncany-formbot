import { handleStoreReply } from "../handler/handleStoreReply";
import { useRunLangNodeAsync } from "../h/useRunLangNodeAsync";
import gatherName from "../resp/gatherName";
import findNameAndProject from "../inter/findNameAndProject";
import { handleGatherNameAndProject } from "../handler/handleGatherNameAndProject";

const GatherNameAndProject: ProgramNode = (threadProps: ThreadProps) => {
  console.log("running Gather name and project");

  const runLangNode = useRunLangNodeAsync(threadProps);

  return async () => {
    console.log("in here");
    const dialogResponder: LanguageNode = {
      promptTemplate: gatherName,
      gptConfig: {
        temperature: 0.9,
        max_tokens: 100,
        stop: "HUMAN",
      },
      completionHandler: handleStoreReply,
    };

    await runLangNode(dialogResponder);

    const nameInterpreter: LanguageNode = {
      promptTemplate: findNameAndProject,
      gptConfig: {
        temperature: 0.6,
        max_tokens: 100,
        stop: "}",
      },
      completionHandler: handleGatherNameAndProject,
    };

    await runLangNode(nameInterpreter);
  };
};

export default GatherNameAndProject;
