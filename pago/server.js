import express from "express";
import axios from "axios";
import pino from "pino";

const logger = pino({
  level: "info"
});

const app = express();
app.use(express.json());
const PORT = 8080;

app.post("/pagos", async (req, res) => {
  try {
    const { costo, producto } = req.body;

    logger.info({ producto, costo }, "Nueva solicitud de pago");

    const response = await axios.get("http://procesa-pago-service:9090/procesa");

    const uuid = response.data;

    logger.info({ uuid }, "UUID recibido desde procesa-pago");

    res.json({
      mensaje: "Pago procesado correctamente",
      producto,
      costo,
      transactionId: uuid
    });

  } catch (error) {
    logger.error({ error: error.message }, "Error procesando pago");
    res.status(500).json({ error: "Error procesando el pago" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Servidor escuchando en puerto ${PORT}`);
});

app.get("/pagos", (req, res) => {
  res.send("hola desde pagos");
});