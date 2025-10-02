import React, { useState, useMemo } from "react";
import Nav from "../components/Nav";
import ProductFilter from "../components/ProductFilter";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { useNavigate, useParams } from "react-router-dom";
import useCategoryProducts from "../hook/useCategoryProducts";

const Products = () => {
  const { category } = useParams();
  const { products, error } = useCategoryProducts(category);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    size: null,
    color: null,
    priceRange: null,
  });

  const handleProductClick = (product) => {
    navigate(`/products/productDetailPage/${product._id}`);
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      let matches = true;

      if (filters.size && product.size !== filters.size) {
        matches = false;
      }
      if (filters.color && product.color !== filters.color) {
        matches = false;
      }
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (product.price < min || product.price > max) {
          matches = false;
        }
      }

      return matches;
    });
  }, [products, filters]);

  if (error) return <p>Failed to fetch products: {error.message}</p>;

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Nav />

      <div className="flex flex-col lg:flex-row w-full flex-grow">
        {/* Sidebar Filter */}
        <div className="w-full lg:w-[20%] border-r border-gray-200">
          <ProductFilter setFilters={setFilters} />
        </div>

        {/* Main Product Section */}
        <div className="w-full lg:w-[80%] px-4 md:px-8 lg:px-12 py-6">
          <div className="w-full mb-6">
            <SearchBar />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard
                  onClick={() => handleProductClick(product)}
                  key={index}
                  product={product}
                />
              ))
            ) : (
              <p>No products match your filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
