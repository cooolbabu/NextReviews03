"use client";

// Using server actions and revalidate static pages

import { useState } from "react";
import { createCommentAction } from "@/app/reviews/[slug]/actions";

// Server side html form validation
export default function CommentForm({ slug, title }) {
  const [cfState, setCFState] = useState({ loading: false, error: null });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setCFState({ loading: true, error: null });
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await createCommentAction(formData);

    console.log("[CommentForm-handleSubmit]: ", result);
    if (result?.isError) {
      setCFState({ loading: false, error: result });
    } else {
      form.reset();
      setCFState({ loading: false, error: null });
    }
  };
  return (
    <form
      onSubmit={handleSubmit} // Calling server action for validation - Server side validation
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded"
    >
      <p className="py-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <input type="hidden" name="slug" value={slug} />
      <div>
        <label htmlFor="userField">Your name</label>
        <input
          type="userField"
          name="user"
          className="border px-2 py-1 rounded w-48"
        />
      </div>
      <div>
        <label htmlFor="messageField">Message</label>
        <input
          type="messageField"
          name="message"
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      {Boolean(cfState.error) && (
        <p className="text-red-700 text-">{cfState.error.message}</p>
      )}
      <button
        type="submit"
        disabled={cfState.loading}
        className="bg-orange-800 rounded px-2 py-1 self-center text-slate-50 w-32 hover:bg-orange-700 disabled:bg-slate-500 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
}
