import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/types/appNode";
import { TaskRegister } from "@/lib/workflow/task/register";
import { NodeInput, NodeInputs } from "./NodeInputs";
import NodeOutputs, { NodeOutput } from "./NodeOutputs";
import { Badge } from "@/components/ui/badge";

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === "true";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;

  const task = TaskRegister[nodeData.type];

  console.log(task);

  return (
    <NodeCard isSelected={!!props.selected} nodeId={props.id}>
      {DEV_MODE && <Badge>{props.id}</Badge>}

      <NodeHeader nodeId={props.id} taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput key={input.name} nodeId={props.id} input={input} />
        ))}
      </NodeInputs>
      <NodeOutputs>
        {task.outputs.map((output) => (
          <NodeOutput key={output.name} nodeId={props.id} output={output} />
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});

export default NodeComponent;

NodeComponent.displayName = "NodeComponent";
