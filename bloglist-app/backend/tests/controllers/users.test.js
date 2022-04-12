const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const api = supertest(app);
const userHelper = require("../helpers/user.helper");
const userFactory = require("../../factories/user");
const seedDb = require("../../db/seed");

beforeAll(async () => {
  await seedDb();
});

describe("GET /api/users", () => {
  test("users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all users are returned", async () => {
    const initialUsers = await userHelper.getAllFromDb();
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(initialUsers.length);
  });

  test("users have an id property defined", async () => {
    const response = await api.get("/api/users");
    expect(response.body[0].id).toBeDefined();
  });

  test("a specific user is within the returned users", async () => {
    const initialUsers = await userHelper.getAllFromDb();
    const response = await api.get("/api/users");
    const usernames = response.body.map((user) => user.username);
    expect(usernames).toContain(initialUsers[0].username);
  });
});

describe("POST /api/users", () => {
  test("a user can be created", async () => {
    const initialUsers = await userHelper.getAllFromDb();
    const newUser = userFactory.buildObj();

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersInDb = await userHelper.getAllFromDb();
    const usernames = usersInDb.map((user) => user.username);

    expect(usersInDb).toHaveLength(initialUsers.length + 1);
    expect(usernames).toContain(newUser.username);
  });

  test("responds with status code 400 if username is missing", async () => {
    const invalidUser = userFactory.buildObj();
    delete invalidUser.username;

    await api.post("/api/users").send(invalidUser).expect(400);
  });

  test("responds with status code 400 if username is too short", async () => {
    const invalidUser = userFactory.buildObj({ username: "Jo" });
    await api.post("/api/users").send(invalidUser).expect(400);
  });

  test("responds with status code 400 if username is not unique", async () => {
    const initialUsers = await userHelper.getAllFromDb();
    const commonUsername = initialUsers[0].username;

    const invalidUser = userFactory.buildObj({ username: commonUsername });
    await api.post("/api/users").send(invalidUser).expect(400);
  });

  test("responds with status code 400 if password is missing", async () => {
    const invalidUser = userFactory.buildObj();
    delete invalidUser.password;

    await api.post("/api/users").send(invalidUser).expect(400);
    await api.post("/api/users").send(invalidUser).expect(400);
  });

  test("responds with status code 400 if password is too short", async () => {
    const invalidUser = userFactory.buildObj({ password: "12" });
    await api.post("/api/users").send(invalidUser).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
