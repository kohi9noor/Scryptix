"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskParam } from "@/types/task";
import { useId, useState } from "react";
import { ParamProps } from "@/types/appNode";
import internal from "stream";

const StringParam = ({ param, value, updateNodeParamValue }: ParamProps) => {
  const [internalValue, setInternalValue] = useState("");

  const id = useId();

  return (
    <div className=" space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className=" text-red-400 px-2">*</p>}
      </Label>
      <Input
        className=" text-xs"
        id={id}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        placeholder={param.helperText}
        onBlur={(e) => updateNodeParamValue(e.target.value)}
      />
    </div>
  );
};

export default StringParam;
