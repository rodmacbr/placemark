import { db } from "../models/db.js";
import { analytics } from "../utils/analytics.js";

export const adminController = {
  index: {
    auth: {
      scope: "admin",
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();

      const analyticsResults = await analytics();
      const viewData = {
        title: "Point-of-Interest Admin Dashboard",
        users: users,
        analytics: analyticsResults,
      };
      return h.view("admin-view", viewData);
    },
  },

  deleteUser: {
    auth: {
      scope: "admin",
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/admin");
    },
  },
};
