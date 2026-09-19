
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-1 px-3 py-3 text-center sm:flex-row sm:px-6 lg:px-8">
        {/* Copyright */}
        <p className="flex items-center justify-center gap-1 text-xs text-slate-500">
          © {new Date().getFullYear()} BlackBuck CallDesk
          <span className="mx-1">•</span>
          Dhiraj AutoInterprises.
        </p>
      </div>
    </footer>
  );
}
