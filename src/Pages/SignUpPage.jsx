import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaMapMarkerAlt } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <div className=" relative flex w-full h-screen bg-[#D9D9D9] items-end">
      <div className=" absolute w-full h-[50%]">
        <img
          src="assets/wave.svg"
          alt="Fashion Model"
          className="h-[100%] w-[100%] object-cover overflow-visible"
        />
      </div>
      <div className="text-4xl text-[#A4957B] font-LaBelleAurore absolute top-10 left-10 font-normal">
        Trendora
      </div>
      <div className="absolute left-40 bottom-0 w-[40%] h-[100%] flex justify-center ">
        <img src="/assets/model.png" alt="model" className="w-full h-full" />
      </div>

      <div className="flex w-full md:w-1/2 h-full items-center justify-center p-8 absolute right-10">
        <div className="w-full max-w-md rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center font-lato text-black">
            Sign Up
          </h2>
          <form className="space-y-4">
            <div className="relative">
              <label className="block mb-2 font-bold font-lato text-black">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-[#474747] bg-transparent rounded-lg font-lato font-normal text-black placeholder:text-[#2D2C2C]"
              />
              <FaUserLarge className="absolute right-3 top-11" />
            </div>

            <div>
              <label className="block mb-2 font-lato font-bold">
                Your Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-2 border border-[#474747] rounded-lg bg-transparent font-lato font-normal text-black placeholder:text-[#2D2C2C]"
                />
                <FaEnvelope className="absolute right-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-bold font-lato">
                Your Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full px-4 py-2 border border-[#474747] rounded-lg bg-transparent font-lato font-normal text-black placeholder:text-[#2D2C2C]"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-[#2D2C2C]"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-bold font-lato">Roles</label>
              <select className="w-full px-4 py-2 border border-[#474747] rounded-lg bg-transparent font-lato font-normal text-black placeholder:text-[#2D2C2C]">
                <option className="font-lato">Choose Your Role</option>
                <option className="font-lato">User</option>
                <option className="font-lato">Store Owner</option>
                <option className="font-lato">System Administrator</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-bold font-lato bg-transparent text-black placeholder:text-[#2D2C2C]">
                Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Address"
                  className="w-full px-4 py-2 border border-[#474747] rounded-lg font-lato font-bold bg-transparent text-black placeholder:text-[#2D2C2C] "
                />
                <FaMapMarkerAlt className="absolute right-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#303030] text-white py-3 rounded-lg border border-[#303030]"
              onClick={() => navigate("/dashboard")}
            >
              Sign Up
            </button>

            <p className="text-center text-white mt-4 font-bold font-lato">
              Already have an account?{" "}
              <a href="/login" className="text-white font-bold font-lato">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
