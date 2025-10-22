import React from "react";

const Separador = () => {
  return (
    <div className="w-full py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative h-32 sm:h-40 md:h-48 lg:h-56">
          <img
            src="https://i.ibb.co/KxGmH7j2/piernas.png"
            alt="Separador decorativo"
            className="w-full h-full object-contain object-center opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Separador;
