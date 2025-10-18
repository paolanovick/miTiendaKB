import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 pt-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
