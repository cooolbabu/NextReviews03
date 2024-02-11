import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import Image from "next/image";

export const metadata = {
  title: "Reviews",
  description: "Only the best indie game reviews",
};

//export const revalidate = 30; // seconds

export default async function ReviewsPage() {
  const reviews = await getReviews(8);
  // console.log("[Get Reviews: ", reviews);
  return (
    <>
      <Heading>Reviews</Heading>

      <ul className="flex flex-row flex-wrap gap-10">
        {reviews.map((review, index) => (
          <li
            key={review.slug}
            className="bg-white border rounded shadow w-80 hover:shadow-xl"
          >
            <Link href={`reviews/${review.slug}`}>
              <Image
                priority={index === 0}
                src={review.image}
                alt=""
                width="640"
                height="360"
                className="rounded-t"
              />
              <h2 className="font-orbitron font-semibold py-1 text-center">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
