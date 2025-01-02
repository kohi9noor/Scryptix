import { Input } from "@/components/ui/input";
import { TaskParam, TaskParamsType } from "@/types/task";
import React, { useCallback } from "react";
import StringParam from "./param/StringParam";
import { useReactFlow } from "@xyflow/react";
export const NodeParamField = ({
  param,
  nodeId,
}: {
  param: TaskParam;
  nodeId: string;
}) => {
  const { updateNodeData, getNode } = useReactFlow();

  const node = getNode(nodeId);

  const value = node?.data.inputs?.[param.name];

  console.log("@value", value);

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [updateNodeData, param.name, node?.data.inputs]
  );

  switch (param.type) {
    case TaskParamsType.STRING:
      return (
        <StringParam
          updateNodeParamValue={updateNodeParamValue}
          param={param}
          value={value}
        />
      );
    default:
      return (
        <div className=" w-full">
          <p className=" text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
};
