import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import Logo from "../public/Logo.png";

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
      if (!res.ok) throw new Error("Error al suscribirse");

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
    <div className="footer bg-[#f2d9a0] text-kbcream">
      <div className="footer-container max-w-7xl mx-auto px-4 py-12">
        {/* Logo y columnas */}
        <div className="footer-header flex flex-col items-center">
          <img src={Logo} alt="Logo" className="footer-logo mb-6" />

          <div className="footer-top grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center w-full">
            {/* Columna 1: Secciones */}
            <div className="footer-column flex flex-col items-center text-center">
              <h3 className="font-bold text-lg mb-3">Secciones</h3>
              <Link to="/" className="hover:underline mb-1">
                Inicio
              </Link>
              <Link to="/inicio" className="hover:underline mb-1">
                Nosotros
              </Link>
              <Link to="/productos" className="hover:underline mb-1">
                Productos
              </Link>
             
              <Link to="/contacto" className="hover:underline mb-1">
                Contacto
              </Link>
            </div>

            {/* Columna 2: Contacto y legales */}
            <div className="footer-column flex flex-col items-center text-center">
              <h3 className="font-bold text-lg mb-3">Contacto & Legal</h3>
              <Link to="/contacto" className="hover:underline mb-1">
                Contacto Comercial
              </Link>
              <Link to="/politica-privacidad" className="hover:underline mb-1">
                Política de Privacidad
              </Link>
              <Link to="/legales" className="hover:underline mb-1">
                Legales
              </Link>
              <Link to="/terminos-condiciones" className="hover:underline mb-1">
                Términos & Condiciones
              </Link>
            </div>

            {/* Columna 3: Newsletter */}
            <div className="footer-column flex flex-col items-center text-center col-span-1 sm:col-span-2 lg:col-span-1">
              <h3 className="font-bold text-lg mb-3">Newsletter</h3>
              <p className="mb-3">
                Suscríbete para recibir ofertas y novedades.
              </p>
              <form
                onSubmit={handleNewsletter}
                className="flex flex-col items-center space-y-3 w-full max-w-xs"
              >
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
                  <p className="text-kbbeige mt-2">¡Gracias por suscribirte!</p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="footer-socials flex justify-center gap-4 mt-8 text-lg">
          <button aria-label="Facebook">
            <FaFacebookF />
          </button>
          <button aria-label="Twitter">
            <FaTwitter />
          </button>
          <button
            aria-label="Instagram"
            onClick={() =>
              window.open(
                "https://www.instagram.com/kuke.bags/",
                "_blank"
              )
            }
          >
            <FaInstagram />
          </button>
          <button aria-label="LinkedIn">
            <FaLinkedin />
          </button>
        </div>

        {/* Pie de página */}
        <div className="footer-bottom mt-8 text-center text-sm">
          © {new Date().getFullYear()} Travel Connect. Todos los derechos
          reservados.
        </div>
      </div>
    </div>
  );
}
