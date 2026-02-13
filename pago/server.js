import express from "express";
import axios from "axios";
const app = express();
app.use(express.json());
const PORT = 8080;

app.post("/pagos", async (req,res)=>{

  let costo = req.body.costo;
  let producto = req.body.producto;
  const uuid = await axios.get("http://procesa-pago-service:9090/procesa");
  res.json(uuid.data);
});

app.listen(PORT,"0.0.0.0", ()=>{
  console.log("servidor escuchando en puerto ", PORT);
})
