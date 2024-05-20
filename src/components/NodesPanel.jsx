import "../styles/index.css";
import IconTextButton from "./IconTextButton";
import { BiMessageSquareDetail } from "react-icons/bi";

const NodesPanel = () => {
  // Function to handle the drage start event
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const icon = <BiMessageSquareDetail size={18} />;
  const text = "Message";

  return (
    <aside className="fixed mt-12 top-0 right-0 w-1/5 h-full bg-gray-100 border-gray-200 border-l-2 p-4 z-10">
      <button
        className="flex flex-col h-14 w-40 items-center justify-center border border-blue-400 p-2 rounded-lg"
        onDragStart={(event) => onDragStart(event, "textNode")}
        draggable
      >
        <IconTextButton icon={icon} text={text} />
      </button>
    </aside>
  );
};

export default NodesPanel;
