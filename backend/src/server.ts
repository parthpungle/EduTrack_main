import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/courses.routes";
import reviewRoutes from "./routes/reviews.routes";
import recommendationRoutes from "./routes/recommendations.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// quick liveness check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/recommendations", recommendationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
