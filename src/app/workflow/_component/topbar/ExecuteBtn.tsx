import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ExecuteBtn = ({ workFlowId }: { workFlowId: string }) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: (execution) => {
      toast.success("Execution started", { id: "flow-execution" });
      router.push(`/workflow/runs/${workFlowId}/${execution.id}`);
    },
    onError: () => {
      toast.error("Execution failed", { id: "flow-execution" });
    },
  });

  return (
    <Button
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();

        if (!plan) {
          return;
        }

        mutation.mutate({
          workflowId: workFlowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
      variant={"outline"}
      className="flex items-center gap-2"
    >
      <PlayIcon className="stroke-slate-800" />
      Execute
    </Button>
  );
};

export default ExecuteBtn;
