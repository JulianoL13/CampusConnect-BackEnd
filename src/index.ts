import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import resourceRoutes from "./routes/userRoutes/resourceRoutes";
import roleRoutes from "./routes/userRoutes/roleRoutes";
import postRoutes from "./routes/postRoutes/postRoutes";
import postVoteRoutes from "./routes/postRoutes/postVoteRoutes";
import commentVoteRoutes from "./routes/commentRoutes/commentVoteRoutes";
import commentRoutes from "./routes/commentRoutes/commentsRoutes";
import userRoutes from "./routes/userRoutes/userRoutes";
import profileRoutes from "./routes/userRoutes/profileRoutes";
import authRouter from "./routes/userRoutes/authRoutes";
import communityRoutes from "./routes/communityRoutes/communityRoutes";

import swaggerFile from "./middleware/swagger/swagger-output.json";

dotenv.config({ path: "../.env" });
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api", resourceRoutes);
app.use("/api", roleRoutes);
app.use("/api", profileRoutes);
app.use("/api", userRoutes);
app.use("/api", commentVoteRoutes);
app.use("/api", postVoteRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);
app.use("/api", communityRoutes);
app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
