import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./components/CartProvider";
import Header from "./components/Header";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";

// URL de tu API (cambiará cuando subas a Vercel)
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/products";

function App() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();

  // Cargar productos desde la API
  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.length === 0) {
        // Si no hay productos, crear productos por defecto
        const defaultProducts = [
          {
            id: Date.now(),
            name: "Producto 1",
            price: 100,
            image: "https://via.placeholder.com/300",
            description: "Descripción del producto",
            stock: 5,
            category: "Carteras",
            sku: "CART-001",
            specifications: "Material: Cuero, Color: Negro, Tamaño: Grande",
            reviews: [],
          },
          {
            id: Date.now() + 1,
            name: "Producto 2",
            price: 200,
            image: "https://via.placeholder.com/300",
            description: "Descripción del producto",
            stock: 3,
            category: "Carteras",
            sku: "CART-002",
            specifications: "Material: Cuero, Color: Marrón, Tamaño: Mediano",
            reviews: [],
          },
        ];

        // Insertar productos por defecto
        for (const product of defaultProducts) {
          await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
          });
        }

        // Recargar productos
        fetchProducts();
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
      // Si falla la API, usar localStorage como fallback
      const stored = localStorage.getItem("products");
      if (stored) {
        setProducts(JSON.parse(stored));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
      } else {
        alert("Error al agregar producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const handleUpdateProduct = async (updated) => {
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (response.ok) {
        const newProducts = products.map((p) =>
          p.id === updated.id ? updated : p
        );
        setProducts(newProducts);
      } else {
        alert("Error al actualizar producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const filtered = products.filter((p) => p.id !== id);
        setProducts(filtered);
      } else {
        alert("Error al eliminar producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Cargando productos...</div>
      </div>
    );
  }

  return (
    <CartProvider>
      {location.pathname !== "/admin" && location.pathname !== "/login" && (
        <Header />
      )}

      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route
          path="/producto/:id"
          element={<ProductDetail products={products} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <Admin
              products={products}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          }
        />
        <Route path="/carrito" element={<CartPage />} />
      </Routes>

      {location.pathname !== "/admin" && location.pathname !== "/login" && (
        <Footer />
      )}
    </CartProvider>
  );
}

export default App;
