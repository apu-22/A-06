import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-black text-[#ccff00] mb-2">404</h1>
      <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
      <p className="text-zinc-400 mb-6 max-w-sm text-sm">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-xl bg-[#ccff00] text-black font-bold text-sm hover:bg-[#b5e600] transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}
