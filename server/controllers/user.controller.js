// importing the required modules
import sql from "../configs/db.js";


// controller to get the get logged in user creations for example you are logged in and you are tryin go get the creations of you
export const getUserCreations = async (req, res) => {
    try {
        const { userId } = req.auth();
        const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

        return res.json({ success: true, creations });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }

}

// get creations which are public only
export const getPublicCreations = async (req, res) => {
    try {
        const creations = await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;
        return res.json({ success: true, creations });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// get creations which are public only
export const toggleLikeCreation = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { id } = req.body;

        const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

        if (!creation) {
            return res.json({ success: false, message: 'Creation not found' });
        }

        const currentLikes = creation.likes;
        const userIdStr = userId.toString();
        let updatedLikes;
        let message;

        // if userId includes in the current likes we are going to remove that one
        if (currentLikes.includes(userIdStr)) {
            updatedLikes = currentLikes.filter((user) => user != userIdStr);
            message = "Creation Unliked";
        } else {
            // we are adding new like
            updatedLikes = [...currentLikes, userIdStr];
            message = "Creation Liked";
        }

        const formattedArray = `{${updatedLikes.join(',')}}`

        // updating in the database
        await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id =${id}`

        res.json({ success: true, message });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}