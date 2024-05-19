import React from "react";

const IconTextButton = ({ icon, text }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-x-0.5">
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default IconTextButton;
