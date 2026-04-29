import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import YAML from "js-yaml";
import express from "express";
import authRoutes from "./routes/authroutes.js";
import weaponRoutes from "./routes/weaponroutes.js";
import armorRoutes from "./routes/armorroutes.js";
import cartRoutes from "./routes/cartroutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

const swaggerDoc = YAML.load(readFileSync("./docs/openapi.yaml", "utf8"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/", authRoutes);
app.use("/weapon", weaponRoutes);
app.use("/armor", armorRoutes);
app.use("/cart", cartRoutes);

app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));