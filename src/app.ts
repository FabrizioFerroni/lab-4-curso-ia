import { config } from "dotenv";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import groqRoute from "./routes/groq.routes";
import lgRoute from "./routes/lg.routes";
import chatRoute from "./routes/chat.routes";
import morgan from "morgan";

config();

const { API_PORT, NODE_ENV } = process.env;

const app = express();
const port = API_PORT || 3000;
const entorno = NODE_ENV || "dev";

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(morgan(entorno));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", groqRoute);
app.use("/", chatRoute);
app.use("/", lgRoute);

app.get("/favicon.ico", (req: Request, res: Response) => {
  res.status(204);
});

app.get("/", (req: Request, res: Response) => {
  res.json({
    message:
      "Bienvenido a la api del agente chatbot. Hecha por Fabrizio Ferroni.",
  });
});

app.disable("x-powered-by");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
