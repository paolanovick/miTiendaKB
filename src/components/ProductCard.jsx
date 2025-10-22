import React, { useState } from "react";

const ProductCard = ({ product, onAddToCart }) => {
  const [imageUrl, setImageUrl] = useState(
    product.image || "https://placekitten.com/300/200"
  );

  return (
    <div className="relative group">
      {/* Imagen flotante */}
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
          alt={product.name}
          className="w-full h-full object-cover"
          onError={() => setImageUrl("https://placekitten.com/300/200")}
        />
      </div>

      {/* Tarjeta de información */}
      <div
        className="
          bg-white 
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
      >
        {/* Título */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
          {product.name}
        </h3>

        {/* Categoría */}
        <p className="text-sm text-gray-500 mb-4">{product.category}</p>

        {/* Precio y Stock */}
        <div className="flex items-center justify-between w-full mb-4">
          <span className="text-2xl font-bold text-green-600">
            $ {product.price.toLocaleString()}
          </span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
            Stock de pecado
          </span>
        </div>

        {/* Botón */}
        <button
          onClick={() => onAddToCart(product)}
          className="
            w-full 
            bg-gradient-to-r from-blue-500 to-purple-600 
            text-white 
            font-semibold 
            py-3 
            rounded-xl 
            hover:from-blue-600 hover:to-purple-700 
            transition-all duration-300 
            shadow-md hover:shadow-lg
            transform hover:-translate-y-0.5
          "
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
