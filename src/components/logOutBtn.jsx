import React from "react";

const LogOutBtn = ({ text, type = "button",onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className=" bg-[#474747] text-white rounded-full font-bold font-lato w-full h-full flex items-center justify-between pl-1 pr-2"
    >
    <div className="w-8 h-8 bg-[#D9D9D9] rounded-full" />
      {text}
    </button>
  );
};

export default LogOutBtn;
