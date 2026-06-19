"use client";

import { useState, useMemo, useEffect } from "react";
import TableToolbar from "./TableToolbar";
import Pagination from "./Pagination";
import EditBlogModal from "./EditBlogModal";
import AddBlogModal from "./AddBlogModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import allBlogs from "@/data/blogs.json";

interface Blog {
  id: number;
  name: string;
  authorName: string;
  date: string;
  status: "Published" | "Draft" | "Under Review";
  description: string;
  conclusion: string;
  heroImage1: string;
  heroImage2: string;
}

const PAGE_SIZE = 10;

const statusStyles: Record<string, string> = {
  Published: "bg-blue-500",
  Draft: "bg-slate-400",
  "Under Review": "bg-orange-500",
};

function toDisplayDate(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const [m, d, y] = parts;
    const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
  return dateStr;
}

function toStorageDate(dateStr: string): string {
  if (!dateStr) return "";
  if (dateStr.includes("/")) return dateStr;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogsView() {
  const [blogs, setBlogs] = useState<Blog[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("dashboard-blogs");
        if (saved) return JSON.parse(saved) as Blog[];
      } catch {}
    }
    return (allBlogs as Array<{ id: number; title: string; authorName: string; date: string; status: string; description: string; conclusion: string; heroImage1: string; heroImage2: string }>).map((b) => ({
      id: b.id,
      name: b.title,
      authorName: b.authorName,
      date: b.date,
      status: b.status as "Published" | "Draft" | "Under Review",
      description: b.description,
      conclusion: b.conclusion || "",
      heroImage1: b.heroImage1 || "",
      heroImage2: b.heroImage2 || "",
    }));
  });
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    localStorage.setItem("dashboard-blogs", JSON.stringify(blogs));
  }, [blogs]);

  const filtered = useMemo(() => {
    let result = blogs;
    if (search) {
      result = result.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.authorName.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filter) {
      result = result.filter((b) => b.status === filter);
    }
    return result;
  }, [search, filter, blogs]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const totalResults = filtered.length;
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const allChecked =
    paginated.length > 0 && paginated.every((b) => selectedIds.has(b.id));
  const someChecked = paginated.some((b) => selectedIds.has(b.id));

  const canEdit = selectedIds.size === 1;
  const canDelete = selectedIds.size > 0;

  const toggleAll = () => {
    if (allChecked) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((b) => next.delete(b.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((b) => next.add(b.id));
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
    const blog = blogs.find((b) => b.id === id);
    if (blog) setEditBlog(blog);
  };

  const handleDelete = () => {
    if (!canDelete) return;
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const count = selectedIds.size;
    setBlogs((prev) => prev.filter((b) => !selectedIds.has(b.id)));
    setSelectedIds(new Set());
    setShowDeleteConfirm(false);
    if (currentPage > Math.ceil((filtered.length - count) / PAGE_SIZE)) {
      setCurrentPage(Math.max(1, Math.ceil((filtered.length - count) / PAGE_SIZE)));
    }
  };

  const handleSaveEdit = (data: { name: string; authorName: string; date: string; status: "Published" | "Draft" | "Under Review"; description: string; conclusion: string; heroImage1: string; heroImage2: string }) => {
    if (!editBlog) return;
    setBlogs((prev) =>
      prev.map((b) =>
        b.id === editBlog.id
          ? { ...b, name: data.name, authorName: data.authorName, date: toStorageDate(data.date), status: data.status, description: data.description, conclusion: data.conclusion, heroImage1: data.heroImage1, heroImage2: data.heroImage2 }
          : b
      )
    );
    setEditBlog(null);
    setSelectedIds(new Set());
  };

  const handleAdd = (data: { name: string; authorName: string; date: string; status: "Published" | "Draft" | "Under Review"; description: string; conclusion: string; heroImage1: string; heroImage2: string }) => {
    const newId = blogs.length > 0 ? Math.max(...blogs.map((b) => b.id)) + 1 : 1;
    const newBlog: Blog = {
      id: newId,
      name: data.name,
      authorName: data.authorName,
      date: toStorageDate(data.date),
      status: data.status,
      description: data.description,
      conclusion: data.conclusion,
      heroImage1: data.heroImage1,
      heroImage2: data.heroImage2,
    };
    setBlogs((prev) => [...prev, newBlog]);
    setShowAddModal(false);
    setCurrentPage(Math.ceil((blogs.length + 1) / PAGE_SIZE));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-secondary-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:brightness-110 transition-all cursor-pointer"
        >
          <span className="text-lg leading-none">+</span> Add Blog
        </button>
      </div>

      <TableToolbar
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setCurrentPage(1); }}
        filterValue={filter}
        onFilterChange={(v) => { setFilter(v); setCurrentPage(1); }}
        filterOptions={["Published", "Draft", "Under Review"]}
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
                Blog Name
              </th>
              <th className="py-3 text-left font-medium text-gray-500 w-40">
                Written By
              </th>
              <th className="py-3 text-left font-medium text-gray-500 w-40">
                Published On
              </th>
              <th className="py-3 text-left font-medium text-gray-500 w-32">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((blog) => {
              const isChecked = selectedIds.has(blog.id);
              return (
                <tr
                  key={blog.id}
                  className={`transition-colors ${isChecked ? "bg-blue-50/40" : "hover:bg-gray-50"}`}
                >
                  <td className="py-3.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleOne(blog.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                    />
                  </td>
                  <td className="py-3.5 text-gray-800 font-medium pr-4">
                    {blog.name}
                  </td>
                  <td className="py-3.5 text-gray-600">{blog.authorName}</td>
                  <td className="py-3.5 text-gray-600">{toDisplayDate(blog.date)}</td>
                  <td className="py-3.5">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${statusStyles[blog.status]}`}>
                      {blog.status}
                    </span>
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

      {editBlog && (
        <EditBlogModal
          blog={editBlog}
          onCancel={() => { setEditBlog(null); }}
          onSave={handleSaveEdit}
        />
      )}

      {showAddModal && (
        <AddBlogModal
          onCancel={() => { setShowAddModal(false); }}
          onSave={handleAdd}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmModal
          count={selectedIds.size}
          label="blog"
          onCancel={() => { setShowDeleteConfirm(false); }}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
