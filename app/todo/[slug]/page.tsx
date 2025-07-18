
import Link from "next/link";

async function getNote(slug: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug)
  const note = await getNote(slug);

  return (
    <div className="font-sans bg-yellow-200  min-h-screen p-5">
      <Link href="/" className="text-blue-500 hover:text-black underline mb-2">
        Back to Home
      </Link>
      <div className="text-2xl font-bold h-[90vh] bg-yellow-300 p-5 relative grid place-content-center">
        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
        <div className="absolute bottom-0 right-0 p-3 bg-yellow-100">
          <p className="text-sm text-gray-600">
            Note Status: {note.completed ? "Completed" : "Undone"}
          </p>
          <p className="text-sm text-gray-600">ID: {note.id}</p>
          <p className="text-sm text-gray-600">User ID: {note.userId}</p>
        </div>
      </div>
    </div>
  );
}
