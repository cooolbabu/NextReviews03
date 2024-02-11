import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReview, getSlugs } from "@/lib/reviews";
import Image from "next/image";
import { notFound } from "next/navigation";

//export const revalidate = 30; // seconds

export async function generateStaticParams() {
  const slugs = await getSlugs();
  //console.log("Generate Static Params(Slugs.Page.jsx):", slugs);
  return slugs.map((slug) => ({ slug })); // Return an array of objects
}

export async function generateMetaData({ params: { slug } }) {
  //console.log("GenerateMetaData(slugs)", slug);
  const review = await getReview(slug);

  if (!review) {
    notFound();
  }
  return {
    title: review.title,
  };
}
export default async function ReviewPage({ params: { slug } }) {
  //console.log("Review Page", slug);
  const review = await getReview(slug);

  if (!review) {
    notFound();
  }
  return (
    <>
      <Heading>{review.title}</Heading>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkButton></ShareLinkButton>
      </div>
      <Image
        src={review.image}
        alt=""
        priority
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="max-w-screen-sm prose prose-slate"
      ></article>
    </>
  );
}
