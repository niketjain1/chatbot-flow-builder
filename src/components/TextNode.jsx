import React from "react";
import { Handle, Position } from "reactflow";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import CustomHandle from "./CustomHandle";

const TextNode = ({ data, isConnectable }) => {
  return (
    <div className="flex flex-col min-h-14 h-auto w-40 bg-white rounded-lg shadow-xl hover:cursor-pointer">
      {/* Handles for connecting the node to the left */}
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
      {/* Handles for connecting the node to the right */}
      <CustomHandle type="source" position={Position.Right} isConnectable={1} />
    </div>
  );
};

export default TextNode;
