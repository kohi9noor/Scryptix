"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskParam } from "@/types/task";
import { useId } from "react";

interface ParamProps {
  param: TaskParam;
}

const StringParam = ({ param }: ParamProps) => {
  const id = useId();

  return (
    <div className=" space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className=" text-red-400 px-2">*</p>}
      </Label>
      <Input id={id} placeholder={param.helperText} />
    </div>
  );
};

export default StringParam;
