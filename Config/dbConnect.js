const mongoose=require('mongoose');

const dbConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database Connected');
    } catch (error) {
        console.log(error);
    }
}

module.export=dbConnect();