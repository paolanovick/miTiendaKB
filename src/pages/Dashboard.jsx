import React, { useState, useEffect } from "react";

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

  // 🔹 Cargar productos al iniciar
  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Obtener productos desde n8n (GET)
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(N8N_WEBHOOK_URL, { method: "GET" });
      if (!response.ok) throw new Error("Error al cargar productos");

      const data = await response.json();
      const arr = Array.isArray(data) ? data : [data];

      const mapped = arr.map((p) => ({
        id: p.id || p._id,
        name: p.name || p.nombre,
        description: p.description || p.descripcion,
        price: p.price || p.precio,
        image: p.image || "https://placehold.co/300x200",
      }));

      setProducts(mapped);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError("No se pudieron cargar los productos desde la base de datos");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Agregar producto (POST)
  const addProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      console.log("📤 Enviando producto:", productData);

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...productData, action: "create" }),
      });

      if (!response.ok) throw new Error("Error al agregar");

      await fetchProducts(); // Refresca la lista
    } catch (err) {
      console.error("❌ Error al agregar producto:", err);
      setError("No se pudo agregar el producto");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Actualizar producto
  const updateProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...productData, action: "update" }),
      });

      if (!response.ok) throw new Error("Error al actualizar");

      await fetchProducts();
    } catch (err) {
      console.error("❌ Error al actualizar:", err);
      setError("No se pudo actualizar el producto");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Eliminar producto
  const deleteProduct = async (id) => {
    if (!window.confirm("¿Estás segura de eliminar este producto?")) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "delete" }),
      });

      if (!response.ok) throw new Error("Error al eliminar");

      await fetchProducts();
    } catch (err) {
      console.error("❌ Error al eliminar:", err);
      setError("No se pudo eliminar el producto");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Manejadores del formulario
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Formulario enviado");

    if (!form.name || !form.description || !form.price) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const productData = {
      id: form.id || Date.now().toString(),
      name: form.name,
      description: form.description,
      price: Number(form.price),
      image: form.image || "https://via.placeholder.com/300x200",
    };

    console.log("📦 Producto a enviar:", productData);

    if (form.id) {
      await updateProduct(productData);
    } else {
      await addProduct(productData);
    }

    // Limpiar formulario
    setForm({ id: null, name: "", description: "", price: "", image: "" });
  };

  // 🔹 Cargar producto para editar
  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    // Scroll al formulario
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          {form.id ? "💾 Actualizar producto" : "➕ Agregar producto"}
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
            <p className="text-gray-500 mb-2 text-sm">{p.description}</p>
            <p className="text-green-600 font-semibold text-lg mb-3">
              ${p.price}
            </p>

            {/* Botones de acción */}
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => handleEdit(p)}
                className="flex-1 bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                disabled={loading}
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => deleteProduct(p.id)}
                className="flex-1 bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition-colors disabled:bg-gray-400"
                disabled={loading}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
