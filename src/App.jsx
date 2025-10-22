import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./components/CartProvider";
import Header from "./components/Header";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";

const API_PRODUCTS = "/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // 🧩 Función segura para parsear JSON
  const safeJson = async (response) => {
    try {
      return await response.json();
    } catch {
      return null;
    }
  };

  // 🔹 Cargar productos desde n8n (GET)
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_PRODUCTS, { method: "GET" });
      if (!response.ok) throw new Error("Error al cargar productos");

      const data = await safeJson(response);
      console.log("📥 Datos recibidos del servidor:", data);

      // Si data es null o undefined, usar array vacío
      if (!data) {
        console.log("⚠️ No hay datos del servidor");
        setProducts([]);
        return;
      }

      const arr = Array.isArray(data) ? data : [data];

      // Filtrar elementos null o undefined antes de mapear
      const mapped = arr
        .filter((p) => p !== null && p !== undefined)
        .map((p) => ({
          id: p.id || p._id,
          name: p.name || p.nombre || "Sin nombre",
          description: p.description || p.descripcion || "",
          price: p.price || p.precio || 0,
          image: p.image || p.imagen || "https://placekitten.com/300/200",
        }));

      console.log("✅ Productos mapeados:", mapped);
      setProducts(mapped);
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
      setProducts([]); // Asegurar que products sea array vacío en caso de error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 🔹 AGREGAR producto - Usa POST (REST estándar)
  const handleAddProduct = async (product) => {
    setLoading(true);
    try {
      const response = await fetch(API_PRODUCTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const result = await safeJson(response);
      console.log("📥 Respuesta al agregar:", result);

      if (!response.ok) throw new Error("Error al agregar producto");

      alert("✅ Producto agregado exitosamente");
      fetchProducts();
    } catch (error) {
      console.error("❌ Error al agregar producto:", error);
      alert("❌ Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 ACTUALIZAR producto - Usa PUT (REST estándar)
  const handleUpdateProduct = async (product) => {
    setLoading(true);
    try {
      const response = await fetch(API_PRODUCTS, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const result = await safeJson(response);
      console.log("📥 Respuesta al actualizar:", result);

      if (!response.ok) throw new Error("Error al actualizar producto");

      alert("✅ Producto actualizado exitosamente");
      fetchProducts();
    } catch (error) {
      console.error("❌ Error al actualizar producto:", error);
      alert("❌ Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 ELIMINAR producto - Usa DELETE (REST estándar)
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_PRODUCTS, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await safeJson(response);
      console.log("📥 Respuesta al eliminar:", result);

      if (!response.ok) throw new Error("Error al eliminar producto");

      alert("✅ Producto eliminado exitosamente");
      fetchProducts();
    } catch (error) {
      console.error("❌ Error al eliminar producto:", error);
      alert("❌ Error al conectar con el servidor");
    } finally {
      setLoading(false);
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
