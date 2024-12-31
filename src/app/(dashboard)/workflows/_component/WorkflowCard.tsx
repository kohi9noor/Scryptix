"use client";

import React, { useState } from "react";
import { WorkFlow } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { WorkFlowStatus } from "@/types/workflow";
import {
  FileTextIcon,
  MoreVertical,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";
import { Play } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import TooltipWrapper from "@/components/TooltipWrapper";
import DeleteWorkflowDialog from "./DeleteWorkflowDialog";

const statusColors = {
  [WorkFlowStatus.DRAFT]: "bg-green-400 text-green-600",
  [WorkFlowStatus.PUBLISHED]: "bg-primary",
};

const WorkflowCard = ({ workflow }: { workflow: WorkFlow }) => {
  const isDraft = workflow.status === WorkFlowStatus.DRAFT;
  return (
    <Card className=" border border-separate shadow-sm hover:shadow-md dark:shadow-primary/30 rounded-lg overflow-hidden">
      <CardContent className="p-4 items-center flex justify-between h-[100px]">
        <div className=" flex items-center gap-5">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center bg-red-500 justify-center",
              statusColors[workflow.status as WorkFlowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className=" h-5 w-5" />
            ) : (
              <PlayIcon className=" w-5 h-5 text-white" />
            )}
          </div>

          <div>
            <h3 className=" text-base font-bold text-muted-foreground flex items-center">
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className=" flex items-center hover:underline"
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span className=" m-2 px-2 py-0.5 text-xs text-white bg-green-600 rounded-full font-medium">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>

        <div className=" flex items-center space-x-2">
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "flex items-center gap-2"
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkflowAction
            workflowId={workflow.id}
            workflowName={workflow.name}
          />
        </div>
      </CardContent>
    </Card>
  );
};

function WorkflowAction({
  workflowName,
  workflowId,
}: {
  workflowName: string;
  workflowId: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      <DeleteWorkflowDialog
        workflowId={workflowId}
        workflowName={workflowName}
        open={showDeleteDialog}
        setIsOpen={setShowDeleteDialog}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <TooltipWrapper content={"more action"}>
              <div className=" flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog((prev) => !prev)}
            className=" text-destructive flex items-center gap-2"
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default WorkflowCard;
