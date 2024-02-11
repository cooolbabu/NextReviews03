import { writeFileSync } from "node:fs";
import qs from "qs";

const url =
  "http://localhost:1337/api/reviews" +
  "?" +
  qs.stringify(
    {
      filters: { slug: { $eq: "hades-2018" } },
      fields: [
        "slug",
        "title",
        "subtitle",
        "publishedAt",
        "body",
        "publishedAt",
      ],
      populate: { image: { fields: ["url"] } },
      pagination: { pageSize: 1, withCount: false },
    },

    { encodeValuesOnly: true }
  );

console.log(url);

const response = await fetch(url);
const body = await response.json();
const formatted = JSON.stringify(body, null, 2);

console.log("Get Review: " + body.data[0]);
console.log("title: " + body.data[0].attributes.title);
console.log("Get Review data: " + JSON.stringify(body.data[0], null, 2));

// data = body[0];
// const { attributes } = data[0];
// console.log(attributes);

const file = "scripts/strapi-response-review.json";
writeFileSync(file, formatted, "utf8");
