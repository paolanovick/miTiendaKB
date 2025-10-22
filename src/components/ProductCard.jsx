import React, { useState } from "react";

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onAddToCart({ ...product, quantity });
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
      {/* Imagen sobresaliente */}
      <div className="relative h-48 flex justify-center items-start -mt-12">
        <img
          src={product.image || "https://placekitten.com/300/300"}
          alt={product.name || product.nombre}
          className="h-48 w-48 object-contain z-10"
        />
      </div>

      {/* Cajón inferior */}
      <div className="bg-yellow-400 p-4 flex flex-col items-center text-center mt-[-1rem]">
        <h3 className="font-bold text-lg text-white mb-2">
          {product.name || product.nombre}
        </h3>
        <p className="text-white text-sm mb-2 line-clamp-2">
          {product.description || product.descripcion || "Descripción corta"}
        </p>
        <p className="font-bold text-xl text-white mb-3">
          ${product.price || product.precio}
        </p>

        {/* Control de cantidad y botón */}
        <div className="flex items-center gap-2 mb-2">
          <button
            className="bg-white text-yellow-400 px-2 rounded"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </button>
          <span className="text-white font-semibold">{quantity}</span>
          <button
            className="bg-white text-yellow-400 px-2 rounded"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="bg-white text-yellow-400 font-bold px-4 py-2 rounded shadow hover:bg-yellow-100 transition"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
