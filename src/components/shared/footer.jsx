import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-zinc-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="FITLOG Logo"
            width={22}
            height={22}
            className="object-contain"
          />
          <span className="text-white font-extrabold text-sm tracking-wider uppercase">
            FITLOG
          </span>
        </Link>

        <p className="text-zinc-500 text-xs sm:text-sm font-normal text-center sm:text-right">
          © {currentYear} FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
