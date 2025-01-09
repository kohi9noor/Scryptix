"use client";

import React, { ReactNode } from "react";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { ColorForHandle } from "./common";
const NodeOutputs = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};
interface Props {
  nodeId: string;
  output: TaskParam;
}
export const NodeOutput = ({ output }: Props) => {
  return (
    <div className=" flex justify-end relative p-3 bg-secondary">
      <p className=" text-xs text-muted-foreground">{output.name}</p>
      <Handle
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4 ",
          ColorForHandle[output.type]
        )}
        id={output.name}
        type="source"
        position={Position.Right}
      />
    </div>
  );
};
export default NodeOutputs;
