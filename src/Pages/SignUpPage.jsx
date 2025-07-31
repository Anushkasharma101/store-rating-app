import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaMapMarkerAlt } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const SignUpPage = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const maxLength = 400;
  const isExceeded = address.length > maxLength;

  const addressHandleChange = (e) => {
    setAddress(e.target.value);
  };
  const validatePassword = (value) => {
    // Regex: 8-16 chars, at least 1 uppercase, 1 special character
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    return passwordRegex.test(value);
  };

  const passwordHandleChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value) && value !== "") {
      setPasswordError(
        "Password must be 8-16 characters, include 1 uppercase letter and 1 special character."
      );
    } else {
      setPasswordError("");
    }
  };
  const validateEmail = (value) => {
    // Standard email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const emailHandleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value) && value !== "") {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);

    // Validation: min 20, max 60 chars
    if (value.length < 20) {
      setNameError("Name must be at least 20 characters long.");
    } else if (value.length > 60) {
      setNameError("Name must not exceed 60 characters.");
    } else {
      setNameError("");
    }
  };

  // ✅ Custom function using fetch
  const signUp = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      role === "Choose Your Role" ||
      address === "" ||
      password === ""
    ) {
      alert("Fill all the details");
      return;
    }
    console.log("dataaaaaaa", name, email, password, role, address);

    try {
      const response = await fetch(
        "https://backendlearning-9mmn.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            address: address,
            role: role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Registration failed");
      }
      localStorage.setItem("role", role);
      console.log("✅ Registered:", data);
      toast.success("User Registered Successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error during registration");
      console.error("❌ Error during registration:", error);

      // Optionally print network details
      if (error instanceof Error) {
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);
      }

      alert("An error occurred. Check console for details.");
    }
  };

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
        <img src="/assets/model.png" alt="model" className=" h-full" />
      </div>

      <div className="flex w-full md:w-1/2 h-full items-center justify-center p-8 absolute right-10">
        <div className="w-full max-w-md rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center font-lato text-[#2D2C2C]">
            Sign Up
          </h2>
          <form className="space-y-4" onSubmit={signUp}>
            <div className="relative">
              <label className="block mb-2 font-bold font-lato text-[#2D2C2C]">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={handleChange}
                placeholder="Your Name"
                className={`w-full px-4 py-2 border rounded-lg font-lato font-normal text-[#2D2C2C] bg-transparent placeholder:text-[#2D2C2C] focus:placeholder:text-[#515151] 
        ${nameError ? "border-red-500" : "border-[#474747]"}`}
              />
              {nameError && (
                <p className="text-red-500 mt-1 text-sm">{nameError}</p>
              )}
              <FaUserLarge className="absolute right-3 top-11" />
            </div>

            <div>
              <label className="block mb-2 font-lato font-bold">
                Your Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={emailHandleChange}
                  placeholder="example@gmail.com"
                  className={`w-full px-4 py-2 border rounded-lg font-lato font-normal text-[#2D2C2C] bg-transparent placeholder:text-[#2D2C2C] focus:placeholder:text-[#515151]
                ${emailError ? "border-red-500" : "border-[#474747]"}`}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
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
                  value={password}
                  onChange={passwordHandleChange}
                  placeholder="••••••"
                  className={`w-full px-4 py-2 rounded-lg bg-transparent font-lato font-normal text-[#2D2C2C] placeholder:text-[#2D2C2C] focus:placeholder:text-[#515151]
            ${
              passwordError
                ? "border-red-500 border-2"
                : "border border-[#474747]"
            }`}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
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
              <div className="relative w-full">
                <select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  className="appearance-none cursor-pointer w-full px-4 py-2 border border-[#474747] rounded-lg bg-transparent font-lato font-normal text-[#2D2C2C] placeholder:text-[#2D2C2C]"
                >
                  <option
                    value={"Choose Your Role"}
                    className="font-lato bg-[#2D2C2C] text-white selection:bg-white selection:text-[#2D2C2C]"
                  >
                    Choose Your Role
                  </option>
                  <option
                    value={"User"}
                    className="font-lato bg-[#2D2C2C] text-white selection:bg-white selection:text-[#2D2C2C]"
                  >
                    User
                  </option>
                  <option
                    value={"Store Owner"}
                    className="font-lato bg-[#2D2C2C] text-white selection:bg-white selection:text-[#2D2C2C]"
                  >
                    Store Owner
                  </option>
                  <option
                    value={"System Administrator"}
                    className="font-lato bg-[#2D2C2C] text-white selection:bg-white selection:text-[#2D2C2C]"
                  >
                    System Administrator
                  </option>
                </select>

                {/* Custom down arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center pr-2">
                  <svg
                    className="w-4 h-4 text-[#2D2C2C]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-bold font-lato bg-transparent text-[#2D2C2C] placeholder:text-[#2D2C2C]">
                Address
              </label>
              <div className="relative">
                <textarea
                  placeholder="Your Address"
                  value={address}
                  onChange={addressHandleChange}
                  maxLength={maxLength}
                  className={`w-full px-4 py-2 border resize-none rounded-lg font-lato font-bold bg-transparent text-[#2D2C2C] placeholder:text-[#2D2C2C] focus:placeholder:text-[#515151]
          ${isExceeded ? "border-red-500 border-2" : "border-[#474747]"}`}
                />
                {/* Character count */}
                <span
                  className={`absolute bottom-2 right-3 text-sm ${
                    isExceeded ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {address.length}/{maxLength}
                </span>
                <FaMapMarkerAlt className="absolute right-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2D2C2C] text-white py-3 rounded-lg border border-[#2D2C2C]"
            >
              Sign Up
            </button>

            <p className="text-center text-white mt-4 font-bold font-lato">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#2D2C2C] hover:underline font-bold font-lato cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
