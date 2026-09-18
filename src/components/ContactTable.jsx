import ContactRow from "./ContactRow";

export default function ContactTable({
  contacts,
  onCall,
}) {
  if (!contacts.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <p className="font-semibold text-slate-900">
          No contacts found
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                #
              </th>

              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Name
              </th>

              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Phone
              </th>

              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact, index) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                index={index}
                onCall={onCall}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-100 px-4 py-3">
        <p className="text-xs text-slate-500">
          Showing {contacts.length} contacts
        </p>
      </div>
    </div>
  );
}