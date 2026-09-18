
import { Phone, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 lg:px-8 sm:text-left">

        {/* Copyright */}
        <p className="flex items-center gap-1 text-xs text-slate-500">
          © {new Date().getFullYear()} CallDesk
          <span className="mx-1">•</span>
          Made with
          <Heart
            size={12}
            className="fill-current"
          />
        </p>
      </div>
    </footer>
  );
}
