import React from "react";
import { useNavigate } from "react-router-dom";


const LoginSignupBtn = ({ text,type = "button" }) => {
  const navigate = useNavigate();
  return (
    <button
      type={type}
      onClick={() => navigate("/login")}
      className="px-10 py-4 bg-[#474747] text-white rounded-full font-bold font-lato w-full h-full flex items-center justify-center"
    >
      {text}
    </button>
  );
};

export default LoginSignupBtn;
