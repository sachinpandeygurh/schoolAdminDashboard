const cloudinary = require("cloudinary");

// Set up Cloudinary configuration
const result = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || "brandads-tech",
    api_key: process.env.CLOUDINARY_API || "958183364821315",
    api_secret: process.env.CLOUDINARY_SECRET || "yT557LEMQQO1IPcTwo1i1zel8sM"
});
console.log(result)
// Function to upload an image to Cloudinary
const uploadToCloudinary = (path, folder) => {
    return cloudinary.v2.uploader.upload(path, {
        folder
    })
    .then((data) => {
        return { url: data.url, public_id: data.public_id };
    })
    .catch((error) => {
        console.log('Error uploading to Cloudinary', error);
        throw error; 
    });
};

// Function to remove an image from Cloudinary
const removeFromCloudinary = async (public_id) => {
    try {
        const result = await cloudinary.v2.uploader.destroy(public_id);
        console.log(result);
    } catch (error) {
        console.log('Error removing from Cloudinary', error);
        throw error; 
    }
};

module.exports = { uploadToCloudinary, removeFromCloudinary };
