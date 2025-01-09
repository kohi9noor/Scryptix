"use server";

import prisma from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { createWorkFlowSchema, createWorkflowType } from "@/schema/workflow";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { WorkFlowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { redirect } from "next/navigation";

export async function CreateWorkFlow(form: createWorkflowType) {
  const { success, data } = createWorkFlowSchema.safeParse(form);

  if (!success) {
    throw new Error("invalid form data");
  }

  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthenticated");
  }

  const intialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  intialFlow.nodes.push(CreateFlowNode(TaskType.LaunchBrowser));

  const result = await prisma.workFlow.create({
    data: {
      userId,
      definition: JSON.stringify(intialFlow),
      status: WorkFlowStatus.DRAFT,
      ...data,
    },
  });

  if (!result) {
    throw new Error("failed to create workflow");
  }

  return { id: result.id };
}
