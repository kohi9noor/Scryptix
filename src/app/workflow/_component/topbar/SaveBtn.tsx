import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";

const SaveBtn = ({ workFlowId }: { workFlowId: string }) => {
  const { toObject } = useReactFlow();
  return (
    <Button
      variant={"outline"}
      className=" felx items-center gap-2"
      onClick={() => console.log("Object", toObject())}
    >
      <CheckIcon size={16} className=" stroke-green-400" />
      Save
    </Button>
  );
};

export default SaveBtn;
