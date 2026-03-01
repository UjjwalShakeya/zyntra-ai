// importing required modules
import express from 'express';
import cors from "cors";
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/ai.routes.js';
import connectCloudinary from './configs/cloudinary.js';

// initializing express app
const app = express();

await connectCloudinary();

// middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// basic route
app.get('/', (req, res) => res.send('Server is Live'))

// all routes will be protected using require auth
app.use(requireAuth());

app.use('/api/ai', aiRouter)

// starting the server
const PORT = process.env.PORT || 3000;

// listening to the server
app.listen(PORT, () => {
    console.log('server is listening on port', PORT)
})