const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    const payload = req.body;
    const SECRET = "nTorres.12";
    try {
        const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
