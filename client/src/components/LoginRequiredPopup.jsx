
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const LoginRequiredPopup = ({ show, onClose }) => {
  const navigate = useNavigate();

  return (
    <Dialog
      open={show}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-[500px] text-center h-fit">
        <h2 className="text-md font-semibold">Login Required</h2>
        <p className="text-gray-600 mt-2">
          Please sign in to add items to your cart or wishlist.
        </p>
        <div className="mt-4 flex justify-center space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Login
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default LoginRequiredPopup;
