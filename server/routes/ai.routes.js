import express, { Router } from "express";
import { generateArticle, generateBlogTitle, generateImage } from "../controllers/ai.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

// making instance of router
const aiRouter = Router();

aiRouter.post('/generate-article', auth, generateArticle);
aiRouter.post('/generate-blog-title', auth, generateBlogTitle);
aiRouter.post('/generate-image', auth, generateImage);

export default aiRouter;

