"use client";

import { GetWorkFlowExecutionWithPhases } from "@/actions/workflows/getWorkFlowExecutionWithPhases";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DatesToDurationString } from "@/lib/helper/date";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  CalendarIcon,
  CircleDashedIcon,
  Clock1Icon,
  Loader2Icon,
  LucideIcon,
  WorkflowIcon,
} from "lucide-react";
import { ReactNode } from "react";

type ExecutionData = Awaited<ReturnType<typeof GetWorkFlowExecutionWithPhases>>;

const ExecutionViewer = ({ intialData }: { intialData: ExecutionData }) => {
  const query = useQuery({
    queryKey: ["execution", intialData?.id],
    initialData: intialData,
    queryFn: () => GetWorkFlowExecutionWithPhases(intialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  const duration = DatesToDurationString(
    query.data?.completedAt,
    query.data?.startedAt
  );

  return (
    <div className=" flex w-full h-full">
      <aside className="w-[270px] min-w-[270px] max-w-[270px] border-r-2 border-separate flex flex-grow-0 flex-col overflow-hidden">
        <div className=" py-4 px-2 ">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={query?.data?.status}
          />
          <ExecutionLabel
            icon={CalendarIcon}
            label="Started At"
            value={
              <span className=" lowercase">
                {query.data?.startedAt
                  ? formatDistanceToNow(new Date(query.data?.startedAt), {
                      addSuffix: true,
                    })
                  : "-"}
              </span>
            }
          />
          <ExecutionLabel
            icon={Clock1Icon}
            label="Duration"
            value={
              duration ? (
                duration
              ) : (
                <Loader2Icon className=" animate-spin" size={20} />
              )
            }
          />
          <Separator />
          <div className=" flex justify-center items-center px-4 py-2">
            <div className=" text-muted-foreground flex items-center gap-2">
              <WorkflowIcon size={20} className=" stroke-muted-foreground/80" />
              <span className=" font-semibold">Phases</span>
            </div>
          </div>
          <Separator />
          <div className=" overflow-auto h-full px-2 py-4">
            {query?.data?.phase.map((phase, index) => (
              <Button
                key={phase.id}
                variant={"outline"}
                className=" w-full my-1 justify-between"
              >
                <div
                  className=" flex items-center
                 gap-2"
                >
                  <Badge variant={"outline"}>{index + 1}</Badge>
                  <p className=" font-semibold">{phase.name}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

function ExecutionLabel({
  icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: ReactNode;
  value: ReactNode;
}) {
  const Icon = icon;
  return (
    <div className=" flex justify-between items-center py-2 px-4 text-xs">
      <div className=" text-muted-foreground flex items-center gap-2">
        <Icon size={20} className=" stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className=" font-semibold capitalize flex gap-2 items-center">
        {value}
      </div>
    </div>
  );
}

export default ExecutionViewer;
