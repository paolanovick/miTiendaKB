import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { Trash2, ArrowLeft } from "lucide-react";

const CartPage = () => {
  const { cart, addToCart, removeFromCart, clearCart, setCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // Función para incrementar cantidad
  const incrementQuantity = (item) => {
    addToCart(item);
  };

  // Función para decrementar cantidad (mínimo 1)
  const decrementQuantity = (item) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === item.id
          ? { ...p, quantity: Math.max((p.quantity || 1) - 1, 1) }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Botón volver */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6"
        >
          <ArrowLeft size={20} />
          Volver a productos
        </button>

        <h1 className="text-4xl font-bold mb-8">Mi Carrito</h1>

        {cart.length === 0 ? (
          <div className="text-center bg-white rounded-lg p-12 shadow">
            <p className="text-gray-600 text-lg mb-4">El carrito está vacío</p>
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Continuar comprando
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Productos */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-6 flex gap-6"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      SKU: {item.sku}
                    </p>

                    <div className="flex justify-between items-center">
                      <div>
                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-2 mb-2">
                          <button
                            onClick={() => decrementQuantity(item)}
                            className="px-2 bg-gray-200 rounded"
                          >
                            -
                          </button>
                          <span>{item.quantity || 1}</span>
                          <button
                            onClick={() => incrementQuantity(item)}
                            className="px-2 bg-gray-200 rounded"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-2xl font-bold text-green-600">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen de compra */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-lg p-6 h-fit shadow-lg sticky top-32">
              <h2 className="text-2xl font-bold mb-6">Resumen</h2>

              <div className="space-y-3 mb-6 border-b border-gray-600 pb-6">
                <div className="flex justify-between">
                  <span>Cantidad de productos:</span>
                  <span className="font-semibold">{cart.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total de items:</span>
                  <span className="font-semibold">
                    {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold mb-6 text-green-400">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mb-3 transition">
                Proceder al pago
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mb-3 transition"
              >
                Continuar comprando
              </button>
              <button
                onClick={clearCart}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm transition"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
