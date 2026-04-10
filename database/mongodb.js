import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  throw new Error("Please define the MONGODB_URI");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("connected");
  } catch (error) {
    console.error("Error connecting to database: ", error);

    process.exit(1);
  }
};

export default connectToDatabase;
