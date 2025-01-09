import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui/accordion";
import { TaskType } from "@/types/task";
import { TaskRegister } from "@/lib/workflow/task/register";
import { Button } from "@/components/ui/button";
const TaskMenu = () => {
  return (
    <aside className=" w-[320px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
      <Accordion
        type="multiple"
        defaultValue={["extraction"]}
        className=" w-full"
      >
        <AccordionItem value="extraction">
          <AccordionTrigger className=" font-bold">
            Data extraction
          </AccordionTrigger>
          <AccordionContent className=" flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
  const task = TaskRegister[taskType];
  const onDragStart = (event: any, task: TaskType) => {
    event.dataTransfer.setData("application/reactflow", taskType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <Button
      draggable
      onDragStart={(event) => onDragStart(event, taskType)}
      variant={"secondary"}
      className=" flex items-start gap-2 border w-full justify-start"
    >
      <task.icon size={20} />
      {task.label}
    </Button>
  );
}
export default TaskMenu;
