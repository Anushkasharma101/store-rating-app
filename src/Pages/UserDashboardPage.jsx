import React, { useState } from 'react';
import Footer from '../components/Footer';

const UserDashboardPage = () => {
  const initialStores = Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    name: `Store Name`,
    address: `123 Market Lane, Sector 5, Andheri East, Mumbai, Maharashtra 400069, India`,
    totalStars: 0,
    ratingCount: 0, 
    userRating: 0, 
  }));

  const [storeData, setStoreData] = useState(initialStores);
  const itemsPerPage = 18;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(storeData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStores = storeData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleRating = (storeId, starValue) => {
  setStoreData((prevStores) =>
    prevStores.map((store) => {
      if (store.id === storeId) {
        const oldRating = store.userRating;
        let updatedTotalStars = store.totalStars;
        let updatedUsers = store.ratingUsers;

        if (oldRating === 0) {
          // New rating
          updatedUsers += 1;
          updatedTotalStars += starValue;
        } else {
          // Update rating: adjust the difference
          updatedTotalStars = updatedTotalStars - oldRating + starValue;
        }

        return {
          ...store,
          userRating: starValue,
          totalStars: updatedTotalStars,
          ratingUsers: updatedUsers,
        };
      }
      return store;
    })
  );
};


  return (
    <div className="w-full bg-[#D9D9D9] overflow-x-hidden">
      <div className="w-full h-[20%] flex justify-center flex-col items-center">
        <p className="text-5xl font-bold text-[#474747]">Stores</p>
        <p className="font-lato font-normal text-black mt-3">
          Make smarter shopping choices with verified store ratings.
        </p>
      </div>

      {/* Grid */}
      <div className="p-6 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentStores.map((store) => (
            <div
              key={store.id}
              className="border rounded-lg shadow p-4 border-[#47474780] flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <h2 className="font-bold text-lg">{store.name}</h2>
                <span className="text-sm text-gray-500">⭐ {store.ratingUsers > 0 ? (store.totalStars / store.ratingUsers).toFixed(1) : "No ratings yet"}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{store.address}</p>

              {/* Interactive Stars */}
              <div className="flex mt-3 justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    size={24}
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

        
        <div className="flex justify-between items-center mt-6 ">
        
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
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
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
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
