import React from "react";
import { Helmet } from "react-helmet";
import ProductList from "../components/ProductList";
import InfiniteCarousel from "../components/InfiniteCarousel";
import InfiniteCarousel2 from "../components/InfiniteCarousel2";
import InfiniteCarousel3 from "../components/InfiniteCarousel3";
import Separador from "../components/Separador";
import Separador2 from "../components/Separador2";
import ContactForm from "../components/ContactForm";

const Home = ({ products }) => {
  // 🔹 Filtrar productos por categoría
  const mochilas = products.filter(
    (p) =>
      p.category?.toLowerCase() === "mochilas" ||
      p.categoria?.toLowerCase() === "mochilas"
  );

  const bolsos = products.filter(
    (p) =>
      p.category?.toLowerCase() === "bolsos" ||
      p.categoria?.toLowerCase() === "bolsos"
  );

  const accesorios = products.filter(
    (p) =>
      p.category?.toLowerCase() === "accesorios" ||
      p.categoria?.toLowerCase() === "accesorios"
  );

  return (
    <>
      {/* 🧠 Meta tags para WhatsApp, Facebook y SEO */}
      <Helmet>
        <title>BCO - Mochilas, Bolsos y Accesorios</title>
        <meta
          name="description"
          content="Descubrí la colección de mochilas, bolsos y accesorios de BCO. Estilo, calidad y diseño únicos."
        />

        {/* ✅ Open Graph (para WhatsApp, Facebook, etc.) */}
        <meta
          property="og:title"
          content="BCO - Mochilas, Bolsos y Accesorios"
        />
        <meta
          property="og:description"
          content="Explorá la nueva colección de BCO. Envíos a todo el país."
        />
        <meta
          property="og:image"
          content={`${window.location.origin}/logoBCO.png`}
        />
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:type" content="website" />

        {/* 🐦 Twitter (opcional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="BCO - Mochilas, Bolsos y Accesorios"
        />
        <meta
          name="twitter:description"
          content="Explorá la nueva colección de BCO. Envíos a todo el país."
        />
        <meta
          name="twitter:image"
          content={`${window.location.origin}/logoBCO.png`}
        />
      </Helmet>

      {/* 🖼️ Hero Section */}
      <div
        className="w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://i.ibb.co/qF77tC31/separador.png')`,
        }}
      ></div>

      {/* 🔹 Carrusel de categorías principales */}
      <InfiniteCarousel />

      {/* 🎒 Sección Mochilas */}
      {mochilas.length > 0 && (
        <section className="pt-24 py-16 bg-gray-50">
          <ProductList products={mochilas} paginated={true} />
        </section>
      )}

      {/* Separador decorativo */}
      <Separador />

      {/* 🔹 Carrusel secundario */}
      <InfiniteCarousel2 />

      {/* 👜 Sección Bolsos */}
      {bolsos.length > 0 && (
        <section className="pt-24 py-16 bg-white">
          <ProductList products={bolsos} paginated={false} />
        </section>
      )}

      {/* Separador decorativo 2 */}
      <Separador2 />

      {/* 🔹 Carrusel terciario */}
      <InfiniteCarousel3 />

      {/* ✨ Sección Accesorios */}
      {accesorios.length > 0 && (
        <section className="pt-24 py-16 bg-gray-50">
          <ProductList products={accesorios} paginated={true} />
        </section>
      )}
      <ContactForm />
    </>
  );
};

export default Home;
