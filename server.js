const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🟢 Conexión a MongoDB Atlas
mongoose.connect("mongodb+srv://kevinmoyano:Kevinmoyano1201.@cluster0.dzd9cjc.mongodb.net/tokyotechDB?retryWrites=true&w=majority")
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error al conectar MongoDB:", err));

// 🟢 Servidor base
app.get("/", (req, res) => {
  res.send("Servidor y base de datos funcionando correctamente 🚀");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));