import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./components/SideBar";
import TextNode from "./components/TextNode";
import SettingsPanel from "./components/SettingsPanel";
import TopBar from "./components/TopBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const flowKey = "flow-chart";

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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

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

  const onNodeClick = useCallback((event, element) => {
    console.log("Element", element.id);
    setSelectedNode(element);
  }, []);

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
      toast.success("Flow saved successfully!", { position: "top-center" });

      setSelectedNode(null);
    }
  }, [nodes, edges, reactFlowInstance]);

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
          <Sidebar />
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
