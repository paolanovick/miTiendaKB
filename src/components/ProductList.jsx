import React, { useState } from "react";

const ProductList = ({ products, title, paginated = true, onAddToCart }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = paginated ? Math.ceil(products.length / itemsPerPage) : 1;

  const displayedProducts = paginated
    ? products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : products;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <div
            key={product.id || product._id}
            className="border rounded-lg shadow hover:shadow-xl p-4 flex flex-col bg-white transition-all"
          >
            <img
              src={product.image || "https://placekitten.com/300/200"}
              alt={product.nombre || product.name}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h3 className="font-bold text-lg text-gray-800">
              {product.nombre || product.name}
            </h3>
            <p className="text-gray-500 mb-2 text-sm">
              {product.descripcion || product.description}
            </p>
            <p className="text-green-600 font-semibold text-lg mb-3">
              ${product.precio || product.price}
            </p>

            {onAddToCart && (
              <button
                onClick={() => onAddToCart(product)}
                className="mt-auto bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition-colors text-sm"
              >
                🛒 Agregar al carrito
              </button>
            )}
          </div>
        ))}
      </div>

      {paginated && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
