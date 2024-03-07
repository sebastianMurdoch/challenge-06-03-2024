import __dirname from "../src/utils.js";
import path from 'path';
import express from "express";
import {Server} from "socket.io"
import {engine} from 'express-handlebars';

import { router as productsRouter } from "./routes/products.router.js";
import { router as cartsRouter } from "./routes/carts.router.js";
import { router as vistasRouter } from "./routes/vistas.router.js"

const PORT = 8080;
let io;

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,'/public')));

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

app.use("/", vistasRouter)

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send("OK");
});

const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});

io = new Server(server)

// websocket part to display products on real time
io.on("connection" , socket=>{
  console.log(`Se ha conectado un cliente con id ${socket.id}`)
})

export {io}