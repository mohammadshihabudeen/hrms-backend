import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { authRoutes } from "./routes/AuthRoutes";
import { registerRoutes } from "./routes/RegisterRoutes";
import usersRoutes from "./routes/UsersRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// Use cors middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Your other routes here
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/register", registerRoutes(AppDataSource));
app.use("/api/v1/login", authRoutes(AppDataSource));

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("Error: ", error));
