import useFlowValidation from "@/components/hooks/useFlowValidtion";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import React from "react";

const NodeCard = ({
  children,
  nodeId,
  isSelected,
}: {
  nodeId: string;
  isSelected: boolean;
  children: React.ReactNode;
}) => {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();

  const hasInvalidinputs = invalidInputs.some((node) => node.nodeId === nodeId);

  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        console.log("Node:", node);
        if (!node) return;

        const { position, measured, width, height } = node;
        if (!position || measured) return;

        const x = position.x + (width || 0) / 2;
        const y = position.y + (height || 0) / 2;
        console.log("Centering at:", { x, y });

        if (x === undefined || y === undefined) return;
        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
      className={cn(
        "rounded-md cursor-pointer bg-background text-xs gap-1 flex flex-col border-2 border-separate w-[420px]",
        isSelected && "border-primary",
        hasInvalidinputs && "border-destructive border-2"
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;
