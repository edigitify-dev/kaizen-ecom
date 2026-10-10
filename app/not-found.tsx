import Link from "next/link";
export default function NotFound() { return <div className="grid min-h-[70vh] place-items-center px-5 text-center"><div><h1 className="headline text-7xl">Not found.</h1><Link href="/" className="btn btn-ghost mt-8">Back home</Link></div></div>; }
