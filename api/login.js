const axios = require("axios");

module.exports = async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // if (req.method === "OPTIONS") {
    //     return res.status(200).end();
    // }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        const { username, password } = req.body;

        const response = await axios.post(
            "https://api.retool.com/v1/workflows/3a40931f-933b-433a-97ec-4f1bba3b3bb9/startTrigger",
            { username, password },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Workflow-Api-Key": "retool_wk_e16985be4a1246169dcd1d0508ddaecd"
                }
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error en proxy:", error.response?.data || error.message);
        res.status(500).json({
            error: "Error al comunicarse con Retool",
            details: error.response?.data || error.message
        });
    }
};
