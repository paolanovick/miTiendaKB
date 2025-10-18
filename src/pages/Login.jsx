import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
      window.location.reload(); // Recarga la página
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg w-96">
        <img src="/logoKB-1.png" alt="Logo" className="h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded p-3 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-3 mb-4"
          required
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Entrar
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Demo: admin / 1234
        </p>
      </form>
    </div>
  );
};

export default Login;
