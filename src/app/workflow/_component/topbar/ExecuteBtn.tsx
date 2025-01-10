import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";

const ExecuteBtn = ({ workFlowId }: { workFlowId: string }) => {
  const generate = useExecutionPlan();
  return (
    <Button
      onClick={() => {
        const plan = generate();
        console.log(`----plan----`);
        console.log(plan);
      }}
      variant={"outline"}
      className=" flex items-center gap-2"
    >
      <PlayIcon className=" stroke-slate-800" />
      Execute
    </Button>
  );
};

export default ExecuteBtn;
