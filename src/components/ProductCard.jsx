import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");
  const [imageUrl, setImageUrl] = useState(product.image);

  const handleCardClick = () => {
    navigate(`/producto/${product.id}`);
  };

  const handleAgregar = (e) => {
    e.stopPropagation();
    try {
      addToCart(product);
      setMensaje("Producto agregado correctamente ✅");
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al agregar el producto");
    }
    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div
      className="relative group w-full sm:w-72 md:w-80 lg:w-96 mx-auto my-12 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Contenedor principal */}
      <div className="relative flex flex-col items-center">
        {/* Imagen flotante responsive */}
        <div
          className="
          absolute 
          -top-16 
          w-36 h-36 
          sm:-top-20 sm:w-44 sm:h-44 
          md:-top-24 md:w-48 md:h-48 
          lg:-top-28 lg:w-56 lg:h-56
          rounded-2xl overflow-hidden shadow-lg 
          transition-transform duration-500 
          group-hover:scale-105
        "
        >
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImageUrl("https://placekitten.com/300/200")}
          />
        </div>

        {/* Tarjeta inferior */}
        <div
          className="
          bg-white 
          w-full 
          rounded-2xl 
          shadow-md 
          pt-28 sm:pt-32 md:pt-36 lg:pt-40 
          pb-5 px-4 
          flex flex-col items-center text-center 
          transition-all duration-300 
          hover:shadow-xl
        "
        >
          <h3 className="text-lg font-semibold text-gray-800 mt-2 truncate">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between w-full px-4">
            <span className="text-xl font-bold text-green-600">
              ${product.price}
            </span>
            <button
              onClick={handleAgregar}
              className={`px-4 py-1.5 rounded-lg font-semibold text-white transition-transform duration-300 ${
                product.stock > 0
                  ? "bg-blue-600 hover:bg-blue-700 transform hover:scale-105"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? "Agregar" : "Sin stock"}
            </button>
          </div>

          {mensaje && (
            <p className="mt-2 text-sm text-center text-red-500">{mensaje}</p>
          )}
        </div>
      </div>
    </div>
  );
}
