import React from "react";
import { Handle, useNodeId, useStore } from "reactflow";

const CustomHandle = (props) => {
  const nodeId = useNodeId();

  const isSourceConnected = useStore((s) =>
    s.edges.some((edge) => edge.source === nodeId)
  );

  return <Handle {...props} isConnectable={!isSourceConnected}></Handle>;
};

export default CustomHandle;
