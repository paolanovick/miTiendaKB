import React, { useEffect, useState } from "react";

export default function InfiniteCarousel() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Creamos un array con elementos alternados
  const items = [
    { type: "text", content: "CARTERAS" },
    { type: "logo" },
    { type: "text", content: "CARTERAS" },
    { type: "logo" },
    { type: "text", content: "CARTERAS" },
    { type: "logo" },
    { type: "text", content: "CARTERAS" },
    { type: "logo" },
    { type: "text", content: "CARTERAS" },
    { type: "logo" },
  ];

  // Duplicamos para el efecto infinito
  const duplicatedItems = [...items, ...items];

  return (
    <div className="w-full bg-amber-950 py-12 overflow-hidden">
      <div className="flex animate-scroll">
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex-shrink-0 px-8 flex items-center">
            {item.type === "text" ? (
              <span className="text-white text-4xl md:text-5xl font-bold whitespace-nowrap">
                {item.content}
              </span>
            ) : (
              <img
                src={isScrolled ? "/logoBCO.png" : "/logoBCO.png"}
                alt="Kuke Logo"
                className="h-12 md:h-16 w-auto object-contain"
              />
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 15s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
