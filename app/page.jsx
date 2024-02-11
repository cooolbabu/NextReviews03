import Heading from "@/components/Heading";
import Image from "next/image";
import { getReviews } from "@/lib/reviews";
import Link from "next/link";

export default async function HomePage() {
  const reviews = await getReviews(3);
  //console.log("Featured review(HomePage): ", reviews);
  return (
    <>
      <Heading>Indie Game review</Heading>
      <p className="pb-3">Only the best indie game reviews</p>
      <ul className="flex flex-col gap-3">
        {reviews.map((review, index) => (
          <li
            key={review.slug}
            className="bg-white border rounded shadow w-80 hover:shadow-xl sm:w-full"
          >
            <Link
              href="/reviews/hollow-knight"
              className="flex flex-col sm:flex-row"
            >
              <Image
                priority={index === 0}
                src={review.image}
                alt=""
                width="640"
                height="360"
                className="rounded-t sm:rounded-l sm:rounded-r-none"
              />
              <div>
                <h2 className="font-orbitron font-semibold py-2 px-2">
                  {review.title}
                </h2>
                <p className="px-2">{review.subtitle}</p>
                {/* <article
              dangerouslySetInnerHTML={{ __html: review.body }}
              className="max-w-screen-sm prose prose-slate py-2 px-2"
            ></article> */}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
