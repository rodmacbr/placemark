import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
  rating: Number,
  comment: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  locationid: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
});

export const Review = Mongoose.model("Review", reviewSchema);
