"use client";
import { WorkFlow } from "@prisma/client";
import React, { useCallback, useEffect } from "react";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import NodeComponent from "./nodes/NodeComponent";
import { AppNode } from "@/types/appNode";
import DeleteableEdge from "./edges/DeleteableEdge";
import { notDeepEqual } from "assert";

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 1 };
const nodeTypes = { Node: NodeComponent };
const edgeTypes = { default: DeleteableEdge };

interface FlowEditorProps {
  workflow: WorkFlow;
}

const FlowEditor: React.FC<FlowEditorProps> = ({ workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

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

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event: any) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow");
    if (typeof taskType === undefined || !taskType) return;
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = CreateFlowNode(taskType as TaskType, position);
    setNodes((nds) => nds.concat(newNode));
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection }, eds));
      if (!connection.targetHandle) return;

      const node = nodes.find((nd) => nd.id === connection.target);
      if (!node) return;

      const nodeInputs = { ...node.data.inputs };
      nodeInputs[connection.targetHandle] = connection.source;
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: "",
        },
      });
    },
    [setEdges, updateNodeData, nodes]
  );

  return (
    <main className="w-full h-full">
      <ReactFlow
        onConnect={onConnect}
        nodes={nodes}
        snapToGrid
        snapGrid={snapGrid}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        edgeTypes={edgeTypes}
        onDrop={onDrop}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
