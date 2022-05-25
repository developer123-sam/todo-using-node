require("dotenv").config()
require('./config/db')
const express=require("express")
const bodyParser=require("body-parser")
const app=express()
const path=require("path")
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())
app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use(require("./routers/routeHandler"))
var port=process.env.PORT || 3000
app.listen(port,function(){
    console.log(`server listen on port ${port}`)
})