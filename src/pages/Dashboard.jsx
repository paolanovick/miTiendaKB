import React, { useState } from "react";

const Dashboard = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price) return;

    const productData = {
      id: form.id || Date.now(),
      name: form.name,
      description: form.description,
      price: Number(form.price),
      image: form.image || "https://via.placeholder.com/300x200",
    };

    form.id ? onUpdateProduct(productData) : onAddProduct(productData);
    setForm({ id: null, name: "", description: "", price: "", image: "" });
  };

  const handleEdit = (product) => setForm(product);
  const handleDelete = (id) => onDeleteProduct(id);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Administrar Productos</h2>

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
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          className="border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL Imagen"
          value={form.image}
          onChange={handleChange}
          className="border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded hover:bg-green-700 col-span-full font-semibold"
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
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
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
