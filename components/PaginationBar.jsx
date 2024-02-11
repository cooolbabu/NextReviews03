import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function PaginationBar({ href, page, pageCount }) {
  return (
    <div className="flex gap-2 pb-3  items-center">
      <PaginationLink href={`${href}?page=${page - 1}`} enabled={page > 1}>
        <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
      </PaginationLink>
      <span>
        Page {page} of {pageCount}
      </span>
      <PaginationLink
        href={`${href}?page=${page + 1}`}
        enabled={page < pageCount}
      >
        <ChevronRightIcon className="h-6 w-6"></ChevronRightIcon>
      </PaginationLink>
    </div>
  );
}

function PaginationLink({ children, href, enabled }) {
  if (!enabled)
    return (
      <Link
        href={href}
        className="border cursor-not-allowed rounded text-slate-300 text-sm hover:bg-orange-200 hover:text-slate-600"
      >
        {children}
      </Link>
    );
  else
    return (
      <Link
        href={href}
        className="border  rounded text-slate-500 text-sm hover:bg-orange-200 hover:text-slate-600"
      >
        {children}
      </Link>
    );
}
