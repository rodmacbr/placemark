import { Placemark } from "./placemark.js";
import { Location } from "./location.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async addPlacemark(locationId, placemark) {
    placemark.locationid = locationId;
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    return this.getPlacemarkById(placemarkObj._id);
  },

  async getPlacemarksByLocationId(id) {
    const placemarks = await Placemark.find({ locationid: id }).lean();
    return placemarks;
  },

  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  async deletePlacemark(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  async updatePlacemark(placemarkId, updatedPlacemark) {
    const dbPlacemark = await Placemark.findOne({ _id: placemarkId });
    dbPlacemark.name = updatedPlacemark.name;
    dbPlacemark.description = updatedPlacemark.description;
    dbPlacemark.latitude = updatedPlacemark.latitude;
    dbPlacemark.longitude = updatedPlacemark.longitude;
    dbPlacemark.category = updatedPlacemark.category;
    await dbPlacemark.save();
  },
};
