const helpers = (hbs) => {
	hbs.registerHelper("isAdmin", (user) => !!user.scope.includes("admin"));
};

export default helpers;
