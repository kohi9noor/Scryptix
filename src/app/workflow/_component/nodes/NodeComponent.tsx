import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/types/appNode";
import { TaskRegister } from "@/lib/workflow/task/register";
import { NodeInput, NodeInputs } from "./NodeInputs";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;

  const task = TaskRegister[nodeData.type];

  console.log(task);

  return (
    <NodeCard isSelected={!!props.selected} nodeId={props.id}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput key={input.name} nodeId={props.id} input={input} />
        ))}
      </NodeInputs>
    </NodeCard>
  );
});

export default NodeComponent;

NodeComponent.displayName = "NodeComponent";
