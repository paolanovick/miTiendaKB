import React from "react";
import ProductListPaginated from "../components/ProductListPaginated";
import InfiniteCarousel from "../components/InfiniteCarousel";

const Home = ({ products }) => {
  return (
    <>
      {/* Hero Image */}
      <div
        className="w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://br.louisvuitton.com/images/is/image//content/dam/lv/editorial-content/New-Homepage/2025/central/collections/lv-ski/W_LV_SKI_WW_HP_MainPush3_October_DI3.jpg?wid=1090')`,
        }}
      >
        <div className="flex items-center justify-center h-full bg-black/20">
          <h1 className="text-white text-5xl font-bold text-center">
            Colección Exclusiva!
          </h1>
        </div>
      </div>

      {/* Carrusel de categorías */}
      <InfiniteCarousel />

      {/* Productos con paginación */}
      <ProductListPaginated products={products} />
    </>
  );
};

export default Home;
