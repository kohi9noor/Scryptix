import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position, useEdges } from "@xyflow/react";
import React from "react";
import { NodeParamField } from "./NodeParamField";
import { ColorForHandle } from "./common";

export const NodeInputs = ({ children }: { children: React.ReactNode }) => {
  return <div className=" flex flex-col divide-y gap-2">{children}</div>;
};

export const NodeInput = ({
  input,
  nodeId,
}: {
  nodeId: string;
  input: TaskParam;
}) => {
  const edges = useEdges();

  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );

  return (
    <div className="flex justify-start relative p-2 bg-secondary w-full">
      <NodeParamField disabled={isConnected} param={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            ColorForHandle[input.type]
          )}
          isConnectable={!isConnected}
          id={input.name}
          type="target"
          position={Position.Left}
        />
      )}
    </div>
  );
};
