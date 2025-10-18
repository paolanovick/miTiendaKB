import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);

  const handleCardClick = () => {
    navigate(`/producto/${product.id}`);
  };

  return (
    <div
      className="relative cursor-pointer group w-full"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tarjeta base */}
      <div
        className={`w-full rounded-3xl pt-56 pb-6 px-6 transition-all duration-500 bg-kbbeige ${
          isHovered ? "shadow-2xl scale-105" : "shadow-lg"
        }`}
      >
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-kbpurple opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-kbdark opacity-10 rounded-full blur-3xl -ml-12 -mb-12"></div>

        {/* Contenido */}
        <div className="relative z-10">
          {/* Nombre y descripción */}
          <div className="text-center mb-4">
            <h3 className="text-kbdark font-bold text-lg line-clamp-2 drop-shadow-lg">
              {product.name}
            </h3>
            {product.description && (
              <p
                className="text-kbpurple text-xs line-clamp-2 transition-all duration-300 mt-1"
                style={{
                  opacity: isHovered ? 1 : 0,
                  height: isHovered ? "auto" : "0",
                }}
              >
                {product.description}
              </p>
            )}
          </div>

          {/* Precio y botón */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span
                className="text-kbpurple text-xs uppercase tracking-widest transition-all duration-300 font-semibold"
                style={{
                  opacity: isHovered ? 1 : 0,
                }}
              >
                Precio
              </span>
              <p className="text-kbred font-bold text-2xl drop-shadow-lg">
                ${product.price}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className={`px-4 py-1.5 rounded-lg font-bold transition-all duration-300 whitespace-nowrap text-kbcream shadow-lg ${
                isHovered
                  ? "bg-kbdark hover:bg-kbpurple scale-95"
                  : "bg-kbdark hover:bg-kbpurple"
              }`}
            >
              {isHovered ? "✓ Agregar" : "Agregar"}
            </button>
          </div>
        </div>
      </div>

      {/* Imagen superpuesta */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 z-20 transition-all duration-500 ${
          isHovered ? "scale-110 -top-16" : "scale-100 -top-12"
        }`}
        style={{
          width: isHovered ? "240px" : "220px",
          height: isHovered ? "240px" : "220px",
        }}
      >
        <div className="w-full h-full overflow-hidden shadow-2xl rounded-2xl bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}
