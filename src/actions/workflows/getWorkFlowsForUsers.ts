"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getWorkFlowsForUser() {
  const { userId } = await auth();

  if (!userId) {
    return new Error("unauthenticated");
  }

  return prisma.workFlow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
