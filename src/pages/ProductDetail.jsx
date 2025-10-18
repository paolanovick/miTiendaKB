import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Volver a inicio
          </button>
        </div>
      </div>
    );
  }

  const specifications = product.specifications
    ?.split(",")
    .map((s) => s.trim());
  const reviews = product.reviews || [];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Botón volver */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
        >
          ← Volver a productos
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Imagen - columna más pequeña */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 shadow-lg w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain max-h-96"
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">SKU: {product.sku}</p>
              <p className="text-sm text-gray-500 mb-3">
                Categoría: {product.category}
              </p>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 text-base mb-4">
                {product.description}
              </p>
            </div>

            {/* Precio y stock */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 mb-6 text-white">
              <p className="text-gray-300 text-xs uppercase mb-2">Precio</p>
              <p className="text-3xl font-bold text-green-400 mb-3">
                ${product.price}
              </p>
              <p className="text-sm mb-4">
                Stock disponible:{" "}
                <span
                  className={
                    product.stock > 0
                      ? "text-green-400 font-bold"
                      : "text-red-400"
                  }
                >
                  {product.stock > 0
                    ? `${product.stock} unidades`
                    : "Sin stock"}
                </span>
              </p>
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  product.stock > 0
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                }`}
              >
                {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
              </button>
            </div>

            {/* Especificaciones */}
            {specifications && specifications.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">Especificaciones</h3>
                <div className="bg-white rounded-lg p-4 shadow">
                  {specifications.map((spec, idx) => {
                    const [key, value] = spec.split(":");
                    return (
                      <div
                        key={idx}
                        className="flex justify-between py-2 border-b last:border-b-0 text-sm"
                      >
                        <p className="text-gray-600 font-medium">{key}</p>
                        <p className="text-gray-800">{value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reseñas - ancho completo abajo */}
        {reviews.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Reseñas de clientes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-600"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-sm">{review.author}</p>
                    <p className="text-yellow-500 text-sm">
                      {"⭐".repeat(review.rating)}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
