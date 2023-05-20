import { db } from "../models/db.js";

export async function analytics() {
  const users = await db.userStore.getAllUsers();
  const locations = await db.locationStore.getAllLocations();
  const placemarks = await db.placemarkStore.getAllPlacemarks();
  return {
    userCount: users.length,
    locationCount: locations.length,
    placemarkCount: placemarks.length,
  };
}
