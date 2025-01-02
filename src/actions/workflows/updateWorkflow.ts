"use server";

import { waitFor } from "@/lib/helper/waitfor";
import prisma from "@/lib/prisma";
import { WorkFlowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";

export async function UpdateWorkFlow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  await waitFor(3000);
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unathenticated");
  }

  const workflow = await prisma.workFlow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!workflow) throw new Error("workflow not found");

  if (workflow.status !== WorkFlowStatus.DRAFT) {
    throw new Error("workflow is not a draft");
  }

  await prisma.workFlow.update({
    data: {
      definition,
    },
    where: {
      id,
      userId,
    },
  });
}
