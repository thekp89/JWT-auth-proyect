const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path'); // Módulo para trabajar con rutas de archivos

const app = express();
const PORT = 3001;
const secretKey = 'notasecret';

// Configurar Express para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.js'));
});

app.use(express.json());

// Ruta para el inicio de sesión
app.post('/login', (req, res) => {
    // Verificar las credenciales
    const { username, password } = req.body;
    if (username === 'root' && password === 'admin') {
        // Si las credenciales son válidas, genera un token JWT
        const token = jwt.sign({ username }, secretKey);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Credenciales inválidas' });
    }
});

// Middleware para verificar el token en rutas protegidas
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Token inválido' });
    }
}

// Ruta protegida de ejemplo
app.get('/ruta-protegida', verifyToken, (req, res) => {
    res.json({ mensaje: 'Esta es una ruta protegida' });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

