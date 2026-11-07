
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);

app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    name: "Nexora SaaS API",
    message: "Welcome to Nexora",
    version: "1.0.0",
  });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "nexora-api",
    timestamp: new Date().toISOString(),
  });
});

// Dashboard summary
app.get("/api/dashboard", (req, res) => {
  res.status(200).json({
    application: "Nexora SaaS Starter",
    environment: process.env.NODE_ENV || "development",
    deployment: "Running locally",
    apiStatus: "Operational",
    databaseStatus: "Not connected yet",
    metrics: {
      deployments: 12,
      activeServices: 4,
      incidents: 0
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Nexora API running on port ${PORT}`);
});

