import React from "react";
import {
  FaAngleDown,
  FaInfo,
  FaRegBell,
  FaSearch,
  FaTh,
  FaTimes,
} from "react-icons/fa";
import { logo } from "../../assets/home";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between text-white">
      <div className="flex">
        <div className="text-6 mx-4 flex items-center">
          <FaTh />
        </div>
        <div className="flex items-center mr-4">
          <img src={logo} className="logo-img" alt="Trello logo" />
        </div>
        <div className="flex items-center mr-4">
          <div className="dropdown-list flex items-center">
            <span className="mr-2">Workspace </span>
            <FaAngleDown />
          </div>
          <div className="dropdown-list flex items-center">
            <span className="mr-2">Recent </span>
            <FaAngleDown />
          </div>
          <div className="dropdown-list flex items-center">
            <span className="mr-2">Starred </span>
            <FaAngleDown />
          </div>
          <div className="dropdown-list flex items-center">
            <span className="mr-2">Template </span>
            <FaAngleDown />
          </div>
        </div>
        <div>
          <button type="button" className="dropdown-list create-btn text-white">
            Create
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="input-container mr-2">
          <input type="text" placeholder="Search" className="search-input" />
          <span className="search-icon flex items-center justify-center">
            <FaSearch />
          </span>
          <span className="times-icon flex items-center justify-center">
            <FaTimes />
          </span>
        </div>
        <div className="flex items-center justify-center mx-2">
          <FaInfo className="info-icon flex items-center justify-center text-7" />
        </div>
        <div className="flex items-center justify-center mx-2">
          <FaRegBell className="text-7" />
        </div>
        <div className="name-placeholder mx-2">
          <span>qk</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
