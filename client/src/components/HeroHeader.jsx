import React from "react";

const HeroHeader = () => {
    return (
        <section className="flex flex-col-reverse lg:flex-row w-full min-h-[80vh]">
            {/* Left Section */}
            <div className="w-full lg:w-3/5 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-10 lg:py-24 text-center lg:text-left">
                <p className="text-sm md:text-base font-[lora] text-gray-700 mb-3 md:mb-4">
                    Upgrade your wardrobe with our exclusive collection. Perfect for every occasion.
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight">
                    seashell embroided tee
                </h1>
                <button className="mt-6 bg-gray-800 text-white hover:bg-gray-700 px-5 py-2.5 rounded-lg text-sm md:text-base transition-all duration-300 mx-auto lg:mx-0 w-fit">
                    Shop Now
                </button>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-2/5 flex items-center justify-center py-6 lg:py-0">
                <img
                    className="w-2/3 md:w-[60%] lg:w-[75%] h-auto rounded-full object-cover border-4 border-black shadow-lg"
                    src="https://tanishafashion.com/wp-content/uploads/2024/04/71Oit7Ze6NL._UL1500_-768x1024-1.jpg"
                    alt="Featured Product"
                />
            </div>
        </section>
    );
};

export default HeroHeader;
