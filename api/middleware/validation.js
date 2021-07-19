const User = require("../auth/auth-model")

function checkUsernameFree(req,res,next) {
    User.findBy({username:req.body.username})
    .then(rows=>{
      if(!rows.length){      
        next()
      }
      else{
        res.status(422).json("username taken")
      }
    })
    .catch(e =>{
      res.status(500).json(`Server error: ${e.message}`)
    })  
  }
  
const checkUserNameExists = (req, res, next) => {
    
   User.findBy({username:req.body.username})
   .then(rows=>{
     if(rows.length){
       req.userData=rows[0]
       next()
     }
     else{
       res.status(401).json("invalid credentials")
     }
  
   })
   .catch(e =>{
    res.status(500).json(`Server error: ${e.message}`)
  })
  
  }
  

  // check for missing username and or password
  const validateUserNameAndPassword= async(req,res,next)=>{
    try{
        const {username,password} = req.body
        if(!username ||  username==="" ||
           !password || password ===""){
    
               next({status:400,message: "username and password required "})
        }
        else{
          next()
        }
      }catch(error){
        next(error)
      }
  }


  module.exports={
      checkUserNameExists,
      validateUserNameAndPassword,
      checkUsernameFree
  }