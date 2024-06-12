import React from "react";
import "./GenericButton.css";

interface GenericButtonProps {
  title: string;
  onClick: any;
  disabled?: boolean;
}

const GenericButton: React.FC<GenericButtonProps> = ({
  title,
  onClick,
  disabled,
}) => {
  return (
    <button className="generic-button" onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default GenericButton;
