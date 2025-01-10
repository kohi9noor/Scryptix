"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskRegister } from "@/lib/workflow/task/register";
import { AppNode, AppNodeData } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { useReactFlow } from "@xyflow/react";
import { CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";

const NodeHeader = ({
  taskType,
  nodeId,
}: {
  taskType: TaskType;
  nodeId: string;
}) => {
  const task = TaskRegister[taskType];
  const { deleteElements, getNode, addNodes } = useReactFlow();
  return (
    <div className=" flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className=" flex justify-between items-center w-full">
        <p className=" text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className=" flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry Point</Badge>}
          {!task.isEntryPoint && (
            <>
              <Button
                onClick={() => {
                  deleteElements({
                    nodes: [{ id: nodeId }],
                  });
                }}
                variant={"ghost"}
                size={"icon"}
              >
                <TrashIcon size={12} />
              </Button>
              <Button
                onClick={() => {
                  const node = getNode(nodeId) as AppNode;

                  const newX = node.position.x;
                  const newY = node.position.y + node.measured?.height! + 20;
                  const newNode = CreateFlowNode(node.data.type, {
                    x: newX,
                    y: newY,
                  });

                  addNodes([newNode]);
                }}
                variant={"ghost"}
                size={"icon"}
              >
                <CopyIcon size={12} />
              </Button>
            </>
          )}
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
