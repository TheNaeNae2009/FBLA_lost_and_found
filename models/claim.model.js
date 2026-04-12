import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
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
    explanation: {
      type: String,
      required: [true, "explanation is required"],
      trim: true,
      maxLength: 250,
    },
  },
  { timestamps: true },
);

const Claim = mongoose.model("Claim", claimSchema);

export default Claim;
