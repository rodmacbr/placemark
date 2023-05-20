import { EventEmitter } from "events";
import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, mozart, testLocations } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Location API tests", () => {
  let user = null;

  setup(async () => {
    playtimeService.clearAuth();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    await playtimeService.deleteAllLocations();
    await playtimeService.deleteAllUsers();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    mozart.userid = user._id;
  });

  teardown(async () => {});

  test("create location", async () => {
    const returnedLocation = await playtimeService.createLocation(mozart);
    assert.isNotNull(returnedLocation);
    assertSubset(mozart, returnedLocation);
  });

  test("delete a location", async () => {
    const location = await playtimeService.createLocation(mozart);
    const response = await playtimeService.deleteLocation(location._id);
    assert.equal(response.status, 204);
    try {
      const returnedLocation = await playtimeService.getLocation(location.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
    }
  });

  test("create multiple locations", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      testLocations[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createLocation(testLocations[i]);
    }
    let returnedLists = await playtimeService.getAllLocations();
    assert.equal(returnedLists.length, testLocations.length);
    await playtimeService.deleteAllLocations();
    returnedLists = await playtimeService.getAllLocations();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant location", async () => {
    try {
      const response = await playtimeService.deleteLocation("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
    }
  });
});
