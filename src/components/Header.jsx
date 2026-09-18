import { Phone, Upload } from "lucide-react";

export default function Header({ onImport }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Phone size={20} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              CallDesk
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Simple click-to-call contact manager
            </p>
          </div>
        </div>

        <button
          onClick={onImport}
          className="flex min-h-11 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
        >
          <Upload size={17} />
          <span>Import</span>
        </button>
      </div>
    </header>
  );
}