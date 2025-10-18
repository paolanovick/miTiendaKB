/* eslint-env node */

import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri);
  const db = client.db("miTienda");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("productos");

    switch (req.method) {
      case "GET": {
        // Obtener todos los productos
        const products = await collection.find({}).toArray();
        return res.status(200).json(products);
      }

      case "POST": {
        // Crear nuevo producto
        const newProduct = {
          ...req.body,
          createdAt: new Date(),
        };

        const result = await collection.insertOne(newProduct);
        const inserted = await collection.findOne({ _id: result.insertedId });

        return res.status(201).json(inserted);
      }

      case "PUT": {
        // Actualizar producto
        const { id, _id, ...updateData } = req.body;
        const productId = id || _id;

        if (!productId) {
          return res.status(400).json({ error: "ID requerido" });
        }

        await collection.updateOne(
          { id: Number(productId) },
          { $set: { ...updateData, updatedAt: new Date() } }
        );

        const updated = await collection.findOne({ id: Number(productId) });
        return res.status(200).json(updated);
      }

      case "DELETE": {
        // Eliminar producto
        const deleteId = req.query.id || req.body.id;

        if (!deleteId) {
          return res.status(400).json({ error: "ID requerido" });
        }

        await collection.deleteOne({ id: Number(deleteId) });
        return res.status(200).json({ message: "Producto eliminado" });
      }

      default: {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res
          .status(405)
          .json({ error: `Método ${req.method} no permitido` });
      }
    }
  } catch (error) {
    console.error("Error en API:", error);
    return res.status(500).json({
      error: "Error del servidor",
      details: error.message,
    });
  }
}
