const mongoose = require("mongoose")
require("../Schema/account_schema")
const dotenv=require("dotenv");
dotenv.config();



const Db = process.env.DB;
//const Db = 'mongodb://localhost:27017'
mongoose.connect(Db, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
.then(()=>{
    console.log("Conection has been done successfully with mongoDB Atlas database.");
})
.catch((err)=>{
    console.log("unable to connect error is :",err);
})
