export default function Stats({ contacts }) {
  const total = contacts.length;

  const called = contacts.filter(
    (contact) => contact.status === "called"
  ).length;

  const remaining = total - called;

  const stats = [
    {
      label: "Contacts",
      value: total,
    },
    {
      label: "Called",
      value: called,
    },
    {
      label: "Remaining",
      value: remaining,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-4"
        >
          <p className="text-xs font-medium text-slate-500">
            {stat.label}
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            {stat.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}