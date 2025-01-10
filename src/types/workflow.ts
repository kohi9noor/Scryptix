import { LucideProps } from "lucide-react";
import React from "react";
import { TaskParam, TaskType } from "./task";
import { AppNode } from "./appNode";

export enum WorkFlowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export type WorkFlowTask = {
  label: string;
  icon: React.FC<LucideProps>;
  type: TaskType;
  isEntryPoint?: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
};

export type WorkflowExecutionPlanPhase = {
  phase: number;
  nodes: AppNode[];
};

export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[];
