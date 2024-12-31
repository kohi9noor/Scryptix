"use server";

import prisma from "@/lib/prisma";
import { createWorkFlowSchema, createWorkflowType } from "@/schema/workflow";
import { WorkFlowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function DeleteWorkFlow(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthenticated");
  }

  await prisma.workFlow.delete({
    where: {
      id: id,
      userId: userId,
    },
  });

  revalidatePath("/workflows");
}
