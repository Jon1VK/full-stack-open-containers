describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/tests/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input[name=username]").type("admin");
      cy.get("input[name=password]").type("admin");
      cy.contains("Login").click();
      cy.contains("Admin logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input[name=username]").type("admin");
      cy.get("input[name=password]").type("invalid");
      cy.contains("Login").click();
      cy.contains("invalid username or password").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.loginAdmin();
    });

    it("A blog can be created", function () {
      cy.contains("New blog").click();
      cy.get("input[name=title]").type("Test Blog");
      cy.get("input[name=author]").type("Test Author");
      cy.get("input[name=url]").type("example.com");
      cy.contains("Create").click();
      cy.contains("Test Blog by Test Author");
    });

    describe("And several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog("Blog 1", "Author 1", "example.com/1");
        cy.createBlog("Blog 2", "Author 2", "example.com/2");
        cy.createBlog("Blog 3", "Author 3", "example.com/3");
        cy.visit("http://localhost:3000");
      });

      it("Blog details can be viewed", function () {
        cy.contains("Blog 2")
          .siblings(".blog__details")
          .as("blogDetails")
          .should("not.be.visible");
        cy.contains("Blog 2").contains("view").click();
        cy.get("@blogDetails").should("be.visible");
        cy.contains("Blog 2").contains("hide");
      });

      it("Blog can be liked", function () {
        cy.contains("Blog 2").contains("view").click();
        cy.contains("Blog 2")
          .siblings(".blog__details")
          .contains("likes 0")
          .as("likes");
        cy.get("@likes").contains("like").click();
        cy.get("@likes").contains("likes 1");
        cy.get("@likes").contains("like").click();
        cy.get("@likes").contains("likes 2");
      });

      it("Blog can be deleted", function () {
        cy.contains("Blog 2").contains("view").click();
        cy.contains("Blog 2")
          .siblings(".blog__details")
          .contains("Delete")
          .click();
        cy.get("html").should("not.contain", "Blog 2 by Author 2");
      });

      it("Blogs are ordered by likes", function () {
        cy.get(".blog__details").then((blogDetails) => {
          blogDetails.each((index, blogDetail) => {
            cy.wrap(blogDetail).as("blogDetail");
            cy.get("@blogDetail").parent().contains("view").click();
            for (let i = 0; i < index; i++) {
              cy.get("@blogDetail").contains("like").click();
            }
          });
        });

        cy.get(".blog__details").then((blogDetails) => {
          const blogLikes = [...blogDetails].map(
            (blogDetails) =>
              blogDetails.innerText.match(/likes (?<likes>\d+)/).groups.likes
          );

          const likesAreInDescendingOrder = blogLikes.every((likes, i) => {
            return i === 0 || blogLikes[i - 1] >= likes;
          });

          if (!likesAreInDescendingOrder) {
            throw new Error("Blogs are not sorted by likes");
          }
        });
      });
    });
  });
});
