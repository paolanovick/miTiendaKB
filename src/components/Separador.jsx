import React from "react";

const Separador = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Lado Izquierdo - Grid de 9 cuadrados */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-3 grid-rows-3 gap-3 sm:gap-4 h-full">
          {/* Imagen 1 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://i.ibb.co/JMNsz6p/cuadro1.jpg"
              alt="Cuadro 1"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Imagen 2 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://i.ibb.co/bggnpNrd/cuadro2.jpg"
              alt="Cuadro 2"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Imagen 3 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://i.ibb.co/5hHXFj4y/cuadro3.jpg"
              alt="Cuadro 3"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Vacio */}
          <div className="bg-gradient-to-br from-gray-300 to-gray-200 rounded-lg"></div>

          {/* Imagen 4 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://i.ibb.co/WW4WKgg0/cuadro4.jpg"
              alt="Cuadro 4"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Vacio */}
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>

          {/* Imagen 5 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://i.ibb.co/XrY6y2mf/cuadro5.jpg"
              alt="Cuadro 5"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Vacío */}
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>

          {/* Vacío */}
          <div className="bg-gradient-to-br from-gray-300 to-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Lado Derecho - Imagen */}
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
