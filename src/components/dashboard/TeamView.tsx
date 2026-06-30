"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Loader2, ChevronDown } from "lucide-react";
import TableToolbar from "./TableToolbar";
import Pagination from "./Pagination";
import DeleteConfirmModal from "./DeleteConfirmModal";
import AddTeamMemberModal from "./AddTeamMemberModal";
import EditTeamMemberModal from "./EditTeamMemberModal";
import AddPartnerModal from "./AddPartnerModal";
import EditPartnerModal from "./EditPartnerModal";
import {
  fetchTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMembers,
  fetchPartners,
  addPartner,
  updatePartner,
  deletePartners,
  type FirestoreTeamMember,
  type FirestorePartner,
} from "@/lib/admin-actions";

type Tab = "team-members" | "partners";

const PAGE_SIZE = 10;

export default function TeamView() {
  const [activeTab, setActiveTab] = useState<Tab>("team-members");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Team Members state
  const [members, setMembers] = useState<FirestoreTeamMember[]>([]);
  const [membersLoading, setMembersLoading] = useState(true);
  const [membersSearch, setMembersSearch] = useState("");
  const [membersFilter, setMembersFilter] = useState("");
  const [membersPage, setMembersPage] = useState(1);
  const [membersSelected, setMembersSelected] = useState<Set<string>>(new Set());
  const [editMember, setEditMember] = useState<(FirestoreTeamMember & { id: string }) | null>(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showDeleteMembers, setShowDeleteMembers] = useState(false);

  // Partners state
  const [partners, setPartners] = useState<FirestorePartner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(true);
  const [partnersSearch, setPartnersSearch] = useState("");
  const [partnersFilter, setPartnersFilter] = useState("");
  const [partnersPage, setPartnersPage] = useState(1);
  const [partnersSelected, setPartnersSelected] = useState<Set<string>>(new Set());
  const [editPartner, setEditPartner] = useState<(FirestorePartner & { id: string }) | null>(null);
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [showDeletePartners, setShowDeletePartners] = useState(false);

  const loadMembers = async () => {
    try {
      setMembersLoading(true);
      setMembers(await fetchTeamMembers());
    } catch (err) {
      console.error("Error fetching team members:", err);
    } finally {
      setMembersLoading(false);
    }
  };

  const loadPartners = async () => {
    try {
      setPartnersLoading(true);
      setPartners(await fetchPartners());
    } catch (err) {
      console.error("Error fetching partners:", err);
    } finally {
      setPartnersLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
    loadPartners();
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

  // ── Team Members ─────────────────────────────────────────────

  const filteredMembers = useMemo(() => {
    let result = members;
    if (membersSearch) {
      result = result.filter((m) =>
        m.name.toLowerCase().includes(membersSearch.toLowerCase()) ||
        m.role.toLowerCase().includes(membersSearch.toLowerCase()) ||
        m.section.toLowerCase().includes(membersSearch.toLowerCase())
      );
    }
    return result;
  }, [membersSearch, members]);

  const membersTotalPages = Math.max(1, Math.ceil(filteredMembers.length / PAGE_SIZE));
  const membersPaginated = filteredMembers.slice(
    (membersPage - 1) * PAGE_SIZE,
    membersPage * PAGE_SIZE
  );

  const membersAllChecked = membersPaginated.length > 0 && membersPaginated.every((m) => membersSelected.has(m.id!));
  const membersSomeChecked = membersPaginated.some((m) => membersSelected.has(m.id!));
  const canEditMember = membersSelected.size === 1;
  const canDeleteMembers = membersSelected.size > 0;

  const toggleMembersAll = () => {
    if (membersAllChecked) {
      setMembersSelected((prev) => {
        const next = new Set(prev);
        membersPaginated.forEach((m) => next.delete(m.id!));
        return next;
      });
    } else {
      setMembersSelected((prev) => {
        const next = new Set(prev);
        membersPaginated.forEach((m) => next.add(m.id!));
        return next;
      });
    }
  };

  const toggleMember = (id: string) => {
    setMembersSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleEditMember = () => {
    if (!canEditMember) return;
    const id = [...membersSelected][0];
    const member = members.find((m) => m.id === id);
    if (member && member.id) setEditMember(member as FirestoreTeamMember & { id: string });
  };

  const handleSaveMember = async (data: { name: string; role: string; section: string; image: string }) => {
    if (editMember?.id) {
      await updateTeamMember(editMember.id, data);
      setEditMember(null);
      setMembersSelected(new Set());
      await loadMembers();
    }
  };

  const handleAddMember = async (data: { name: string; role: string; section: string; image: string }) => {
    await addTeamMember(data);
    setShowAddMember(false);
    await loadMembers();
    setMembersPage(Math.ceil((members.length + 1) / PAGE_SIZE));
  };

  const confirmDeleteMembers = async () => {
    const ids = [...membersSelected];
    await deleteTeamMembers(ids);
    setMembersSelected(new Set());
    setShowDeleteMembers(false);
    await loadMembers();
    const newTotal = filteredMembers.length - ids.length;
    if (membersPage > Math.ceil(newTotal / PAGE_SIZE)) {
      setMembersPage(Math.max(1, Math.ceil(newTotal / PAGE_SIZE)));
    }
  };

  // ── Partners ─────────────────────────────────────────────────

  const filteredPartners = useMemo(() => {
    let result = partners;
    if (partnersSearch) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(partnersSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(partnersSearch.toLowerCase())
      );
    }
    return result;
  }, [partnersSearch, partners]);

  const partnersTotalPages = Math.max(1, Math.ceil(filteredPartners.length / PAGE_SIZE));
  const partnersPaginated = filteredPartners.slice(
    (partnersPage - 1) * PAGE_SIZE,
    partnersPage * PAGE_SIZE
  );

  const partnersAllChecked = partnersPaginated.length > 0 && partnersPaginated.every((p) => partnersSelected.has(p.id!));
  const partnersSomeChecked = partnersPaginated.some((p) => partnersSelected.has(p.id!));
  const canEditPartner = partnersSelected.size === 1;
  const canDeletePartners = partnersSelected.size > 0;

  const togglePartnersAll = () => {
    if (partnersAllChecked) {
      setPartnersSelected((prev) => {
        const next = new Set(prev);
        partnersPaginated.forEach((p) => next.delete(p.id!));
        return next;
      });
    } else {
      setPartnersSelected((prev) => {
        const next = new Set(prev);
        partnersPaginated.forEach((p) => next.add(p.id!));
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
    const partner = partners.find((p) => p.id === id);
    if (partner && partner.id) setEditPartner(partner as FirestorePartner & { id: string });
  };

  const handleSavePartner = async (data: { name: string; description: string; image: string }) => {
    if (editPartner?.id) {
      await updatePartner(editPartner.id, data);
      setEditPartner(null);
      setPartnersSelected(new Set());
      await loadPartners();
    }
  };

  const handleAddPartner = async (data: { name: string; description: string; image: string }) => {
    await addPartner(data);
    setShowAddPartner(false);
    await loadPartners();
    setPartnersPage(Math.ceil((partners.length + 1) / PAGE_SIZE));
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

  const handleAddNew = (type: "team-member" | "partner") => {
    setShowDropdown(false);
    if (type === "team-member") {
      setShowAddMember(true);
    } else {
      setShowAddPartner(true);
    }
  };

  // ── Renderers ────────────────────────────────────────────────

  const renderMembersTable = () => {
    if (membersLoading) {
      return (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-[#134981] animate-spin" />
          <span className="ml-3 text-gray-500 font-medium">Loading team members...</span>
        </div>
      );
    }

    return (
      <>
        <TableToolbar
          searchValue={membersSearch}
          onSearchChange={(v) => { setMembersSearch(v); setMembersPage(1); setMembersSelected(new Set()); }}
          filterValue={membersFilter}
          onFilterChange={setMembersFilter}
          filterOptions={["Youth Leader", "Ambassador", "Department Head", "Board of Trustees"]}
          canEdit={canEditMember}
          canDelete={canDeleteMembers}
          onEdit={handleEditMember}
          onDelete={() => setShowDeleteMembers(true)}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="w-10 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={membersAllChecked}
                    ref={(el) => { if (el) el.indeterminate = membersSomeChecked && !membersAllChecked; }}
                    onChange={toggleMembersAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                  />
                </th>
                <th className="py-3 text-left font-medium text-gray-500">Name</th>
                <th className="py-3 text-left font-medium text-gray-500 w-44">Role</th>
                <th className="py-3 text-left font-medium text-gray-500 w-36">Section</th>
                <th className="py-3 text-left font-medium text-gray-500 w-16">Image</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {membersPaginated.map((member) => {
                const isChecked = membersSelected.has(member.id!);
                return (
                  <tr key={member.id} className={`transition-colors ${isChecked ? "bg-blue-50/40" : "hover:bg-gray-50"}`}>
                    <td className="py-3.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleMember(member.id!)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                      />
                    </td>
                    <td className="py-3.5 text-gray-800 font-medium pr-4">{member.name}</td>
                    <td className="py-3.5 text-gray-600">{member.role}</td>
                    <td className="py-3.5">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-blue-500">
                        {member.section}
                      </span>
                    </td>
                    <td className="py-3.5">
                      {member.image ? (
                        <img src={member.image} alt="" className="w-10 h-10 rounded-full object-cover" />
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
        {filteredMembers.length > PAGE_SIZE && (
          <Pagination
            currentPage={membersPage}
            totalPages={membersTotalPages}
            totalResults={filteredMembers.length}
            onPageChange={(p) => { setMembersPage(p); setMembersSelected(new Set()); }}
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
          onSearchChange={(v) => { setPartnersSearch(v); setPartnersPage(1); setPartnersSelected(new Set()); }}
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
                    ref={(el) => { if (el) el.indeterminate = partnersSomeChecked && !partnersAllChecked; }}
                    onChange={togglePartnersAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                  />
                </th>
                <th className="py-3 text-left font-medium text-gray-500">Name</th>
                <th className="py-3 text-left font-medium text-gray-500">Description</th>
                <th className="py-3 text-left font-medium text-gray-500 w-16">Image</th>
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
                    <td className="py-3.5 text-gray-600 max-w-[300px] truncate">{partner.description}</td>
                    <td className="py-3.5">
                      {partner.image ? (
                        <img src={partner.image} alt="" className="w-10 h-10 rounded object-cover" />
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
            onPageChange={(p) => { setPartnersPage(p); setPartnersSelected(new Set()); }}
        />
      )}
      </>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team</h1>

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
                onClick={() => handleAddNew("team-member")}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
              >
                Team Member
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

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        <button
          onClick={() => { setActiveTab("team-members"); setMembersSelected(new Set()); setPartnersSelected(new Set()); }}
          className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer border-b-2 -mb-[1px] ${
            activeTab === "team-members"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
        >
          Team Members
        </button>
        <button
          onClick={() => { setActiveTab("partners"); setMembersSelected(new Set()); setPartnersSelected(new Set()); }}
          className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer border-b-2 -mb-[1px] ${
            activeTab === "partners"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
        >
          Partners
        </button>
      </div>

      {/* Content */}
      {activeTab === "team-members" ? renderMembersTable() : renderPartnersTable()}

      {/* Modals */}
      {editMember && (
        <EditTeamMemberModal
          member={editMember}
          onCancel={() => { setEditMember(null); setMembersSelected(new Set()); }}
          onSave={handleSaveMember}
        />
      )}
      {showAddMember && (
        <AddTeamMemberModal
          onCancel={() => setShowAddMember(false)}
          onSave={handleAddMember}
        />
      )}
      {showDeleteMembers && (
        <DeleteConfirmModal
          count={membersSelected.size}
          label="team member"
          onCancel={() => setShowDeleteMembers(false)}
          onConfirm={confirmDeleteMembers}
        />
      )}

      {editPartner && (
        <EditPartnerModal
          partner={editPartner}
          onCancel={() => { setEditPartner(null); setPartnersSelected(new Set()); }}
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
