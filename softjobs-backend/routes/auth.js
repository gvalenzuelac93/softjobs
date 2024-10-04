const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/usuarios', registerUser);   // Ruta para registro de usuarios
router.post('/login', loginUser);         // Ruta para login
router.get('/usuarios', authenticateToken, getUser); // Ruta para obtener usuario autenticado

module.exports = router;