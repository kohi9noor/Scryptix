import { GetWorkFlowExecutionWithPhases } from "@/actions/workflows/getWorkFlowExecutionWithPhases";
import Topbar from "@/app/workflow/_component/topbar/Topbar";
import { waitFor } from "@/lib/helper/waitfor";
import { auth } from "@clerk/nextjs/server";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import ExecutionViewer from "./_components/ExecutionViewer";

const ExecutionViewerPage = ({
  params,
}: {
  params: { executionId: string; workflowId: string };
}) => {
  const { executionId, workflowId } = params;

  return (
    <div className=" flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        hideButtons
        workflowId={workflowId}
        subtitle={`Run Id: ${executionId}`}
        title="Workflow run details"
      />
      <section className="h-full flex overflow-auto">
        <Suspense
          fallback={
            <div className=" w-full flex items-center justify-center">
              <Loader2Icon className=" animate-spin h-10 w-10 " />
            </div>
          }
        >
          <ExecutionViewerWrapper
            executionId={executionId}
          ></ExecutionViewerWrapper>
        </Suspense>
      </section>
    </div>
  );
};

async function ExecutionViewerWrapper({
  executionId,
}: {
  executionId: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    return <div>unauthenticated</div>;
  }
  const workflowExecution = await GetWorkFlowExecutionWithPhases(executionId);

  if (!workflowExecution) {
    return <div>Not found</div>;
  }
  return <ExecutionViewer intialData={workflowExecution} />;
}

export default ExecutionViewerPage;
