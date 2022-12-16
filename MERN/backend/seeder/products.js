const products = [
    {
    name: "Product1 Lenovo Comp1 Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 5,
    price: 100,
    category: "AAA/BBB/CCC",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 5,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "blue" }],
  },
  {
    name: "Product2 Lenovo Comp2 Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 5,
    price: 100,
    category: "AAA/BBB/DDD",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 5,
    reviewsNumber: 5,
    reviews: [],
    attrs: [
      { key: "XXX", value: "YYY" },
      { key: "ZZZ", value: "TTT" },
    ],
  },
  {
    name: "Product3 Dell Comp Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 5,
    price: 100,
    category: "AAA/BBB/EEE",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 5,
    reviewsNumber: 5,
    reviews: [],
    attrs: [
      { key: "XXX", value: "YYY" },
      { key: "ZZZ", value: "TTT" },
    ],
  },
  {
    name: "Product4 Tablet Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 5,
    price: 100,
    category: "FFF",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 5,
    reviewsNumber: 5,
    reviews: [],
  },
  {
    name: "Product5 Tablet Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 10,
    price: 200,
    category: "FFF",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 5,
    reviewsNumber: 6,
    reviews: [],
  },
  {
    name: "Product6 Tablet Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 15,
    price: 300,
    category: "FFF",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 4,
    reviewsNumber: 7,
    reviews: [],
  },
  {
    name: "Product7 Tablet Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 20,
    price: 400,
    category: "FFF",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 4,
    reviewsNumber: 8,
    reviews: [],
  },
  {
    name: "Product8 Tablet Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 25,
    price: 500,
    category: "FFF",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 3,
    reviewsNumber: 9,
    reviews: [],
  },
  {
    name: "Product9 Monitor Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 5,
    price: 100,
    category: "HHH",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 5,
    reviewsNumber: 5,
    reviews: [],
  },
  {
    name: "Product10 Monitor Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 10,
    price: 200,
    category: "HHH",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 5,
    reviewsNumber: 6,
    reviews: [],
  },
  {
    name: "Product11 Monitor Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 15,
    price: 300,
    category: "HHH",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 4,
    reviewsNumber: 7,
    reviews: [],
  },
  {
    name: "Product12 Monitor Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 20,
    price: 400,
    category: "HHH",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 4,
    reviewsNumber: 8,
    reviews: [],
  },
  {
    name: "Product13 Monitor Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 25,
    price: 500,
    category: "HHH",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 3,
    reviewsNumber: 9,
    reviews: [],
  },
  {
    name: "Product14 Game Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 5,
    price: 100,
    category: "KKK",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 5,
    reviewsNumber: 5,
    reviews: [],
  },
  {
    name: "Product15 Game Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 10,
    price: 200,
    category: "KKK",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 5,
    reviewsNumber: 6,
    reviews: [],
  },
  {
    name: "Product16 Game Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 15,
    price: 300,
    category: "KKK",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 4,
    reviewsNumber: 7,
    reviews: [],
  },
  {
    name: "Product17 Game Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 20,
    price: 400,
    category: "KKK",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 4,
    reviewsNumber: 8,
    reviews: [],
  },
  {
    name: "Product18 Game Name Lorem ipsum dolor sit amet",
    description:
      "Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    count: 25,
    price: 500,
    category: "KKK",
    images: [
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
      { path: "/images/Pic2.jpg" },
    ],
    rating: 3,
    reviewsNumber: 9,
    reviews: [],
  },
]

module.exports = products
