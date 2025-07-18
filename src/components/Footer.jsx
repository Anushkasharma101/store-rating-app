import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-[#A4957B] p-3 pl-20 pr-20">
      <div className="w-full h-full flex justify-between">
        <div className="flex flex-col justify-center items-center w-[30%] border-r border-white">
          <span className="font-LaBelleAurore font-normal text-[#2D2C2C] text-5xl flex items-center">
            Trendora
          </span>
          <p className="text-[80%] font-lato font-normal text-[#2D2C2C]">
            Listing the best, rated by the rest.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-[30%] ">
          <div className="flex gap-4 font-lato font-bold underline text-white">
            <span className="">Home</span>
            <span className="">About</span>
            <span className="">Shops</span>
            <span className="">FAQ</span>
          </div>
          <div className="mt-5">
            <button className='py-3 px-16 bg-[#474747] text-white rounded-md'
            onClick={() => navigate("/ownerdashboard")}
            >Dashboard</button>
          </div>
          <p className="text-white font-lato font-normal mt-3">Copyright © 2024 Trendora Pvt. Ltd.</p>
          
        </div>
        <div className="flex flex-col justify-center items-center w-[30%] border-l border-white">
          <span className="font-lato font-normal text-[#2D2C2C] text-4xl underline decoration-1 decoration-[#FFFFFF] underline-offset-8">
            Let's Connect
          </span>
          <div className="flex gap-3 mt-3">
            <img src="/assets/fb.png" alt="facebookicon"/>
            <img src="/assets/insta.png" alt="instagram"/>
            <img src="/assets/twitter.png" alt="twitter"/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;
