const jwt = require('jsonwebtoken');
const supabase = require('../config/supabaseClient');
const bcrypt = require('bcrypt');

const test = (req, res) => {
  res.send('¡Hola, mundo desde el backend de LogiX!');
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (role !== 'Estudiante' && role !== 'Profesor') {
      return res.status(400).json({ error: 'Rol no válido.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword, role }])
      .select('id, name, email, role, avatar, bio, grade, institution')
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Usuario registrado con éxito', user: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inesperado en el servidor' });
  }
};

//  FUNCIÓN LOGIN CORREGIDA
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });

    //  CONFIGURACIÓN DE COOKIES CORREGIDA
    const cookieOptions = {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 5, // 5 horas
      secure: false, // ← FALSE en desarrollo
      sameSite: 'lax', // ← LAX en desarrollo
      path: '/' // ← AGREGAR path
    };

    res.cookie('token', token, cookieOptions);
    res.json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        grade: user.grade,
        institution: user.institution,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inesperado en el servidor' });
  }
};

//  FUNCIÓN VALIDATE TOKEN CORREGIDA
const validateToken = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
      }

      const { data: user, error } = await supabase
        .from('users')
        .select('id, name, email, role, avatar, bio, grade, institution')
        .eq('id', decoded.id)
        .single();

      if (error || !user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const newToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '5h' }
      );

      //  MISMAS CONFIGURACIONES DE COOKIE
      res.cookie("token", newToken, {
        httpOnly: true,
        secure: false, // ← FALSE
        sameSite: 'lax', // ← LAX
        maxAge: 1000 * 60 * 60 * 5,
        path: '/'
      });

      res.json({ user });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error validando token" });
  }
};

//  FUNCIÓN LOGOUT CORREGIDA
const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // ← FALSE
    sameSite: 'lax', // ← LAX
    path: '/'
  });
  res.json({ message: "Sesión cerrada correctamente" });
};

module.exports = {
  register,
  login,
  test,
  validateToken,
  logout,
};