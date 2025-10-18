import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useCart } from "../hooks/useCart";

export default function Header() {
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white text-kbdark shadow-lg"
          : "bg-transparent text-kbbeige"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          <img
            src={isScrolled ? "/logo-SF.png" : "/logoBCO.png"}
            alt="Mi Tienda"
            className="h-30 transition-all duration-300"
          />
        </Link>

        <div className="hidden md:flex items-center gap-12">
          <nav className="flex items-center gap-8">
            <Link to="/" className="hover:opacity-80 transition">
              Inicio
            </Link>
            <Link to="/" className="hover:opacity-80 transition">
              Productos
            </Link>
            <Link to="/admin" className="hover:opacity-80 transition">
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hover:opacity-80 transition"
              title="Iniciar sesión"
            >
              <User size={24} />
            </Link>
            <Link
              to="/carrito"
              className="relative hover:opacity-80 transition"
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-kbred text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden hover:opacity-80 transition"
        >
          <Menu size={24} />
        </button>
      </div>

      {menuOpen && (
        <div
          className={`md:hidden p-4 border-t ${
            isScrolled
              ? "bg-white border-kbdark text-kbdark"
              : "bg-kbdark/80 border-kbred text-kbcream"
          }`}
        >
          <Link to="/" className="block py-2 hover:opacity-80 transition">
            Inicio
          </Link>
          <Link to="/" className="block py-2 hover:opacity-80 transition">
            Productos
          </Link>
          <Link to="/admin" className="block py-2 hover:opacity-80 transition">
            Dashboard
          </Link>
          <Link
            to="/carrito"
            className="block py-2 hover:opacity-80 transition"
          >
            Carrito ({cart.length})
          </Link>
          <Link to="/login" className="block py-2 hover:opacity-80 transition">
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
