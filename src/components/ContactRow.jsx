import { Phone, Check } from "lucide-react";
import {
  formatPhoneNumber,
  getTelLink,
} from "../utils/phoneUtils";

export default function ContactRow({
  contact,
  index,
  onCall,
}) {
  const handleCall = () => {
    onCall(contact.id);
  };

  return (
    <tr className="border-t border-slate-100 transition hover:bg-slate-50">
      <td className="px-4 py-4 text-sm text-slate-500">
        {index + 1}
      </td>

      <td className="px-4 py-4">
        <p className="font-medium text-slate-900">
          {contact.name}
        </p>
      </td>

      <td className="px-4 py-4">
        <a
          href={getTelLink(contact.phone)}
          onClick={handleCall}
          className="text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          {formatPhoneNumber(contact.phone)}
        </a>
      </td>

      <td className="px-4 py-4">
        {contact.status === "called" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <Check size={13} />
            Called
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
            Ready
          </span>
        )}
      </td>

      <td className="px-4 py-4 text-right">
        <a
          href={getTelLink(contact.phone)}
          onClick={handleCall}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98]"
        >
          <Phone size={16} />
          <span>Call</span>
        </a>
      </td>
    </tr>
  );
}