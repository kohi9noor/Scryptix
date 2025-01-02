import { UpdateWorkFlow } from "@/actions/workflows/updateWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";
import { toast } from "sonner";

const SaveBtn = ({ workFlowId }: { workFlowId: string }) => {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: UpdateWorkFlow,
    onSuccess: () => {
      toast.success("flow saved sucessfully", { id: "save-workflow" });
    },
    onError: () => {
      toast.error("Something wen wrong", { id: "save-workflow" });
    },
  });

  return (
    <Button
      disabled={saveMutation.isPending}
      variant={"outline"}
      className=" felx items-center gap-2"
      onClick={() => {
        const workflowDefination = JSON.stringify(toObject());
        toast.loading("saving workflow", { id: "save-workflow" });
        saveMutation.mutate({
          id: workFlowId,
          definition: workflowDefination,
        });
      }}
    >
      <CheckIcon size={16} className=" stroke-green-400" />
      Save
    </Button>
  );
};

export default SaveBtn;
