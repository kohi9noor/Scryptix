"use client";
import { WorkFlow } from "@prisma/client";
import React, { useEffect } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import NodeComponent from "./nodes/NodeComponent";

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 1 };
const nodeTypes = { Node: NodeComponent };

interface FlowEditorProps {
  workflow: WorkFlow;
}

const FlowEditor: React.FC<FlowEditorProps> = ({ workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport } = useReactFlow();
  console.log(nodes);
  useEffect(() => {
    if (!workflow.definition) return;

    try {
      const flow = JSON.parse(workflow.definition);
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (flow.viewport) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setViewport({ x, y, zoom });
      }
    } catch (error) {
      console.error("Error parsing workflow definition:", error);
    }
  }, [workflow.definition, setEdges, setNodes, setViewport]);

  return (
    <main className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        snapToGrid
        snapGrid={snapGrid}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitViewOptions={fitViewOptions}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
