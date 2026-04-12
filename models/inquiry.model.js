import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    inquiry: {
      type: String,
      required: [true, "inquiry is required"],
      trim: true,
      maxLength: 250,
    },
  },
  { timestamps: true },
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
