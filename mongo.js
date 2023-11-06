import mongoose from "mongoose";
const { Schema } = mongoose;

const newSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const reviewSchema = new mongoose.Schema({
  breweryId: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
});

export default mongoose.model("collection", newSchema);
export const Review = mongoose.model("Review", reviewSchema);
// module.exports = collection;
