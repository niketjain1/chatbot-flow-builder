import React from "react";
import { Handle, Position } from "reactflow";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import CustomHandle from "./CustomHandle";

const TextNode = ({ data, isConnectable }) => {
  return (
    <div className="flex flex-col min-h-14 h-auto w-40 bg-white rounded-lg shadow-xl hover:cursor-pointer">
      {/* Handle for the target type connection */}
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
      {/* Custom handle for source handle to connect nodes on drag, 
      isConnectable is set to 1 to limit the source handle connection to 1 */}
      <CustomHandle type="source" position={Position.Right} isConnectable={1} />
    </div>
  );
};

export default TextNode;
