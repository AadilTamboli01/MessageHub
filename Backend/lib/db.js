import mongoose from "mongoose"

function connectionToDB() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("DB Connection successful");
    }).catch(() => {
        console.log("DB connection failed !");
        process.exit(1); // failed
    })
}

export default connectionToDB;