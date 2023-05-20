export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$HnapEWWKQQ0.0Ft33nXxtuJ0fsmd9ywYswEzT4C.6Ul5y6cOU.UEa",
      scope: ["admin", "user"],
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$D3TWK8MSAh63Lhk4gIFSJ.ekM368J88qJRUYSbuBfzffex6B0dFwK",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$uqnPlgyVjBEOtcgMhn/WRO3FwW4T9gX36tTB4RqpGeB/LkCR3YQuO",
    },
  },
  locations: {
    _model: "Location",
    Dublin: {
      name: "Dublin",
      userid: "->users.homer",
    },
    Galway: {
      name: "Galway",
      userid: "->users.marge",
    },
    Cork: {
      name: "Cork",
      userid: "->users.homer",
    },
    Waterford: {
      name: "Waterford",
      userid: "->users.bart",
    },
  },
  placemarks: {
    _model: "Placemark",
    placemark_1: {
      name: "Trinity College Dublin",
      description: "originally established outside Dublin's city walls in the buildings of the outlawed Catholic Augustinian Priory of All Hallows.",
      latitude: 53.343792,
      longitude: -6.254572,
      category: "Schools",
      locationid: "->locations.Dublin",
    },
    placemark_2: {
      name: "Dublin Castle",
      description:
        "It is the largest in the country historic governmental area, built in the early epochs (right after the Normal invasion in the 13th century) and seriously reconstructed in the 18th century. ",
      latitude: 53.342686,
      longitude: -6.267118,
      category: "Tourist-attractions",
      locationid: "->locations.Dublin",
    },
    placemark_3: {
      name: "Christ Church Cathedral",
      description:
        "Located in the heart of Medieval Dublin and renowned for its beauty, architecture and exquisite floor tiles, Christ Church Cathedral was founded in 1030 by Sitric, King of the Dublin Norsemen.",
      latitude: 53.34309,
      longitude: -6.27086,
      category: "Tourist-attractions",
      locationid: "->locations.Dublin",
    },
  },

  reviews: {
    _model: "Review",
    review_1: {
      comment: "Great place to visit",
      rating: "8",
      userid: "->users.homer",
      placemarkid: "->locations.dublin",
    },
    review__2: {
      comment: "Nice place but the weather didn't help",
      rating: "6",
      userid: "->users.bart",
      placemarkid: "->locations.dublin",
    },
  },
};
