import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  const server = createServer(app);

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Demo data endpoint
  app.get("/api/demo-data", (_req, res) => {
    res.json({
      jackpot: 137852,
      totalSwaps: 2847,
      activeUsers: 156,
      tvl: 892456
    });
  });

  return server;
}