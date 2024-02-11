"use client";
import { useState } from "react";
import { LinkIcon } from "@heroicons/react/20/solid";

export default function ShareLinkButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    //console.log("Clicked");
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);
    setTimeout(() => setClicked(false), 1500);
  };

  //console.log("[ShareLinkButton] Clicked", clicked);
  return (
    <button
      onClick={handleClick}
      className="border rounded flex gap-1 items-center px-2 py-2 text-slate-500 text-sm hover:bg-orange-300 hover:text-slate-700"
    >
      <LinkIcon className="h-4 w-4" />
      {clicked ? "Link Copied!" : "Share Link"}
    </button>
  );
}
