import { Input } from "@/components/ui/input";
import { TaskParam, TaskParamsType } from "@/types/task";
import React from "react";
import StringParam from "./param/StringParam";

const NodeParamField = ({ param }: { param: TaskParam }) => {
  switch (param.type) {
    case TaskParamsType.STRING:
      return <StringParam param={param} />;
    default:
      return (
        <div className=" w-full">
          <p className=" text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
};

export default NodeParamField;
