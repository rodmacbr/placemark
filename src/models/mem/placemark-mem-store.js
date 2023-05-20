import { v4 } from "uuid";

let placemarks = [];

export const placemarkMemStore = {
  async getAllPlacemarks() {
    return placemarks;
  },

  async addPlacemark(locationId, placemark) {
    placemark._id = v4();
    placemark.locationid = locationId;
    placemarks.push(placemark);
    return placemark;
  },

  async getPlacemarksByLocationId(id) {
    return placemarks.filter((placemark) => placemark.locationid === id);
  },

  async getPlacemarkById(id) {
    let placemark = placemarks.find((placemark) => placemark._id === id);
    if (placemark === undefined) {
      placemark = null;
    }
    return placemark;
  },

  async getLocationPlacemarks(locationId) {
    return placemarks.filter((placemark) => placemark.locationid === locationId);
  },

  async deletePlacemark(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) placemarks.splice(index, 1);
  },

  async deleteAllPlacemarks() {
    placemarks = [];
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.name = updatedPlacemark.name;
    placemark.description = updatedPlacemark.description;
    placemark.latitude = updatedPlacemark.latitude;
    placemark.longitude = updatedPlacemark.longitude;
    placemark.category = updatedPlacemark.category;
  },
};
