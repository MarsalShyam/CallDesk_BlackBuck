import { useRef, useState } from "react";
import { Upload, X, FileSpreadsheet } from "lucide-react";
import { parseContactFile } from "../utils/fileUtils";

export default function ImportModal({
  open,
  onClose,
  onImport,
}) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleFile = async (file) => {
    if (!file) return;

    setError("");
    setLoading(true);

    try {
      const contacts = await parseContactFile(file);

      onImport(contacts);

      onClose();
    } catch (error) {
      setError(
        error.message || "Unable to import this file."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Import contacts
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload an Excel or CSV file.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <button
          disabled={loading}
          onClick={() => fileInputRef.current?.click()}
          className="mt-6 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 px-6 py-10 transition hover:border-slate-500 hover:bg-slate-50 disabled:opacity-50"
        >
          {loading ? (
            <p className="text-sm font-medium">
              Reading file...
            </p>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <FileSpreadsheet size={22} />
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-900">
                Choose Excel / CSV
              </p>

              <p className="mt-1 text-xs text-slate-500">
                .xlsx, .xls or .csv
              </p>
            </>
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={(event) =>
            handleFile(event.target.files?.[0])
          }
        />

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}