export default function CommentForm({ slug, title }) {
  return (
    <form
      action=""
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded"
    >
      <p className="py-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <div>
        <label htmlFor="userField">Your name</label>
        <input type="userField" className="border px-2 py-1 rounded w-48" />
      </div>
      <div>
        <label htmlFor="messageField">Message</label>
        <input
          type="messageField"
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-orange-800 rounded px-2 py-1 self-center text-slate-50 w-32 hover:bg-orange-700 disabled:bg-slate-500 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
}
