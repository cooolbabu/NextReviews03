import Heading from "@/components/Heading";
import { getFeaturedReview } from "@/lib/reviews";
import Link from "next/Link";

export default async function HomePage() {
  const review = await getFeaturedReview();
  console.log("Featured review(HomePage): ", review);
  return (
    <>
      <Heading>Indie Game review</Heading>
      <p className="pb-3">Only the best indie game reviews</p>
      <div className="bg-white border rounded shadow w-80 hover:shadow-xl sm:w-full">
        <Link
          href="/reviews/hollow-knight"
          className="flex flex-col sm:flex-row"
        >
          <img
            src="/images/hollow-knight.jpg"
            alt=""
            width="640"
            height="360"
            className="rounded-t sm:rounded-l sm:rounded-r-none"
          />
          <div>
            <h2 className="font-orbitron font-semibold py-2 px-2">
              {review.title}
            </h2>
            <article
              dangerouslySetInnerHTML={{ __html: review.body }}
              className="max-w-screen-sm prose prose-slate py-2 px-2"
            ></article>
          </div>
        </Link>
      </div>
    </>
  );
}
