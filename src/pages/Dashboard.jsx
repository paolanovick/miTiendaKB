import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("todos");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    precio: "",
    image: "",
    categoria: "",
  });

  // 🔹 Cargar productos desde la API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      console.log("📦 Datos crudos de la API:", data);

      const mappedProducts = data.map((p) => ({
        id: p._id || p.id,
        nombre: p.nombre || p.name || "Sin nombre",
        descripcion: p.descripcion || p.description || "",
        precio: p.precio || p.price || 0,
        image: p.image || p.imagen || "",
        categoria: p.categoria || p.category || "", // 👈 CORREGIDO: acepta ambos campos
      }));

      console.log("✅ Productos mapeados:", mappedProducts);
      console.log("📊 Por categoría:", {
        morrales: mappedProducts.filter((p) => p.categoria === "morrales")
          .length,
        mochilas: mappedProducts.filter((p) => p.categoria === "mochilas")
          .length,
        accesorios: mappedProducts.filter((p) => p.categoria === "accesorios")
          .length,
        carteras: mappedProducts.filter((p) => p.categoria === "carteras")
          .length,
      });

      setProducts(mappedProducts);
      setFiltered(mappedProducts);
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

  // 🔹 Filtrar productos según la categoría elegida
  useEffect(() => {
    if (categoryFilter === "todos") {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter(
          (p) => p.categoria?.toLowerCase() === categoryFilter.toLowerCase()
        )
      );
    }
  }, [categoryFilter, products]);

  // 🔹 Manejo de cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Guardar producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.descripcion || !form.precio || !form.categoria) {
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
            categoria: form.categoria,
          }
        : {
            nombre: form.nombre,
            descripcion: form.descripcion,
            precio: Number(form.precio),
            image: form.image,
            categoria: form.categoria,
          };

      console.log("📤 Enviando al servidor:", body);

      const response = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Error al guardar producto");

      await fetchProducts();
      setForm({
        id: null,
        nombre: "",
        descripcion: "",
        precio: "",
        image: "",
        categoria: "",
      });

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
      categoria: product.categoria || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔹 Eliminar producto
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

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

      {/* 🧾 Formulario */}
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
           if (value.includes("drive.google.com")) {
             const id = value.split("/d/")[1]?.split("/")[0];
             if (id) {
               value = `https://drive.google.com/uc?export=view&id=${id}`;
             }
           }
            setForm({ ...form, image: value });
          }}
          className="border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600"
          disabled={loading}
        />

        {/* 🔹 Selector de Categoría */}
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          className="border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600"
          required
          disabled={loading}
        >
          <option value="">Seleccionar categoría</option>
          <option value="morrales">🎒 Morrales</option>
          <option value="mochilas">👜 Mochilas</option>
          <option value="accesorios">🕶️ Accesorios</option>
          <option value="carteras">💼 Carteras</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded hover:bg-green-700 col-span-full font-semibold disabled:bg-gray-400"
          disabled={loading}
        >
          {form.id ? "💾 Actualizar producto" : "➕ Agregar producto"}
        </button>
      </form>

      {/* 🔸 Filtro por categoría */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className="font-semibold text-gray-700">Filtrar por:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-600"
          disabled={loading}
        >
          <option value="todos">📦 Todos</option>
          <option value="morrales">🎒 Morrales</option>
          <option value="mochilas">👜 Mochilas</option>
          <option value="accesorios">🕶️ Accesorios</option>
          <option value="carteras">💼 Carteras</option>
        </select>
      </div>

      {/* 🧩 Lista de productos - DISEÑO ACTUALIZADO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-24">
        {filtered.length === 0 && !loading && (
          <p className="text-gray-600 col-span-full text-center">
            No hay productos para mostrar.
          </p>
        )}

        {filtered.map((p) => (
          <div key={p.id} className="relative group">
            {/* Imagen flotante - mitad afuera, mitad dentro */}
            <div className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2 bg-white z-10">
              <img
                src={p.image}
                alt={p.nombre}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tarjeta de información */}
            <div
              className="w-full rounded-2xl shadow-md pt-28 sm:pt-32 pb-6 px-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl relative"
              style={{ backgroundColor: "#f2d9a0" }}
            >
              {/* Título */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                {p.nombre}
              </h3>

              {/* Categoría */}
              <p className="text-sm text-gray-600 mb-4 capitalize">
                {p.categoria || "sin categoría"}
              </p>

              {/* Precio */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-amber-950">
                  ${p.precio.toLocaleString()}
                </span>
              </div>

              {/* Botones */}
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
                  disabled={loading}
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                  disabled={loading}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
