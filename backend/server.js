import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

// Absolute file paths using ES Modules metadata
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE_PATH = path.resolve(__dirname, '../data/dishes.json');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: '*', // Allow all origins for the sake of the dashboard setup
  methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE']
  }
});

// Helper functions for reading and writing data
async function readDishes() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading dishes database:', error);
    return [];
  }
}

async function writeDishes(dishes) {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(dishes, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing dishes database:', error);
    throw error;
  }
}

// REST Routes
// 1. GET /api/dishes
app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await readDishes();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve dishes database' });
  }
});

// 2. PATCH /api/dishes/:dishId/toggle
app.patch('/api/dishes/:dishId/toggle', async (req, res) => {
  const { dishId } = req.params;
  try {
    const dishes = await readDishes();
    const dishIndex = dishes.findIndex(d => d.dishId === dishId);

    if (dishIndex === -1) {
      return res.status(404).json({ error: `Dish with ID ${dishId} not found` });
    }

    // Toggle status
    dishes[dishIndex].isPublished = !dishes[dishIndex].isPublished;
    const updatedDish = dishes[dishIndex];

    // Write back to DB file
    await writeDishes(dishes);

    console.log(`[API] Toggled publish state for ${updatedDish.dishName} to ${updatedDish.isPublished}`);

    // Emit live WebSocket update to all clients
    io.emit('dish:updated', updatedDish);

    res.json(updatedDish);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle dish status' });
  }
});

// REAL-TIME BONUS EXPERIMENT: 30-second interval simulation loop
const SIMULATION_INTERVAL_MS = 30000;
setInterval(async () => {
  try {
    const dishes = await readDishes();
    if (dishes.length === 0) return;

    // Pick a random dish index
    const randomIndex = Math.floor(Math.random() * dishes.length);
    const selectedDish = dishes[randomIndex];

    // Flip its publish status
    selectedDish.isPublished = !selectedDish.isPublished;

    // Save state
    await writeDishes(dishes);

    console.log(`[Simulation] Randomly toggled ${selectedDish.dishName} to ${selectedDish.isPublished}`);

    // Broadcast the update
    io.emit('dish:updated', selectedDish);
  } catch (error) {
    console.error('Error during background status simulation loop:', error);
  }
}, SIMULATION_INTERVAL_MS);

// WebSocket connection logs
io.on('connection', (socket) => {
  console.log(`[Socket] Client connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
  });
});

// Start the HTTP Server cluster
httpServer.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  DISH MANAGEMENT ENGINE RUNNING ON PORT ${PORT}`);
  console.log(`  REST API: http://localhost:${PORT}/api/dishes`);
  console.log(`  WebSocket server: ws://localhost:${PORT}`);
  console.log(`==================================================`);
});
