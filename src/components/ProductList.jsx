import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useCart } from "../hooks/useCart";

const ProductList = ({ products, title, paginated = false }) => {
  const { addToCart } = useCart();
  const [visibleCount, setVisibleCount] = useState(8);

  const visibleProducts = paginated
    ? products.slice(0, visibleCount)
    : products;
  const hasMore = paginated && visibleCount < products.length;

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 8);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6">
      {/* Título de la sección */}
      {title && (
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">
          {title}
        </h2>
      )}

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-24 sm:gap-y-32 md:gap-y-36 mb-12">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id || product._id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {/* Botón Ver más (solo si paginated=true) */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Ver más productos
          </button>
        </div>
      )}

      {/* Mensaje cuando no hay más productos */}
      {paginated && !hasMore && products.length > 8 && (
        <div className="text-center text-gray-600">
          <p>Has visto todos los productos de esta categoría</p>
        </div>
      )}

      {/* Mensaje cuando no hay productos */}
      {products.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <p>No hay productos disponibles en esta categoría</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
