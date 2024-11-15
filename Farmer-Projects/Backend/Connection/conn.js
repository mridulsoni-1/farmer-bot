const mongoose = require("mongoose")

mongoose.connect(process.env.mongoURL).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log("Error while connecting to MongoDB",error)
})
