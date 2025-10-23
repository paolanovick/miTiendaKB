import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  // eliminé onAddToCart porque el botón ahora no agrega al carrito
  const [imageUrl, setImageUrl] = useState(
    product.image || "https://placekitten.com/300/200"
  );
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/producto/${product.id || product._id}`);
  };

  // NUEVO: función para el botón "Ver más" que navega al detalle
  const handleViewDetails = (e) => {
    e.stopPropagation(); // Evita que también se dispare handleCardClick
    navigate(`/producto/${product.id || product._id}`);
  };

  return (
    <div className="relative group cursor-pointer" onClick={handleCardClick}>
      {/* Imagen flotante - mitad afuera, mitad dentro */}
      <div
        className="
          absolute 
          -top-16 sm:-top-20 
          left-1/2 -translate-x-1/2
          w-40 h-40 sm:w-48 sm:h-48 
          rounded-2xl overflow-hidden shadow-xl 
          transition-transform duration-500 
          group-hover:scale-110 
          group-hover:-rotate-2
          bg-white
          z-10
        "
      >
        <img
          src={imageUrl}
          alt={product.name || product.nombre}
          className="w-full h-full object-cover"
          onError={() => setImageUrl("https://placekitten.com/300/200")}
        />
      </div>

      {/* Tarjeta de información */}
      <div
        className="
          w-full 
          rounded-2xl 
          shadow-md 
          pt-28 sm:pt-32 
          pb-6 px-5 
          flex flex-col items-center text-center 
          transition-all duration-300 
          hover:shadow-2xl
          relative
        "
        style={{ backgroundColor: "#f2d9a0" }}
      >
        {/* Título */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
          {product.name || product.nombre}
        </h3>

        {/* Categoría */}
        <p className="text-sm text-gray-600 mb-4">
          {product.category || product.categoria || "Sin categoría"}
        </p>

        {/* Precio */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-amber-950">
            $ {(product.price || product.precio)?.toLocaleString()}
          </span>
        </div>

        {/* Botón "Ver más" ahora va al detalle */}
        <button
          onClick={handleViewDetails}
          className="
            w-full 
            text-white 
            font-semibold 
            py-3 
            rounded-xl 
            transition-all duration-300 
            shadow-md hover:shadow-lg
            transform hover:-translate-y-0.5
            bg-amber-950
            hover:bg-amber-900
          "
        >
          Ver más
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
