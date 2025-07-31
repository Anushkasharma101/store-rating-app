import React, { useState,useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import LoginSignupBtn from "./LoginSignupBtn";
import LogOutBtn from "./LogOutBtn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const role = localStorage.getItem("role");


  const navigate = useNavigate();

  // Update isLoggedIn when token changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate("/login");

  };
  
  
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    role === "ADMIN"
      ? { name: "Dashboard", path: "/admindashboard" }
      : { name: "Stores", path: "/stores" },
  ];

  // Trigger search
  const handleSearch = () => {
    if (!isLoggedIn) {
      toast.info("Please login first!", { position: "top-center" });
      return;
    }
    if (searchQuery.trim() === "") return;
    navigate(`/stores?search=${encodeURIComponent(searchQuery)}`);
  };

  // Handle Stores click
  const handleStoresClick = (e, item) => {
    if (!isLoggedIn && item.name === "Stores") {
      e.preventDefault();
      toast.info("Please login first!", { position: "top-center" });
    }
    navigate("/stores");
  };

  return (
    <div className="w-full h-[10%] bg-[#D9D9D9] flex justify-between items-center p-3">
      <div className="text-4xl text-[#A4957B] font-LaBelleAurore font-normal ml-5">
        Trendora
      </div>
      <div className="h-[80%] bg-[#A4957B] rounded-full flex gap-1 items-center">
        <div className="flex h-full items-center justify-between rounded-full">
          <div className="flex h-full gap-1 items-center justify-between w-full">
            {menuItems.map((item, index) => (
              <div
                className="h-full flex items-center justify-center"
                key={index}
              >
                <NavLink
                  to={item.path}
                  onClick={(e) => handleStoresClick(e, item)}
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

        <div className="flex items-center rounded-full px-2 border border-[#303030] h-full">
          <input
            type="text"
            placeholder="Email/Address..."
            className="bg-transparent outline-none placeholder:text-[#474747] w-[100%] h-full p-1 cursor-pointer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            disabled={!isLoggedIn}
          />
          <FaSearch
            className='w-[10%] h-full cursor-pointer'
            onClick={handleSearch}
          />
        </div>
      </div>
      <div className="w-[12%] h-[80%] flex justify-center items-center mr-3">
      {isLoggedIn ? (
          <LogOutBtn
            text="LogOut"
            onClick={handleLogout}
           
          />
          ) : (
          <LoginSignupBtn text="LogIn/SignUp"/>
        )}      
        </div>
    </div>
  );
};

export default Navbar;
