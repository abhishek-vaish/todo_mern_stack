import React from "react";
import Button from "./Button";

const Form = ({
  heading,
  description,
  value,
  children,
  onClick,
  accountInfo,
  accountLink,
  link,
}) => {
  return (
    <form
      className="form__template bg-red-100 rounded mx-auto mt-20 flex flex-col p-7"
      style={{ maxWidth: "720px" }}
    >
      <h2 className="font-bold mb-2 text-2xl">{heading}</h2>
      <p className="text-3.5 mb-5">{description}</p>
      {children}
      <div className="mb-2.5" />
      <Button value={value} onClick={onClick} />
      <div className="flex justify-center mt-3">
        <p className="mr-1">{accountInfo}</p>
        <a href={link}> {accountLink}</a>
      </div>
    </form>
  );
};

export default Form;
