import React from "react";
import { Handle, useNodeId, useStore } from "reactflow";

// Custom handle for the source type of handle to limit the connection to 1
const CustomHandle = (props) => {
  const nodeId = useNodeId();

  const isSourceConnected = useStore((s) =>
    s.edges.some((edge) => edge.source === nodeId)
  );

  return <Handle {...props} isConnectable={!isSourceConnected}></Handle>;
};

export default CustomHandle;
