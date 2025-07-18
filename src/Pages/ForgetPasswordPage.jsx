import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 1: Verify email (simulate sending OTP)
  const handleVerifyEmail = () => {
    if (!email) {
      alert("Please enter an email");
      return;
    }
    setShowOtp(true);
    alert("OTP sent to your email!");
    // In real case: API call to send OTP
  };

  // Step 2: Check OTP (simulate backend validation)
  const handleCheckOtp = () => {
    if (otp === "1234") {
      setOtpVerified(true);
      setOtpError(false);
    } else {
      setOtpError(true);
    }
  };

  // Step 3: Handle password reset
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Password changed successfully!");
    // API call: send newPassword to backend
  };

  return (
    <div className="relative flex w-full h-screen bg-[#D9D9D9] items-end">
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

      <div className="absolute left-40 bottom-0 w-[40%] h-[100%] flex justify-center">
        <img src="/assets/model.png" alt="model" className="w-full h-full object-contain" />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center p-8 absolute right-10 h-full">
        <div className="w-full max-w-md rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center font-lato text-black" >
            Forget Password
          </h2>

          <form className="space-y-4" onSubmit={handlePasswordChange}>
            {/* Step 1: Email Verification */}
            <div className="relative">
              <label className="block mb-2 font-bold font-lato text-black">Your Email</label>
              <input
                type="text"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-[#474747] bg-transparent rounded-lg font-lato font-normal text-black placeholder:text-[#2D2C2C]"
              />
              <div
                className="absolute right-3 top-10 cursor-pointer text-[#2D2C2C] font-lato font-normal"
                onClick={handleVerifyEmail}
              >
                Verify
              </div>
            </div>

            {/* Step 2: OTP Verification */}
            {showOtp && !otpVerified && (
              <div>
                <label className="block mb-2 font-lato font-bold">OTP</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg bg-transparent font-lato font-normal text-black placeholder:text-[#2D2C2C] ${
                      otpError ? "border-red-500" : "border-[#474747]"
                    }`}
                  />
                  <div
                    className="absolute right-3 top-2 cursor-pointer text-blue-600 font-bold"
                    onClick={handleCheckOtp}
                  >
                    Check
                  </div>
                </div>
                <div className="w-full h-[10%] flex justify-end font-lato font-normal mt-1 cursor-pointer">
                  Resend OTP
                </div>
              </div>
            )}

            {/* Green Tick After OTP Verified */}
            {otpVerified && (
              <div className="flex items-center gap-2 text-green-600 font-bold">
                ✅ OTP Verified Successfully
              </div>
            )}

            {/* Step 3: Show password fields only after OTP verified */}
            {otpVerified && (
              <>
                <div>
                  <label className="block mb-2 font-bold font-lato">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                  <label className="block mb-2 font-bold font-lato">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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

                <button
                  type="submit"
                  className="w-full bg-[#303030] text-white py-3 rounded-lg border border-[#303030] font-lato font-bold"
                >
                  Change Password
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
