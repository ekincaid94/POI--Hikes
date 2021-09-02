"use strict";

const assert = require("chai").assert;
const fixtures = require("./fixtures.json");
const PoiService = require("./poi-service");
const _ = require("lodash");

suite("Poi API tests", function () {
  let poi = fixtures.poi;
  let newPoi = fixtures.newPoi;

  const poiService = new PoiService(fixtures.poiService);
  //let newUser = fixtures.newUser;

  setup(async function () {
    poiService.deleteAllPois();
  });

  suiteTeardown(async function () {});

  test("Create a POI", async function () {
    const returnedPoi = await poiService.createPoi(newPoi);
    assert(_.some([returnedPoi], newPoi), "returnedPoi must be a superset of newPoi");
    assert.isDefined(returnedPoi._id);
  });

  test("Get Poi", async function () {
    const c1 = await poiService.createPoi(newPoi);
    const c2 = await poiService.getPoi(c1._id);
    assert.deepEqual(c1, c2);
  });

  test("get all pois", async function () {
    for (let c of poi) {
      await poiService.createPoi(c);
    }

    const allPois = await poiService.getPois();
    assert.equal(allPois.length, poi.length);
  });

  test("Delete a Poi", async function () {
    let c = await poiService.createPoi(newPoi);
    assert(c._id != null);
    await poiService.deleteOnePoi(c._id);
    c = await poiService.getPoi(c._id);
    assert(c == null);
  });
});
