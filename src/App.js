import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import NodesPanel from "./components/NodesPanel";
import TextNode from "./components/TextNode";
import SettingsPanel from "./components/SettingsPanel";
import TopBar from "./components/TopBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const flowKey = "flow-chart";

// Defining the node types
const NodeTypes = {
  textNode: TextNode,
};

const initialNodes = [
  {
    id: "0",
    type: "textNode",
    data: { label: "Test Node 1" },
    position: { x: 250, y: 5 },
  },
];

let id = 1;
const getId = () => `${id++}`;

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes); // state management for nodes
  const [edges, setEdges, onEdgesChange] = useEdgesState([]); // state management for edges
  const [reactFlowInstance, setReactFlowInstance] = useState(null); // state management for react flow instance
  const [selectedNode, setSelectedNode] = useState(false); // state to manage if the node is selected or not

  // Handler to add edges between nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Function for handling drag over event
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Callback for handling drop event
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: "textNode",
        position,
        data: { label: `Test Message ${id}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Function to handle node click event
  const onNodeClick = useCallback((event, element) => {
    console.log("Element", element.id);
    setSelectedNode(element);
  }, []);

  // Function for handling text change in the settings panel
  const onTextChange = useCallback(
    (id, value) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, label: value } }
            : node
        )
      );
    },
    [setNodes]
  );

  // Function to save the flow in the local storage
  const onSave = useCallback(() => {
    const nodesWithEmptyTargetHandles = nodes.filter(
      (node) =>
        node.type === "textNode" &&
        !edges.some((edge) => edge.target === node.id)
    );

    if (nodesWithEmptyTargetHandles.length > 1) {
      toast.error("Error: More than one node has an empty target handle.", {
        position: "top-center",
      });
    } else {
      if (reactFlowInstance) {
        const flow = reactFlowInstance.toObject();
        localStorage.setItem(flowKey, JSON.stringify(flow));
      }
      toast.success(
        "Flow saved successfully in the local memory, please check!",
        { position: "top-center" }
      );

      setSelectedNode(null);
    }
  }, [nodes, edges, reactFlowInstance]);

  // Fuction to redirect back to the nodes panel as setting the selected node to null
  const backToNodesPanel = () => {
    setSelectedNode(null);
  };

  return (
    <>
      <TopBar onSave={onSave} />

      <div
        className="flex flex-row"
        style={{ width: "200vh", height: "100vh" }}
      >
        <ReactFlowProvider>
          <div className="w-full h-full" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              nodeTypes={NodeTypes}
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>
          <NodesPanel />
          <SettingsPanel
            selectedNode={selectedNode}
            onTextChange={onTextChange}
            onBack={backToNodesPanel}
          />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default Flow;
