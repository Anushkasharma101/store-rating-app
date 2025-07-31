import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { useLocation } from "react-router-dom";

const UserDashboardPage = () => {
  const [storeData, setStoreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("search") || "";

  const itemsPerPage = 18;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch stores from API
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const url = searchParam
          ? `https://backendlearning-9mmn.onrender.com/api/stores/search?name=${searchParam}&address=${searchParam}`
          : "https://backendlearning-9mmn.onrender.com/api/stores";

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });

        if (!response.ok) throw new Error("Failed to fetch stores");

        const data = await response.json();
        const transformedStores = data.map((store) => ({
          id: store.id,
          name: store.name,
          address: store.address,
          avgRating: Number(store.avg_rating),
          userRating: Number(store.user_rating) || 0,
        }));

        setStoreData(transformedStores);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [searchParam]);

  const totalPages = Math.ceil(storeData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStores = storeData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handleRating = async (storeId, starValue) => {
  try {
    const token = localStorage.getItem("token");
    const store = storeData.find((s) => s.id === storeId);

    // Change endpoint based on whether user has already rated the store
    const isUpdate = store.userRating > 0;
    const url = isUpdate
      ? "https://backendlearning-9mmn.onrender.com/api/ratings/update"
      : "https://backendlearning-9mmn.onrender.com/api/ratings";

    const response = await fetch(url, {
      method: "POST", // Always POST
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ store_id: storeId, rating: starValue }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Submit rating failed:", errorData);
      return;
    }

    // Update UI
    setStoreData((prevStores) =>
      prevStores.map((s) =>
        s.id === storeId ? { ...s, userRating: starValue } : s
      )
    );
  } catch (err) {
    console.error("Rating API error:", err);
  }
};


  if (loading) return <div className="text-center p-10">Loading stores...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full bg-[#D9D9D9] overflow-x-hidden">
      <div className="w-full h-[20%] flex justify-center flex-col items-center">
        <p className="text-5xl font-bold text-[#474747]">Stores</p>
        <p className="font-lato font-normal text-black mt-3">
          Make smarter shopping choices with verified store ratings.
        </p>
      </div>

      {/* Grid */}
      <div className="p-6 mt-4 h-[100vh] flex flex-col justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentStores.map((store) => (
            <div
              key={store.id}
              className="border rounded-lg shadow p-4 border-[#47474780] flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <h2 className="font-bold text-lg">{store.name}</h2>
                <span className="text-sm text-gray-500">
                  ⭐ {store.avgRating > 0 ? Number(store.avgRating).toFixed(1) : "No ratings yet"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{store.address}</p>

              {/* Interactive Stars */}
              <div className="flex mt-3 justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    alt='star'
                    src={star <= store.userRating ? '/assets/fillstar.svg' : '/assets/emptystar.svg'}
                    className='h-6 w-6 cursor-pointer'
                    onClick={() => handleRating(store.id, star)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 h-[10%]">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1
              ? 'bg-gray-300 text-gray-600'
              : 'bg-gray-700 text-white hover:bg-gray-900'
              }`}
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages
              ? 'bg-gray-300 text-gray-600'
              : 'bg-gray-700 text-white hover:bg-gray-900'
              }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full h-[30%] bg-green-300">
        <Footer />
      </div>
    </div>
  );
};

export default UserDashboardPage;
