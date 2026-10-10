import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/data";
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));
export default function Article({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug); if (!a) notFound();
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <p className="label">{a.category} — {a.date}</p>
      <h1 className="font-serif mt-4 text-5xl leading-tight md:text-7xl">{a.title}</h1>
      <div className="relative my-10 aspect-[16/10] overflow-hidden"><Image src={a.img} alt="" fill priority sizes="768px" className="object-cover" /></div>
      <div className="space-y-5 font-serif text-xl leading-relaxed text-silver">{a.body.map((p, i) => <p key={i}>{p}</p>)}</div>
      <Link href="/#journal" className="btn btn-ghost mt-12">Back to journal</Link>
    </article>
  );
}
