import { Location } from "./location.js";
import { placemarkMongoStore } from "./placemark-mongo-store.js";

export const locationMongoStore = {
  async getAllLocations() {
    console.log("Providing all Locations");
    const locations = await Location.find().lean();
    console.log("Locations retrieved:", locations);
    return locations;
  },

  async getLocationById(id) {
    if (id) {
      const location = await Location.findOne({ _id: id }).lean();
      if (location) {
        location.placemarks = await placemarkMongoStore.getPlacemarksByLocationId(location._id);
      }
      return location;
    }
    return null;
  },

  async addLocation(location) {
    const newLocation = new Location(location);
    const locationObj = await newLocation.save();
    return this.getLocationById(locationObj._id);
  },

  async getUserLocations(id) {
    const location = await Location.find({ userid: id }).lean();
    return location;
  },

  async deleteLocationById(id) {
    try {
      await Location.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLocations() {
    await Location.deleteMany({});
  },

  async updateLocation(updatedLocation) {
    const location = await Location.findOne({ _id: updatedLocation._id });
    location.title = updatedLocation.title;
    location.img = updatedLocation.img;
    await location.save();
  },
};
