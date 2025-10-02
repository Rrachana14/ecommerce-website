import React, { useState, useEffect } from "react";

const Modal = ({ message, onClose, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose();
      }, 1000); // match animation duration
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  let bgColorClass = "bg-white text-gray-800 border border-gray-300";
  if (type === "success") {
    bgColorClass = "bg-green-100 text-green-800 border border-green-400";
  } else if (type === "error") {
    bgColorClass = "bg-red-100 text-red-800 border border-red-400";
  }

  return (
    <div
      className={`fixed top-[-35%] right-[-32%] flex items-center justify-center  bg-opacity-30 z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => {
        setVisible(false);
        setTimeout(() => onClose(), 3000);
      }}
    >
      <div
        className={`${bgColorClass} flex items-center justify-between  max-w-md w-full rounded-lg shadow-lg px-4 py-4 relative transform transition-transform duration-300 h-6 ${
          visible ? "scale-100" : "scale-90"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="absokute -left-3text-center text-lg font-semibold h-fit ">{message}</p>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(() => onClose(), 1000);
          }}
          aria-label="Close modal"
          className=" text-gray-500 hover:text-gray-700 focus:outline-none absolute right-[-90%] "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        
      </div>
    </div>
  );
};

export default Modal;
