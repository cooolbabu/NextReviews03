import { readdir, readFile } from "node:fs/promises";
import { marked } from "marked";
import matter from "gray-matter";

export async function getReview(slug) {
  const text = await readFile(`./content/reviews/${slug}.md`, "utf8");
  const {
    content,
    data: { title, date, image },
  } = matter(text);
  const body = marked(content, { headerId: false });
  //console.log("Get review: ", title, date, image);
  return { slug, title, date, image, body };
}

export async function getReviews() {
  const reviews = [];
  const slugs = await getSlugs();
  for (const slug of slugs) {
    const review = await getReview(slug);
    reviews.push(review);
  }
  //console.log(reviews);
  return reviews.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getSlugs() {
  const files = await readdir("./content/reviews");
  //console.log("Content file list: ", files);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.slice(0, -".md".length));
}

export async function getFeaturedReview() {
  const reviews = await getReviews();
  //console.log("Featured review(reviews.js): ", reviews[0]);
  return reviews[0];
}
