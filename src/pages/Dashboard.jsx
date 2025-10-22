import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    precio: "",
    image: "",
  });

  // 🔹 Cargar productos desde API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      const mappedProducts = data.map((p) => ({
        id: p._id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: p.precio,
        image: p.image,
      }));

      setProducts(mappedProducts);
    } catch (err) {
      console.error("❌ Error al cargar productos:", err);
      setError("No se pudieron cargar los productos");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Manejo del formulario
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.descripcion || !form.precio) {
      setError("Por favor completa todos los campos obligatorios");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const method = form.id ? "PUT" : "POST";
      const body = form.id
        ? {
            id: form.id,
            nombre: form.nombre,
            descripcion: form.descripcion,
            precio: Number(form.precio),
            image: form.image,
          }
        : {
            nombre: form.nombre,
            descripcion: form.descripcion,
            precio: Number(form.precio),
            image: form.image,
          };

      const response = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.error || "Error al guardar producto");

      await fetchProducts();
      setForm({ id: null, nombre: "", descripcion: "", precio: "", image: "" });

      setMensaje(
        form.id
          ? "Producto actualizado con éxito ✅"
          : "Producto agregado con éxito ✅"
      );
      setTimeout(() => setMensaje(""), 3000);
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar el producto");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Editar producto
  const handleEdit = (product) => {
    setForm({
      id: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      image: product.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔹 Eliminar producto
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás segura de eliminar este producto?")) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Error al eliminar");

      await fetchProducts();

      setMensaje("Producto eliminado ✅");
      setTimeout(() => setMensaje(""), 3000);
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el producto");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
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
      {mensaje && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {mensaje}
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
          name="nombre"
          placeholder="Nombre del producto"
          value={form.nombre}
          onChange={handleChange}
          className="border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600"
          required
          disabled={loading}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600"
          required
          disabled={loading}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600"
          required
          disabled={loading}
        />
        <input
          type="text"
          name="image"
          placeholder="URL Imagen (Drive o enlace directo)"
          value={form.image}
          onChange={(e) => {
            let value = e.target.value;
            // Si el enlace es de Drive, lo convertimos al formato embed
            if (value.includes("drive.google.com/file/d/")) {
              const match = value.match(/\/d\/(.*?)\//);
              if (match && match[1]) {
                const id = match[1];
                value = `https://drive.google.com/uc?export=view&id=${id}`;
              }
            }
            setForm({ ...form, image: value });
          }}
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
              alt={p.nombre}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h3 className="font-bold text-lg text-gray-800">{p.nombre}</h3>
            <p className="text-gray-500 mb-2 text-sm">{p.descripcion}</p>
            <p className="text-green-600 font-semibold text-lg mb-3">
              ${p.precio}
            </p>

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => handleEdit(p)}
                className="flex-1 bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition-colors text-sm"
                disabled={loading}
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="flex-1 bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition-colors text-sm"
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
