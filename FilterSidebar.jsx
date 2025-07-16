import React, { useState } from "react";

const FilterSidebar = ({
  selectedType = "",
  onTypeSelect = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const toggleSection = (key) => {
    setExpanded((prev) => (prev === key ? null : key));
  };

  const typeMap = {
    "RED WINES": "Red",
    "WHITE WINES": "White",
    "ROSÉ": "Rosé",
    "SPARKLING": "Sparkling",
  };

  return (
    <>
      {/* Filter button */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-maroon text-white rounded hover:bg-maroon-dark transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-2.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          Filter By
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          />

          {/* sidebar */}
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-xl overflow-y-auto">
            {/* header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold uppercase">Filter By</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {/* content */}
            <div className="px-6 py-4 space-y-6">
              {/* Featured Collections */}
              <div>
                <button
                  className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => toggleSection("collections")}
                >
                  <span>Featured Collections</span>
                  <span>{expanded === "collections" ? "−" : "+"}</span>
                </button>
                {expanded === "collections" && (
                  <div className="mt-2 space-y-2 text-sm text-gray-600">
                    {[
                      "Gift Sets",
                      "Last Call",
                      "Expert Picks",
                      "Rated 90+ Points",
                      "Cellar Collection",
                      "New Collection",
                    ].map((label) => (
                      <label key={label} className="flex items-center">
                        <input type="checkbox" className="form-checkbox mr-2" />
                        {label}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Wine Type */}
              <div>
                <button
                  className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => toggleSection("wineType")}
                >
                  <span>Wine Type</span>
                  <span>{expanded === "wineType" ? "−" : "+"}</span>
                </button>
                {expanded === "wineType" && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {Object.entries(typeMap).map(([label, value]) => (
                      <button
                        key={label}
                        onClick={() => {
                          onTypeSelect(value);
                          setIsOpen(false);
                        }}
                        className={`py-2 px-3 text-sm font-medium rounded hover:bg-gray-200 ${
                          selectedType === value
                            ? "bg-maroon text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        onTypeSelect("");
                        setIsOpen(false);
                      }}
                      className="col-span-2 py-2 px-3 text-sm font-medium rounded bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                      All Wines
                    </button>
                  </div>
                )}
              </div>

              {/* Varietal */}
              <div>
                <button
                  className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => toggleSection("varietal")}
                >
                  <span>Varietal</span>
                  <span>{expanded === "varietal" ? "−" : "+"}</span>
                </button>
                {expanded === "varietal" && (
                  <>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
                      {[
                        "Cabernet Sauvignon (80)",
                        "Chardonnay (50)",
                        "Merlot (80)",
                        "Riesling (40)",
                        "Pinot Noir (70)",
                        "Sauvignon Blanc (40)",
                        "Red Blend (70)",
                        "Viognier (40)",
                        "Zinfandel (70)",
                        "Prosecco (15)",
                        "Rosé (60)",
                        "Sparkling Rosé (14)",
                      ].map((label) => (
                        <label key={label} className="flex items-center">
                          <input type="checkbox" className="form-checkbox mr-2" />
                          {label}
                        </label>
                      ))}
                    </div>
                    <div className="text-center mt-2">
                      <button className="text-xs font-medium text-maroon hover:underline">
                        See More
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Price */}
              <div>
                <button
                  className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => toggleSection("price")}
                >
                  <span>Price</span>
                  <span>{expanded === "price" ? "−" : "+"}</span>
                </button>
                {expanded === "price" && (
                  <div className="mt-2 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex flex-col">
                        <label className="text-gray-500 text-xs">
                          Min Price
                        </label>
                        <input
                          type="number"
                          placeholder="$12.00"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:border-maroon focus:ring-maroon"
                        />
                      </div>
                      <span className="font-bold">TO</span>
                      <div className="flex flex-col">
                        <label className="text-gray-500 text-xs">
                          Max Price
                        </label>
                        <input
                          type="number"
                          placeholder="$275.00"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:border-maroon focus:ring-maroon"
                        />
                      </div>
                    </div>
                    <button className="w-full bg-maroon text-white py-2 rounded text-sm hover:bg-maroon-dark transition">
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Pairing */}
              <div>
                <button
                  className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => toggleSection("pairing")}
                >
                  <span>Pairing</span>
                  <span>{expanded === "pairing" ? "−" : "+"}</span>
                </button>
                {expanded === "pairing" && (
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <div className="font-medium text-gray-700 mb-1">
                        Protein
                      </div>
                      {["Beef", "Chicken", "Nuts", "Shellfish"].map((label) => (
                        <label key={label} className="flex items-center">
                          <input type="checkbox" className="form-checkbox mr-2" />
                          {label}
                        </label>
                      ))}
                    </div>
                    <div>
                      <div className="font-medium text-gray-700 mb-1">
                        Cuisine
                      </div>
                      {["Chinese", "Italian", "Japanese", "Thai"].map((label) => (
                        <label key={label} className="flex items-center">
                          <input type="checkbox" className="form-checkbox mr-2" />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
