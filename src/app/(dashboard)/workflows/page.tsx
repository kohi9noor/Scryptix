import { getWorkFlowsForUser } from "@/actions/workflows/getWorkFlowsForUsers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { waitFor } from "@/lib/helper/waitfor";
import { AlertCircle, Inbox, InboxIcon, Workflow } from "lucide-react";
import { Suspense } from "react";
import CreateWorkflowDialog from "./_component/CreateWorkflowDialog";
import WorkflowCard from "./_component/WorkflowCard";

const page = () => {
  return (
    <div className=" flex-1 flex flex-col h-full">
      <div className=" flex justify-between">
        <div className=" flex flex-col">
          <h1 className=" text-2xl font-bold">WorkFlows</h1>
          <p className=" text-muted-foreground">Mange your workflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>

      <div className=" h-full py-6">
        <Suspense fallback={<UserWorkFlowsSkeleton />}>
          <UserWorkFlows />
        </Suspense>
      </div>
    </div>
  );
};

function UserWorkFlowsSkeleton() {
  return (
    <div className=" space-y-2">
      {[1, 2, 3, 4].map((i) => {
        return <Skeleton key={i} className="h-32 w-full" />;
      })}
    </div>
  );
}

async function UserWorkFlows() {
  const workFlows = await getWorkFlowsForUser();

  if (!workFlows) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (workFlows.length === 0) {
    return (
      <div className="flex flex-col gap-4  items-center justify-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflow created yet</p>
          <p className="font-bold">
            Click the button below to create your first workflow
          </p>
        </div>
        <CreateWorkflowDialog triggerText="Create your first workflow" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 h-full">
      {workFlows.map((workflow, index) => {
        return <WorkflowCard key={index} workflow={workflow} />;
      })}
    </div>
  );
}

export default page;
