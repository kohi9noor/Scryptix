"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkFlowExecutionWithPhases(executinId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthenticated");
  }

  return prisma.workflowExecution.findUnique({
    where: {
      id: executinId,
      userId,
    },
    include: {
      phase: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });
}
