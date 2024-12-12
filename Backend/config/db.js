const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;



// const mysql=require("mysql2")
// const connection=mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"warehouse"
// })
// connection.connect((err)=>{
//     if(err){
//         console.log("Error connecting to the database");
//         return ;
//     }
//     else {
//         console.log("Connected to the database");
//     }

// })
// module.exports=connection;
// >>>>>>> main
