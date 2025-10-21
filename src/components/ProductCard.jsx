import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
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
      className="relative cursor-pointer group w-full sm:w-80 md:w-64 lg:w-72 mx-auto my-4"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tarjeta */}
      <div
        className={`w-full rounded-2xl bg-white shadow-md overflow-hidden transition-transform duration-300 ${
          isHovered ? "scale-105 shadow-xl" : ""
        }`}
      >
        {/* Imagen */}
        <div className="relative w-full h-64">
          <img
            src={imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            onError={() => setImageUrl("https://placekitten.com/300/200")}
          />
        </div>

        {/* Contenido */}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          {product.description && (
            <p
              className={`text-gray-500 text-sm line-clamp-2 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-80"
              }`}
            >
              {product.description}
            </p>
          )}

          {/* Precio y botón */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">
              ${product.price}
            </span>
            <button
              onClick={handleAgregar}
              className={`px-3 py-1.5 rounded-lg font-semibold text-white transition-transform duration-300 ${
                product.stock > 0
                  ? "bg-blue-600 hover:bg-blue-700 transform hover:scale-105"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? "Agregar" : "Sin stock"}
            </button>
          </div>

          {/* Mensaje */}
          {mensaje && (
            <p className="mt-2 text-sm text-center text-red-500">{mensaje}</p>
          )}
        </div>
      </div>
    </div>
  );
}
