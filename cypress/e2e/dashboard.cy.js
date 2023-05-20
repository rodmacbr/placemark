describe("login flow", () => {
  it("will allow the user to login", () => {
    cy.visit("http://localhost:3000");
    cy.get("a#login").click();

  })
})