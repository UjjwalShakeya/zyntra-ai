import { OpenAI } from "openai/client.js";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
})

// controller to generate article
export const generateArticle = async (req, res, next) => {

    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        // getting plan from request
        const plan = req.plan;
        // getting user usage from request
        const free_usage = req.free_usage;


        // if user does not have free plan and user also has hit it's free limit then we should stop user to use feature no longer
        if (plan !== "premium" && free_usage >= 10) {
            res.json({ success: false, message: "Limit reached. Upgrade to continue." })
        }

        const response = await AI.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length
        })
        const content = response.choices[0].message.content;

        await sql` INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId},${prompt},${content},'article')`;

        if (plan !== "premium") {
            clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        };

        // responding with content
        res.json({ success: true, content })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};