import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useCart } from "../hooks/useCart";

const ProductListPaginated = ({ products }) => {
  const { addToCart } = useCart();
  const [visibleCount, setVisibleCount] = useState(4);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 4);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 pt-40">
      {/* Grid responsivo con espaciado corregido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-32 mb-12">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {/* Botón Ver más */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Ver más productos
          </button>
        </div>
      )}

      {/* Mensaje si no hay más productos */}
      {!hasMore && products.length > 0 && (
        <div className="text-center text-gray-600">
          <p>No hay más productos para mostrar</p>
        </div>
      )}
    </div>
  );
};

export default ProductListPaginated;
