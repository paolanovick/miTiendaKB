import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="relative flex flex-col bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
      {/* Imagen sobresaliente */}
      <div className="relative h-48">
        <img
          src={product.image || "https://placekitten.com/300/300"}
          alt={product.nombre || product.name}
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 object-cover rounded-full border-4 border-white shadow-md"
        />
      </div>

      {/* Cajón inferior */}
      <div className="mt-20 px-6 pb-6 flex flex-col items-center text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.nombre || product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-3">
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
