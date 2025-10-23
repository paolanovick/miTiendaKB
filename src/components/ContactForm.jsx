import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Reemplazá esta URL con la URL de tu webhook de n8n en Digital Ocean
      const response = await fetch("Thttps://n8n.triptest.com.ar/webhook/KB", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ nombre: "", email: "", mensaje: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        throw new Error("Error al enviar el mensaje");
      }
    } catch (err) {
      setError(
        "Hubo un problema al enviar tu mensaje. Por favor, intentá nuevamente."
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#f2d9a0" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-950 mb-4">
            ¿Tenés alguna consulta?
          </h2>
          <p className="text-lg text-gray-700">
            Envianos tu mensaje y te responderemos a la brevedad
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {success && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={24} />
                <div>
                  <p className="font-semibold text-green-800">
                    ¡Mensaje enviado con éxito!
                  </p>
                  <p className="text-green-700 text-sm">
                    Te responderemos pronto a tu email.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Nombre *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-950 focus:border-transparent transition-all disabled:bg-gray-100"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-950 focus:border-transparent transition-all disabled:bg-gray-100"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Mensaje/Consulta *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                disabled={loading}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-950 focus:border-transparent transition-all resize-none disabled:bg-gray-100"
                placeholder="Escribí tu consulta aquí..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-950 text-white font-semibold py-4 rounded-xl hover:bg-amber-900 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Enviar mensaje
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
