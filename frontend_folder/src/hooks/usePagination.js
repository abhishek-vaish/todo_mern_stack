import { useState } from "react";

const usePagination = (apiData) => {
  // totalTodo = 7
  // currentPage = 1
  // todoOnPage = 4
  // NoOfPages = Math.ceil(totalTodo / todoOnPage) // 2
  // endingIndex = currentPage * todoOnPage
  // startingIndex = endingIndex - todoOnPage

  const totalTodo = apiData.todos_id.length;
  const [currentPage, setCurrentPage] = useState(1);
  const todoOnPage = 4;
  const noOfPages = Math.ceil(totalTodo / todoOnPage);
  const endingIndex = currentPage * todoOnPage;
  const startingIndex = endingIndex - todoOnPage;
  const currentTodo = apiData.todos_id.slice(startingIndex, endingIndex);

  return { noOfPages, setCurrentPage, currentTodo };
};

export default usePagination;
