import { Phone } from "lucide-react";

export default function EmptyState({ onImport }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <Phone size={25} className="text-slate-600" />
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-900">
        No contacts yet
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Import an Excel/CSV file containing your phone
        numbers to start making one-click calls.
      </p>

      <button
        onClick={onImport}
        className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Import contacts
      </button>
    </div>
  );
}