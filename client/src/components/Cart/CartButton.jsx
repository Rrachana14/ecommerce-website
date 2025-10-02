import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import LoginRequiredPopup from "../LoginRequiredPopup";
import Modal from "../Modal";
import { Monitor } from "lucide-react";


const CartButton = ({ productId, quantity, selectedSize,stock }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [showModal,setShowModal] = useState(false);
  const [modalMessage,setModalMessage] = useState();
  const [modalType, setModalType] = useState("");

  const {
    addToCart,
    loading,
    showPopup,
    setShowPopup,
    isInCart,
  } = useCart();

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  const handleAddToCart = async () => {
    if(quantity <= stock){
      const success = await addToCart(productId, quantity, selectedSize);
      if(success) {
        setShowModal(true);
        setModalMessage("Items successfully Added Into Cart");
        setModalType("success")
        console.log(success)
      }
    }
    else{
      setShowModal(true);
        setModalMessage("Out of Stock");
      setModalType("error")
    }
  };

  return (
    <div>
      {showModal && (
        <Modal message={modalMessage} onClose={closeModal} type={modalType} />
      )}      
      <button
        onClick={handleAddToCart}
        className="bg-purple-600 border-1 border-purple-600 font-semibold h-fit text-white p-3  rounded-md hover:shadow-xl hover:bg-purple-950 hover:text-purple-600 transition duration-200"
      >
        Add to Cart
      </button>
      <LoginRequiredPopup show={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default CartButton;
