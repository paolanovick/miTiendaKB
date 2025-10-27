import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch(
        "https://n8n.triptest.com.ar/webhook/newsletter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      if (!res.ok) {
        throw new Error("Error al suscribirse");
      }
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al suscribirse. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="text-kbcream" style={{ backgroundColor: "#f2d9a0" }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Columna 1: Logo */}
          <div className="flex flex-col items-center lg:items-start">
            <img src="/logo-SF.png" alt="Mi Tienda" className="h-25 mb-2" />
            <p className="text-kbcream text-sm text-center lg:text-left">
              Tienda en línea de carteras y accesorios de calidad.
            </p>
          </div>

          {/* Columna 2 y 3... (igual que antes) */}

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
                disabled={loading}
                className="w-full px-4 py-2 bg-kbred hover:bg-kbpurple rounded font-semibold transition text-kbcream"
              >
                {loading ? "Suscribiendo..." : "Suscribirse"}
              </button>
              {subscribed && (
                <p className="text-kbbeige text-sm text-center">
                  ¡Gracias por suscribirte!
                </p>
              )}
            </form>
          </div>

          {/* Columna 5: Contacto y legales */}
          <div>
            <h3 className="text-lg font-bold text-kbbeige mb-4">
              Contacto & Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contacto" className="hover:underline">
                  Contacto Comercial
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidad" className="hover:underline">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/redes-sociales" className="hover:underline">
                  Redes Sociales
                </Link>
              </li>
              <li>
                <Link to="/legales" className="hover:underline">
                  Legales
                </Link>
              </li>
              <li>
                <Link to="/terminos-condiciones" className="hover:underline">
                  Términos & Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea separadora... (igual que antes) */}
      </div>
    </footer>
  );
}
