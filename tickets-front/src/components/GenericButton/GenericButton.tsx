import React from "react";
import "./GenericButton.css";

interface GenericButtonProps {
  title: string;
  onClick: any;
}

const GenericButton: React.FC<GenericButtonProps> = ({ title, onClick }) => {
  return (
    <button className="generic-button" onClick={onClick}>
      {title}
    </button>
  );
};

export default GenericButton;
