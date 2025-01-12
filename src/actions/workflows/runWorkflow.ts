"use server";

import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/FlowToExecutionPlan";
import { TaskRegister } from "@/lib/workflow/task/register";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const { workflowId, flowDefinition } = form;
  if (!workflowId) {
    throw new Error("workflowId is required");
  }
  if (!flowDefinition) {
    throw new Error("flow definition is not defined");
  }

  const workflow = await prisma.workFlow.findUnique({
    where: {
      userId,
      id: workflowId,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  let executionPlan: WorkflowExecutionPlan;

  try {
    const flow = JSON.parse(flowDefinition);
    const result = FlowToExecutionPlan(flow.nodes, flow.edges);

    if (result.errors) {
      throw new Error("Flow definition is not valid");
    }

    if (!result.executionPlan) {
      throw new Error("No execution plan generated");
    }

    executionPlan = result.executionPlan;
  } catch (error) {
    throw new Error(`Invalid flow definition`);
  }

  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId,
      status: WorkflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: WorkflowExecutionTrigger.MANUAL,
      phase: {
        create: executionPlan.flatMap((phase, phaseIndex) =>
          phase.nodes.map((node) => ({
            userId,
            status: ExecutionPhaseStatus.CREATED,
            number: phaseIndex + 1,
            node: JSON.stringify(node),
            name: TaskRegister[node.data.type].label,
          }))
        ),
      },
    },
    select: {
      id: true,
      phase: true,
    },
  });

  if (!execution) {
    throw new Error("Workflow execution not created");
  }

  return execution;
}
