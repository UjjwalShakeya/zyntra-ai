import express, { Router } from "express";
import { generateArticle } from "../controllers/ai.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

// making instance of router
const aiRouter = Router();

aiRouter.post('/generate-article',auth, generateArticle);

export default aiRouter;

