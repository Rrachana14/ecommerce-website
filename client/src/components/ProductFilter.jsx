import React from "react";

const ProductFilter = ({ setFilters }) => {
  const handleSizeChange = (e) => {
    setFilters((prev) => ({ ...prev, size: e.target.value }));
  };

  const handleColorChange = (e) => {
    setFilters((prev) => ({ ...prev, color: e.target.value }));
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    let range = null;

    if (value === "low") range = [0, 500];
    else if (value === "mid") range = [500, 1500];
    else if (value === "high") range = [1500, 5000];

    setFilters((prev) => ({ ...prev, priceRange: range }));
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Size</label>
        <select onChange={handleSizeChange} className="w-full p-2 border rounded">
          <option value="">All</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Color</label>
        <select onChange={handleColorChange} className="w-full p-2 border rounded">
          <option value="">All</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="blue">Blue</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Price</label>
        <select onChange={handlePriceChange} className="w-full p-2 border rounded">
          <option value="">All</option>
          <option value="low">₹0 - ₹500</option>
          <option value="mid">₹500 - ₹1500</option>
          <option value="high">₹1500 - ₹5000</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
