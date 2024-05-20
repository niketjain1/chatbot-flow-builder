import React, { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";

const TextNode = ({ data, isConnectable }) => {
  const onChange = useCallback((e) => {
    console.log(e.target.value);
  }, []);

  return (
    <div className="flex flex-col h-14 w-40 bg-white rounded-lg shadow-xl">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className="flex flex-row h-6 w-full rounded-t-md border-b border-gray-300 bg-green-200 p-1">
        <BiMessageSquareDetail
          size={10}
          className="flex items-center justify-center mr-1 mt-0.5"
        />
        <p className="roboto-regular">Send Message</p>
        <FaWhatsapp size={10} className="ml-auto flex mr-1 mt-0.5" />
      </div>
      <div className="flex flex-auto">
        <div className="roboto-regular p-1 w-full">{data.label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default TextNode;
