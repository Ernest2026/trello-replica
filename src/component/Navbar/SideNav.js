import React from "react";
import { FaAngleDoubleRight, FaUserFriends } from "react-icons/fa";

const SideNav = () => {
  return (
    <aside className="flex flex-column justify-flex-start items-center">
      <div className="users-icon flex items-center justify-center text-8">
        <FaUserFriends />
      </div>
      <div className="arrow-icon flex justify-center items-center text-7">
        <FaAngleDoubleRight />
      </div>
    </aside>
  );
};

export default SideNav;
