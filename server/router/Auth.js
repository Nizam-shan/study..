const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/userSchema');
const bodyparser = require('body-parser');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser")
const Album = require("../models/Album");
const fs= require('fs');

const Firebase = require('../models/Firebase')



const {v4 : uuidv4} = require('uuid');
const ImageSchema = require('../models/Imagemodel');




/*assuming an express app is declared here*/
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended: true}));
router.use(cookieParser());
const Authenticate = require("../Middleware/authenticate");
const Food = require('../models/foodSchema');
const multer = require("multer");
var path = require("path");
const cors = require('cors');
router.use(cors());
router.use(express.static(path.join(__dirname,"uploads")))
//router.use('./uploads', express.static(path.join(__dirname, './uploads')));


// const storage = multer.diskStorage({
//     destination:'./upload/image',
//     filename:(req,file,cb) => {
//         return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })
// const upload = multer({
//    storage: storage
// })

/* ********************/
// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,"./uploads")
//     },
//     filename: function(req,file,cb) {
//         cb(null,`${Date.now()}_${file.originalname}`)
//     } 
// })

// const upload = multer({storage:storage});

/* ********************/

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        // cb(null,uuidv4() + '-' + Date.now() + path.extname(file.originalname));
        //  cb(null, file.originalname);
         cb(null,  file.originalname);
    }
});

const fileFilter = function(req,file,cb){
    const allowedFileType = ['image/jpeg','image/jpg','image/png'];
    if(allowedFileType.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const upload = multer({storage,fileFilter});


router.post("/arosh",upload.single('photo'),(req,res) => {
    const name = req.body.name;
    const birthday = req.body.birthday;
    const photo = req.body.photo
   
    // let photo;
    // if (req.file) {
    //     photo = req.file.buffer;cd des   cd
    //     // photo = photo.toString('base64');
    // } else {
    //     res.status(400).json('Error: No image uploaded');
    //     return;
    // }
    const newUserData = {
        name,
        birthday,
        photo
    }

    const newUser = new ImageSchema(newUserData);
    newUser.save()
        .then(() => {
          
            res.json('User added')
        })
        .catch (err => res.status(400).json('error: '+ err));
})

router.delete("/aroshdelete",async(req,res) => {
    const data = await ImageSchema.findOneAndDelete();
    if(data){
        res.status(200).json({msg:"deleted",data})
    }else{
        res.status(401).json({msg:"not deleted"})
    }
        
})

 router.get("/aroshget", async(req,res) => {
     await ImageSchema.find()
             .then(user => {
                 res.json(user)
             })
             .catch (err => res.status(400).json('error'+ err));
 })



 


// router.get ("/aroshget", async (req, res) => {
//     await ImageSchema.find()
//       .then((images) => {
//         res.json(images.map((image) => {
//           return {
//             name: image.name,
//             birthday: image.birthday,
//             photo:image.photo.set("Content-Type", "image/jpeg")
//            // photo:image.photo
//             //  image.photo
//             //   ?  image.photo.toString("base64")
//             //   : "",
            
// //           };
//         }));
//       })
//       .catch((err) => res.status(400).json("error" +err));
//     });
  


  
  


// router.get("/aroshget", async (req, res) => {
//     await ImageSchema.find()
//         .then(users => {
//             const response = [];
//             users.forEach(user => {
//                 const { name, birthday, photo } = user;
//                 if (photo) {
//                     const imagePath = path.join(__dirname, `uploads/${photo}`);
//                     response.push({ name, birthday, image: imagePath });
//                 } else {
//                     response.push({ name, birthday });
//                 }
//             });
//             res.json(response);
//         })
//         .catch(err => res.status(400).json({ message: "Error retrieving users", error: err }));
// });


// router.get("/aroshget/:name", async(req,res) => {
//     await ImageSchema.find({name:req.params.name})
//             .then(user =>{
//                 res.set("Content-Type", "image/jpeg"); //set the content type as per original format
//                     res.send(user.photo);
                   
//                     console.log(user);
//               }) 
//               .catch(err => res.status(400).json("Error: " + err));
// })





// res.set('Content-Type', 'image/png');
// res.send(Buffer.from(user.photo, 'base64'));


// router.get("/arosh/:id", (req, res) => {
//     ImageSchema.findById(req.params.id)
//     .then(user => {
//     if (!user) res.status(404).json("User not found");
//     res.set("Content-Type", "image/jpeg"); //set the content type as per original format
//     res.send(user.photo);
//     })
//     .catch(err => res.status(400).json("Error: " + err));
//     });



router.put("/image/:name",upload.single("image"),async(req,res) => {
    const img = req.body.images
    try {
        const album = await Album.findOneAndUpdate(
            {
               name: req.params.name
            },
            {
                $push:{images:req.body.img},
            }
        )
        if(!album){
            res.send("not updated")
        }
        album.images = req.body.images;
        const updatedAlbum = await album.save();
        res.send(updatedAlbum);
        // console.log("Album found:", album);
        // album.images = req.body.images;
        // const updatedAlbum = await album.save();
        // console.log("Album updated:", updatedAlbum);
        // res.send(updatedAlbum);
    } catch (error) {
        console.log(error);   
    }
})



// remove the particular image 
router.put("/removeimage/:name", async(req,res) => {
    const fileName = req.body.fileName;
    const remove= await Album.findOneAndUpdate(
        {
            name:req.params.name,
        },
        {
            $pull:{images:fileName},
     },
        {new:true},  
    ) 
    fs.unlink("./uploads/"+fileName,function(err){
       // res.send(remove)
        res.status(200).json({msg:"success"})
     
        console.log('File deleted!');
        if(err) {
            res.status(400).send("error")
        }
    });
   
   
 })

router.post("/upload",async(req,res)=>{
    const newAlbum = new Album(req.body);
    await newAlbum.save((err,data) => {
        if(!err){
            res.json({msg:"inserted",data})
        }
            console.log(err);
           // res.json({msg:"not upladed"})
        
        // if(!err){
        //     console.log(data);
        //     res.send("success")
        // }else{
        //     console.log(err);
        //     res.send("error")
        // }
    })
})
router.get("/all",async(req,res)=>{
    const data = await Album.find();
    console.log(data);
    if(data){
        return res.json({msg:data});
    
    }
    return res.json({msg:"unable to fetch the data"})
})

router.get("/getupload/:name",async(req,res) => {
    const album = await Album.find({name:req.params.name});
    if(album){
        return res.send(album);
    }
    return res.json({msg:"unable to fetch the data"})
   
})


router.get("/",(req,res) => {
    res.json({msg:"this is router pages"});
})
router.get("/contact",(req,res) => {
    res.send(req.rootuser);
    res.json({msg:"this is contact pages"});
})

router.post("/register",async(req,res)=>{
    const { name,email, phoneNumber,password,confPassword} = req.body;

    if(!email || !name || !phoneNumber || !password || !confPassword){
        res.status(400).json({msg:"Do fill your user credententials"});
    }

    try{
        const userExist = await User.findOne({email:email});
        if(userExist){
            res.status(400).json({msg:"User already exist"});
        } else if (password !== confPassword){
            res.status.json({msg:"password and confirm password should be same"});
        } else{
            const user = await new User({name,email, phoneNumber,password,confPassword});
            user.save().then(() => {
                res.status(200).json({msg:"user saved"})
                console.log(user);
            })
        }
    } catch(err) {
       console.log(err); 
    }
})

router.post("/Login",async (req,res) => {
    try{
        let token;
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400).json({msg:"Complete your credentials"});
        }
        const user = await User.findOne({email:email})
            if(user){

                const passwordMatch = await bcrypt.compare(password,user.password)
                 token = await user.generateAuthToken();
                  console.log(token);

                res.cookie("jwtokens",token, {
                    expires: new Date(Date.now() +  25892000000),
                    httpOnly:true  
                });
              

                if(!passwordMatch){
                    res.status(400).json({msg:"password doesnt match"})
                } else {
                    console.log(user);
                    res.status(200).json({msg:"user logged in"})
                }
            } 

    } catch (err) {

        console.log(err)
    }
})

