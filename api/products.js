import { MongoClient, ObjectId } from "mongodb";

const uri =
  "mongodb+srv://adminTienda:37Paola37@mitienda.qgltriw.mongodb.net/miTienda?retryWrites=true&w=majority";

let client;
let db;

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("miTienda");
  }
  return db;
}

export default async function handler(req, res) {
  try {
    const db = await connectDB();
    const productsCollection = db.collection("products");

    if (req.method === "GET") {
      const products = await productsCollection.find({}).toArray();
      return res.status(200).json(products);
    }

    if (req.method === "POST") {
      const newProduct = req.body;
      await productsCollection.insertOne(newProduct);
      return res
        .status(201)
        .json({ message: "Producto agregado correctamente" });
    }

    if (req.method === "PUT") {
      const { id, ...updateData } = req.body;
      await productsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      return res
        .status(200)
        .json({ message: "Producto actualizado correctamente" });
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      await productsCollection.deleteOne({ _id: new ObjectId(id) });
      return res
        .status(200)
        .json({ message: "Producto eliminado correctamente" });
    }

    return res.status(405).json({ message: "Método no permitido" });
  } catch (error) {
    console.error("❌ Error en la API:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}
