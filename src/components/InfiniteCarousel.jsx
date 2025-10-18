import React from "react";

export default function InfiniteCarousel() {
  const categories = [
    "CARTERAS",
    "BOLSOS",
    "MOCHILAS",
    "BILLETERAS",
    "MORRALES",
    "CINTURONES",
    "LLAVEROS",
  ];

  const duplicatedCategories = [...categories, ...categories, ...categories];

  return (
    <div
      className="w-full py-12 overflow-hidden shadow-2xl"
      style={{ backgroundColor: "#f2d9a0" }}
    >
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .carousel-container {
          animation: scroll 20s linear infinite;
        }
        
        .carousel-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex gap-12 carousel-container">
        {duplicatedCategories.map((category, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-12 py-6 text-kbbeige text-4xl font-bold whitespace-nowrap hover:text-kbcream transition-colors duration-300 cursor-pointer"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}
