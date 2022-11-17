const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/user.model')
const axios = require('axios');


// @desc    Register a user
// @route   POST /api/users/register
// @access  Public
const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email })

        if (userExists) {
          return res.status(200).json({
              statusCode:401,
              message:'User already exists'
            })
        }

         // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        if (user) {
          return res.status(200).json(
            {
              message:'Logged In Succesfully!',
              statusCode:200,
              data:{
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
              }
            })
        } else {
          return res.status(200).json({
            statusCode:401,
            message: "Invalid user data",
          });
        }
        }
        catch(error){
          console.log("error",error);
          return res.status(400).json({
            error:error,
            message: "Invalid Data",
          });
        }
}


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try{
    const { email, password } = req.body
    
    if(!email && !password){
      res.status(200).json({
        statusCode:401,
        message:'Please fill all the fields!'
       })
    }
    // Check if user exists
    const user = await User.findOne({ email });

     if (!user) {
         return res.status(200).json({
          statusCode:401,
          message:'Please provide a registered email id'
         })
     }
  
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        message:'Logged In Succesfully!',
        statusCode:200,
        data:{
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        }
      })
    } else {
      return res.status(200).json({
        statusCode:401,
        message:'Invalid credentials'
      })
    }
  }catch(error){
    return res.status(400).json({
      error:error,
      message: "Invalid Data",
    });
  }
  
  }
  
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    return res.status(200).json(req.user)
}

// @desc    Get search images data
// @route   GET /api/users/search
// @access  Public
const getTagImages = async(req,res)=>{
    let tags = req.query.tags;
    if(tags === '')  return res.status(200).json({message:'Search not found!'})
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.FLICKR_API_KEY}&tags=${tags}&format=json&nojsoncallback=1`;
    console.log("urll",url);
    const result = await axios.get(url).then(res=>{
            console.log("res",res.data.photos.photo)
            return res.data.photos.photo
        });
    return res.status(200).json({data:result});
}


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
}


module.exports = {
registerUser,
loginUser,
getMe,
getTagImages
}