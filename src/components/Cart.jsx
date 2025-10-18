import React from "react";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="border rounded-lg p-4 shadow bg-white min-w-64">
      <h2 className="text-2xl font-bold mb-4">Carrito</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">El carrito está vacío</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between mb-3 pb-2 border-b"
            >
              <div className="flex-1">
                <span className="font-semibold">{item.name}</span>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity || 1}
                </p>
              </div>
              <span className="font-bold">
                ${item.price * (item.quantity || 1)}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                X
              </button>
            </div>
          ))}
          <p className="font-bold mt-4 text-lg">Total: ${total.toFixed(2)}</p>
          <button
            onClick={clearCart}
            className="bg-red-500 text-white py-2 px-3 rounded mt-2 w-full hover:bg-red-600"
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
