import runNode from "../driver/nodeRunner";

export const useRunLangNodeAsync = (threadProps: ThreadProps) => {
  return async (node: any) => {
    const { messages, replies, uid, threadRef, threadData } = threadProps;

    return await runNode(node, messages, replies, uid, threadRef, threadData);
  };
};
