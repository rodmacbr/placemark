import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { locationController } from "./controllers/location-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { reviewController } from "./controllers/review-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addlocation", config: dashboardController.addLocation },
  { method: "GET", path: "/dashboard/deletelocation/{id}", config: dashboardController.deleteLocation },

  { method: "GET", path: "/location/{id}", config: locationController.index },
  { method: "POST", path: "/location/{id}/addplacemark", config: locationController.addPlacemark },
  { method: "GET", path: "/location/{id}/deleteplacemark/{placemarkid}", config: locationController.deletePlacemark },

  { method: "GET", path: "/placemark/{id}/editplacemark/{placemarkid}", config: placemarkController.index },
  { method: "POST", path: "/placemark/{id}/updateplacemark/{placemarkid}", config: placemarkController.update },

  { method: "POST", path: "/location/{id}/uploadimage", config: locationController.uploadImage },

  { method: "GET", path: "/dashboard/editlocation/{id}", config: dashboardController.getEditLocation },
  { method: "POST", path: "/dashboard/editlocation/{id}", config: dashboardController.postEditLocation },
  { method: "GET", path: "/location/{id}/placemark/{placemarkid}", config: placemarkController.showPlacemarkView },

  { method: "DELETE", path: "/dashboard/location/{id}/deleteimage/{imgid}", config: locationController.deleteImage },

  { method: "GET", path: "/admin", config: adminController.index },
  { method: "GET", path: "/admin/deleteuser/{id}", config: adminController.deleteUser },

  { method: "POST", path: "/location/{id}/addreview", config: reviewController.addReview },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
