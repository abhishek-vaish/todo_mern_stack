import React from "react";
import Trash from "../assets/trash.png";
import Update from "../assets/update.png";
import { deleteTodo } from "../helper/helper";

const TodoCard = (props) => {
  const date = new Date(props.reminderDate);
  const onClick = () => {
    console.log(props.userId);
    deleteTodo(props.userId, props.id)
      .then(() => {
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="bg-red-50 rounded min-h-4 mx-auto p-4 my-3 flex justify-between items-center"
      style={{ maxWidth: "720px" }}
    >
      <div className="content">
        <h2 className="text-xl font-bold">{props.title}</h2>
        <p className="text-base max-w-xl">{props.description}</p>
        <p className="text-xs mt-2">
          Reminder Date:{" "}
          <span>
            {date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}
          </span>
        </p>
      </div>
      <div className="action">
        <button onClick={onClick} className="bg-white p-1 mr-1.5 rounded">
          <img className="w-6" src={Trash} alt="trash" />
        </button>
        <button className="bg-white p-1 rounded">
          <img className="w-6" src={Update} alt="trash" />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
