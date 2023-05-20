import { Review } from "./review.js";

export const reviewMongoStore = {
  async addReview(review) {
    const newReview = new Review(review);
    const reviewObj = await newReview.save();
    return this.getReviewById(reviewObj._id);
  },

  async getReviewById(id) {
    const review = await Review.findById(id);
    return review;
  },

  async deleteReviewById(id) {
    try {
      await Review.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async getReviewsByLocationId(id) {
    const reviews = await Review.find({ locationid: id }).lean().populate("userid");
    return reviews;
  },
};
