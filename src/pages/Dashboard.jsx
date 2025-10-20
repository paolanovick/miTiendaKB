import React, { useState, useEffect, useCallback } from "react";

// ✅ URL de tu Webhook en n8n
const N8N_WEBHOOK_URL = "https://n8n.triptest.com.ar/webhook/miTienda";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    image: "",
  });

  // 🧩 Función segura para parsear JSON (evita errores si n8n falla)
  const safeJson = async (response) => {
    try {
      return await response.json();
    } catch {
      return null;
    }
  };

  // 🔹 Función para cargar productos (GET)
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(N8N_WEBHOOK_URL);
      const data = await safeJson(response);
      // Asegurarse que siempre sea un array
      const arr = Array.isArray(data) ? data : data ? [data] : [];
      const mapped = arr.map((p) => ({
        id:
          p.id || p._id || (p.product && p.product.id) || Date.now().toString(),
        name:
          p.name || p.nombre || (p.product && p.product.name) || "Sin nombre",
        description:
          p.description ||
          p.descripcion ||
          (p.product && p.product.description) ||
          "",
        price: p.price || p.precio || (p.product && p.product.price) || 0,
        image:
          p.image ||
          p.imagen ||
          (p.product && p.product.image) ||
          "https://placekitten.com/300/200",
      }));
      setProducts(mapped);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError("No se pudieron cargar los productos desde la base de datos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 🔹 Función para agregar producto (POST)
 const addProduct = async (productData) => {
   setLoading(true);
   setError(null);
   try {
     console.log("📤 Enviando producto:", productData);

     const response = await fetch(N8N_WEBHOOK_URL, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(productData),
     });

     const result = await safeJson(response);
     console.log("📥 Respuesta del servidor:", result);

     if (!response.ok || !result)
       throw new Error("Error en la respuesta del servidor");

     // ✅ Agregar directamente al estado para que aparezca de inmediato
     setProducts((prev) => [
       ...prev,
       {
         id: productData.id,
         name: productData.name,
         description: productData.description,
         price: productData.price,
         image: productData.image || "https://placekitten.com/300/200",
       },
     ]);
   } catch (err) {
     console.error("❌ Error al agregar producto:", err);
     setError("No se pudo agregar el producto");
   } finally {
     setLoading(false);
   }
 };


  // 🔹 Manejadores del formulario
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.price) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: form.name,
      description: form.description,
      price: Number(form.price),
      image: form.image || "https://placekitten.com/300/200",
    };

    await addProduct(newProduct);

    setForm({ id: null, name: "", description: "", price: "", image: "" });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        🛍️ Administrar Productos
      </h2>

      {/* Mensajes */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {loading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          Cargando...
        </div>
      )}

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-6 rounded-lg shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600"
          required
          disabled={loading}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600"
          required
          disabled={loading}
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          className="border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600"
          required
          disabled={loading}
        />
        <input
          type="text"
          name="image"
          placeholder="URL Imagen"
          value={form.image}
          onChange={handleChange}
          className="border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded hover:bg-green-700 col-span-full font-semibold disabled:bg-gray-400"
          disabled={loading}
        >
          Agregar producto
        </button>
      </form>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 && !loading && (
          <p className="text-gray-600 col-span-full text-center">
            No hay productos disponibles.
          </p>
        )}

        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg shadow hover:shadow-xl p-4 flex flex-col bg-white transition-all"
          >
            <img
              src={p.image}
              alt={p.name}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h3 className="font-bold text-lg text-gray-800">{p.name}</h3>
            <p className="text-gray-500 mb-2">{p.description}</p>
            <p className="text-green-600 font-semibold text-lg mb-3">
              ${p.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
