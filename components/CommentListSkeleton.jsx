import { UserCircleIcon } from "@heroicons/react/24/outline";

const commentsL = [
  { id: "1", user: "Alice", message: "Love this game" },
  { id: "2", user: "Bob", message: "Mind blowing" },
  { id: "3", user: "Charlie", message: "Can't stop playing" },
];

// className="border-b px-3 py-2 last:border-none odd:bg-orange-100"
// className="flex gap-3 pb-1 text-slate-500"
// className = "italic";
export default function CommentListSkeleton() {
  return (
    <ul className="animate-pulse border mt-3 rounded">
      {[1, 2, 3].map((index) => (
        <li
          key={index}
          className="border-b px-3 py-2 last:border-none odd:bg-orange-100"
        >
          <div className="flex gap-3 items-center pb-1 text-slate-500">
            <UserCircleIcon className="h-6 w-6" />
            <div className="rounded bg-slate-400 h-3 w-24"></div>
          </div>
          <div className="rounded bg-slate-400 h-3 w-2/3"></div>
        </li>
      ))}
    </ul>
  );
}
