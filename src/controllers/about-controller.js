export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Point-of-Interest",
      };
      return h.view("about-view", viewData);
    },
  },
};
