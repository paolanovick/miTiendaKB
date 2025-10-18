import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Dashboard from "../pages/Dashboard";
import Login from "./Login";

const Admin = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(admin);
  }, []);

  if (!isAdmin) {
    return <Login />;
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <>
      <header className="bg-slate-900 text-white fixed top-0 left-0 right-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto p-6 pt-32">
        <Dashboard
          products={products}
          onAddProduct={onAddProduct}
          onUpdateProduct={onUpdateProduct}
          onDeleteProduct={onDeleteProduct}
        />
      </div>
    </>
  );
};

export default Admin;
