import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import WineCards from "./components/WineCards";
import FilterSidebar from "./components/FilterSidebar";
import ReactPaginate from "react-paginate";
import Thanks from "./Thanks";

export default function App() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [wines, setWines] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // Load wines
  useEffect(() => {
    fetch(`/api/wines?page=${currentPage}&filterType=${filterType}`)
      .then((res) => res.json())
      .then((data) => {
        setWines(data?.items || []);
        setPageCount(data.pagination.numberOfPages);
      })
      .catch((err) => console.error("Error fetching wines:", err));
  }, [filterType, currentPage]);

  // Cart operations
  const increment = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (id) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      const updated = { ...prev };
      updated[id] = Math.max(0, updated[id] - 1);
      return updated;
    });
  };

  // ✅ Fixed addToCart to accept quantity
  const addToCart = (wine, quantity = 1) => {
    setCart((prev) => ({ ...prev, [wine.id]: (prev[wine.id] || 0) + quantity }));
  };

  // Favorites operations
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <div className="font-sans text-gray-900">
      
      <Header wines={wines} cart={cart} />
      <Routes>
        {/* Main Shop Route */}
        <Route path="/" element={
          <>
           
            

            {/* Hero Section */}
            <div
              className="h-40 sm:h-48 md:h-56 lg:h-64 bg-cover bg-center w-full"
              style={{
                backgroundImage: "url('/images/red-wine-banner.png')",
              }}
            />

            {/* Shop Section */}
            <div className="px-6 py-6">
              {/* Filter Sidebar */}
              <FilterSidebar
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onTypeSelect={(e) => { setFilterType(e); setCurrentPage(0) }}
                selectedType={filterType}
              />

              {/* Wine Cards */}
              <WineCards
                wines={wines}
                cart={cart}
                increment={increment}
                decrement={decrement}
                addToCart={addToCart} // ✅ uses new addToCart
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />

              {/* Pagination */}
              {wines.length > 0 ? (
                <ReactPaginate
                  previousLabel={"←"}
                  nextLabel={"→"}
                  pageCount={pageCount}
                  onPageChange={({ selected }) => setCurrentPage(selected)}
                  containerClassName={"flex justify-center gap-2 mt-8"}
                  pageClassName={"px-3 py-1 border rounded"}
                  activeClassName={"bg-maroon text-white"}
                  previousClassName={"px-3 py-1 border rounded"}
                  nextClassName={"px-3 py-1 border rounded"}
                  disabledClassName={"opacity-50 cursor-not-allowed"}
                />
              ) : (
                'no results'
              )}
            </div>
          </>
        } />

        {/* Thank You Route */}
        <Route path="/thank-you" element={<Thanks />} />
      </Routes>
    </div>
  );
}