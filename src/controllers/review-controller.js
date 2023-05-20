import { db } from "../models/db.js";

export const reviewController = {
  addReview: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.auth.credentials._id);
      const newReview = {
        rating: request.payload.rating,
        comment: request.payload.comment,
        userid: user.id,
        locationid: request.params.id,
      };

      const review = await db.reviewStore.addReview(newReview);
      return h.redirect(`/location/${request.params.id}`);
    },
  },
};
