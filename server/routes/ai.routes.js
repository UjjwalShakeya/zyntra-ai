import express, { Router } from "express";
import { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeImageObject, resumeReview } from "../controllers/ai.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../configs/multer.js";

// making instance of router
const aiRouter = Router();

aiRouter.post('/generate-article', auth, generateArticle);
aiRouter.post('/generate-blog-title', auth, generateBlogTitle);
aiRouter.post('/generate-image', auth, generateImage);
aiRouter.post('/remove-image-background', upload.single('image'), auth, removeImageBackground);
aiRouter.post('/remove-image-object', upload.single('image'), auth, removeImageObject);
aiRouter.post('/resume-review', auth, upload.single('resume'), resumeReview);

export default aiRouter;

