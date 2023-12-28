import mongoose from "mongoose";
const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Database is connected to: ${connect.connection.host}`);
};

export default connectDB;
