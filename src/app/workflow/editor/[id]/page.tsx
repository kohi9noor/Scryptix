import { waitFor } from "@/lib/helper/waitfor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Editor from "../../_component/Editor";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { userId } = await auth();

  if (!userId || !id) {
    return <div>Unauthenticated or invalid workflow ID.</div>;
  }

  await waitFor(5000);

  const workflow = await prisma.workFlow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!workflow) {
    return <div>Workflow not found.</div>;
  }

  return <Editor workflow={workflow} />;
}
