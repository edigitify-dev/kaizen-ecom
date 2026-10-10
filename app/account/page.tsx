export const metadata = { title: "Account — KAIZEN" };
export default function Account() {
  return (
    <div className="mx-auto min-h-[70vh] max-w-md px-5 pt-36">
      <h1 className="headline text-6xl">Account</h1>
      <p className="mt-4 text-sm text-silver">Sign-in is not connected in this demo. Wire this form to your auth provider.</p>
      <form className="mt-8 space-y-4">
        <label className="block"><span className="label">Email</span><input type="email" disabled className="mt-2 w-full border border-ivory/20 bg-transparent px-4 py-3 opacity-50" /></label>
        <button disabled className="btn btn-solid w-full opacity-50">Sign in unavailable</button>
      </form>
    </div>
  );
}
