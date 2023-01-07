interface ProgramNodeOld {
  dialogConfig?: any;
  promptTemplate: any;
  gptConfig?: any;
  completionHandler: any;
  dataConfig?: any;
}

interface LanguageNode {
  dialogConfig?: any;
  promptTemplate: any;
  gptConfig?: any;
  completionHandler: any;
  dataConfig?: any;
}

interface ThreadProps {
  messages: any;
  replies: any;
  uid: string;
  threadRef: any;
  threadData: any;
}

type ProgramNode = (threadProps: ThreadProps) => ProgramRunner;

type ProgramRunner = () => Promise<any>;
