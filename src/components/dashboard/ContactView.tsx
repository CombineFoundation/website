"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Trash2 } from "lucide-react";
import Pagination from "./Pagination";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ViewMessageModal from "./ViewMessageModal";
import { fetchContacts, deleteContacts, type FirestoreContact } from "@/lib/admin-actions";
import { Loader2 } from "lucide-react";

const PAGE_SIZE = 10;

export default function ContactView() {
  const [contacts, setContacts] = useState<FirestoreContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewContact, setViewContact] = useState<FirestoreContact | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await fetchContacts();
      setContacts(data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const filtered = useMemo(() => {
    let result = contacts;
    if (search) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.subject.toLowerCase().includes(search.toLowerCase())
      );
    }
    return result;
  }, [search, contacts]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const totalResults = filtered.length;
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const allChecked =
    paginated.length > 0 && paginated.every((c) => selectedIds.has(c.id!));
  const someChecked = paginated.some((c) => selectedIds.has(c.id!));

  const canDelete = selectedIds.size > 0;

  const toggleAll = () => {
    if (allChecked) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((c) => next.delete(c.id!));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((c) => next.add(c.id!));
        return next;
      });
    }
  };

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleDelete = () => {
    if (!canDelete) return;
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    const ids = [...selectedIds];
    await deleteContacts(ids);
    setSelectedIds(new Set());
    setShowDeleteConfirm(false);
    await loadContacts();
    const newTotal = filtered.length - ids.length;
    if (currentPage > Math.ceil(newTotal / PAGE_SIZE)) {
      setCurrentPage(Math.max(1, Math.ceil(newTotal / PAGE_SIZE)));
    }
  };

  const formatTimestamp = (ts: string) => {
    if (!ts) return "";
    const parts = ts.split(":");
    if (parts.length === 2) {
      const [datePart, time] = parts;
      return `${datePart} : ${time.slice(0, 2)}${time.slice(2)}`;
    }
    return ts;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 min-h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#134981] animate-spin" />
        <span className="ml-3 text-gray-500 font-medium">Loading messages...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
      </div>

      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="border border-gray-200 rounded-md pl-9 pr-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            disabled={!canDelete}
            title={!canDelete ? "Select items to delete" : "Delete"}
            className={`p-2 rounded-md border transition-colors ${
              canDelete
                ? "border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 cursor-pointer"
                : "border-gray-100 text-gray-300 cursor-not-allowed"
            }`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-10 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allChecked}
                  ref={(el) => {
                    if (el) el.indeterminate = someChecked && !allChecked;
                  }}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                />
              </th>
              <th className="py-3 text-left font-medium text-gray-500">
                Name
              </th>
              <th className="py-3 text-left font-medium text-gray-500 w-56">
                Email
              </th>
              <th className="py-3 text-left font-medium text-gray-500 w-44">
                Timestamp
              </th>
              <th className="py-3 text-left font-medium text-gray-500 w-32">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((contact) => {
              const isChecked = selectedIds.has(contact.id!);
              return (
                <tr
                  key={contact.id}
                  className={`transition-colors ${isChecked ? "bg-blue-50/40" : "hover:bg-gray-50"}`}
                >
                  <td className="py-3.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleOne(contact.id!)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                    />
                  </td>
                  <td className="py-3.5 text-gray-800 font-medium pr-4">
                    {contact.name}
                  </td>
                  <td className="py-3.5 text-gray-600">{contact.email}</td>
                  <td className="py-3.5 text-gray-600">{formatTimestamp(contact.timestamp)}</td>
                  <td className="py-3.5">
                    <button
                      onClick={() => setViewContact(contact)}
                      className="px-4 py-1.5 rounded-md text-xs font-medium text-white hover:brightness-110 transition-all cursor-pointer"
                      style={{ backgroundColor: "#1E5EFF" }}
                    >
                      View Message
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalResults > PAGE_SIZE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          onPageChange={(p) => {
            setCurrentPage(p);
            setSelectedIds(new Set());
          }}
        />
      )}

      {viewContact && (
        <ViewMessageModal
          contact={viewContact as any}
          onClose={() => setViewContact(null)}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmModal
          count={selectedIds.size}
          label="message"
          onCancel={() => { setShowDeleteConfirm(false); }}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
