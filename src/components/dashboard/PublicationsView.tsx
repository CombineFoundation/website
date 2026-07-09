"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Loader2, ChevronDown } from "lucide-react";
import TableToolbar from "./TableToolbar";
import Pagination from "./Pagination";
import DeleteConfirmModal from "./DeleteConfirmModal";
import AddAnnualReportModal from "./AddAnnualReportModal";
import EditAnnualReportModal from "./EditAnnualReportModal";
import AddMOUModal from "./AddMOUModal";
import EditMOUModal from "./EditMOUModal";
import {
  fetchAnnualReports,
  addAnnualReport,
  updateAnnualReport,
  deleteAnnualReports,
  fetchMOUs,
  addMOU,
  updateMOU,
  deleteMOUs,
  type FirestoreAnnualReport,
  type FirestoreMOU,
} from "@/lib/admin-actions";

type Tab = "annual-reports" | "mous";

const PAGE_SIZE = 10;

export default function PublicationsView() {
  const [activeTab, setActiveTab] = useState<Tab>("annual-reports");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Annual Reports state
  const [reports, setReports] = useState<FirestoreAnnualReport[]>([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsSearch, setReportsSearch] = useState("");
  const [reportsFilter, setReportsFilter] = useState("");
  const [reportsPage, setReportsPage] = useState(1);
  const [reportsSelected, setReportsSelected] = useState<Set<string>>(new Set());
  const [editReport, setEditReport] = useState<FirestoreAnnualReport | null>(null);
  const [showAddReport, setShowAddReport] = useState(false);
  const [showDeleteReports, setShowDeleteReports] = useState(false);

  // MOUs state
  const [mous, setMous] = useState<FirestoreMOU[]>([]);
  const [mousLoading, setMousLoading] = useState(true);
  const [mousSearch, setMousSearch] = useState("");
  const [mousFilter, setMousFilter] = useState("");
  const [mousPage, setMousPage] = useState(1);
  const [mousSelected, setMousSelected] = useState<Set<string>>(new Set());
  const [editMou, setEditMou] = useState<FirestoreMOU | null>(null);
  const [showAddMou, setShowAddMou] = useState(false);
  const [showDeleteMous, setShowDeleteMous] = useState(false);

  const loadReports = async () => {
    try {
      setReportsLoading(true);
      setReports(await fetchAnnualReports());
    } catch (err) {
      console.error("Error fetching annual reports:", err);
    } finally {
      setReportsLoading(false);
    }
  };

  const loadMous = async () => {
    try {
      setMousLoading(true);
      setMous(await fetchMOUs());
    } catch (err) {
      console.error("Error fetching MOUs:", err);
    } finally {
      setMousLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
    loadMous();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Annual Reports ─────────────────────────────────────────────

  const filteredReports = useMemo(() => {
    let result = reports;
    if (reportsSearch) {
      result = result.filter((r) =>
        r.title.toLowerCase().includes(reportsSearch.toLowerCase())
      );
    }
    return result;
  }, [reportsSearch, reports]);

  const reportsTotalPages = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));
  const reportsPaginated = filteredReports.slice(
    (reportsPage - 1) * PAGE_SIZE,
    reportsPage * PAGE_SIZE
  );

  const reportsAllChecked = reportsPaginated.length > 0 && reportsPaginated.every((r) => reportsSelected.has(r.id!));
  const reportsSomeChecked = reportsPaginated.some((r) => reportsSelected.has(r.id!));
  const canEditReport = reportsSelected.size === 1;
  const canDeleteReports = reportsSelected.size > 0;

  const toggleReportsAll = () => {
    if (reportsAllChecked) {
      setReportsSelected((prev) => {
        const next = new Set(prev);
        reportsPaginated.forEach((r) => next.delete(r.id!));
        return next;
      });
    } else {
      setReportsSelected((prev) => {
        const next = new Set(prev);
        reportsPaginated.forEach((r) => next.add(r.id!));
        return next;
      });
    }
  };

  const toggleReport = (id: string) => {
    setReportsSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleEditReport = () => {
    if (!canEditReport) return;
    const id = [...reportsSelected][0];
    const report = reports.find((r) => r.id === id);
    if (report) setEditReport(report);
  };

  const handleSaveReport = async (data: { title: string; description: string; image: string; viewUrl: string; downloadUrl: string }) => {
    if (editReport?.id) {
      await updateAnnualReport(editReport.id, data);
      setEditReport(null);
      setReportsSelected(new Set());
      await loadReports();
    }
  };

  const handleAddReport = async (data: { title: string; description: string; image: string; viewUrl: string; downloadUrl: string }) => {
    await addAnnualReport(data);
    setShowAddReport(false);
    await loadReports();
    setReportsPage(Math.ceil((reports.length + 1) / PAGE_SIZE));
  };

  const confirmDeleteReports = async () => {
    const ids = [...reportsSelected];
    await deleteAnnualReports(ids);
    setReportsSelected(new Set());
    setShowDeleteReports(false);
    await loadReports();
    const newTotal = filteredReports.length - ids.length;
    if (reportsPage > Math.ceil(newTotal / PAGE_SIZE)) {
      setReportsPage(Math.max(1, Math.ceil(newTotal / PAGE_SIZE)));
    }
  };

  // ── MOUs ───────────────────────────────────────────────────────

  const filteredMous = useMemo(() => {
    let result = mous;
    if (mousSearch) {
      result = result.filter((m) =>
        m.title.toLowerCase().includes(mousSearch.toLowerCase())
      );
    }
    return result;
  }, [mousSearch, mous]);

  const mousTotalPages = Math.max(1, Math.ceil(filteredMous.length / PAGE_SIZE));
  const mousPaginated = filteredMous.slice(
    (mousPage - 1) * PAGE_SIZE,
    mousPage * PAGE_SIZE
  );

  const mousAllChecked = mousPaginated.length > 0 && mousPaginated.every((m) => mousSelected.has(m.id!));
  const mousSomeChecked = mousPaginated.some((m) => mousSelected.has(m.id!));
  const canEditMou = mousSelected.size === 1;
  const canDeleteMous = mousSelected.size > 0;

  const toggleMousAll = () => {
    if (mousAllChecked) {
      setMousSelected((prev) => {
        const next = new Set(prev);
        mousPaginated.forEach((m) => next.delete(m.id!));
        return next;
      });
    } else {
      setMousSelected((prev) => {
        const next = new Set(prev);
        mousPaginated.forEach((m) => next.add(m.id!));
        return next;
      });
    }
  };

  const toggleMou = (id: string) => {
    setMousSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleEditMou = () => {
    if (!canEditMou) return;
    const id = [...mousSelected][0];
    const mou = mous.find((m) => m.id === id);
    if (mou) setEditMou(mou);
  };

  const handleSaveMou = async (data: { title: string; paragraphs: string[]; image: string; imageAlt: string }) => {
    if (editMou?.id) {
      await updateMOU(editMou.id, data);
      setEditMou(null);
      setMousSelected(new Set());
      await loadMous();
    }
  };

  const handleAddMou = async (data: { title: string; paragraphs: string[]; image: string; imageAlt: string }) => {
    await addMOU(data);
    setShowAddMou(false);
    await loadMous();
    setMousPage(Math.ceil((mous.length + 1) / PAGE_SIZE));
  };

  const confirmDeleteMous = async () => {
    const ids = [...mousSelected];
    await deleteMOUs(ids);
    setMousSelected(new Set());
    setShowDeleteMous(false);
    await loadMous();
    const newTotal = filteredMous.length - ids.length;
    if (mousPage > Math.ceil(newTotal / PAGE_SIZE)) {
      setMousPage(Math.max(1, Math.ceil(newTotal / PAGE_SIZE)));
    }
  };

  const handleAddNew = (type: "annual-report" | "mou") => {
    setShowDropdown(false);
    if (type === "annual-report") {
      setShowAddReport(true);
    } else {
      setShowAddMou(true);
    }
  };

  const renderReportsTable = () => {
    if (reportsLoading) {
      return (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-[#134981] animate-spin" />
          <span className="ml-3 text-gray-500 font-medium">Loading annual reports...</span>
        </div>
      );
    }

    return (
      <>
        <TableToolbar
          searchValue={reportsSearch}
          onSearchChange={(v) => { setReportsSearch(v); setReportsPage(1); setReportsSelected(new Set()); }}
          filterValue={reportsFilter}
          onFilterChange={setReportsFilter}
          filterOptions={[]}
          canEdit={canEditReport}
          canDelete={canDeleteReports}
          onEdit={handleEditReport}
          onDelete={() => setShowDeleteReports(true)}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="w-10 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={reportsAllChecked}
                    ref={(el) => { if (el) el.indeterminate = reportsSomeChecked && !reportsAllChecked; }}
                    onChange={toggleReportsAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                  />
                </th>
                <th className="py-3 text-left font-medium text-gray-500">Title</th>
                <th className="py-3 text-left font-medium text-gray-500">Description</th>
                <th className="py-3 text-left font-medium text-gray-500">View URL</th>
                <th className="py-3 text-left font-medium text-gray-500">Download URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reportsPaginated.map((report) => {
                const isChecked = reportsSelected.has(report.id!);
                return (
                  <tr key={report.id} className={`transition-colors ${isChecked ? "bg-blue-50/40" : "hover:bg-gray-50"}`}>
                    <td className="py-3.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleReport(report.id!)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                      />
                    </td>
                    <td className="py-3.5 text-gray-800 font-medium pr-4">{report.title}</td>
                    <td className="py-3.5 text-gray-600 max-w-[200px] truncate">{report.description}</td>
                    <td className="py-3.5 text-blue-500 truncate max-w-[180px]">
                      {report.viewUrl ? (
                        <a href={report.viewUrl} target="_blank" rel="noopener noreferrer" className="hover:underline" title={report.viewUrl}>
                          {report.viewUrl}
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-3.5 text-blue-500 truncate max-w-[180px]">
                      {report.downloadUrl ? (
                        <a href={report.downloadUrl} target="_blank" rel="noopener noreferrer" className="hover:underline" title={report.downloadUrl}>
                          {report.downloadUrl}
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredReports.length > PAGE_SIZE && (
          <Pagination
            currentPage={reportsPage}
            totalPages={reportsTotalPages}
            totalResults={filteredReports.length}
            onPageChange={(p) => { setReportsPage(p); setReportsSelected(new Set()); }}
          />
        )}
      </>
    );
  };

  const renderMOUsTable = () => {
    if (mousLoading) {
      return (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-[#134981] animate-spin" />
          <span className="ml-3 text-gray-500 font-medium">Loading MOUs...</span>
        </div>
      );
    }

    return (
      <>
        <TableToolbar
          searchValue={mousSearch}
          onSearchChange={(v) => { setMousSearch(v); setMousPage(1); setMousSelected(new Set()); }}
          filterValue={mousFilter}
          onFilterChange={setMousFilter}
          filterOptions={[]}
          canEdit={canEditMou}
          canDelete={canDeleteMous}
          onEdit={handleEditMou}
          onDelete={() => setShowDeleteMous(true)}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="w-10 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={mousAllChecked}
                    ref={(el) => { if (el) el.indeterminate = mousSomeChecked && !mousAllChecked; }}
                    onChange={toggleMousAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                  />
                </th>
                <th className="py-3 text-left font-medium text-gray-500">Title</th>
                <th className="py-3 text-left font-medium text-gray-500">Paragraphs</th>
                <th className="py-3 text-left font-medium text-gray-500">Image Alt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mousPaginated.map((mou) => {
                const isChecked = mousSelected.has(mou.id!);
                return (
                  <tr key={mou.id} className={`transition-colors ${isChecked ? "bg-blue-50/40" : "hover:bg-gray-50"}`}>
                    <td className="py-3.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleMou(mou.id!)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                      />
                    </td>
                    <td className="py-3.5 text-gray-800 font-medium pr-4">{mou.title}</td>
                    <td className="py-3.5 text-gray-600">{mou.paragraphs?.length ?? 0} paragraphs</td>
                    <td className="py-3.5 text-gray-600 max-w-[200px] truncate">{mou.imageAlt || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredMous.length > PAGE_SIZE && (
          <Pagination
            currentPage={mousPage}
            totalPages={mousTotalPages}
            totalResults={filteredMous.length}
            onPageChange={(p) => { setMousPage(p); setMousSelected(new Set()); }}
          />
        )}
      </>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Publications</h1>

        {/* Add New Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center gap-2 bg-[#0f1b3d] text-white text-sm font-medium px-4 py-2 rounded-lg hover:brightness-110 transition-all cursor-pointer"
          >
            <span className="text-lg leading-none">+</span> Add New
            <ChevronDown size={16} className={`transition-transform ${showDropdown ? "rotate-180" : ""}`} />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
              <button
                onClick={() => handleAddNew("annual-report")}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
              >
                Annual Report
              </button>
              <button
                onClick={() => handleAddNew("mou")}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
              >
                MOU
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        <button
          onClick={() => { setActiveTab("annual-reports"); setReportsSelected(new Set()); setMousSelected(new Set()); }}
          className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer border-b-2 -mb-[1px] ${
            activeTab === "annual-reports"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
        >
          Annual Reports
        </button>
        <button
          onClick={() => { setActiveTab("mous"); setReportsSelected(new Set()); setMousSelected(new Set()); }}
          className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer border-b-2 -mb-[1px] ${
            activeTab === "mous"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
        >
          MOUs
        </button>
      </div>

      {/* Content */}
      {activeTab === "annual-reports" ? renderReportsTable() : renderMOUsTable()}

      {/* Modals */}
      {editReport && (
        <EditAnnualReportModal
          report={editReport}
          onCancel={() => { setEditReport(null); setReportsSelected(new Set()); }}
          onSave={handleSaveReport}
        />
      )}
      {showAddReport && (
        <AddAnnualReportModal
          onCancel={() => setShowAddReport(false)}
          onSave={handleAddReport}
        />
      )}
      {showDeleteReports && (
        <DeleteConfirmModal
          count={reportsSelected.size}
          label="annual report"
          onCancel={() => setShowDeleteReports(false)}
          onConfirm={confirmDeleteReports}
        />
      )}

      {editMou && (
        <EditMOUModal
          mou={editMou}
          onCancel={() => { setEditMou(null); setMousSelected(new Set()); }}
          onSave={handleSaveMou}
        />
      )}
      {showAddMou && (
        <AddMOUModal
          onCancel={() => setShowAddMou(false)}
          onSave={handleAddMou}
        />
      )}
      {showDeleteMous && (
        <DeleteConfirmModal
          count={mousSelected.size}
          label="MOU"
          onCancel={() => setShowDeleteMous(false)}
          onConfirm={confirmDeleteMous}
        />
      )}
    </div>
  );
}
