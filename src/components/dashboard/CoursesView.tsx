"use client";

import { useState, useMemo, useEffect } from "react";
import TableToolbar from "./TableToolbar";
import Pagination from "./Pagination";
import EditCourseModal from "./EditCourseModal";
import AddCourseModal from "./AddCourseModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import allCourses from "@/data/courses.json";

export interface CourseModule {
  title: string;
  bullets: string[];
}

export interface SuccessStory {
  studentName: string;
  testimonial: string;
  videoUrl: string;
}

export interface Course {
  id: number;
  name: string;
  instructor: string;
  price: string;
  status: "Ongoing" | "Completed" | "Launch";
  description: string;
  heroImage1: string;
  heroImage2: string;
  lessons: number;
  duration: string;
  enrollmentLink: string;
  guidelineFile: string;
  modules: CourseModule[];
  successStories: SuccessStory[];
}

const PAGE_SIZE = 10;

export default function CoursesView() {
  const [courses, setCourses] = useState<Course[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("dashboard-courses");
        if (saved) return JSON.parse(saved) as Course[];
      } catch {}
    }
    return allCourses as Course[];
  });
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    localStorage.setItem("dashboard-courses", JSON.stringify(courses));
  }, [courses]);

  const filtered = useMemo(() => {
    let result = courses;
    if (search) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor.toLowerCase().includes(search.toLowerCase())
      );
    }
    return result;
  }, [search, courses]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const totalResults = filtered.length;
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const allChecked = paginated.length > 0 && paginated.every((e) => selectedIds.has(e.id));
  const someChecked = paginated.some((e) => selectedIds.has(e.id));
  const canEdit = selectedIds.size === 1;
  const canDelete = selectedIds.size > 0;

  const toggleAll = () => {
    if (allChecked) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((c) => next.delete(c.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((c) => next.add(c.id));
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
    const course = courses.find((c) => c.id === id);
    if (course) setEditCourse(course);
  };

  const handleDelete = () => {
    if (!canDelete) return;
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const count = selectedIds.size;
    setCourses((prev) => prev.filter((c) => !selectedIds.has(c.id)));
    setSelectedIds(new Set());
    setShowDeleteConfirm(false);
    if (currentPage > Math.ceil((filtered.length - count) / PAGE_SIZE)) {
      setCurrentPage(Math.max(1, Math.ceil((filtered.length - count) / PAGE_SIZE)));
    }
  };

  const handleSaveEdit = (data: Omit<Course, "id">) => {
    if (!editCourse) return;
    setCourses((prev) =>
      prev.map((c) =>
        c.id === editCourse.id
          ? { ...data, id: editCourse.id }
          : c
      )
    );
    setEditCourse(null);
    setSelectedIds(new Set());
  };

  const handleAdd = (data: Omit<Course, "id">) => {
    const maxId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) : 3440;
    const newId = maxId + 1;
    const newCourse: Course = { ...data, id: newId };
    setCourses((prev) => [...prev, newCourse]);
    setShowAddModal(false);
    setCurrentPage(Math.ceil((courses.length + 1) / PAGE_SIZE));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#0C3155] text-white text-sm font-medium px-4 py-2 rounded-lg hover:brightness-110 transition-all cursor-pointer"
        >
          <span className="text-lg leading-none">+</span> Add Course
        </button>
      </div>

      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        filterValue={filter}
        onFilterChange={setFilter}
        filterOptions={["Ongoing", "Completed", "Launch"]}
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
                  ref={(el) => { if (el) el.indeterminate = someChecked && !allChecked; }}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                />
              </th>
              <th className="py-3 text-left font-medium text-gray-500">Course Name / ID</th>
              <th className="py-3 text-left font-medium text-gray-500 w-44">Instructor</th>
              <th className="py-3 text-left font-medium text-gray-500 w-28">Price</th>
              <th className="py-3 text-left font-medium text-gray-500 w-28">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((course) => {
              const isChecked = selectedIds.has(course.id);
              return (
                <tr
                  key={course.id}
                  className={`transition-colors ${isChecked ? "bg-blue-50/40" : "hover:bg-gray-50"}`}
                >
                  <td className="py-3.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleOne(course.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                    />
                  </td>
                  <td className="py-3.5 pr-4">
                    <p className="text-gray-800 font-medium">{course.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">ID: {course.id}</p>
                  </td>
                  <td className="py-3.5 text-gray-600">{course.instructor}</td>
                  <td className="py-3.5 text-gray-600">{course.price}</td>
                  <td className="py-3.5">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      course.status === "Completed" ? "bg-blue-500" : course.status === "Launch" ? "bg-green-500" : "bg-orange-500"
                    }`}>
                      {course.status}
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

      {editCourse && (
        <EditCourseModal
          course={editCourse}
          onCancel={() => setEditCourse(null)}
          onSave={handleSaveEdit}
        />
      )}

      {showAddModal && (
        <AddCourseModal
          onCancel={() => setShowAddModal(false)}
          onSave={handleAdd}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmModal
          count={selectedIds.size}
          label="course"
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
