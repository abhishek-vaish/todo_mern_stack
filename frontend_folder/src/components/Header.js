import React from "react";
import "../css/Header.css";
import { isAuthenticated, signout } from "../helper/helper";
import Search from "../assets/search.png";
import { useDispatch } from "react-redux";
import { updateSearch } from "../features/search/searchSlice";
import DownArrow from "../assets/down_arrow.png";

const Header = ({ name }) => {
  const dispatch = useDispatch();
  const onChange = (event) => {
    setTimeout(() => {
      dispatch(updateSearch(event.target.value));
    }, 1000);
  };

  return (
    <header>
      <div className="header">
        <div className="logo">
          <h1 className="text-2xl font-bold">
            Todo<span className="span__text">Application</span>
          </h1>
        </div>
        {isAuthenticated() ? (
          <div>
            <div className="flex">
              <div className="border-red-300 border-2 rounded-full px-5 mr-8 flex justify-center">
                <input
                  className="focus:outline-none"
                  type="text"
                  onChange={onChange}
                  placeholder="Search..."
                ></input>
                <button>
                  <img className="w-6" src={Search} alt="search" />
                </button>
              </div>

              <div className="profile rounded-full bg-red-200 w-10 h-10 flex justify-center items-center pb-1 m-0">
                {name}
              </div>
              <button
                onClick={() => {
                  const menu = document.querySelector(".menu");
                  if (menu.classList.contains("open")) {
                    menu.classList.remove("open");
                  } else {
                    menu.classList.add("open");
                  }
                }}
              >
                <img className="w-3 ml-2" src={DownArrow} alt="down-arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <ul className="w-20 absolute right-10 menu open bg-gray-800 text-white py-5 px-3 rounded">
        <li className="mb-3">Profile</li>
        <hr></hr>
        <a
          onClick={() => {
            signout();
          }}
          href="/"
        >
          <li className="mt-2">Signout</li>
        </a>
      </ul>
    </header>
  );
};

export default Header;
