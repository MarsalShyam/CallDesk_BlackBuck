import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";

import Header from "./components/Header.jsx";
import Stats from "./components/Stats";
import ContactTable from "./components/ContactTable";
import ImportModal from "./components/ImportModal";
import EmptyState from "./components/EmptyState";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";

const PAGE_SIZE = 20;

function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [importOpen, setImportOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedContacts = localStorage.getItem(
      "calldesk_contacts"
    );

    if (savedContacts) {
      try {
        setContacts(JSON.parse(savedContacts));
      } catch {
        localStorage.removeItem("calldesk_contacts");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "calldesk_contacts",
      JSON.stringify(contacts)
    );
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return contacts;

    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.phone.includes(query)
    );
  }, [contacts, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredContacts.length / PAGE_SIZE)
  );

  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleImport = (newContacts) => {
    setContacts((previous) => [
      ...previous,
      ...newContacts,
    ]);

    setCurrentPage(1);
  };

  const handleCall = (contactId) => {
    setContacts((previous) =>
      previous.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              status: "called",
            }
          : contact
      )
    );
  };

  const handleClearAll = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all contacts?"
    );

    if (!confirmed) return;

    setContacts([]);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        onImport={() => setImportOpen(true)}
      />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {contacts.length > 0 ? (
          <>
            <div className="mb-6">
              <Stats contacts={contacts} />
            </div>

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 sm:max-w-md">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    handleSearch(event.target.value)
                  }
                  placeholder="Search name or phone..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setImportOpen(true)}
                  className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Plus size={17} />
                  Add
                </button>

                <button
                  onClick={handleClearAll}
                  className="flex min-h-11 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Clear
                </button>
              </div>
            </div>

            <ContactTable
              contacts={paginatedContacts}
              search=""
              onCall={handleCall}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <EmptyState
            onImport={() => setImportOpen(true)}
          />
        )}
      </main>
      <Footer />

      <ImportModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImport={handleImport}
      />
    </div>
  );
}

export default App;