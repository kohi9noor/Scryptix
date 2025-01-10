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
  getOutgoers,
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
import { TaskRegister } from "@/lib/workflow/task/register";

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

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      /**
       *  no self connection
       *
       */

      if (connection.source === connection.target) {
        return false;
      }

      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);

      if (!sourceNode || !targetNode) {
        console.error("Invalid connection: source or target node not found");
        return false;
      }

      const sourceTask = TaskRegister[sourceNode.data.type];
      const targetTask = TaskRegister[targetNode.data.type];

      if (!sourceTask || !targetTask) {
        console.error("Task type not registered for source or target node");
        return false;
      }

      const sourceOutput = sourceTask.outputs.find(
        (output) => output.name === connection.sourceHandle
      );
      const targetInput = targetTask.inputs.find(
        (input) => input.name === connection.targetHandle
      );

      if (!sourceOutput || !targetInput) {
        console.error("Invalid connection: source or target handle not found");
        return false;
      }

      if (sourceOutput.type !== targetInput.type) {
        console.error(
          `Type mismatch: source output type (${sourceOutput.type}) does not match target input type (${targetInput.type})`
        );
        return false;
      }

      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      const detectedCycle = hasCycle(targetNode);

      return !detectedCycle;
    },
    [nodes]
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
        isValidConnection={isValidConnection}
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
