"use client";
import { WorkFlow } from "@prisma/client";
import React from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import NodeComponent from "./nodes/NodeComponent";

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 1 };

const nodeTypes = {
  Node: NodeComponent,
};

const FlowEditor = ({ workflow }: { workflow: WorkFlow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode(TaskType.LaunchBrowser),
  ]);
  const [edges, setEdges, onEdgesChange] = useNodesState([]);

  return (
    <main className=" w-full h-full">
      <ReactFlow
        nodes={nodes}
        snapToGrid={true}
        snapGrid={snapGrid}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
