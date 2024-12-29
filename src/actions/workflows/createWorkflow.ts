"use server";

import prisma from "@/lib/prisma";
import { createWorkFlowSchema, createWorkflowType } from "@/schema/workflow";
import { WorkFlowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
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

  const result = await prisma.workFlow.create({
    data: {
      userId,
      definition: "TODO",
      status: WorkFlowStatus.DRAFT,
      ...data,
    },
  });

  if (!result) {
    throw new Error("failed to create workflow");
  }

  return { id: result.id };
}
