import { useState, useEffect } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    if(email === "" || password === ""){
    toast.error("Fill Email & Password fields", { position: "top-center" });
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(password)) {
    toast.error(
      "Password must be 8-16 chars, include 1 uppercase & 1 special char",
      { position: "top-center" }
    );
    return;
  }
    
    e.preventDefault();
    try {
      const res = await fetch("https://backendlearning-9mmn.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();
      if (res.ok) {
          localStorage.setItem("token", data.token); 
          localStorage.setItem('rememberMe', JSON.stringify(data.rememberMe));
          localStorage.setItem('name', data.user.name);
          localStorage.setItem('role', data.user.role);
        toast.success("Login Successful", { position: "top-center" });
      navigate("/");
      } else {
        toast.error(data.msg || "Invalid Credentials", {
        position: "top-center",
      });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again later.", {
      position: "top-center",
    });
    }
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

      <div className="absolute left-40 bottom-0 w-[40%] h-full flex justify-center">
        <img
          src="/assets/model.png"
          alt="model"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center p-8 absolute right-0 h-full">
        <div className="w-full max-w-md rounded-xl p-8 h-[80%] flex flex-col">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center font-lato text-[#2d2c2c]">
              Log In
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block mb-2 font-lato font-bold">
                  Your Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-[#474747] focus:placeholder:text-[#515151] rounded-lg bg-transparent font-lato font-normal text-[#2d2c2c] placeholder:text-[#2D2C2C]"
                  />
                  <FaEnvelope className="absolute right-3 top-3 text-[#2D2C2C]" />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-bold font-lato">
                  Your Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-[#474747] focus:placeholder:text-[#515151] rounded-lg bg-transparent font-lato font-normal text-[#2d2c2c] placeholder:text-[#2D2C2C]"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-[#2D2C2C]"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="w-full h-[10%] rounded-md flex items-center justify-between text-white font-bold">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer w-5 h-5 appearance-none border border-[#2d2c2c] cursor-pointer  rounded-md checked:bg-[#2d2c2c] checked:border-[#2d2c2c] relative"
                  />
                  <span className="text-[#2d2c2c] font-normal">Remember</span>

                  <style>
                    {`
                     input[type="checkbox"].peer:checked::after {
                     content: '✓';
                     position: absolute;
                     top: 0;
                     left: 2px;
                     color: white;
                     font-size: 14px;

                    }
              `}
                  </style>
                </div>

                <div
                  className="cursor-pointer font-lato font-normal hover:underline text-[#2D2C2C] "
                  onClick={() => navigate("/forgotpassword")}
                >
                  Forgotten?
                </div>
              </div>

              <button
                type="submit"
                onClick={handleLogin}
                className="w-full bg-[#474747] text-white py-3 rounded-lg border border-[#474747] font-lato font-bold text-sm"
              >
                Log In
              </button>
            </form>
          </div>

          <p className="text-center text-[#000000] mt-6  font-normal font-lato">
            Don't have an account?
          </p>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-transparent text-[#2D2C2C] py-3 rounded-lg border border-[#303030] hover:bg-[#474747] hover:text-white font-lato font-bold text-sm"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
