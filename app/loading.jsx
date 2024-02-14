import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function loading() {
  return (
    <div className="flex justify-center py-6">
      <p>Loading Page ...</p>
      <ArrowPathIcon className="animate-spin h-6 text-orange-700 w-6" />
    </div>
  );
}
