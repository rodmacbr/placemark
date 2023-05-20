import { assertSubset } from "../test-utils.js";

describe("Location Model tests", () => {
  beforeEach(() => {
    cy.request("POST", "/init"); // Assuming there is an API endpoint to initialize the database
    cy.request("DELETE", "/locations"); // Assuming there is an API endpoint to delete all locations
    cy.fixture("fixtures").then(({ testLocations }) => {
      testLocations.forEach((location) => {
        cy.request("POST", "/locations", location); // Assuming there is an API endpoint to add a location
      });
    });
  });

  it("create a location", () => {
    const mozart = {
      // Define the mozart object
      name: "Mozart",
      // ... other properties
    };

    cy.request("POST", "/locations", mozart).then((response) => {
      expect(response.body).to.include(mozart);
      expect(response.body._id).to.exist;
    });
  });

  it("delete all locations", () => {
    cy.request("GET", "/locations").then((response) => {
      expect(response.body).to.have.length(3);
      cy.request("DELETE", "/locations").then(() => {
        cy.request("GET", "/locations").then((response) => {
          expect(response.body).to.have.length(0);
        });
      });
    });
  });

  it("get a location - success", () => {
    const mozart = {
      // Define the mozart object
      name: "Mozart",
      // ... other properties
    };

    cy.request("POST", "/locations", mozart).then((response) => {
      const { _id } = response.body;
      cy.request("GET", `/locations/${_id}`).then((response) => {
        expect(response.body).to.include(mozart);
      });
    });
  });

  it("delete One Location - success", () => {
    cy.fixture("fixtures").then(({ testLocations }) => {
      const id = testLocations[0]._id;
      cy.request("DELETE", `/locations/${id}`).then(() => {
        cy.request("GET", "/locations").then((response) => {
          expect(response.body).to.have.length(testLocations.length - 1);
          cy.request("GET", `/locations/${id}`).then((response) => {
            expect(response.body).to.be.null;
          });
        });
      });
    });
  });

  it("get a location - bad params", () => {
    cy.request("GET", "/locations/").then((response) => {
      expect(response.body).to.be.null;
    });

    cy.request("GET", "/locations").then((response) => {
      expect(response.body).to.be.null;
    });
  });

  it("delete One Location - fail", () => {
    cy.request("DELETE", "/locations/bad-id").then(() => {
      cy.request("GET", "/locations").then((response) => {
        cy.fixture("fixtures").then(({ testLocations }) => {
          expect(response.body).to.have.length(testLocations.length);
        });
      });
    });
  });
});
