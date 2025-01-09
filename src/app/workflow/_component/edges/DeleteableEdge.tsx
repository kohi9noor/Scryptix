"use client";

import { Button } from "@/components/ui/button";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import React from "react";

const DeleteableEdge = (props: EdgeProps) => {
  const [edePath, labelX, labelY] = getSimpleBezierPath(props);

  console.log("filtering before id", props.id);

  const { setEdges } = useReactFlow();

  return (
    <>
      <BaseEdge path={edePath} markerEnd={props.markerEnd} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <Button
            variant={"outline"}
            size={"icon"}
            className=" border cursor-pointer rounded-full hover:shadow-lg text-xs leading-none w-5 h-5"
            onClick={() => {
              return setEdges((edges) => {
                const updatedEdges = edges.filter(
                  (edge) => edge.id !== props.id
                );
                console.log("updaged edges:", updatedEdges);
                return updatedEdges;
              });
            }}
          >
            x
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default DeleteableEdge;
