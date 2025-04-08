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


    try {

        const response = await axios.post(
            "https://api.retool.com/v1/workflows/13b94b53-49bd-44ee-a859-3dcfa5a4c004/startTrigger",
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Workflow-Api-Key": "retool_wk_60ea88e3f70a482ea1da01c640ab2212"
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