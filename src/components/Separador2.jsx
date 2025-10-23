import React from "react";

const Separador2 = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Lado Izquierdo - Imagen */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
        <img
          src="https://i.ibb.co/HpK20VV1/pink.jpg"
          alt="KUKEBAGS te acompaña"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Lado Derecho - Texto con estilo */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-8 sm:p-12 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>

        {/* Contenido del texto */}
        <div className="relative z-10 text-center max-w-lg">
          {/* Logo/Marca principal */}
          <div className="mb-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                KUKE
              </span>
              <span className="text-gray-800 font-light">BAGS</span>
            </h2>
          </div>

          {/* Frase de acompañamiento */}
          <div className="relative">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-gray-700 mb-4">
              te acompaña
            </p>

            {/* Línea decorativa */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-400"></div>
              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-orange-400"></div>
            </div>

            {/* Subtexto opcional */}
            <p className="text-sm sm:text-base text-gray-600 font-light tracking-wide">
              EN CADA PASO DE TU CAMINO
            </p>
          </div>

          {/* Decoración adicional */}
          <div className="absolute -top-8 -left-8 w-16 h-16 border-l-4 border-t-4 border-orange-400 opacity-30"></div>
          <div className="absolute -bottom-8 -right-8 w-16 h-16 border-r-4 border-b-4 border-yellow-400 opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default Separador2;
