const express = require('express')
const upload = require('../middleware/upload')
const { uploadToCloudinary , removeFromCloudinary } = require('../../middlewares/')
const User = require('../models/user')
const router = new express.Router()

// create a user
router.post('/create', async (req, res) => {
    try{
        const user = new User(req.body)
        await user.save();
        res.status(201).send(user)
    } catch(error){
        res.status(400).send("Error in creating the user", error);
    }
})

// upload user image
router.post('/image/:id' , upload.single('user Image'), async(req , res)=>{
    try{
        // upload Image to cloudinary 
        const data = await uploadToCloudinary(req.file.path , "user-images")
        // save Image Url and publiId ti the database
        const saveImg = await User.updateOne(
            {_id : req.params.id},
            {
                $set:{
                imageUrl:data.url,
                publicId:data.public_id
            }
            }
        )
        res.status(200).send("user image uploaded with success")
    } catch (error){
        res.status(400).send(error)
    }
})

// Delete User Image

router.delete('/image/:id', async(req,res)=>{
    try{
        // Find user
        let user =  await User.findOne({ _id: req.params.id });

        // Find it's publicId
        const publicId = user.publicId;

        // remove it's from cloudinary 
        await removeFromCloudinary(publicId);

        //Remove it from the database
        const deleteImg =await User.updateOne(
            {"_id":req.params.id},
            {
                $set:{
                    imageUrl:"",
                    publicId:""
                }
            }
        );
        res.status(200).send("user image deleted successfull")
    } catch(error){
        res.status(400).send(error)
    }
})

module.exports= router