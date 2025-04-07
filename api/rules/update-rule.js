const axios = require("axios");

module.exports = async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");


    const data = req.body;

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "PUT" && req.method !== "OPTIONS") {
        return res.status(405).json({ error: "Método no permitido" });
    }


    console.log("data", data)

    try {

        const response = await axios.post(
            "https://api.retool.com/v1/workflows/afd6e589-9ef7-49b3-9e51-01a517e7ee3c/startTrigger",
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Workflow-Api-Key": "retool_wk_e2b3191523ec44458a201ae8d946ef5f"
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