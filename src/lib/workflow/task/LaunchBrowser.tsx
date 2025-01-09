import { TaskParamsType, TaskType } from "@/types/task";
import { GlobeIcon, LucideProps } from "lucide-react";
import React from "react";

export const LaunchBrowserTask = {
  type: TaskType.LaunchBrowser,
  label: "launch browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className=" stroke-pink-400" {...props} />
  ),
  isEntryPoint: true,
  inputs: [
    {
      name: "Website Url",
      type: TaskParamsType.STRING,
      helperText: "eg: https://www.google.com",
      required: true,
      hideHandle: true,
    },
  ],
  outputs: [{ name: "web page", type: TaskParamsType.BROWSER_INSTANCE }],
};
