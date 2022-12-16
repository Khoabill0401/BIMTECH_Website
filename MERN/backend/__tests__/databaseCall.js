const mongoose = require("mongoose");
const Category = require("../models/CategoryModel");

beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://anko:AOjHOx5wAV8lV5ez@cluster0.ilx584c.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("Should save category to database", async () => {
  const mockCategory = { name: "test category" };
  await Category.create(mockCategory);

  const insertedCategory = await Category.findOne({ name: "test category" });
  expect(insertedCategory.name).toEqual(mockCategory.name);
})

test("Should delete category", async () => {
  const category = await Category.findOne({ name: "test category" }).deleteOne();
  expect(category.name).toBeFalsy();
});