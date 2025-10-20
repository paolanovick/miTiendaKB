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

// URLs de tu n8n en producción (DigitalOcean)
const API_BASE = "https://n8n.triptest.com.ar/webhook";
const API_PRODUCTS = `${API_BASE}/miTienda`;

function App() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();

  // Cargar productos desde n8n (GET)
  React.useEffect(() => {
    fetchProducts();
  }, []);

const fetchProducts = async () => {
  try {
    setLoading(true);
    const response = await fetch(API_PRODUCTS); // GET /miTienda
    const data = await response.json();

    // 🔹 Mapeo de compatibilidad con el Dashboard
    const arr = Array.isArray(data) ? data : [data];
    const mapped = arr.map((p) => ({
      id: p.id || p._id,
      name: p.name || p.nombre,
      description: p.description || p.descripcion,
      price: p.price || p.precio,
      image:
        p.image || p.imagen || "https://placehold.co/300x200?text=Sin+imagen",
    }));

    setProducts(mapped);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  } finally {
    setLoading(false);
  }
};


  const handleAddProduct = async (product) => {
    try {
      const response = await fetch(API_PRODUCTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, action: "add" }),
      });

      if (response.ok) {
        fetchProducts(); // Recargar lista
      } else {
        alert("Error al agregar producto");
      }
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const handleUpdateProduct = async (product) => {
    try {
      const response = await fetch(API_PRODUCTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, action: "update" }),
      });

      if (response.ok) {
        fetchProducts(); // Recargar lista
      } else {
        alert("Error al actualizar producto");
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(API_PRODUCTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "delete" }),
      });

      if (response.ok) {
        fetchProducts(); // Recargar lista
      } else {
        alert("Error al eliminar producto");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
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
