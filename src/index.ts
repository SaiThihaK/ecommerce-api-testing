import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/errors";
import rootRouter from "./routes";
import { PORT } from "./secret";
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("working");
});

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
});
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("app working", PORT);
});
