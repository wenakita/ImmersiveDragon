import express from "express";
import type { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function log(message: string, source = "express") {
  const time = new Date().toLocaleTimeString("en-US", { hour12: false });
  console.log(`${time} [${source}] ${message}`);
}

// API routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/demo-data", (_req, res) => {
  res.json({
    jackpot: 137852,
    totalSwaps: 2847,
    activeUsers: 156,
    tvl: 892456
  });
});

// Serve static HTML for the React app
app.get("*", (_req, res) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sonic Red Dragon</title>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/framer-motion@11/dist/framer-motion.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script>
        const { useState, useEffect } = React;
        const { motion } = Motion;
        
        function SonicRedDragon() {
            const [step, setStep] = useState(0);
            
            const steps = [
                { title: "SONIC RED DRAGON", subtitle: "The Future of DeFi Trading" },
                { title: "TOKEN SWAPS", subtitle: "$S ⟷ $DRAGON Exchange" },
                { title: "VRF JACKPOTS", subtitle: "$137,852 Growing Prize Pool" },
                { title: "FEE STRUCTURE", subtitle: "6.9% Jackpot • 2.41% LP • 0.69% Burn" }
            ];
            
            return React.createElement(
                'div',
                { 
                    className: "min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center",
                    style: { background: 'linear-gradient(135deg, #000000 0%, #1f2937 50%, #000000 100%)' }
                },
                React.createElement(
                    'div',
                    { className: "text-center max-w-4xl mx-auto px-8" },
                    React.createElement(
                        motion.h1,
                        {
                            className: "text-6xl md:text-8xl font-bold mb-8",
                            style: {
                                background: 'linear-gradient(135deg, #fb7a00, #eab308, #dc2626)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            },
                            initial: { scale: 0.5, opacity: 0 },
                            animate: { scale: 1, opacity: 1 },
                            transition: { duration: 1.5 }
                        },
                        steps[step].title
                    ),
                    React.createElement(
                        motion.p,
                        {
                            className: "text-2xl md:text-3xl text-yellow-400 mb-12",
                            initial: { y: 20, opacity: 0 },
                            animate: { y: 0, opacity: 1 },
                            transition: { duration: 1, delay: 0.5 }
                        },
                        steps[step].subtitle
                    ),
                    React.createElement(
                        'div',
                        { className: "flex justify-center space-x-4 mb-8" },
                        steps.map((_, index) => 
                            React.createElement(
                                'button',
                                {
                                    key: index,
                                    onClick: () => setStep(index),
                                    className: \`w-4 h-4 rounded-full transition-all \${index === step ? 'bg-orange-400' : 'bg-gray-600 hover:bg-gray-500'}\`
                                }
                            )
                        )
                    ),
                    React.createElement(
                        motion.div,
                        {
                            className: "text-gray-400",
                            initial: { opacity: 0 },
                            animate: { opacity: 1 },
                            transition: { delay: 1 }
                        },
                        "Experience revolutionary blockchain mechanics with VRF-powered jackpots"
                    )
                )
            );
        }
        
        ReactDOM.render(React.createElement(SonicRedDragon), document.getElementById('root'));
    </script>
</body>
</html>`;
  
  res.send(htmlContent);
});

const server = createServer(app);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
  console.error(err);
});

const PORT = 5000;
server.listen(PORT, "0.0.0.0", () => {
  log(`serving on port ${PORT}`);
});