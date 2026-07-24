"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import AddAnnualReportModal from "./AddAnnualReportModal";
import AddPartnerModal from "./AddPartnerModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditAnnualReportModal from "./EditAnnualReportModal";
import EditPartnerModal from "./EditPartnerModal";
import Pagination from "./Pagination";
import TableToolbar from "./TableToolbar";
import {
  addAnnualReport,
  addPartner,
  deleteAnnualReports,
  deletePartners,
  fetchAnnualReports,
  fetchPartners,
  updateAnnualReport,
  updatePartner,
  type FirestoreAnnualReport,
  type FirestorePartner,
} from "@/lib/admin-actions";

type Tab = "annual-reports" | "partners";

const PAGE_SIZE = 10;

export default function PublicationsView() {
  const [activeTab, setActiveTab] = useState<Tab>("annual-reports");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [reports, setReports] = useState<FirestoreAnnualReport[]>([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsSearch, setReportsSearch] = useState("");
  const [reportsFilter, setReportsFilter] = useState("");
  const [reportsPage, setReportsPage] = useState(1);
  const [reportsSelected, setReportsSelected] = useState<Set<string>>(new Set());
  const [editReport, setEditReport] = useState<FirestoreAnnualReport | null>(null);
  const [showAddReport, setShowAddReport] = useState(false);
  const [showDeleteReports, setShowDeleteReports] = useState(false);

  const [partners, setPartners] = useState<FirestorePartner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(true);
  const [partnersSearch, setPartnersSearch] = useState("");
  const [partnersFilter, setPartnersFilter] = useState("");
  const [partnersPage, setPartnersPage] = useState(1);
  const [partnersSelected, setPartnersSelected] = useState<Set<string>>(new Set());
  const [editPartner, setEditPartner] = useState<(FirestorePartner & { id: string }) | null>(null);
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [showDeletePartners, setShowDeletePartners] = useState(false);

  const loadReports = async () => {
    try {
      setReportsLoading(true);
      setReports(await fetchAnnualReports());
    } catch (error) {
      console.error("Error fetching annual reports:", error);
    } finally {
      setReportsLoading(false);
    }
  };

  const loadPartners = async () => {
    try {
      setPartnersLoading(true);
      setPartners(await fetchPartners());
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setPartnersLoading(false);
    }
  };

  useEffect(() => {
    void loadReports();
    void loadPartners();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredReports = useMemo(() => {
    let result = reports;
    if (reportsSearch) {
      result = result.filter((report) =>
        report.title.toLowerCase().includes(reportsSearch.toLowerCase()) ||
        report.description.toLowerCase().includes(reportsSearch.toLowerCase())
      );
    }
    return result;
  }, [reports, reportsSearch]);

  const reportsTotalPages = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));
  const reportsPaginated = filteredReports.slice((reportsPage - 1) * PAGE_SIZE, reportsPage * PAGE_SIZE);
  const reportsAllChecked = reportsPaginated.length > 0 && reportsPaginated.every((report) => reportsSelected.has(report.id!));
  const reportsSomeChecked = reportsPaginated.some((report) => reportsSelected.has(report.id!));
  const canEditReport = reportsSelected.size === 1;
  const canDeleteReports = reportsSelected.size > 0;

  const toggleReportsAll = () => {
    if (reportsAllChecked) {
      setReportsSelected((prev) => {
        const next = new Set(prev);
        reportsPaginated.forEach((report) => next.delete(report.id!));
        return next;
      });
    } else {
      setReportsSelected((prev) => {
        const next = new Set(prev);
        reportsPaginated.forEach((report) => next.add(report.id!));
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
    const report = reports.find((item) => item.id === id);
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
    setReportsPage(Math.max(1, Math.ceil((reports.length + 1) / PAGE_SIZE)));
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

  const filteredPartners = useMemo(() => {
    let result = partners;
    if (partnersSearch) {
      result = result.filter((partner) =>
        partner.name.toLowerCase().includes(partnersSearch.toLowerCase()) ||
        partner.description.toLowerCase().includes(partnersSearch.toLowerCase())
      );
    }
    return result;
  }, [partners, partnersSearch]);

  const partnersTotalPages = Math.max(1, Math.ceil(filteredPartners.length / PAGE_SIZE));
  const partnersPaginated = filteredPartners.slice((partnersPage - 1) * PAGE_SIZE, partnersPage * PAGE_SIZE);
  const partnersAllChecked = partnersPaginated.length > 0 && partnersPaginated.every((partner) => partnersSelected.has(partner.id!));
  const partnersSomeChecked = partnersPaginated.some((partner) => partnersSelected.has(partner.id!));
  const canEditPartner = partnersSelected.size === 1;
  const canDeletePartners = partnersSelected.size > 0;

  const togglePartnersAll = () => {
    if (partnersAllChecked) {
      setPartnersSelected((prev) => {
        const next = new Set(prev);
        partnersPaginated.forEach((partner) => next.delete(partner.id!));
        return next;
      });
    } else {
      setPartnersSelected((prev) => {
        const next = new Set(prev);
        partnersPaginated.forEach((partner) => next.add(partner.id!));
        return next;
      });
    }
  };

  const togglePartner = (id: string) => {
    setPartnersSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleEditPartner = () => {
    if (!canEditPartner) return;
    const id = [...partnersSelected][0];
    const partner = partners.find((item) => item.id === id);
    if (partner && partner.id) setEditPartner(partner as FirestorePartner & { id: string });
  };

  const handleSavePartner = async (data: { name: string; description: string; image: string; mouUrl?: string }) => {
    if (editPartner?.id) {
      await updatePartner(editPartner.id, data);
      setEditPartner(null);
      setPartnersSelected(new Set());
      await loadPartners();
    }
  };

  const handleAddPartner = async (data: { name: string; description: string; image: string; mouUrl?: string }) => {
    await addPartner(data);
    setShowAddPartner(false);
    await loadPartners();
    setPartnersPage(Math.max(1, Math.ceil((partners.length + 1) / PAGE_SIZE)));
  };

  const confirmDeletePartners = async () => {
    const ids = [...partnersSelected];
    await deletePartners(ids);
    setPartnersSelected(new Set());
    setShowDeletePartners(false);
    await loadPartners();
    const newTotal = filteredPartners.length - ids.length;
    if (partnersPage > Math.ceil(newTotal / PAGE_SIZE)) {
      setPartnersPage(Math.max(1, Math.ceil(newTotal / PAGE_SIZE)));
    }
  };

  const handleAddNew = (type: "annual-report" | "partner") => {
    setShowDropdown(false);
    if (type === "annual-report") {
      setShowAddReport(true);
    } else {
      setShowAddPartner(true);
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
          onSearchChange={(value) => {
            setReportsSearch(value);
            setReportsPage(1);
            setReportsSelected(new Set());
          }}
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
                    ref={(element) => {
                      if (element) element.indeterminate = reportsSomeChecked && !reportsAllChecked;
                    }}
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
            onPageChange={(page) => {
              setReportsPage(page);
              setReportsSelected(new Set());
            }}
          />
        )}
      </>
    );
  };

  const renderPartnersTable = () => {
    if (partnersLoading) {
      return (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-[#134981] animate-spin" />
          <span className="ml-3 text-gray-500 font-medium">Loading partners...</span>
        </div>
      );
    }

    return (
      <>
        <TableToolbar
          searchValue={partnersSearch}
          onSearchChange={(value) => {
            setPartnersSearch(value);
            setPartnersPage(1);
            setPartnersSelected(new Set());
          }}
          filterValue={partnersFilter}
          onFilterChange={setPartnersFilter}
          filterOptions={[]}
          canEdit={canEditPartner}
          canDelete={canDeletePartners}
          onEdit={handleEditPartner}
          onDelete={() => setShowDeletePartners(true)}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="w-10 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={partnersAllChecked}
                    ref={(element) => {
                      if (element) element.indeterminate = partnersSomeChecked && !partnersAllChecked;
                    }}
                    onChange={togglePartnersAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                  />
                </th>
                <th className="py-3 text-left font-medium text-gray-500">Name</th>
                <th className="py-3 text-left font-medium text-gray-500">Description</th>
                <th className="py-3 text-left font-medium text-gray-500">Image</th>
                <th className="py-3 text-left font-medium text-gray-500">MOU PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {partnersPaginated.map((partner) => {
                const isChecked = partnersSelected.has(partner.id!);
                return (
                  <tr key={partner.id} className={`transition-colors ${isChecked ? "bg-blue-50/40" : "hover:bg-gray-50"}`}>
                    <td className="py-3.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePartner(partner.id!)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                      />
                    </td>
                    <td className="py-3.5 text-gray-800 font-medium pr-4">{partner.name}</td>
                    <td className="py-3.5 text-gray-600 max-w-[220px] truncate">{partner.description}</td>
                    <td className="py-3.5">
                      {partner.image ? (
                        <img src={partner.image} alt={partner.name} className="h-12 w-16 object-cover rounded border border-gray-200" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-3.5 text-gray-600">
                      {partner.mouUrl ? (
                        <span className="text-blue-600">Attached</span>
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

        {filteredPartners.length > PAGE_SIZE && (
          <Pagination
            currentPage={partnersPage}
            totalPages={partnersTotalPages}
            totalResults={filteredPartners.length}
            onPageChange={(page) => {
              setPartnersPage(page);
              setPartnersSelected(new Set());
            }}
          />
        )}
      </>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Publications</h1>

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
                onClick={() => handleAddNew("partner")}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
              >
                Partner
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-1 mb-6 border-b border-gray-200">
        <button
          onClick={() => {
            setActiveTab("annual-reports");
            setReportsSelected(new Set());
            setPartnersSelected(new Set());
          }}
          className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer border-b-2 -mb-[1px] ${
            activeTab === "annual-reports"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
        >
          Annual Reports
        </button>
        <button
          onClick={() => {
            setActiveTab("partners");
            setReportsSelected(new Set());
            setPartnersSelected(new Set());
          }}
          className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer border-b-2 -mb-[1px] ${
            activeTab === "partners"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
        >
          Partners
        </button>
      </div>

      {activeTab === "annual-reports" ? renderReportsTable() : renderPartnersTable()}

      {editReport && (
        <EditAnnualReportModal
          report={editReport}
          onCancel={() => {
            setEditReport(null);
            setReportsSelected(new Set());
          }}
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

      {editPartner && (
        <EditPartnerModal
          partner={editPartner}
          onCancel={() => {
            setEditPartner(null);
            setPartnersSelected(new Set());
          }}
          onSave={handleSavePartner}
        />
      )}

      {showAddPartner && (
        <AddPartnerModal
          onCancel={() => setShowAddPartner(false)}
          onSave={handleAddPartner}
        />
      )}

      {showDeletePartners && (
        <DeleteConfirmModal
          count={partnersSelected.size}
          label="partner"
          onCancel={() => setShowDeletePartners(false)}
          onConfirm={confirmDeletePartners}
        />
      )}
    </div>
  );
}

