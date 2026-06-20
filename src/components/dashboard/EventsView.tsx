"use client";

import { useState, useMemo, useEffect } from "react";
import TableToolbar from "./TableToolbar";
import Pagination from "./Pagination";
import EditEventModal from "./EditEventModal";
import AddEventModal from "./AddEventModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import allEvents from "@/data/events.json";

interface Event {
  id: number;
  name: string;
  description: string;
  dateTime: string;
  location: string;
  registrationLink: string;
}

const PAGE_SIZE = 10;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toDisplayDate(dateStr: string): string {
  if (!dateStr || dateStr.includes(" / ")) return dateStr;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, "0");
    const month = months[d.getMonth()];
    const year = String(d.getFullYear()).slice(-2);
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const meridian = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day} ${month} ${year} / ${hours}:${minutes} ${meridian}`;
  } catch {
    return dateStr;
  }
}

function toDatetimeLocal(dateStr: string): string {
  if (!dateStr || !dateStr.includes(" / ")) return dateStr;
  try {
    const [dayMonthYear, timePart] = dateStr.split(" / ");
    const [dayStr, monthStr, yearStr] = dayMonthYear.split(" ");
    const month = months.indexOf(monthStr);
    const year = 2000 + parseInt(yearStr);
    const [time, meridian] = timePart.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;
    const d = new Date(year, month, parseInt(dayStr), hours, minutes);
    if (isNaN(d.getTime())) return dateStr;
    const y = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    const da = String(d.getDate()).padStart(2, "0");
    const h = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${y}-${mo}-${da}T${h}:${mi}`;
  } catch {
    return dateStr;
  }
}

export default function EventsView() {
  const [events, setEvents] = useState<Event[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("dashboard-events");
        if (saved) return JSON.parse(saved) as Event[];
      } catch {}
    }
    return allEvents as Event[];
  });
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    localStorage.setItem("dashboard-events", JSON.stringify(events));
  }, [events]);

  const filtered = useMemo(() => {
    let result = events;
    if (search) {
      result = result.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return result;
  }, [search, events]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const totalResults = filtered.length;
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const allChecked =
    paginated.length > 0 && paginated.every((e) => selectedIds.has(e.id));
  const someChecked = paginated.some((e) => selectedIds.has(e.id));

  const canEdit = selectedIds.size === 1;
  const canDelete = selectedIds.size > 0;

  const toggleAll = () => {
    if (allChecked) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((e) => next.delete(e.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((e) => next.add(e.id));
        return next;
      });
    }
  };

  const toggleOne = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleEdit = () => {
    if (!canEdit) return;
    const id = [...selectedIds][0];
    const event = events.find((e) => e.id === id);
    if (event) setEditEvent(event);
  };

  const handleDelete = () => {
    if (!canDelete) return;
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const count = selectedIds.size;
    setEvents((prev) => prev.filter((e) => !selectedIds.has(e.id)));
    setSelectedIds(new Set());
    setShowDeleteConfirm(false);
    if (currentPage > Math.ceil((filtered.length - count) / PAGE_SIZE)) {
      setCurrentPage(Math.max(1, Math.ceil((filtered.length - count) / PAGE_SIZE)));
    }
  };

  const handleSaveEdit = (data: { name: string; description: string; location: string; date: string; registrationLink: string }) => {
    if (!editEvent) return;
    setEvents((prev) =>
      prev.map((e) =>
        e.id === editEvent.id
          ? { ...e, name: data.name, description: data.description, location: data.location, dateTime: toDisplayDate(data.date), registrationLink: data.registrationLink }
          : e
      )
    );
    setEditEvent(null);
    setSelectedIds(new Set());
  };

  const handleAdd = (data: { name: string; description: string; location: string; date: string; registrationLink: string }) => {
    const newId = events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;
    const newEvent: Event = {
      id: newId,
      name: data.name,
      description: data.description,
      dateTime: toDisplayDate(data.date),
      location: data.location,
      registrationLink: data.registrationLink,
    };
    setEvents((prev) => [...prev, newEvent]);
    setShowAddModal(false);
    setCurrentPage(Math.ceil((events.length + 1) / PAGE_SIZE));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#0C3155] text-white text-sm font-medium px-4 py-2 rounded-lg hover:brightness-110 transition-all cursor-pointer"
        >
          <span className="text-lg leading-none">+</span> Add Events
        </button>
      </div>

      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        filterValue={filter}
        onFilterChange={setFilter}
        filterOptions={["Upcoming", "Past", "Today"]}
        canEdit={canEdit}
        canDelete={canDelete}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
                Event Name
              </th>
              <th className="py-3 text-left font-medium text-gray-500 w-44">
                Date / Time
              </th>
              <th className="py-3 text-left font-medium text-gray-500 w-56">
                Location
              </th>
              <th className="py-3 text-left font-medium text-gray-500 w-64">
                Registration Link
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((event) => {
              const isChecked = selectedIds.has(event.id);
              return (
                <tr
                  key={event.id}
                  className={`transition-colors ${isChecked ? "bg-blue-50/40" : "hover:bg-gray-50"}`}
                >
                  <td className="py-3.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleOne(event.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                    />
                  </td>
                  <td className="py-3.5 text-gray-800 font-medium pr-4">
                    {event.name}
                  </td>
                  <td className="py-3.5 text-gray-600">{event.dateTime}</td>
                  <td className="py-3.5 text-gray-600 min-w-0 max-w-0 truncate">{event.location}</td>
                  <td className="py-3.5 text-blue-500 truncate max-w-[220px]">
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={event.registrationLink}
                      className="hover:underline"
                    >
                      {event.registrationLink}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalResults}
        onPageChange={(p) => {
          setCurrentPage(p);
          setSelectedIds(new Set());
        }}
      />

      {editEvent && (
        <EditEventModal
          event={editEvent}
          onCancel={() => { setEditEvent(null); }}
          onSave={handleSaveEdit}
        />
      )}

      {showAddModal && (
        <AddEventModal
          onCancel={() => { setShowAddModal(false); }}
          onSave={handleAdd}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmModal
          count={selectedIds.size}
          label="event"
          onCancel={() => { setShowDeleteConfirm(false); }}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
