import { TaskParamsType, TaskType } from "@/types/task";
import { GlobeIcon, LucideProps, TextIcon } from "lucide-react";
import React from "react";

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: " Extract text from Element ",
  icon: (props: LucideProps) => (
    <TextIcon className=" stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "HTML",
      type: TaskParamsType.STRING,
      required: true,
      variant: "textarea",
    },
    {
      name: "Selector",
      type: TaskParamsType.STRING,
      required: true,
    },
  ],
  outputs: [
    {
      name: "Extracted Text",
      type: TaskParamsType.STRING,
    },
  ],
};
