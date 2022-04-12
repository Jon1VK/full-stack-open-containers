const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../../utils/config");
const supertest = require("supertest");
const app = require("../../app");
const api = supertest(app);
const blogHelper = require("../helpers/blog.helper");
const blogFactory = require("../../factories/blog");
const seedDb = require("../../db/seed");
const userHelper = require("../helpers/user.helper");

beforeAll(async () => {
  await seedDb();
});

describe("GET /api/blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const initialBlogs = await blogHelper.getAllFromDb();
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("blogs have an id property defined", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  test("a specific blog is within the returned blogs", async () => {
    const initialBlogs = await blogHelper.getAllFromDb();
    const response = await api.get("/api/blogs");
    const titles = response.body.map((blog) => blog.title);
    expect(titles).toContain(initialBlogs[0].title);
  });
});

describe("POST /api/blogs", () => {
  let authorization;

  beforeAll(async () => {
    const user = await userHelper.getRandomFromDb();
    const token = jwt.sign({ id: user.id }, config.SECRET);
    authorization = `Bearer ${token}`;
  });

  test("a blog can be created", async () => {
    const initialBlogs = await blogHelper.getAllFromDb();
    const newBlog = blogFactory.buildObj();

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", authorization)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsInDb = await blogHelper.getAllFromDb();
    const titles = blogsInDb.map((blog) => blog.title);

    expect(blogsInDb).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain(newBlog.title);
  });

  test("if likes attribute is not given it gets default value 0", async () => {
    const newBlog = blogFactory.buildObj();
    delete newBlog.likes;

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", authorization)
      .expect(201);

    expect(response.body.likes).toBe(0);
  });

  test("responds with status code 400 if title is blank", async () => {
    const invalidBlog = blogFactory.buildObj({ title: "" });
    await api
      .post("/api/blogs")
      .send(invalidBlog)
      .set("Authorization", authorization)
      .expect(400);
  });

  test("responds with status code 400 if author is blank", async () => {
    const invalidBlog = blogFactory.buildObj({ author: "" });
    await api
      .post("/api/blogs")
      .send(invalidBlog)
      .set("Authorization", authorization)
      .expect(400);
  });

  test("responds with status code 400 if url is blank", async () => {
    const invalidBlog = blogFactory.buildObj({ url: "" });
    await api
      .post("/api/blogs")
      .send(invalidBlog)
      .set("Authorization", authorization)
      .expect(400);
  });
});

describe("GET /api/blogs/:id", () => {
  test("with valid id blog is returned as json", async () => {
    const validId = await blogHelper.validId();

    await api
      .get(`/api/blogs/${validId}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("responds with status code 404 with invalid id", async () => {
    const invalidId = mongoose.Types.ObjectId();
    await api.get(`/api/blogs/${invalidId}`).expect(404);
  });
});

describe("DELETE /api/blogs/:id", () => {
  test("with valid authorization token blog is removed from db", async () => {
    const blog = await blogHelper.getRandomFromDb();
    const token = jwt.sign({ id: blog.user.toString() }, config.SECRET);
    const authorization = `Bearer ${token}`;
    await api
      .delete(`/api/blogs/${blog.id}`)
      .set("Authorization", authorization)
      .expect(204);
    await api.get(`/api/blogs/${blog.id}`).expect(404);
  });

  test("returns 401 with no authorization token", async () => {
    const blog = await blogHelper.getRandomFromDb();
    await api.delete(`/api/blogs/${blog.id}`).expect(401);
    await api.get(`/api/blogs/${blog.id}`).expect(200);
  });
});

describe("PUT /api/blogs/:id", () => {
  test("blog likes can be updated", async () => {
    const validId = await blogHelper.validId();
    const blogBeforeUpdate = await blogHelper.getFromDb(validId);
    const updatedLikes = blogBeforeUpdate.likes + 1;

    await api
      .put(`/api/blogs/${validId}`)
      .send({ likes: updatedLikes })
      .expect(200);

    const blogAfterUpdate = await blogHelper.getFromDb(validId);
    expect(blogAfterUpdate.likes).toEqual(updatedLikes);
  });

  test("responds with status code 404 with invalid id", async () => {
    const invalidId = mongoose.Types.ObjectId();
    await api.put(`/api/blogs/${invalidId}`).send({}).expect(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
