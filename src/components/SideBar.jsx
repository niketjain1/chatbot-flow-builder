import "../index.css";
import IconTextButton from "./IconTextButton";
import { MessageSquareText } from "lucide-react";

const SideBar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const icon = <MessageSquareText />;
  const text = "Message";

  return (
    <aside className="flex flex-col items-start justify-start w-full border-l-2 p-4">
      <button
        className="flex flex-col h-14 w-40 items-center justify-center border border-blue-400 p-2 rounded-lg"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        <IconTextButton icon={icon} text={text} />
      </button>
    </aside>
  );
};

export default SideBar;
