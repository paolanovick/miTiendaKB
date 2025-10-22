import React from "react";

const Separador = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Lado Izquierdo - Grid de 9 cuadrados */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-3 grid-rows-3 gap-3 sm:gap-4 h-full">
          {/* Cuadrado 1 - Imagen mochila */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://i.ibb.co/BhmLKkc/mochila.jpg"
              alt="Mochila"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Cuadrado 2 - Vacío */}
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>

          {/* Cuadrado 3 - Imagen producto */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://i.ibb.co/N2ZXnVjW/f6988055-0bfa-40de-bb16-700106664ffc.jpg"
              alt="Producto"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Cuadrado 4 - Vacío */}
          <div className="bg-gradient-to-br from-gray-300 to-gray-200 rounded-lg"></div>

          {/* Cuadrado 5 - Imagen producto */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://i.ibb.co/WWZtRpdR/b74c5fc7-0e07-451e-90e7-17b0266631a4.jpg"
              alt="Producto"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Cuadrado 6 - Vacío */}
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>

          {/* Cuadrado 7 - Vacío */}
          <div className="bg-gradient-to-br from-gray-300 to-gray-200 rounded-lg"></div>

          {/* Cuadrado 8 - Vacío */}
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>

          {/* Cuadrado 9 - Vacío */}
          <div className="bg-gradient-to-br from-gray-300 to-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Lado Derecho - Imagen de marca */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-900 overflow-hidden">
        <img
          src="https://i.ibb.co/V0DbpcNm/marca2.jpg"
          alt="Marca"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>
    </div>
  );
};

export default Separador;
