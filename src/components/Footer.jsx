import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="text-kbcream" style={{ backgroundColor: "#f2d9a0" }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Logo */}
          <div className="flex flex-col items-center lg:items-start">
            <img src="/logoBCO.png" alt="Mi Tienda" className="h-25 mb-2" />
            <p className="text-kbcream text-sm text-center lg:text-left">
              Tienda en línea de carteras y accesorios de calidad.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-lg font-bold text-kbbeige mb-4">Secciones</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-kbcream hover:text-kbbeige transition"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-kbcream hover:text-kbbeige transition"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-kbcream hover:text-kbbeige transition"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-kbcream hover:text-kbbeige transition"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Políticas */}
          <div>
            <h3 className="text-lg font-bold text-kbbeige mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-kbcream hover:text-kbbeige transition"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-kbcream hover:text-kbbeige transition"
                >
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-kbcream hover:text-kbbeige transition"
                >
                  Política de Devoluciones
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-kbcream hover:text-kbbeige transition"
                >
                  Envíos y Entregas
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-kbbeige mb-4">Newsletter</h3>
            <p className="text-kbcream text-sm mb-4">
              Suscríbete para recibir ofertas y novedades.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-3">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-kbpurple border border-kbred text-kbcream placeholder-kbbeige focus:border-kbbeige focus:outline-none transition"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-kbred hover:bg-kbpurple rounded font-semibold transition text-kbcream"
              >
                Suscribirse
              </button>
              {subscribed && (
                <p className="text-kbbeige text-sm text-center">
                  ¡Gracias por suscribirte!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="border-t border-kbred pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-kbcream text-sm">
            <p>&copy; 2025 Mi Tienda. Todos los derechos reservados.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-kbcream hover:text-kbbeige transition"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-kbcream hover:text-kbbeige transition"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-kbcream hover:text-kbbeige transition"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
