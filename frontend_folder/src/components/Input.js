import React from "react";
import "../css/Input.css";

const Input = ({ type, placeholder, onChange }) => {
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
};

export default Input;
