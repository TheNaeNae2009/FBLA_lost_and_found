import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
      unique: true,
    },
    images: {
      type: [String],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending", "claimed"],
      required: [true, "Status is required"],
    },
    dateFound: {
      type: String,
      required: [true, "Date is required"],
      trim: true,
      minLength: 6,
    },
    location: {
      type: String,
      required: [true, "location is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  { timestamps: true },
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
