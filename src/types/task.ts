export enum TaskType {
  LaunchBrowser = "LAUNCH_BROWSER",
}

export enum TaskParamsType {
  STRING = "STRING",
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
