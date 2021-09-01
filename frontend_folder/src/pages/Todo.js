import React, { useState } from "react";
import Profile from "../components/Profile";
import CreateTodo from "../assets/article.png";
import useFetchUser from "../hooks/useFetchUser";
import { nanoid } from "nanoid";
import TodoCard from "../components/TodoCard";
import Add from "../assets/plus.png";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import usePagination from "../hooks/usePagination";

const Todo = () => {
  const { apiData } = useFetchUser();
  const userId = apiData._id;
  const search = useSelector((state) => state.search.value);
  const [noResult, setNoResult] = useState(false);
  const { noOfPages, setCurrentPage, currentTodo } = usePagination(apiData);
  return (
    <div>
      <Profile name={apiData.firstName[0]}>
        {apiData.todos_id.length === 0 ? (
          <div className="min-h-screen flex flex-col justify-center items-center">
            <img className="w-20 mb-10" src={CreateTodo} alt="article" />
            <a
              className="bg-red-500 text-white b-none rounded p-2.5 px-10"
              href="/add"
            >
              Create Todo
            </a>
          </div>
        ) : (
          <div>
            <a
              className="fixed bottom-5 right-5 bg-red-500 rounded-full p-5"
              href="/add"
            >
              <img src={Add} alt="create-todo" />
            </a>
            {currentTodo
              .filter((data) => {
                if (search === "") {
                  return data;
                } else if (search !== "") {
                  return data.title.includes(search);
                } else {
                  return setNoResult(true);
                }
              })
              .map((todo) => {
                return (
                  <div>
                    {noResult ? (
                      <div>
                        <p>No result found...</p>
                      </div>
                    ) : (
                      <TodoCard
                        key={nanoid()}
                        id={todo._id}
                        userId={userId}
                        title={todo.title}
                        description={todo.description}
                        reminderDate={todo.reminderDate}
                        user={apiData.firstName}
                      />
                    )}
                  </div>
                );
              })}
            <Pagination pages={noOfPages} currentPage={setCurrentPage} />
          </div>
        )}
      </Profile>
    </div>
  );
};

export default Todo;
