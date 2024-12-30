import mongoose from "mongoose";
const conn= async(dbname)=>{
    try{
<<<<<<< HEAD
        const res=await mongoose.connect(`mongodb+srv://${process.env.ID}:${process.env.PASS}@cluster0.rdojecr.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`);
=======
        const res=await mongoose.connect(`mongodb+srv://ABC:PASSWORD@cluster0.rdojecr.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`);
>>>>>>> 9a2f41ff825c0d9c637b079eaf2df8d256e242e1
        if(res){
            console.log("connected to DB")
        }else{
            console.log("connection failed ");
        }
    }catch(error){
        console.log("connection error....",error)
    }
}

export default conn;
