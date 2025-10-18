import React, { useState, useEffect } from "react";

// URLs de tus webhooks de n8n
// Si webhook/miTienda no funciona, usa la Test URL de n8n temporalmente
const N8N_WEBHOOK_URL = "http://localhost:5678/webhook-test/miTienda"; // Cambia a test si es necesario

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

  // Cargar productos al iniciar
  useEffect(() => {
    fetchProducts();
  }, []);

  // Obtener todos los productos desde MongoDB
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(N8N_WEBHOOK_URL);
      if (!response.ok) throw new Error("Error al cargar productos");
      const data = await response.json();
      // MongoDB devuelve un array de productos
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("No se pudieron cargar los productos desde la base de datos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Agregar nuevo producto
  const addProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          image: productData.image,
        }),
      });
      if (!response.ok) throw new Error("Error al agregar producto");
      // Recargar productos desde la base de datos
      await fetchProducts();
    } catch (err) {
      setError("No se pudo agregar el producto");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar producto existente (por implementar en n8n)
  const updateProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      // Actualizar localmente y recargar desde BD
      await fetchProducts();
      console.log("Producto actualizado:", productData);
    } catch (err) {
      setError("No se pudo actualizar el producto");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto (por implementar en n8n)
  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      // Eliminar localmente y recargar desde BD
      await fetchProducts();
      console.log("Producto eliminado:", id);
    } catch (err) {
      setError("No se pudo eliminar el producto");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price) return;

    const productData = {
      id: form.id || Date.now().toString(),
      name: form.name,
      description: form.description,
      price: Number(form.price),
      image: form.image || "https://via.placeholder.com/300x200",
    };

    if (form.id) {
      await updateProduct(productData);
    } else {
      await addProduct(productData);
    }

    setForm({ id: null, name: "", description: "", price: "", image: "" });
  };

  const handleEdit = (product) => setForm(product);
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Administrar Productos</h2>

      {/* Mensajes de estado */}
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
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-white p-6 rounded-lg shadow"
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
          {form.id ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg shadow hover:shadow-lg p-4 flex flex-col"
          >
            <img
              src={p.image}
              alt={p.name}
              className="h-40 object-cover rounded mb-2"
            />
            <h3 className="font-bold text-lg mb-1">{p.name}</h3>
            <p className="text-gray-600 mb-2">{p.description}</p>
            <p className="text-green-600 font-semibold mb-2">${p.price}</p>
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 disabled:bg-gray-400"
                disabled={loading}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 disabled:bg-gray-400"
                disabled={loading}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
