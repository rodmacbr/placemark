import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { playtimeService } from "./playtime-service.js";
import { maggie, mozart, maggieCredentials, testLocations, testPlacemarks, concerto } from "../fixtures.js";

suite("Placemark API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    playtimeService.clearAuth();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    await playtimeService.deleteAllLocations();
    await playtimeService.deleteAllPlacemarks();
    await playtimeService.deleteAllUsers();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    mozart.userid = user._id;
    beethovenSonatas = await playtimeService.createLocation(mozart);
  });

  teardown(async () => {});

  test("create placemark", async () => {
    const returnedPlacemark = await playtimeService.createPlacemark(beethovenSonatas._id, concerto);
    assertSubset(concerto, returnedPlacemark);
  });

  test("create Multiple placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createPlacemark(beethovenSonatas._id, testPlacemarks[i]);
    }
    const returnedPlacemarks = await playtimeService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    for (let i = 0; i < returnedPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await playtimeService.getPlacemark(returnedPlacemarks[i]._id);
      assertSubset(placemark, returnedPlacemarks[i]);
    }
  });

  test("Delete PlacemarkApi", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createPlacemark(beethovenSonatas._id, testPlacemarks[i]);
    }
    let returnedPlacemarks = await playtimeService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    for (let i = 0; i < returnedPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await playtimeService.deletePlacemark(returnedPlacemarks[i]._id);
    }
    returnedPlacemarks = await playtimeService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("denormalised location", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createPlacemark(beethovenSonatas._id, testPlacemarks[i]);
    }
    const returnedLocation = await playtimeService.getLocation(beethovenSonatas._id);
    assert.equal(returnedLocation.placemarks.length, testPlacemarks.length);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      assertSubset(testPlacemarks[i], returnedLocation.placemarks[i]);
    }
  });
});
