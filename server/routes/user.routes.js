// importing required modules
import express from "express";
import auth from "../middlewares/auth.middleware";
import { getPublicCreations, getUserCreations, toggleLikeCreation } from "../controllers/user.controller";

const userRouter = express.Router();

// to get user creations
userRouter.get('/get-user-creations', auth, getUserCreations);

// to get user published of other user
userRouter.get('/get-published-creations', auth, getPublicCreations);

// to toggle like/unlike 
userRouter.post('/toggle-like-creation', auth, toggleLikeCreation);


export default userRouter;

