"use server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getWorkFlowById = async (id: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  const workflow = await prisma.workFlow.findUnique({
    where: { userId: userId, id: id },
  });
  return { props: { workflow } };
};
