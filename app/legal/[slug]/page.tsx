import { notFound } from "next/navigation";
import { legal } from "@/lib/data";
export const generateStaticParams = () => Object.keys(legal).map((slug) => ({ slug }));
export default function Legal({ params }: { params: { slug: string } }) {
  const l = legal[params.slug]; if (!l) notFound();
  return <div className="mx-auto min-h-[70vh] max-w-3xl px-5 pt-36"><h1 className="headline text-6xl">{l.title}</h1><div className="mt-8 space-y-4 text-silver">{l.body.map((p, i) => <p key={i}>{p}</p>)}</div></div>;
}
