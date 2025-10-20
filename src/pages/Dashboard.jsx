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

  // 🧩 Función segura para parsear JSON
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
      const arr = Array.isArray(data) ? data : data ? [data] : [];
      const mapped = arr.map((p) => ({
        id: p.id || p._id || Date.now().toString(),
        name: p.name || p.nombre || "Sin nombre",
        description: p.description || p.descripcion || "",
        price: p.price || p.precio || 0,
        image: p.image || p.imagen || "https://placehold.co/300x200",
      }));
      setProducts(mapped);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 🔹 Agregar producto (POST)
  const addProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error("Error al agregar");

      await fetchProducts(); // Recargar lista
      alert("✅ Producto agregado correctamente");
    } catch (err) {
      console.error("Error al agregar:", err);
      setError("No se pudo agregar el producto");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Actualizar producto (PUT)
  const updateProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error("Error al actualizar");

      await fetchProducts(); // Recargar lista
      alert("✅ Producto actualizado correctamente");
    } catch (err) {
      console.error("Error al actualizar:", err);
      setError("No se pudo actualizar el producto");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Eliminar producto (DELETE)
  const deleteProduct = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${N8N_WEBHOOK_URL}?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar");

      await fetchProducts(); // Recargar lista
      alert("✅ Producto eliminado correctamente");
    } catch (err) {
      console.error("Error al eliminar:", err);
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

    if (!form.name || !form.description || !form.price) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const productData = {
      id: form.id || Date.now(),
      name: form.name,
      description: form.description,
      price: Number(form.price),
      image: form.image || "https://placehold.co/300x200",
    };

    if (form.id) {
      await updateProduct(productData);
    } else {
      await addProduct(productData);
    }

    setForm({ id: null, name: "", description: "", price: "", image: "" });
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  const resetForm = () => {
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
        <div className="col-span-full flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-3 rounded hover:bg-green-700 font-semibold disabled:bg-gray-400"
            disabled={loading}
          >
            {form.id ? "✏️ Actualizar" : "➕ Agregar"}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 bg-gray-500 text-white py-3 rounded hover:bg-gray-600 font-semibold"
              disabled={loading}
            >
              Cancelar
            </button>
          )}
        </div>
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
            <p className="text-gray-500 mb-2 line-clamp-2">{p.description}</p>
            <p className="text-green-600 font-semibold text-lg mb-3">
              ${p.price}
            </p>
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => handleEdit(p)}
                className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 font-semibold"
                disabled={loading}
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 font-semibold"
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
