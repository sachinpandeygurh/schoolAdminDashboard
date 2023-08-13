const express = require('express');
const upload = require('../middleware/upload');
const { uploadToCloudinary, removeFromCloudinary } = require('../middleware/upload');
const User = require('../models/user');

const router = express.Router();

// Create a user
router.post('/create', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send("Error creating the user: " + error.message);
    }
});

// Upload user image
router.post('/image/:id', upload.single('userImage'), async (req, res) => {
    try {
        // Upload image to Cloudinary 
        const data = await uploadToCloudinary(req.file.path, "user-images");

        // Update Image URL and publicId in the database
        await User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    imageUrl: data.url,
                    publicId: data.public_id
                }
            }
        );

        res.status(200).send("User image uploaded successfully");
    } catch (error) {
        res.status(400).send("Error uploading user image: " + error.message);
    }
});

// Delete User Image
router.delete('/image/:id', async (req, res) => {
    try {
        // Find user
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Find user's publicId
        const publicId = user.publicId;

        // Remove image from Cloudinary 
        await removeFromCloudinary(publicId);

        // Update image URL and publicId in the database
        await User.updateOne(
            { "_id": req.params.id },
            {
                $set: {
                    imageUrl: "",
                    publicId: ""
                }
            }
        );

        res.status(200).send("User image deleted successfully");
    } catch (error) {
        res.status(400).send("Error deleting user image: " + error.message);
    }
});

module.exports = router;
