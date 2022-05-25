const Task=require("../models/taskModel")

exports.createTask=async (req,res)=>{
    try{
        const task=new Task(req.body)
        task.user=req.user._id
        task.media=req.file.path
        task.save()
        return res.json({   
            response:{"responseCode":res.statusCode,
            "status":"success",
            data:task
        }})
    }catch(error){
      console.log(error)
      return res.status(400).json({
      status:"400",
      error:error.message
  })
}
}


module.exports.viewTask = async (req, res) => {
    const page = req.params.page;
    const perPage = 20;
    const skip = (page - 1) * perPage;
    const countData = await Task.find({}).count();
    const totalPage = Math.round(countData / perPage);
    try {
      const countData = await Task.find({}).count();
      const viewTask = await Task.find({})

        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 })
        .exec();
      res
        .status(200)
        .json({ viewTask, currentPage: page, perPage: perPage, totalPage });
    }catch (error) {
      console.log(error);
    }
  };

  // update task details

  exports.updateTask=async (req,res)=>{
    try{
      const mediatask= req.file ? req.file.path : null;
        const {title,description,media}=req.body;
        const updatetask=await Task.findByIdAndUpdate(req.params.id,{
            title,
            description,
            media:mediatask
        })
        const updatetaskdetail=await Task.findById(req.params.id)
        return res.status(200).json({message:"update data successfully",updatetaskdetail})
    }catch(error){
        console.log(error)
    }
}
 
// remove task details

exports.removeTask=async (req,res)=>{
  try{
      const deletetask=await Task.findByIdAndDelete(req.params.id)
      console.log(deletetask)
      return res.status(200).json({message:"task deleted",deletetask})
  }catch(error){
      console.log(error)
  }
}

  
// search task details

exports.searchTask = async (req, res) => {
    try {
      var regex = new RegExp(req.params.name, "i");
      const searchTitle = await Task.find({ title: regex })
      return res.status(200).json(searchTitle);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  };

// sort task

exports.sortTask=async (req,res)=>{
  try {
    const lastoneweekreport=await Task.find({timestamp:{'$lte':new Date(),'$gte':new Date(Date()-7)}})
    console.log(lastoneweekreport)
    return res.status(200).json({
        message:"successfully get last one week report",
        data:lastoneweekreport
    })
} catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });

}
}