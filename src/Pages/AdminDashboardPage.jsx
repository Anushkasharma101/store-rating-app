import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LoginSignupBtn from "../components/LoginSignupBtn";
import { BiPlus } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import Footer from "../components/Footer";
import { FaEnvelope, FaEye, FaEyeSlash, FaMapMarkerAlt } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";

const AdminDashboardPage = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const totalUsers = 100;
  const listedStores = 400;
  const totalReviewers = 40;

  // Dummy store list
  const stores = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: "Store Name",
    address:
      "123 Market Lane, Sector 5, Andheri East, Mumbai, Maharashtra 400069, India",
    ratingCount: Math.floor(Math.random() * 500) + 10,
  }));

  const allUsers = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    address: `123 Street ${i + 1}, Mumbai, India`,
    role: ["Admin", "User", "Owner"][i % 3],
    rating: Math.floor(Math.random() * 5) + 1,
  }));

  const [visibleUsers, setVisibleUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 15;

  useEffect(() => {
    loadMoreUsers();
    // eslint-disable-next-line
  }, []);

  const loadMoreUsers = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const nextUsers = allUsers.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
      );
      setVisibleUsers((prev) => [...prev, ...nextUsers]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        loadMoreUsers();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading]);

  // Open Add User Popup
  const openUserModal = () => {
    setIsUserModalOpen(true);
    setIsStoreModalOpen(false);
    setShowModal(false);
  };

  // Open Add Store Popup
  const openStoreModal = () => {
    setIsStoreModalOpen(true);
    setIsUserModalOpen(false);
    setShowModal(false);
  };

  // Close any modal
  const closeModal = () => {
    setIsUserModalOpen(false);
    setIsStoreModalOpen(false);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#D9D9D9]">
      {/* Header */}
      <div className="w-full h-[12%] flex justify-between items-center bg-[#D9D9D9]">
        <div className="text-4xl text-[#A4957B] font-LaBelleAurore font-normal ml-5">
          Trendora
        </div>
        <div className="w-[40%] h-full p-3">
          <Navbar />
        </div>
        <div className="w-[12%] h-[70%] flex justify-center items-center mr-3">
          <LoginSignupBtn text="LogIn/SignUp" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-5xl font-extrabold text-center mb-8 font-lato text-[#474747] mt-8">
          Dashboard
        </h1>
        <div className="flex justify-center gap-6 mb-10">
          <div className="border border-[#474747] rounded-md p-6 w-44 flex justify-center items-center flex-col">
            <p className="text-5xl font-bold font-lato">{totalUsers}</p>
            <p className="text-[#474747] font-lato font-bold mt-2">
              User Count
            </p>
          </div>
          <div className="border border-[#474747] rounded-md p-6 w-44 flex justify-center items-center flex-col">
            <p className="text-5xl font-bold font-lato">{listedStores}</p>
            <p className="text-[#474747] font-lato font-bold mt-2">
              Listed Stores
            </p>
          </div>
          <div className="border border-[#474747] rounded-md p-6 w-44 flex justify-center items-center flex-col">
            <p className="text-5xl font-bold font-lato">{totalReviewers}</p>
            <p className="text-[#474747] font-lato font-bold mt-2">
              Total Reviewers
            </p>
          </div>
          <div
            className="border border-[#474747] rounded-md p-6 w-44 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <BiPlus className="text-4xl text-gray-700 mb-2" />
            <p className="text-[#474747] font-lato font-bold mt-2">
              Add User/Store
            </p>
          </div>
        </div>

        {/* List of Stores */}
        <h2 className="text-lg font-bold font-lato mb-4 pl-8">
          List of Stores
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-8 bg-[#D9D9D9]">
          {stores.map((store) => (
            <div
              key={store.id}
              className="border border-[#47474780] rounded-lg p-4 flex flex-col"
            >
              <div className="flex justify-between items-center w-full h-[35%]">
                <h3 className="font-bold font-lato text-2xl h-full">
                  {store.name}
                </h3>
                <div className="flex w-[10%] h-full items-center gap-1">
                  <img
                    src="/assets/fillstar.svg"
                    alt="star"
                    className="w-5 h-5"
                  />
                  <span className="text-sm text-yellow-600">
                    {store.ratingCount}
                  </span>
                </div>
              </div>
              <p className="text-sm text-black mt-2 font-lato font-normal ">
                {store.address}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="w-full h-[8%] flex justify-center gap-3 mt-7">
          <div className="flex justify-center items-center w-[4%] h-[100%] rounded-full bg-[#474747] p-5">
            <img src="/assets/leftarrow.png" alt="leftarrow" />
          </div>
          <div className="flex justify-center items-center w-[4%] h-[100%] rounded-full bg-[#474747] p-5 ">
            <img src="/assets/rightarrow.png" alt="rightarrow" />
          </div>
        </div>

        {/* Reviewers Section */}
        <div className="w-full bg-[#D9D9D9] p-4">
        <div className="w-full h-[6%] flex justify-between mb-5">
          <div className="text-xl font-bold font-lato text-black ml-5 w-[15%]">
            List of Reviewers
          </div>
          <div className="w-[10%] h-full flex gap-2 justify-end">
            <img src="/assets/filter.svg" alt="filter"/>
            <span className='font-lato font-bold text-black mr-6'>Filter</span>
          </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pl-6 pr-6">
            {visibleUsers.map((user) => (
              <div
                key={user.id}
                className="border rounded-lg border-[#47474780] p-4 flex flex-col"
              >
                <div className="w-full h-[20%] flex gap-2 p-1 items-center">
                  <img src="/assets/profile.svg" alt="profile" />
                  <h3 className="font-bold text-lg">{user.name}</h3>
                </div>
                <div className="text-sm text-black w-full h-[20%] flex gap-2 items-center p-1">
                  <img src="/assets/email.svg" alt="email" />
                  {user.email}
                </div>
                <div className="text-sm text-black w-full h-[20%] flex items-center p-1 gap-2">
                  <img src="/assets/address.svg" alt="address" />
                  {user.address}
                </div>
                <p className="text-sm font-normal mt-1 w-full h-[20%] flex items-center p-1 gap-2">
                  <img src="/assets/role.svg" alt="role" />
                  {user.role}
                </p>

                <div className="flex mt-2 gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img
                      key={star}
                      src={
                        star <= user.rating
                          ? "/assets/fillstar.svg"
                          : "/assets/emptystar.svg"
                      }
                      alt="star"
                      className="h-5 w-5"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {loading && (
            <div className="flex justify-center my-6">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Popup for User/Store Selection */}
      {showModal && !isUserModalOpen && !isStoreModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#A4957BE5] p-6 rounded-lg w-[400px] h-[40%] shadow-lg relative flex flex-col">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              <RxCross2 className="w-6 h-6 text-black" />
            </button>
            <div
              onClick={openUserModal}
              className="flex justify-between items-center bg-[#D9D9D9] mt-5 h-[40%] rounded-md p-10 font-lato font-bold text-lg cursor-pointer hover:bg-gray-300"
            >
              <img
                src="/assets/profile.svg"
                alt="profile"
                className="w-6 h-6"
              />
              Add User
              <span>+</span>
            </div>
            <div
              onClick={openStoreModal}
              className="flex justify-between items-center bg-[#D9D9D9] mt-5 h-[40%] rounded-md p-10 font-lato font-bold text-lg cursor-pointer hover:bg-gray-300"
            >
              <img src="/assets/store.svg" alt="store" className="w-6 h-6" />
              Add Store
              <span>+</span>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Add User Form Popup */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#A4957BE5] p-16 rounded-lg w-[500px] shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <RxCross2 className="w-6 h-6 text-black" />
            </button>
            <h2 className="text-4xl font-lato text-[#2D2C2C] font-bold mb-4 flex justify-center">
              Sign Up
            </h2>
            <form className="flex flex-col gap-3">
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
                <select className="w-full px-4 py-2 border border-[#474747] rounded-lg bg-transparent font-lato font-normal text-black placeholder:text-[#2D2C2C] cursor-pointer">
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
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Add Store Form Popup */}
      {isStoreModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#A4957BE5] p-6 rounded-lg w-[400px] shadow-lg relative flex justify-center flex-col">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <RxCross2 className="w-6 h-6 text-black" />
            </button>
            <h2 className="text-5xl text-[#2D2C2C] mb-4 font-lato font-bold text-center">
              Add Store
            </h2>
            <form className="flex flex-col gap-4">
              {/* Store Name */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Store Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your Store Name"
                    className="border border-[#474747] p-3 pr-10 rounded-md w-full bg-transparent placeholder:text-[#2D2C2C] font-lato font-normal"
                  />
                  <img
                    src="/assets/profile.svg"
                    alt="store-icon"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Your Email</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="border border-[#474747] p-3 pr-10 rounded-md w-full bg-transparent placeholder:text-[#2D2C2C] font-lato font-normal"
                  />
                  <img
                    src="/assets/email.svg"
                    alt="email-icon"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Address</label>
                <div className="relative">
                  <textarea
                    maxLength={100}
                    placeholder="Your address"
                    className="border border-[#474747] p-3 pr-10 rounded-md w-full bg-transparent placeholder:text-[#2D2C2C] font-lato font-normal"
                    rows={3}
                  />
                  <img
                    src="/assets/address.svg"
                    alt="location-icon"
                    className="absolute right-3 top-3 w-5 h-5"
                  />
                </div>
              </div>

              <button className="bg-[#2D2C2C] text-white py-2 rounded border border-[#303030] font-lato font-bold mt-3">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Footer */}
      <div className="w-full bg-green-300 mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
