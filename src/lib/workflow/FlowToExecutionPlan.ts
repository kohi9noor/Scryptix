import { AppNode } from "@/types/appNode";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegister } from "./task/register";

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan;
};

export function FlowToExecutionPlan(
  nodes: AppNode[],
  edges: Edge[]
): FlowToExecutionPlanType {
  const entryPoint = nodes.find(
    (node) => TaskRegister[node.data.type]?.isEntryPoint
  );

  if (!entryPoint) {
    throw new Error("No entry point found in the workflow.");
  }

  const planned = new Set<string>();
  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];

  planned.add(entryPoint.id);

  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };

    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        continue;
      }

      const invalidInputs = getInvalidInputs(currentNode, edges, planned);

      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          console.error(
            "Invalid inputs for node:",
            currentNode.id,
            invalidInputs
          );
          throw new Error(
            `Workflow is invalid due to unresolved inputs for node: ${currentNode.id}`
          );
        } else {
          continue;
        }
      }

      nextPhase.nodes.push(currentNode);
      planned.add(currentNode.id);
    }

    if (nextPhase.nodes.length === 0) {
      throw new Error("Workflow contains unresolved dependencies or cycles.");
    }

    executionPlan.push(nextPhase);
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
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided = inputValue?.length > 0;

    if (inputValueProvided) {
      continue;
    }

    const incomingEdges = edges.filter((edge) => edge.target === node.id);
    const inputEdgedByOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputEdgedByOutput &&
      planned.has(inputEdgedByOutput.source);

    if (!requiredInputProvidedByVisitedOutput && input.required) {
      invalidInputs.push(input.name);
    }
  }

  return invalidInputs;
}
