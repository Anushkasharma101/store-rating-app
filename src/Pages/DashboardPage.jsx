import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DashboardPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("authToken")); 

  const cards = [
    { id: 1, img: "/assets/model1.png", bgColor: "bg-[#A4957B]" },
    { id: 2, img: "/assets/model2.png", bgColor: "bg-[#3A486F]" },
    { id: 3, img: "/assets/model3.png", bgColor: "bg-[#A5420A]" },
    { id: 4, img: "/assets/model4.png", bgColor: "bg-[#53282D]" },
  ];

  // Handle New Stores Click
  const handleNewStoresClick = () => {
    if (!isLoggedIn) {
      toast.info("Please login first!", { position: "top-center" });
      return;
    }
    navigate("/stores");
  };

  return (
    <div className="w-full h-[90%] bg-[#D9D9D9] flex flex-col items-end justify-end">
      <div className="w-full h-[30%] flex flex-col items-center">
        <div className="font-lato font-bold mt-9 text-3xl text-center">
          Where style speaks, trends resonate,
          <br />
          fashion flourishes
        </div>

        {/* New Stores Button */}
        <div
          className="group border border-[#474747] w-[15%] h-[22%] mt-10 rounded-full flex items-center justify-between p-2 transition duration-300 hover:bg-[#474747] cursor-pointer"
          onClick={handleNewStoresClick}
        >
          <div className="ml-2 flex justify-center w-[77%] h-full items-center text-black group-hover:text-white transition duration-300">
            New Stores
          </div>

          <div className="bg-[#474747] w-[23%] h-full rounded-full flex justify-center items-center transition duration-300 group-hover:bg-[#D9D9D9]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 transition duration-300"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="white"
              
            >
              <path
                className="group-hover:stroke-black"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full h-[60%]">
        <div className="flex justify-between gap-12 h-full">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${card.bgColor} w-[100%] h-[100%] rounded-t-full flex justify-center  pt-6`}
            >
              <img
                src={card.img}
                alt={`Model ${card.id}`}
                className=" w-[100%] h-[100%]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
