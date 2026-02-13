import express from "express";
import crypto from "crypto";


const app = express();
app.use(express.json());
const PORT = 9090;

app.get("/procesa", (req,res)=>{
  res.json({
    uuid: crypto.randomUUID()
  });
});

app.listen(PORT,"0.0.0.0", ()=>{
  console.log("servidor escuchando en puerto ", PORT);
});

app.get("/procesa", (req,res)=>{
  res.send("hola desde procesa pago");
})
