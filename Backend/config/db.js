require('dotenv').config()
const url = process.env.MONGODB_URI;
// console.log("url: " + process?.env?.MONGODB_URI);
const  mongoose = require('mongoose');

const connectDb = async () => {
   try{
     const conn= await mongoose.connect(url);
     console.log(`Mongo Db connected : ${conn.connection.host}`);
   }
   catch (error){
        console.log(error);
        process.exit(1);
   }
}
module.exports = connectDb;