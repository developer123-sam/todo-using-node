const router=require("express").Router()
const Controller=require("../controllers/taskController")
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/image");
  },
  filename: function (req, file, cb) {
    cb(null, "story" + Date.now() + "_" + file.originalname);
  },
});
var upload = multer({ storage: storage });
const auth=require("../middleware/auth")

router.post("/createTask",auth.userloggedIn,upload.single("media"),Controller.createTask)
router.get("/viewTask/:page", auth.userloggedIn,Controller.viewTask);
router.put("/updateTask/:id",auth.userloggedIn,upload.single("media"),Controller.updateTask)
router.delete("/removeTask/:id",auth.userloggedIn,Controller.removeTask)
router.get("/searchTask/title",auth.userloggedIn,Controller.searchTask)
router.get("/sortTask",auth.userloggedIn,Controller.sortTask)

module.exports=router