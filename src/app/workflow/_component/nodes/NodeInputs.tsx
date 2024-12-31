import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeParamField from "./NodeParamField";

export const NodeInputs = ({ children }: { children: React.ReactNode }) => {
  return <div className=" flex flex-col divide-y gap-2">{children}</div>;
};

export const NodeInput = ({ input }: { input: TaskParam }) => {
  return (
    <div className=" flex justify-start relative p-2 bg-secondary w-full">
      <NodeParamField param={input} />
      {!input.hideHandle && (
        <Handle
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4"
          )}
          id={input.name}
          type="target"
          position={Position.Left}
        />
      )}
    </div>
  );
};