router.post("/food", async(req,res) => {
  const food = new Food(req.body);
    try{
        await food.save();
        res.send("inserted food")
    } catch (err) {
        console.log(err);
    }
});

router.get("/get",async(req,res) => {
    const {title} = req.body;

    const get = await Food.find({title:title});
    if(!get){
        res.send("not foind")
    }else{
        res.send(get)
    }
})

router.delete("/delete/:title",async(req,res) => {
   const data = await Food.findOneAndRemove(req.params.title);
   if(!data){
    res.send("not deleted");
   }else{
    res.send("deleted");
   }
})

router.put("/up/:title",async (req,res) => {
    const up = await Food.findOneAndUpdate(
        req.params.title,{
            $set:req.body,
        },
    )
    if(!up) {
        res.send("failed")
    }else{
        res.send("success")
    }
})



// firebase
router.post("/songs",async(req,res) =>{
    try {
        const song = await new Firebase(req.body);
        res.status(200).json({data:song,msg:"song uploaded successful"})
    } catch (error) {
        res.status(401).json({msg:"error in uploaded some internal err",err:error})   
    }
})

router.get("/getsong",async(req,res) =>{
    try {
        const getsong = await Firebase.find();
        res.status(200).json({data:getsong,msg:"song uploaded successful"})
    } catch (error) {
        res.status(401).json({msg:"error in uploaded some internal err",err:error})   
    }
})
module.exports = router;