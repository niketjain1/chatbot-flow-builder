import React from "react";

// common component for icon and text button
const IconTextButton = ({ icon, text }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-x-0.5">
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default IconTextButton;
