const User=require("../models/userModel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const createToken = (user) => {
    return jwt.sign({ user }, process.env.PROCESS_KEY, {
    expiresIn: "7d",
    }); 
  };


// user registration

  exports.addUser=async (req,res)=>{
    try{
      const {email,phnumber}=req.body;
      const checkEmail=await User.findOne({email:email,phnumber:phnumber})
      if(checkEmail){
      return res.status(400).json({
        status:"400",
        message:"Email or number Already Taken Please Choose Another Email Id or number"
        })
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      const user=new User()
        user.name=req.body.name
        user.email=req.body.email
        user.password=hash
              user.phnumber=req.body.phnumber
              user.save()
              return res.json({   
                  response:{"responseCode":res.statusCode,
                  "status":"success",
                  data:user
              }})
          }catch(error){
            console.log(error)
            return res.status(400).json({
            status:"400",
            error:error.message
        })
    }
}

// user_login

exports.userlogin = async (req, res) => {
    const { email, password } = req.body;
    try {
          const user = await User.findOne({ email });
          if (user) {
          const matched = await bcrypt.compare(password, user.password);
          if (matched) {
          const token = createToken(user);
          return res
          .status(200)
          .json({ msg: "You have login successfully", user , token });
        } else {
          return res
          .status(401)
          .json({ msg: "Password not correct"  });
        }
      }else {
          return res.status(404).json({ msg: "Email not found" })
      }
        }catch (error) {
          console.log(error);
          return res.status(500).json({ error: error.message });
      }
    };


    // get_all_user


    exports.view=async (req,res)=>{
      try{
          const viewuser=await User.find({})
          return res.status(200).json({message:"view user successfully",viewuser})
      }catch(error){
          console.log(error)
          return res.status(400).json({message:"something went wrong"})        
      }
  }
  
// update_user

  exports.updateuser=async (req,res)=>{
      try{
          const {name,phnumber,email}=req.body;
          const updateuser=await User.findByIdAndUpdate(req.params.id,{
              name,
              phnumber,
              email
          })
          const updateduser=await User.findById(req.params.id)
          return res.status(200).json({message:"update data successfully",updateduser})
      }catch(error){
          console.log(error)
      }
  }
   
// delete_user

  exports.deleteuser=async (req,res)=>{
      try{
          const deleteuser=await User.findByIdAndDelete(req.params.id)
          console.log(deleteuser)
          return res.status(200).json({message:"user deleted",deleteuser})
      }catch(error){
          console.log(error)
      }
  }
  
  