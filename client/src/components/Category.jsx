import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    imageSrc: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTTSL1KXof5CwtYKshmWt9JgrECcZ_VLrE6FuUHzxCWmgsk_N1bCUbkPkI0HCjCGmM175NUrqDhn1A2mjPk88VFpPo4pLF71_GV-QCRlyS5a1hQyB7a2CzP&usqp=CAE",
    title: "western",
  },
  {
    id: 2,
    imageSrc: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTTSL1KXof5CwtYKshmWt9JgrECcZ_VLrE6FuUHzxCWmgsk_N1bCUbkPkI0HCjCGmM175NUrqDhn1A2mjPk88VFpPo4pLF71_GV-QCRlyS5a1hQyB7a2CzP&usqp=CAE",
    title: "ethnic",
  },
  {
    id: 3,
    imageSrc: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTTSL1KXof5CwtYKshmWt9JgrECcZ_VLrE6FuUHzxCWmgsk_N1bCUbkPkI0HCjCGmM175NUrqDhn1A2mjPk88VFpPo4pLF71_GV-QCRlyS5a1hQyB7a2CzP&usqp=CAE",
    title: "accessories",
  },
];

const Category = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-gray-200 py-5">
      <h3 className="text-center font-[posto] text-xl mb-3">SHOP BY CATEGORY</h3>

      {/* ✅ Added flex-wrap and responsive spacing */}
      <div className="flex flex-wrap justify-center items-center gap-6 px-4 md:px-12 py-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category relative flex flex-col gap-2 w-[80%] sm:w-[45%] md:w-[30%] lg:w-[20%] h-fit items-center justify-between bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden"
          >
            <img
              className="h-[180px] md:h-[220px] w-auto rounded-lg object-cover"
              src={category.imageSrc}
              alt={`Category ${category.title}`}
            />
            <div className="text-center">
              <h6 className="uppercase font-bold text-gray-700 text-md tracking-wide mt-4">
                {category.title}
              </h6>
            </div>

            {/* ✅ Made overlay responsive */}
            <div
              className="shop-text absolute inset-0 rounded-lg bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-all duration-300"
              onClick={() => navigate(`/products/${category.title}`)}
            >
              <span className="text-white text-sm underline cursor-pointer">SHOP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
