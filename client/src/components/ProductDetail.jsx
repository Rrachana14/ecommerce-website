import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import "remixicon/fonts/remixicon.css";
import { useAuth } from "../context/AuthContext";
import WishlistButton from "./WishlistButton";
import CartButton from "./Cart/CartButton";
import LoginRequiredPopup from "./LoginRequiredPopup";
import Modal from "./Modal";

const ProductDetail = ({ productId }) => {
  const [image, setImage] = useState("");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColors, setSelectedColors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
 
  const { auth, login, logout } = useAuth();

  const openImage = (img) => {
    setSelectedImage(img);
  };

  const closeImgModal = () => {
    setSelectedImage(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };
console.log("product id",productId)
  useEffect(() => {
    const showProductDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/products/productDetailPage/${productId}`
        );
        const fetchedProduct = response.data.product;

        const validImages = fetchedProduct.images.filter(
          (img) =>
            img && (img.startsWith("http") || img.startsWith("data:image"))
        );

        setProduct({ ...fetchedProduct, images: validImages });
        
        // console.log(product);
        // console.log(product._id )
        if (validImages.length > 0) {
          setImage(validImages[0]);
        }
      } catch (err) {
        console.error("Error fetching the product details:", err.message);
      }
    };

    if (productId) {
      showProductDetails();
    }
  }, [productId]);

  const changeImg = (src) => {
    setImage(src);
  };

  const handleBuyNow = () => {};

  return (
    <div className="w-full">
      {showModal && (
        <Modal message={modalMessage} onClose={closeModal} type={modalType} />
      )}
      <div className="flex flex-col lg:flex-row w-full min-h-[35vh]">
        <div className="relative w-full lg:w-[40%] flex flex-col items-center">
          {image && (
            <img
              src={image}
              alt="Main Image"
              className="w-[90%] lg:w-[80%] h-[80%] mt-4 object-cover rounded-lg shadow-lg mb-4"
            />
          )}

          <div className="flex lg:flex-col lg:absolute top-16 left-3 space-x-2 lg:space-x-0 lg:space-y-2 overflow-auto  px-2">
            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover cursor-pointer rounded-full shadow-md border-2 border-transparent transition-all duration-200 ${
                  img === image
                    ? "border-black w-24 h-24"
                    : "hover:border-purple-500"
                }`}
                onClick={() => changeImg(img)}
              />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[60%] p-6 overflow-y-auto relative">
          <h2 className="text-2xl md:text-3xl font-ubuntu font-bold capitalize">
            {product?.name || "Product Name"}
          </h2>

          <WishlistButton
            productId={productId}
            className="absolute right-10 top-3 w-fit h-fit bg-white p-1 rounded-full shadow-md hover:bg-pink-100 px-2 py-1 z-20"
            iconClass="text-2xl"
          />

          <hr className="my-2" />

          {product?.rating && (
            <div className="text-yellow-500 mb-4">{`Rating: ${product.reviews.rating} ★`}</div>
          )}

          <div className="text-sm mb-3 text-gray-800 font-serif">
            <p>{product?.description || "No description available."}</p>
          </div>

          <div className="flex flex-wrap gap-6">
            <div>
              <h5 className="text-xl font-semibold mt-6">Price</h5>
              <h3 className="text-lg font-bold">₹ {product?.price}</h3>
            </div>

            <div className="mt-6 flex items-center">
              <strong className="text-sm text-gray-700">Quantity:</strong>
              <div className="flex items-center border border-gray-300 rounded-md ml-2">
                <button
                  className="px-4 py-2 text-gray-700 border-r font-mono"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-12 text-center p-2 border-none focus:outline-none"
                  value={quantity}
                  readOnly
                />
                <button
                  className="px-4 py-2 text-gray-700 border-l"
                  onClick={() =>

                     {
                        if (quantity < (product?.stock || 0)) {
                          setQuantity(quantity + 1);
                        } else {
                          alert("You cannot add more than available stock!");
                        }
                      }
                  }
                  disabled={quantity >= (product?.stock || 0)} 
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <strong className="text-lg text-gray-800 font-semibold">
              Available Sizes:
            </strong>
            <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {product?.size?.map((size) => (
                <label
                  key={size}
                  className={`flex items-center justify-center text-sm shadow-sm p-2 border-2 rounded-md cursor-pointer ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-500"
                  }`}
                >
                  <input
                    type="radio"
                    name="size"
                    className="hidden"
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                  />
                  <span className="font-medium">{size}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <strong className="text-sm text-gray-700">Stock:</strong>{" "}
            {product?.stock || "Not Available"}
          </div>
          <div className="mt-6 flex flex-wrap gap-5">
          {product?.stock > 0 ? (
            <CartButton
              productId={productId}
              quantity={quantity}
              selectedSize={selectedSize}
              stock={product?.stock}
            />
          ):(            
            <CartButton
              productId={productId}
              quantity={quantity}
              selectedSize={selectedSize}
              stock={product?.stock}
              disabled 
            />
          )}

            <button
              className="border border-green-600 text-green-800 font-semibold p-3 w-full sm:w-auto rounded-md hover:bg-green-700 hover:text-white transition duration-200"
              onClick={handleBuyNow}
            >
              <i className="ri-shopping-bag-3-fill"></i> Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 p-6">
        <div className="w-full lg:w-[30%]">
          <h3 className="text-2xl font-bold mb-2">Product Details</h3>
          <hr />
          <div className="mt-4 text-sm text-gray-700 space-y-2">
            <div>
              <strong>Brand:</strong> {product?.brand || "Brand Name"}
            </div>
            <div>
              <strong>Color:</strong> {product?.color || "Not Available"}
            </div>
            <div>
              <strong>Category:</strong> {product?.category || "N/A"}
            </div>
            <div>
              <strong>Material Composition:</strong>{" "}
              {product?.materialComposition || "N/A"}
            </div>
            <div>
              <strong>Weave Type:</strong> {product?.weaveType || "N/A"}
            </div>
            <div>
              <strong>Finish Type:</strong> {product?.finishType || "N/A"}
            </div>
            <div>
              <strong>Style:</strong> {product?.style || "N/A"}
            </div>
            <div>
              <strong>Pattern:</strong> {product?.pattern || "N/A"}
            </div>
            <div>
              <strong>Care Instructions:</strong>{" "}
              {product?.careInstructions || "N/A"}
            </div>
            <div>
              <strong>Country of Origin:</strong>{" "}
              {product?.countryOfOrigin || "N/A"}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[70%]">
          <h3 className="text-2xl font-bold mb-2">Reviews</h3>
          <hr />
          <div className="overflow-auto mt-4 space-y-4">
            {product?.reviews?.length > 0 ? (
              product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-md shadow-md bg-gray-50"
                >
                  <p>
                    <strong>User:</strong> {review.user || "Anonymous"}
                  </p>
                  <p>
                    <strong>Rating:</strong> {`${review.rating} ★`}
                  </p>
                  <p>
                    <strong>Comment:</strong> {review.comment}
                  </p>
                  {review.images?.length > 0 && (
                    <div className="flex mt-2 flex-wrap gap-2">
                      {review.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Review Image ${i + 1}`}
                          className="w-16 h-16 object-cover rounded-md cursor-pointer"
                          onClick={() => openImage(img)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}

            {selectedImage && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
                <div className="relative w-[90%] max-w-md">
                  <button
                    className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1"
                    onClick={closeImgModal}
                  >
                    ✕
                  </button>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-auto rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <LoginRequiredPopup show={popUp} onClose={() => setPopUp(false)} />
    </div>
  );
};

export default ProductDetail;
