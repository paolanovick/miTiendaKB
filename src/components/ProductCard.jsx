import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
      {/* Imagen cuadrada */}
      <img
        src={product.image || "https://placekitten.com/300/300"}
        alt={product.nombre || product.name}
        className="w-full h-48 object-cover"
      />

      {/* Cajón inferior */}
      <div className="px-4 py-4 flex flex-col items-center text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {product.nombre || product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-2">
          {product.descripcion || product.description}
        </p>
        <p className="text-green-600 font-bold text-lg mb-3">
          ${product.precio || product.price}
        </p>
        {onAddToCart && (
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors text-sm"
          >
            🛒 Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
