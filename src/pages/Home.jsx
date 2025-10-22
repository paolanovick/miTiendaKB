import React from "react";

import ProductList from "../components/ProductList";
import InfiniteCarousel from "../components/InfiniteCarousel";
import InfiniteCarousel2 from "../components/InfiniteCarousel2";
import Separador from "../components/Separador";

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
          backgroundImage: `url('https://br.louisvuitton.com/images/is/image//content/dam/lv/editorial-content/New-Homepage/2025/central/collections/lv-ski/W_LV_SKI_WW_HP_MainPush3_October_DI3.jpg?wid=1090')`,
        }}
      >
        <div className="flex items-center justify-center h-full bg-black/30">
          <h1 className="text-white text-5xl font-bold text-center drop-shadow-lg">
            Colección Exclusiva!
          </h1>
        </div>
      </div>

      {/* 🔹 Carrusel de categorías principales */}
      <InfiniteCarousel />

      {/* 🎒 Sección Mochilas */}
      {mochilas.length > 0 && (
        <motion.section
          className="py-16 bg-gray-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ProductList
            products={mochilas}
            title="🎒 Mochilas"
            paginated={true}
            animateCards={true}
          />
        </motion.section>
      )}

      {/* Separador decorativo */}
      <Separador />

      {/* 🔹 Carrusel secundario */}
      <InfiniteCarousel2 />

      {/* 👜 Sección Bolsos */}
      {bolsos.length > 0 && (
        <motion.section
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <ProductList
            products={bolsos}
            title="👜 Bolsos"
            paginated={false}
            animateCards={true}
          />
        </motion.section>
      )}

      {/* ✨ Sección Accesorios */}
      {accesorios.length > 0 && (
        <>
          <Separador />
          <motion.section
            className="py-16 bg-gray-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <ProductList
              products={accesorios}
              title="🕶️ Accesorios"
              paginated={true}
              animateCards={true}
            />
          </motion.section>
        </>
      )}
    </>
  );
};

export default Home;
