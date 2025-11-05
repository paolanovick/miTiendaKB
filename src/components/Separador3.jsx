import React from "react";

const Separador3 = () => {
  const imgLeft = "https://i.ibb.co/Y7ysSh0W/cartera.jpg"; // Imagen izquierda
  const imgRight = "https://i.ibb.co/ZzWXygN1/cartera3.jpg"; // 👉 Cambia esta por la nueva imagen

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Imagen izquierda */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
        <img
          src={imgLeft}
          alt="Separador izquierda"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Imagen derecha */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
        <img
          src={imgRight}
          alt="Separador derecha"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>
    </div>
  );
};

export default Separador3;
