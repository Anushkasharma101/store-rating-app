import React,{useState,useRef,useEffect} from 'react';
import Footer from '../components/Footer';

const OwnerDashboardPage = () => {
  const averageRating = 3.9;
  const totalReviewers = 40;

  // Dummy reviewers list
  const allReviewers = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i+1}`,
    rating: Math.floor(Math.random() * 5) + 1, 
  }));

  const [reviewers, setReviewers] = useState(allReviewers.slice(0, 20));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  // Load more reviewers
  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const start = nextPage * 20;
      const newData = allReviewers.slice(start, start + 20);
      if (newData.length > 0) {
        setReviewers((prev) => [...prev, ...newData]);
        setPage(nextPage);
      }
      setLoading(false);
    }, 1000); // Simulating network delay
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef.current, page]);
  return (
    <div className="w-full h-full bg-[#D9D9D9]">
      {/* Dashboard Section */}
      <div className="w-full h-auto bg-[#D9D9D9] py-8">
        <h1 className="text-5xl font-extrabold text-center mb-8 font-lato text-[#474747]">Dashboard</h1>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="border border-[#474747] rounded-md p-6 w-44 text-center">
            <p className="text-5xl font-bold font-lato">{averageRating}</p>
            <p className="text-[#000000] font-lato font-bold mt-2">
              Average Rating
            </p>
          </div>
          <div className="border border-[#474747] rounded-md p-6 w-44 text-center">
            <p className="text-5xl font-bold font-lato">{totalReviewers}</p>
            <p className="text-[#000000] font-lato font-bold mt-2">
              Total Reviewers
            </p>
          </div>
        </div>

        {/* Reviewers */}
        <h2 className="text-lg font-bold font-lato mb-4 pl-10 pr-10">
          List of Reviewers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-9">
          {reviewers.map((reviewer) => (
            <div
              key={reviewer.id}
              className="w-[85%] rounded-md p-2 flex flex-col items-center border border-[#47474780]"
            >
              <p className="font-bold font-lato mb-2">{reviewer.name}</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    alt="star"
                    src={
                      star <= reviewer.rating
                        ? "/assets/fillstar.svg" 
                        : "/assets/emptystar.svg"
                    }
                    className="h-5 w-5"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

          <div ref={loaderRef} className="flex justify-center py-6">
          {loading && (
            <div className="w-10 h-10 border-4 border-gray-300 border-t-[#474747] rounded-full animate-spin"></div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full h-[30%] bg-green-300">
        <Footer />
      </div>
    </div>
  );
};

export default OwnerDashboardPage;
