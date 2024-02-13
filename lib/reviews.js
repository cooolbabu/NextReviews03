import "server-only";

import { marked } from "marked";
import matter from "gray-matter";
import qs from "qs";

const CMS_URL = "http://localhost:1337";

export const CACHE_TAG_REVIEWS = "reviews";

export async function getReview(slug) {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });

  if (data.length === 0) return null;

  const item = data[0];
  return {
    ...toReview(item),
    body: marked(item.attributes.body),
  };
}

export async function getReviews(pageSize, page) {
  const { data, meta } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize: pageSize, page: page },
  });

  return {
    reviews: data.map(toReview),
    pageCount: meta.pagination.pageCount,
  };
}

export async function getSearch(pageSize, page) {
  const { data, meta } = await fetchReviews({
    fields: ["slug", "title", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize: pageSize, page: page },
  });

  return {
    reviews: data.map(toReview),
    pageCount: meta.pagination.pageCount,
  };
}

export async function getsearchableReviews(query) {
  console.log("GetSearchable reviews called");

  const { data } = await fetchReviews({
    filters: { title: { $containsi: query } },
    fields: ["slug", "title"],
    sort: ["title"],
    pagination: { pageSize: 5 },
  });

  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}

export async function searchReviews(query) {
  //console.log("search reviews called");

  const { data } = await fetchReviews({
    filters: { title: { $containsi: query } },
    fields: ["slug", "title"],
    sort: ["title"],
    pagination: { pageSize: 5 },
  });

  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}

export async function getSlugs() {
  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });
  //console.log("GetSlugs: ", data);
  return data.map((item) => item.attributes.slug);
}

export async function getFeaturedReview(nImages) {
  const reviews = await getReviews(nImages);
  //console.log("Featured review(reviews.js): ", reviews[0]);
  return reviews;
}

async function fetchReviews(parameters) {
  const reviews = [];

  const url =
    `${CMS_URL}/api/reviews` +
    "?" +
    qs.stringify(parameters, { encodeValuesOnly: true });

  //console.log("Fetch Reviews: ", url);
  const response = await fetch(url, {
    //cache: "no-store", This is one option
    next: {
      //revalidate: 30, // seconds - NextJs extension
      tags: [CACHE_TAG_REVIEWS],
    },
  });

  if (!response.ok) {
    throw new Error(`CMS returned ${response.status}' for ${url}`);
  }

  const body = await response.json();
  //console.log("Fetch Reviews: ", JSON.stringify(body, null, 2));
  return body;
}

function toReview(item) {
  const { attributes } = item;

  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: `${CMS_URL}` + attributes.image.data.attributes.url,
  };
}
