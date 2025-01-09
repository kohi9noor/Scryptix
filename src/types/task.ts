export enum TaskType {
  LaunchBrowser = "LAUNCH_BROWSER",
  PAGE_TO_HTMl = "PAGE_TO_HTMl",
}

export enum TaskParamsType {
  STRING = "STRING",
  BROWSER_INSTANCE = "BROWSER_INSTANCE",
}

export interface TaskParam {
  name: string;
  type: TaskParamsType;
  helperText?: string;
  required?: boolean;
  hideHandle: boolean;
  value?: string;
  [key: string]: any;
}
