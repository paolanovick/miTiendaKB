import React from "react";
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
