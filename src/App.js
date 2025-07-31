import "./App.css";
import DashboardPage from "./Pages/DashboardPage";
import AboutPage from "./Pages/AboutPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import UserDashboardPage from "./Pages/UserDashboardPage";
import AdminDashboardPage from "./Pages/AdminDashboardPage";
import OwnerDashboardPage from "./Pages/OwnerDashboardPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";

function App() {
  const userRole = "User"; 

  return (
    <div className="w-screen h-screen">
   
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/stores" element={<UserDashboardPage />} />
            <Route path="/ownerdashboard" element={<OwnerDashboardPage/>}/>
            <Route path="/admindashboard" element={<AdminDashboardPage/>}/>

          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgotpassword" element={<ForgetPasswordPage/>}/>
          </Route>
        </Routes>
      </Router>

       <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="custom-toast"
      />
    </div>
  );
}

export default App;
