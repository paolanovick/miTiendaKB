import React, { useState } from "react";

const ProductList = ({ products, title, paginated = true }) => {
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
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {displayedProducts.map((product) => (
          <div
            key={product.id || product._id}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center text-center pt-16"
          >
            {/* Imagen sobresale hacia arriba */}
            <div className="absolute -top-12 w-32 h-32">
              <img
                src={product.image || "https://placekitten.com/300/300"}
                alt={product.nombre || product.name}
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
              />
            </div>

            <div className="px-6 pb-6 mt-16 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.nombre || product.name}
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                {product.descripcion || product.description}
              </p>
              <p className="text-green-600 font-bold text-lg">
                ${product.precio || product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Paginación */}
      {paginated && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="font-semibold">
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
