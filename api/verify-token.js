import jwt from "jsonwebtoken";

export default function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    try {
        const SECRET = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, SECRET);
        res.status(200).json({ valid: true, data: decoded });
    } catch (err) {
        res.status(403).json({ error: "Token inválido", details: err.message });
    }
}
