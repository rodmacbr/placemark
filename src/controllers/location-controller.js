import cloudinary from "cloudinary";
import { PlacemarkSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const locationController = {
  index: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const reviews = await db.reviewStore.getReviewsByLocationId(request.params.id);
      const viewData = {
        title: "Location",
        location: location,
        reviews: reviews,
      };
      return h.view("location-view", viewData);
    },
  },

  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("location-view", { title: "Add placemark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const newPlacemark = {
        name: request.payload.name,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        category: request.payload.category,
      };
      await db.placemarkStore.addPlacemark(location._id, newPlacemark);
      return h.redirect(`/location/${location._id}`);
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.placemarkStore.deletePlacemark(request.params.placemarkid);
      return h.redirect(`/location/${location._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(file);
          location.img = url;
          await db.locationStore.updateLocation(location);
        }
        return h.redirect(`/location/${location._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/location/${location._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  deleteImage: {
    handler: async function (request, h) {
      try {
        const locationId = request.params.id;
        const imgId = request.params.imgid;
        const location = await db.locationStore.getLocationById(locationId);

        // rest of the code

        if (!location || !location.img || location.img !== imgId) {
          return h.redirect(`/location/${locationId}`);
        }

        const publicId = imgId.replace(`${cloudinary.config().cloud_name}/`, "").replace(/\.[^/.]+$/, "");
        await cloudinary.uploader.destroy(publicId);

        location.img = undefined;
        await db.locationStore.updateLocation(location);

        // Call imageStore deleteImage to remove image from local storage
        await imageStore.deleteImage(imgId);

        return h.redirect(`/location/${locationId}`);
      } catch (error) {
        console.error(error);
        return h.response("Error deleting image").code(500);
      }
    },
  },
};
