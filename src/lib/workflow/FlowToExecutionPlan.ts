import { AppNode } from "@/types/appNode";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegister } from "./task/register";
import { AppNodeMissingInputs } from "@/types/task";

export enum FlowToExecutionPlanValidtionError {
  "NO_ENTRY_POINT",
  "INVALID_INPUTS",
  "CYCLE_DETECTED",
}

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan;
  errors?: {
    type: FlowToExecutionPlanValidtionError;
    invalidElements?: AppNodeMissingInputs[];
    cycleInfo?: string[];
  };
};

export function FlowToExecutionPlan(
  nodes: AppNode[],
  edges: Edge[]
): FlowToExecutionPlanType {
  const entryPoint = nodes.find((node) => {
    const task = TaskRegister[node.data.type];
    return task?.isEntryPoint;
  });

  if (!entryPoint) {
    return {
      errors: {
        type: FlowToExecutionPlanValidtionError.NO_ENTRY_POINT,
      },
    };
  }

  const visited = new Set<string>();
  const stack = new Set<string>();

  function detectCycle(nodeId: string): boolean {
    if (stack.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;

    visited.add(nodeId);
    stack.add(nodeId);

    const incomers = edges
      .filter((edge) => edge.target === nodeId)
      .map((edge) => edge.source);

    for (const incomer of incomers) {
      if (detectCycle(incomer)) return true;
    }

    stack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (detectCycle(node.id)) {
      return {
        errors: {
          type: FlowToExecutionPlanValidtionError.CYCLE_DETECTED,
          cycleInfo: [...stack],
        },
      };
    }
  }

  const inputsWithErrors: AppNodeMissingInputs[] = [];
  const planned = new Set<string>();
  const executionPlan: WorkflowExecutionPlan = [];

  const entryPointInvalidInputs = getInvalidInputs(entryPoint, edges, planned);
  if (entryPointInvalidInputs.length > 0) {
    inputsWithErrors.push({
      nodeId: entryPoint.id,
      inputs: entryPointInvalidInputs,
    });
  }

  executionPlan.push({
    phase: 1,
    nodes: [entryPoint],
  });

  planned.add(entryPoint.id);

  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };

    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) continue;

      const invalidInputs = getInvalidInputs(currentNode, edges, planned);

      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          inputsWithErrors.push({
            nodeId: currentNode.id,
            inputs: invalidInputs,
          });
        } else {
          continue;
        }
      }

      nextPhase.nodes.push(currentNode);
      planned.add(currentNode.id);
    }

    if (nextPhase.nodes.length === 0) {
      return {
        errors: {
          type: FlowToExecutionPlanValidtionError.INVALID_INPUTS,
          invalidElements: inputsWithErrors,
        },
      };
    }

    executionPlan.push(nextPhase);
  }

  if (inputsWithErrors.length > 0) {
    return {
      errors: {
        type: FlowToExecutionPlanValidtionError.INVALID_INPUTS,
        invalidElements: inputsWithErrors,
      },
    };
  }

  return { executionPlan };
}

function getInvalidInputs(
  node: AppNode,
  edges: Edge[],
  planned: Set<string>
): string[] {
  const invalidInputs: string[] = [];
  const inputs = TaskRegister[node.data.type]?.inputs || [];

  for (const input of inputs) {
    const inputValue = node.data.inputs?.[input.name];
    const inputValueProvided = !!inputValue?.length;

    if (inputValueProvided) continue;

    const incomingEdges = edges.filter((edge) => edge.target === node.id);
    const inputEdgedByOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const requiredInputProvided =
      input.required &&
      inputEdgedByOutput &&
      planned.has(inputEdgedByOutput.source);

    if (!requiredInputProvided && input.required) {
      invalidInputs.push(input.name);
    }
  }

  return invalidInputs;
}
