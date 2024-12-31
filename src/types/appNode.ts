import { Node } from "@xyflow/react";
import { TaskType } from "./task";

export interface AppNodeData {
  type: TaskType.LaunchBrowser;
  input: Record<string, string>;
  [key: string]: any;
}

export interface AppNode extends Node {
  data: AppNodeData;
}
