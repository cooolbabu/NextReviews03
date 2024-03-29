import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews, getSearchableReviews } from "@/lib/reviews";
import Image from "next/image";
import PaginationBar from "@/components/PaginationBar";
import SearchBox from "@/components/SearchBox";

export const metadata = {
  title: "Reviews",
  description: "Only the best indie game reviews",
};

export const PAGE_SIZE = 6;

//export const revalidate = 30; // seconds

export default async function ReviewsPage({ searchParams }) {
  const page = parsePageParam(searchParams.page);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);

  //const searchableReviews = await getSearchableReviews();
  //reviews.map(({ slug, title }) => console.log({ slug, title }));

  return (
    <>
      <Heading>Reviews</Heading>
      <div className="flex justify-between pb-3 ">
        <PaginationBar href="/reviews" page={page} pageCount={pageCount} />
        <SearchBox></SearchBox>
      </div>

      <ul className="flex flex-row flex-wrap gap-3">
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

function parsePageParam(paramValue) {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}
