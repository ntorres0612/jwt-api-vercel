// hash-password.js

const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "La contraseña es requerida" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return res.status(200).json({ hashedPassword });
    } catch (err) {
        return res.status(500).json({ error: "Error al encriptar", details: err.message });
    }
};
