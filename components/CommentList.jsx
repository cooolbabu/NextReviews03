import { getComments } from "@/lib/comments";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const commentsL = [
  { id: "1", user: "Alice", message: "Love this game" },
  { id: "2", user: "Bob", message: "Mind blowing" },
  { id: "3", user: "Charlie", message: "Can't stop playing" },
];

// className="border-b px-3 py-2 last:border-none odd:bg-orange-100"
// className="flex gap-3 pb-1 text-slate-500"
// className = "italic";
export default async function CommentList({ slug }) {
  const comments = await getComments(slug);

  if (comments.length === 0)
    return (
      <p>
        <strong> Be the first to comment on this game</strong>
      </p>
    );
  else
    return (
      <ul className="border mt-3 rounded">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="border-b px-3 py-2 last:border-none odd:bg-orange-100"
          >
            <div className="flex gap-3 pb-1 text-slate-500">
              <UserCircleIcon className="h-6 w-6" />
              {comment.user}
            </div>
            <p className="italic">{comment.message}</p>
          </li>
        ))}
      </ul>
    );
}
