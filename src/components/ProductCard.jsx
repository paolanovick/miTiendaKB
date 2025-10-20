import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [mensaje, setMensaje] = useState(""); // Para mostrar errores o confirmaciones
  const [imageUrl, setImageUrl] = useState(product.image);

  const handleCardClick = () => {
    navigate(`/producto/${product.id}`);
  };

  const handleAgregar = async (e) => {
    e.stopPropagation(); // Evita que se active el click de la tarjeta

    try {
      // Simulación de llamada al webhook de n8n (puedes reemplazar con tu fetch real)
      // const response = await fetch('https://tudominio.com/webhook/miWorkflow', { ... })
      // const data = await response.json();

      // Aquí llamamos a addToCart y asumimos que puede fallar
      addToCart(product);

      setMensaje("Producto agregado correctamente ✅");
    } catch (err) {
      console.error("Error al agregar producto:", err);
      setMensaje("❌ Error al agregar el producto. Intente nuevamente.");
    }

    // Limpiar mensaje después de 3 segundos
    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div
      className="relative cursor-pointer group w-full sm:w-80 md:w-64 lg:w-72 mx-auto my-4"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tarjeta base */}
      <div
        className={`w-full rounded-3xl pt-72 pb-6 px-6 bg-kbbeige transition-transform duration-500 shadow-lg ${
          isHovered ? "scale-105 shadow-2xl" : ""
        }`}
      >
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-kbpurple opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-kbdark opacity-10 rounded-full blur-3xl -ml-12 -mb-12"></div>

        {/* Contenido */}
        <div className="relative z-10 text-center">
          <h3 className="text-kbdark font-bold text-lg line-clamp-2 drop-shadow-lg">
            {product.name}
          </h3>
          {product.description && (
            <p
              className="text-kbpurple text-xs line-clamp-2 transition-all duration-300 mt-1"
              style={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? "auto" : "0",
              }}
            >
              {product.description}
            </p>
          )}

          {/* Precio y botón */}
          <div className="flex items-center justify-between gap-3 mt-4">
            <div className="flex flex-col">
              <span
                className="text-kbpurple text-xs uppercase tracking-widest font-semibold transition-opacity duration-300"
                style={{ opacity: isHovered ? 1 : 0 }}
              >
                Precio
              </span>
              <p className="text-kbred font-bold text-2xl drop-shadow-lg">
                ${product.price}
              </p>
            </div>
            <button
              onClick={handleAgregar}
              className={`px-4 py-1.5 rounded-lg font-bold text-kbcream shadow-lg transition-all duration-300 whitespace-nowrap ${
                isHovered
                  ? "bg-kbdark hover:bg-kbpurple scale-95"
                  : "bg-kbdark hover:bg-kbpurple"
              }`}
            >
              {isHovered ? "✓ Agregar" : "Agregar"}
            </button>
          </div>

          {/* Mensaje de error/confirmación */}
          {mensaje && (
            <p className="mt-2 text-sm text-center text-red-500">{mensaje}</p>
          )}
        </div>
      </div>

      {/* Imagen superpuesta */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 z-20 transition-all duration-500 ${
          isHovered ? "scale-110 -top-16" : "scale-100 -top-12"
        }`}
        style={{
          width: isHovered ? "280px" : "260px",
          height: isHovered ? "280px" : "260px",
        }}
      >
        <div className="w-full h-full overflow-hidden shadow-2xl rounded-2xl bg-white">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
            onError={() => setImageUrl("https://placekitten.com/300/200")} // fallback
          />
        </div>
      </div>
    </div>
  );
}
