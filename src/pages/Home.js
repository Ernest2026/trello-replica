import React from "react";
import Kanban from "../component/Board/Kanban";
import Navbar from "../component/Navbar";
import SideNav from "../component/Navbar/SideNav";

const Home = () => {
  return (
    <>
      <Navbar />
      <SideNav />
      <Kanban />
    </>
  );
};

export default Home;
