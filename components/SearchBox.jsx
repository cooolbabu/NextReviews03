"use client";

import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useIsClient from "@/lib/hooks";
import { useDebounce } from "use-debounce";

export default function SearchBox() {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState("");
  const [reviews, setReviews] = useState([]);
  const [debouncedQuery] = useDebounce(query, 300);

  // getSearchableReviews is a server component. This is another way for clients to call
  // REST services within useEffect.
  // This route is part of this application. This way backend services are not exposed.

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        //const reviews = await getsearchableReviews(query);
        const url = "/api/search?query=" + encodeURIComponent(debouncedQuery);
        const response = await fetch(url, { signal: controller.signal });
        const reviews = await response.json();
        setReviews(reviews);
      })();
      return () => controller.abort();
    } else {
      setReviews([]);
    }
  }, [debouncedQuery]);

  if (!isClient) return null;

  console.log("[SearchBox]", { query, debouncedQuery });

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
