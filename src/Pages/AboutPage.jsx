import React from "react";
import LoginSignupBtn from "../components/LoginSignupBtn";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="w-full h- bg-[#D9D9D9]">
      <div className="w-full h-[30%] flex items-center flex-col">
        <div className="text-6xl font-lato font-extrabold mt-14 text-[#474747]">
          Discover. Rate. Connect.
        </div>
        <p className="mt-5 font-lato font-normal text-[#474747] text-center text-lg">
          Whether you're searching or showcasing, we’ve got you covered.
          <br />
          Discover new shops, share experiences, and help businesses thrive.
          <br />
          The smart way to shop and be seen.
        </p>
      </div>
      <div className="w-[100%] min-h-[58%] overflow-auto flex flex-col">
        <div className="flex w-full h-[60%] justify-center gap-[10%] mt-10 p-2">
          <div className="w-[40%] h-full rounded-md">
            <img
              src="/assets/technology.png"
              alt="technologyimg"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="w-[40%] h-full flex flex-col">
            <p className="font-lato font-normal text-[#000000] text-left">
              Our goal with this platform is to bridge the gap between customers
              and local businesses in a smarter, more transparent way.
            </p>
            <p className="font-lato font-normal text-[#000000] text-left mt-3">
              Whether you're a user looking to discover new and trusted shops or
              a business owner wanting to showcase your offerings, we’ve built a
              space for both to thrive
            </p>
            <p className="font-lato font-normal text-[#000000] text-left mt-3">
              By encouraging honest reviews and real experiences, we aim to
              create a trusted community where discovery leads to better
              decisions, and visibility helps businesses grow. This is more than
              just a listing site — it’s a platform where every visit, rating,
              and recommendation makes a difference.
            </p>
            <div className="w-full h-full">
              <button className="p-4 bg-[#474747] text-white font-lato font-normal rounded-lg mt-5">
                Find Shops
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mb-4 h-[40%] flex justify-between gap-[10%] p-8 bg-[#D9D9D9]">
        <div className="flex flex-col text-black font-lato font-normal w-[40%] h-full text-left ml-14">
          <p className="font-lato font-normal text-black">
            This platform was created, developed, and thoughtfully innovated by
            Anushka Sharma in the year 2025 with a clear vision—to empower both
            everyday shoppers and local business owners through a seamless,
            trustworthy digital space.
          </p>
          <p className="font-lato font-normal mt-3 text-black">
            Driven by her passion for technology and community impact, Anushka
            aimed to simplify how people discover and support local shops, while
            giving small businesses the tools they need to gain visibility and
            grow.{" "}
          </p>
          <p className="font-lato font-normal mt-3 text-black">
            Her intention was not just to build a website, but to create a
            meaningful ecosystem where honest experiences drive better choices,
            and every connection made contributes to a stronger, more supportive
            local economy.
          </p>
        </div>
        <div className="relative flex items-center justify-center w-[50%]">
          <div className="absolute  w-[12vw] h-[12vw] rounded-full bg-[#41485B]"/>
            <img
              src="/assets/founder.png"
              alt="founder"
              className="absolute w-[40%] -translate-y-16 h-[23vw] z-10"
            />
        </div>
      </div>
      <div className="w-full h-[30%] bg-green-300">
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
