export enum TaskType {
  LaunchBrowser = "LAUNCH_BROWSER",
  PAGE_TO_HTML = "PAGE_TO_HTML",
  EXTRACT_TEXT_FROM_ELEMENT = "EXTRACT_TEXT_FROM_ELEMENT",
}

export enum TaskParamsType {
  STRING = "STRING",
  BROWSER_INSTANCE = "BROWSER_INSTANCE",
  EXTRACT_TEXT_FROM_ELEMENT = "EXTRACT_TEXT_FROM_ELEMENT",
}

export interface TaskParam {
  name: string;
  type: TaskParamsType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  [key: string]: any;
}

export type AppNodeMissingInputs = {
  nodeId: string;
  inputs: string[];
};
