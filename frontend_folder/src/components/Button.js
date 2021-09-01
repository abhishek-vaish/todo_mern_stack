import React from "react";
import "../css/Button.css";

const Button = ({ value, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white b-none rounded p-2.5 px-10"
    >
      {value}
    </button>
  );
};

export default Button;
