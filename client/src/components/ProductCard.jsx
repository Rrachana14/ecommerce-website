import React, { useState } from "react";
import useWishlist from "../hook/useWishlist";
import WishlistButton from "../components/WishlistButton";

const ProductCard = ({ product, onClick }) => {
  if (!product) return null;

  console.log("in the productCard ", product);

  console.log("in the productCard brand ", product.brand);
  const { isFavorite, toggleWishlist, loading, showPopup } = useWishlist(
    product._id
  );
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className=" bg-white w-[250px] h-[400px] border-2 shadow-lg overflow-hidden rounded-md">
      <div className="w-full h-[60%] overflow-hidden">
        <img
          onClick={onClick}
          key={product._id}
          className="w-full h-full object-cover transform hover:scale-125 transition-transform duration-300"
          src={product.images[0]}
          alt="Product"
        />
      </div>
      <div className="flex py-3 px-4  w-full h-[30%] ">
        <h4 className="w-[60%]  h-[96%] mr-5  text-gray-800 text-wrap  text-sm truncate ">
          {product.description}
        </h4>
        <div className="w-[40%]">
          <div className="flex h-fit">
            {Array(5)
              .fill()
              .map((__, index) => (
                <div key={index} className="w-10 cursor-pointer">
                  <i
                    className={`${
                      index < product.rating
                        ? "ri-heart-fill text-red-500" 
                        : "ri-heart-line text-gray-400"
                    }`}
                  ></i>
                </div>
              ))}
          </div>
          <h3 className="font-semibold text-2xl my-4">{product.price}</h3>
        </div>
      </div>
      <div className="flex  w-full h-[10%] mx-auto border-slate-200 border-t-2">
        
        <WishlistButton
          productId={product._id}
          className="border-slate-200 border-r-2 py-2 w-fit h-fit px-[22%] cursor-pointer"
          iconClass="text-2xl text-red-500"
        />

        <div
          onClick={(e) => {
            e.stopPropagation(e);
            addToCart();
          }}
          disabled={loading}
          className="py-2 w-fit h-fit px-[22%] hover:bg-green-400 cursor-pointer "
        >
          <i class="ri-shopping-cart-fill"></i>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
