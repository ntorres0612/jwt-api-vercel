// api/verify-password.js

const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    const { password, hashedPassword } = req.body;

    if (!password || !hashedPassword) {
        return res.status(400).json({ error: "Faltan campos: password y hashedPassword son requeridos" });
    }

    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return res.status(200).json({ match: isMatch });
    } catch (err) {
        return res.status(500).json({ error: "Error al verificar contraseña", details: err.message });
    }
};
