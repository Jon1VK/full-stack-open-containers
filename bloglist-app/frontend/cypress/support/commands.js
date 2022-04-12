// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.add("loginAdmin", () => {
  cy.request("POST", "http://localhost:3000/api/login", {
    username: "admin",
    password: "admin",
  }).then(({ body }) => {
    localStorage.setItem("user", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("createBlog", (title, author, url) => {
  cy.request({
    url: "http://localhost:3000/api/blogs",
    method: "POST",
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  });
});
