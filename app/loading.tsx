import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center gap-3 ">
      <Loader className="animate-spin" />
      <h1 className="text-4xl font-bold">Loading...</h1>
    </div>
  );
}
