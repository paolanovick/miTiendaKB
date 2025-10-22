import React from "react";

const Separador = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://i.ibb.co/KxGmH7j2/piernas.png')`,
      }}
    >
      <div className="flex items-center justify-center h-full bg-black/10">
        {/* Opcional: Puedes agregar texto o dejarlo vacío para solo mostrar la imagen */}
      </div>
    </div>
  );
};

export default Separador;
