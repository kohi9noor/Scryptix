import { TaskParamsType, TaskType } from "@/types/task";
import { GlobeIcon, LucideProps } from "lucide-react";
import React from "react";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTMl,
  label: "GethHtml from page",
  icon: (props: LucideProps) => (
    <GlobeIcon className=" stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskParamsType.BROWSER_INSTANCE,
      required: true,
    },
  ],
};
