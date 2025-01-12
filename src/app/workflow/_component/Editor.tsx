"use client";

import { WorkFlow } from "@prisma/client";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import Topbar from "./topbar/Topbar";
import TaskMenu from "./TaskMenu";
import { FlowValidationContextProvider } from "@/components/context/FlowValidationContext";
const Editor = ({ workflow }: { workflow: WorkFlow }) => {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className=" flex flex-col h-full w-full overflow-hidden">
          <Topbar
            workflowId={workflow.id}
            subtitle={FlowEditor.name}
            title="Workflow editor"
          />
          <section className="flex h-full overflow-auto">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
};

export default Editor;
