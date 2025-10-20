require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { })
  .then(()=> console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('Mongo error', err));

/* REGISTER */
app.post('/register', async (req, res) => {
  try {
    const { name, correo, password } = req.body;
    if (!name || !correo || !password) return res.status(400).json({ mensaje: 'Campos incompletos' });
    const exists = await User.findOne({ correo });
    if (exists) return res.status(400).json({ mensaje: 'Correo ya registrado' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ name, correo, passwordHash: hash });
    await user.save();
    return res.status(201).json({ usuario: user.name });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensaje: 'Error en servidor' });
  }
});

/* LOGIN */
app.post('/login', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) return res.status(400).json({ mensaje: 'Campos incompletos' });

    const user = await User.findOne({ correo });
    if (!user) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

    const ok = await bcrypt.compare(contrasena, user.passwordHash);
    if (!ok) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    // opcional: return token JWT; aquí devolvemos nombre
    return res.json({ usuario: user.name });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensaje: 'Error en servidor' });
  }
});

/* opcional - prueba */
app.get('/', (req,res)=> res.send('OK'));

app.listen(PORT, ()=> console.log(`Servidor activo en http://localhost:${PORT}`));
