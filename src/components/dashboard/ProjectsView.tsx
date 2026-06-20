"use client";

import { useState, useMemo, useEffect } from "react";
import TableToolbar from "./TableToolbar";
import Pagination from "./Pagination";
import AddProjectModal from "./AddProjectModal";
import EditProjectModal from "./EditProjectModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import allProjects from "@/data/projects.json";

interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  id: number;
  title: string;
  images: string[];
  description: string;
  goal: string;
  stats: ProjectStat[];
  beforeImage: string;
  afterImage: string;
  futurePlans: string;
  partners: string[];
  location: string;
  coordinates: string;
}

const PAGE_SIZE = 10;

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("dashboard-projects");
        if (saved) {
          const parsed = JSON.parse(saved) as Project[];
          const seedIds = new Set((allProjects as Project[]).map((p) => p.id));
          const userAdded = parsed.filter((p) => !seedIds.has(p.id));
          return [...(allProjects as Project[]), ...userAdded];
        }
      } catch {}
    }
    return allProjects as Project[];
  });
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    localStorage.setItem("dashboard-projects", JSON.stringify(projects));
  }, [projects]);

  const filtered = useMemo(() => {
    let result = projects;
    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    return result;
  }, [search, projects]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const totalResults = filtered.length;
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const allChecked =
    paginated.length > 0 && paginated.every((p) => selectedIds.has(p.id));
  const someChecked = paginated.some((p) => selectedIds.has(p.id));
  const canEdit = selectedIds.size === 1;
  const canDelete = selectedIds.size > 0;

  const toggleAll = () => {
    if (allChecked) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((p) => next.delete(p.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((p) => next.add(p.id));
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
    const project = projects.find((p) => p.id === id);
    if (project) setEditProject(project);
  };

  const handleDelete = () => {
    if (!canDelete) return;
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const count = selectedIds.size;
    setProjects((prev) => prev.filter((p) => !selectedIds.has(p.id)));
    setSelectedIds(new Set());
    setShowDeleteConfirm(false);
    if (currentPage > Math.ceil((filtered.length - count) / PAGE_SIZE)) {
      setCurrentPage(Math.max(1, Math.ceil((filtered.length - count) / PAGE_SIZE)));
    }
  };

  const handleSaveEdit = (data: Omit<Project, "id">) => {
    if (!editProject) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === editProject.id
          ? { ...data, id: editProject.id }
          : p
      )
    );
    setEditProject(null);
    setSelectedIds(new Set());
  };

  const handleAdd = (data: Omit<Project, "id">) => {
    const maxId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) : 0;
    const newId = maxId + 1;
    const newProject: Project = { ...data, id: newId };
    setProjects((prev) => [...prev, newProject]);
    setShowAddModal(false);
    setCurrentPage(Math.ceil((projects.length + 1) / PAGE_SIZE));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-secondary-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:brightness-110 transition-all cursor-pointer"
        >
          <span className="text-lg leading-none">+</span> Add Project
        </button>
      </div>

      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        filterValue={filter}
        onFilterChange={setFilter}
        filterOptions={[]}
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
              <th className="py-3 text-left font-medium text-gray-500">Project Title</th>
              <th className="py-3 text-left font-medium text-gray-500 w-36">Location</th>
              <th className="py-3 text-left font-medium text-gray-500 w-40">Coordinates</th>
              <th className="py-3 text-left font-medium text-gray-500 w-56">Stats</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((project) => {
              const isChecked = selectedIds.has(project.id);
              const statsPreview = project.stats
                .filter((s) => s.value && s.label)
                .map((s) => `${s.value} ${s.label}`)
                .join(", ");
              return (
                <tr
                  key={project.id}
                  className={`transition-colors ${isChecked ? "bg-blue-50/40" : "hover:bg-gray-50"}`}
                >
                  <td className="py-3.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleOne(project.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                    />
                  </td>
                  <td className="py-3.5 text-gray-800 font-medium pr-4">
                    {project.title}
                  </td>
                  <td className="py-3.5 text-gray-600">{project.location}</td>
                  <td className="py-3.5 text-gray-500 text-xs">{project.coordinates}</td>
                  <td className="py-3.5 text-gray-500 text-xs truncate max-w-[220px]" title={statsPreview}>
                    {statsPreview}
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

      {editProject && (
        <EditProjectModal
          project={editProject}
          onCancel={() => setEditProject(null)}
          onSave={handleSaveEdit}
        />
      )}

      {showAddModal && (
        <AddProjectModal
          onCancel={() => setShowAddModal(false)}
          onSave={handleAdd}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmModal
          count={selectedIds.size}
          label="project"
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
