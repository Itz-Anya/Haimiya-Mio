import { Bone } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main id="main" aria-busy="true" className="mx-auto max-w-6xl px-4 pb-20 pt-28">
      <div className="mb-12 flex flex-col items-center gap-4">
        <Bone className="h-10 w-32" />
        <Bone className="h-7 w-40" />
        <Bone className="h-12 w-72 rounded-2xl! md:w-96" />
        <Bone className="h-4 w-64" />
      </div>
      <div className="mb-10 flex justify-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <Bone key={i} className="h-9 w-20" />
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Bone key={i} className="h-[26rem] rounded-[2rem]!" />
        ))}
      </div>
    </main>
  );
}
