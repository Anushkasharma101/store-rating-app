import React from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import LoginSignupBtn from "./LoginSignupBtn";

const Navbar = ({ role }) => {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "stores",path:"/stores"}
    
  ];

  return (
    <div className="w-full h-[10%] bg-[#D9D9D9] flex justify-between items-center p-3">
      <div className="text-4xl text-[#A4957B] font-LaBelleAurore font-normal ml-5">
          Trendora
        </div>
      <div className=" h-[80%]  bg-[#A4957B] rounded-full flex gap-1 items-center">
         <div className=" flex h-full items-center justify-between rounded-full">
          <div className="flex h-full gap-1 items-center justify-between w-full">
          {menuItems.map((item,index) => (
            <div className="h-full flex items-center justify-center" key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `rounded-full transition flex items-center justify-center px-4 duration-300 h-full hover:bg-[#474747] hover:text-[white] ${
                    isActive
                      ? "bg-[#474747] text-white"
                      : "text-black hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </div>
          ))}
        </div>
         </div>
        

        {/* Search Bar */}
        <div className="flex items-center rounded-full px-2 border border-[#303030] h-full">
          <input
            type="text"
            placeholder="Email/Address..."
            className="bg-transparent outline-none  placeholder:text-[#474747] w-[100%] h-full p-1"
          />
          <FaSearch className="text-[#474747] w-[10%] h-full" />
        </div>
      </div>
      <div className="w-[12%] h-[80%] flex justify-center items-center mr-3">
          <LoginSignupBtn text="LogIn/SignUp" />
        </div>
    </div>
  );
};

export default Navbar;
