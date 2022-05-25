const mongoose=require('mongoose')
mongoose.connect(process.env.MONGOOSE_URL)

const db=mongoose.connection

if(!db){
    console.log('database not connected')
}else{
    console.log('database Connected')
}