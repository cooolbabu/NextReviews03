import { writeFileSync } from "node:fs";
import qs from "qs";

const url =
  "http://localhost:1337/api/reviews" +
  "?" +
  qs.stringify(
    {
      fields: ["slug", "title", "subtitle", "publishedAt"],
      populate: { image: { fields: ["url"] } },
      sort: ["publishedAt:desc"],
      pagination: { pageSize: 6 },
    },

    { encodeValuesOnly: true }
  );

console.log(url);

const response = await fetch(url);
const body = await response.json();

//console.log(JSON.stringify(body, null, 2));

const file = "scripts/strapi-response-reviews.json";
writeFileSync(file, JSON.stringify(body, null, 2), "utf8");
