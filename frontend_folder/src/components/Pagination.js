import React from "react";
// import Arrow from "../assets/arrow.png";

const Pagination = ({ pages, currentPage }) => {
  const pageNumber = [];
  for (let i = 0; i < pages; i++) {
    pageNumber.push(i);
  }
  const onClick = (number) => {
    currentPage(++number);
  };
  return (
    <div>
      <ul
        className="flex justify-center mx-auto mt-20 "
        style={{ maxWidth: "720px" }}
      >
        {/* <li className="border-2 border-red-500 px-3 py-2 mx-2 text-red-500 rounded hover:bg-red-100">
          <a href="#">
            <img className="transform rotate-180" src={Arrow} alt="arrow" />
          </a>
        </li> */}
        {pageNumber.map((number, index) => (
          <li
            key={index}
            className="border-2 border-red-500 px-3 py-2 mx-2 text-red-500 rounded hover:bg-red-100"
          >
            <a onClick={() => onClick(number)} href="#">
              {number + 1}
            </a>
          </li>
        ))}
        {/* <li className="border-2 border-red-500 px-3 py-2 mx-2 text-red-500 rounded hover:bg-red-100">
          <a onClick={() => number++} href="#">
            <img src={Arrow} alt="arrow" />
          </a>
        </li> */}
      </ul>
    </div>
  );
};

export default Pagination;
