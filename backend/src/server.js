// src/server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// =====================
// Importar rutas
// =====================
const authRoutes = require('./routes/auth.routes');
const groupRoutes = require('./routes/groups.routes');
const questionRoutes = require('./routes/questions.routes');
const missionRoutes = require('./routes/missions.routes');
const assignmentRoutes = require('./routes/assignments.routes');
const studentRoutes = require('./routes/student.routes');
const gameRoutes = require('./routes/game.routes');
const profileRoutes = require('./routes/profile.routes');
const statsRoutes = require('./routes/stats.routes');
const uploadsRouter = require('./routes/uploads');

// =====================
// Configuración de CORS
// =====================
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://172.20.10.5:5173" // tu red local (wifi)
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true, // 🔑 permite enviar cookies y headers de autenticación
};

// Si está en producción detrás de un proxy (Heroku, Vercel, Nginx, etc.)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // 🔑 necesario para que secure cookies funcionen con HTTPS
}

// =====================
// Middlewares globales
// =====================
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// =====================
// Carpeta pública
// =====================
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// =====================
// Rutas de la API
// =====================
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/uploads', uploadsRouter);

// =====================
// Iniciar servidor
// =====================
app.listen(port, () => {
  console.log(`✅ Servidor de LogiX corriendo en http://localhost:${port}`);
});
