export const decorateBody = (body: string, threadData: any) => {
  let decoratedBody = body;
  if (threadData?.projectId && threadData?.name) {
    decoratedBody = `${threadData.name} (Project ${threadData.projectId}): ${decoratedBody}`;
  } else if (threadData?.name) {
    decoratedBody = `${threadData.name}: ${decoratedBody}`;
  } else {
    decoratedBody = `HUMAN: ${decoratedBody}`;
  }
  return decoratedBody;
};
