import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import YAML from "js-yaml";
import express from "express";
import authRoutes from "./routes/authroutes.js";
import weaponRoutes from "./routes/weaponroutes.js";
import armorRoutes from "./routes/armorroutes.js";
import cartRoutes from "./routes/cartroutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
const swaggerDoc = YAML.load(readFileSync(join(__dirname, "./doc/openapi.yaml"), "utf8"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/", authRoutes);
app.use("/weapon", weaponRoutes);
app.use("/armor", armorRoutes);
app.use("/cart", cartRoutes);

app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));