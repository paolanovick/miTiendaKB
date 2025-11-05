import React from "react";

const Separador3 = () => {
  const img = "https://i.ibb.co/HpK20VV1/pink.jpg"; // 👉 Usará esta imagen en ambos lados

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Imagen izquierda */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
        <img
          src={img}
          alt="Separador izquierda"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Imagen derecha */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
        <img
          src={img}
          alt="Separador derecha"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>
    </div>
  );
};

export default Separador3;
