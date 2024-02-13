"use client";

import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getsearchableReviews } from "@/lib/reviews";
import useIsClient from "@/lib/hooks";

export default function SearchBox() {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (query.length > 1) {
      (async () => {
        const reviews = await getsearchableReviews(query);
        setReviews(reviews);
      })();
    } else {
      setReviews([]);
    }
  }, [query]);

  if (!isClient) return null;

  const handleChange = (review) => {
    console.log("[Searchbar(handleChange)]", review);
    router.push(`/reviews/${review.slug}`);
  };

  const filtered = reviews
    .filter((review) =>
      review.title.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);
  //reviews = reviews.slice(0, 5);

  return (
    <div className="relative w-60">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="border rounded px-2 w-full"
        ></Combobox.Input>
        <Combobox.Options className="border absolute bg-white">
          {reviews.map((review) => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate w-full ${
                    active ? "bg-orange-100" : ""
                  }`}
                >
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
