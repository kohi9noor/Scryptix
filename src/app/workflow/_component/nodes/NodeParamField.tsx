import { Input } from "@/components/ui/input";
import { TaskParam, TaskParamsType } from "@/types/task";
import React, { useCallback } from "react";
import StringParam from "./param/StringParam";
import { useReactFlow } from "@xyflow/react";
import BrowserInstanceParam from "./BrowserInstanceParam";
export const NodeParamField = ({
  param,
  nodeId,
  disabled,
}: {
  param: TaskParam;
  disabled: boolean;
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
          disabled={disabled}
        />
      );
    case TaskParamsType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          value={""}
          param={param}
          updateNodeParamValue={updateNodeParamValue}
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
