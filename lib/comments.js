import { db } from "./db";

export async function getComments(slug) {
  return await db.comment.findMany({
    where: { slug: slug },
  });
}

export async function createComments({ slug, user, message }) {
  const comment = await db.comment.create({
    data: {
      slug: slug,
      user: user,
      message: message,
    },
  });
}
