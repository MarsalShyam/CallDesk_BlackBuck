// import { useRef, useState } from "react";
// import { Upload, X, FileSpreadsheet } from "lucide-react";
// import { parseContactFile } from "../utils/fileUtils";

// export default function ImportModal({
//   open,
//   onClose,
//   onImport,
// }) {
//   const fileInputRef = useRef(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (!open) return null;

//   const handleFile = async (file) => {
//     if (!file) return;

//     setError("");
//     setLoading(true);

//     try {
//       const contacts = await parseContactFile(file);

//       onImport(contacts);

//       onClose();
//     } catch (error) {
//       setError(
//         error.message || "Unable to import this file."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
//       <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
//         <div className="flex items-start justify-between">
//           <div>
//             <h2 className="text-lg font-bold text-slate-900">
//               Import contacts
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Upload an Excel or CSV file.
//             </p>
//           </div>

//           <button
//             onClick={onClose}
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         <button
//           disabled={loading}
//           onClick={() => fileInputRef.current?.click()}
//           className="mt-6 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 px-6 py-10 transition hover:border-slate-500 hover:bg-slate-50 disabled:opacity-50"
//         >
//           {loading ? (
//             <p className="text-sm font-medium">
//               Reading file...
//             </p>
//           ) : (
//             <>
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
//                 <FileSpreadsheet size={22} />
//               </div>

//               <p className="mt-3 text-sm font-semibold text-slate-900">
//                 Choose Excel / CSV
//               </p>

//               <p className="mt-1 text-xs text-slate-500">
//                 .xlsx, .xls or .csv
//               </p>
//             </>
//           )}
//         </button>

//         <input
//           ref={fileInputRef}
//           type="file"
//           accept=".xlsx,.xls,.csv"
//           className="hidden"
//           onChange={(event) =>
//             handleFile(event.target.files?.[0])
//           }
//         />

//         {error && (
//           <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
//             {error}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useRef, useState } from "react";
import {
  Upload,
  X,
  FileSpreadsheet,
  ClipboardPaste,
  CheckCircle2,
} from "lucide-react";

import { parseContactFile } from "../utils/fileUtils";
import {
  normalizePhoneNumber,
  isValidPhoneNumber,
} from "../utils/phoneUtils";

export default function ImportModal({
  open,
  onClose,
  onImport,
}) {
  const fileInputRef = useRef(null);

  const [mode, setMode] = useState("paste");
  const [numbers, setNumbers] = useState("");
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

      setNumbers("");
    } catch (error) {
      setError(
        error.message || "Unable to import this file."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasteNumbers = () => {
    setError("");

    if (!numbers.trim()) {
      setError("Please paste at least one phone number.");
      return;
    }

    const lines = numbers
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const contacts = [];
    const invalidNumbers = [];
    const seenNumbers = new Set();

    lines.forEach((line, index) => {
      const phone = normalizePhoneNumber(line);

      if (!isValidPhoneNumber(phone)) {
        invalidNumbers.push({
          value: line,
          line: index + 1,
        });

        return;
      }

      if (seenNumbers.has(phone)) {
        return;
      }

      seenNumbers.add(phone);

      contacts.push({
        id: `${Date.now()}-${index}`,
        name: `Contact ${contacts.length + 1}`,
        phone,
        status: "pending",
      });
    });

    if (!contacts.length) {
      setError(
        "No valid phone numbers were found."
      );
      return;
    }

    if (invalidNumbers.length > 0) {
      setError(
        `${invalidNumbers.length} invalid number${
          invalidNumbers.length > 1 ? "s were" : " was"
        } skipped. Valid numbers were imported.`
      );
    }

    onImport(contacts);

    setNumbers("");

    // Close after a small delay if there are warnings.
    if (invalidNumbers.length === 0) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Import contacts
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add phone numbers using either method.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("paste");
              setError("");
            }}
            className={`flex min-h-11 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
              mode === "paste"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <ClipboardPaste size={17} />
            Paste Numbers
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("file");
              setError("");
            }}
            className={`flex min-h-11 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
              mode === "file"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <FileSpreadsheet size={17} />
            Excel / CSV
          </button>
        </div>

        {/* Paste mode */}
        {mode === "paste" && (
          <div className="mt-5">

            <label className="text-sm font-semibold text-slate-800">
              Phone numbers
            </label>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Paste one number per line. Indian 10-digit numbers
              are automatically converted to +91.
            </p>

            <textarea
              value={numbers}
              onChange={(event) => {
                setNumbers(event.target.value);
                setError("");
              }}
              placeholder={`9950298611
8894400645
9975379011
6398702394
9431094808`}
              rows={10}
              className="mt-3 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
            />

            {/* Number count */}
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-slate-500">
                {
                  numbers
                    .split(/\r?\n/)
                    .filter((line) => line.trim()).length
                }{" "}
                number
                {
                  numbers
                    .split(/\r?\n/)
                    .filter((line) => line.trim()).length !== 1
                    ? "s"
                    : ""
                }
              </p>

              <button
                type="button"
                onClick={() => setNumbers("")}
                className="text-xs font-medium text-slate-500 hover:text-red-600"
              >
                Clear
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handlePasteNumbers}
              disabled={!numbers.trim()}
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCircle2 size={18} />
              Add Numbers
            </button>
          </div>
        )}

        {/* File mode */}
        {mode === "file" && (
          <div className="mt-5">

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 px-6 py-12 transition hover:border-slate-500 hover:bg-slate-50 disabled:opacity-50"
            >
              {loading ? (
                <p className="text-sm font-medium text-slate-700">
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
                handleFile(
                  event.target.files?.[0]
                )
              }
            />

            {error && (
              <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}