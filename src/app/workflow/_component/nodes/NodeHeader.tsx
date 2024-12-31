"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskRegister } from "@/lib/workflow/task/register";
import { AppNodeData } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { CoinsIcon, GripVerticalIcon } from "lucide-react";

const NodeHeader = ({ taskType }: { taskType: TaskType }) => {
  const task = TaskRegister[taskType];

  return (
    <div className=" flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className=" flex justify-between items-center w-full">
        <p className=" text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className=" flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry Point</Badge>}
          <Badge className=" gap-2 flex items-center text-xs">
            <CoinsIcon size={16} />
            TODO
          </Badge>
          <Button
            size={"sm"}
            className="drag-handle cursor-grab"
            variant={"ghost"}
          >
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;
