const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5173;


// Importar rutas

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


// Configuración de CORS MEJORADA

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://172.20.10.5:5173",
      "http://192.168.1.2:5173"
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Origin no permitido pero permitiendo:', origin);
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}


// Middlewares globales

app.use(cookieParser());
app.use(express.json());

//  DEBUG MIDDLEWARE (AGREGAR ESTO)

app.use((req, res, next) => {
  console.log('🔍 DEBUG COOKIES - URL:', req.url);
  console.log('🍪 Cookies recibidas:', req.cookies);
  console.log('🌐 Origin:', req.headers.origin);
  console.log('📨 Cookie Header:', req.headers.cookie);
  console.log('-----------------------------------');
  next();
});


// Carpeta pública

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// Rutas de la API

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


// SERVIR FRONTEND (AL FINAL)

app.use(express.static(path.join(__dirname, '../../frontend/dist')));


// RUTA CATCH-ALL (ÚLTIMA)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});


// Iniciar servidor

app.listen(port, () => {
  console.log(`✅ Servidor de LogiX corriendo en http://localhost:${port}`);
});