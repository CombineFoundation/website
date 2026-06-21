import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore/lite";
import { getDb } from "./firebase";

// ─── Types ───────────────────────────────────────────────────────────

export interface FirestoreEvent {
  id?: string;
  name: string;
  description: string;
  dateTime: string;
  location: string;
  registrationLink: string;
  createdAt?: any;
}

export interface FirestoreCourse {
  id?: string;
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
  modules: { title: string; bullets: string[] }[];
  successStories: { studentName: string; testimonial: string; videoUrl: string }[];
  createdAt?: any;
}

export interface FirestoreBlog {
  id?: string;
  name: string;
  authorName: string;
  date: string;
  status: "Published" | "Draft" | "Under Review";
  description: string;
  conclusion: string;
  heroImage1: string;
  heroImage2: string;
  createdAt?: any;
}

export interface FirestoreContact {
  id?: string;
  name: string;
  email: string;
  timestamp: string;
  subject: string;
  message: string;
  createdAt?: any;
}

export interface FirestoreDonation {
  id?: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  paymentMethod: string;
  createdAt?: any;
}

// ─── Events ──────────────────────────────────────────────────────────

export async function fetchEvents(): Promise<FirestoreEvent[]> {
  const snap = await getDocs(
    query(collection(getDb(), "events"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      name: data.name || data.title || "",
      dateTime: data.dateTime || data.date || "",
      registrationLink: data.registrationLink || data.registerLink || "",
    } as FirestoreEvent;
  });
}

export async function addEvent(
  data: Omit<FirestoreEvent, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(getDb(), "events"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateEvent(
  id: string,
  data: Partial<Omit<FirestoreEvent, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(getDb(), "events", id), { ...data });
}

export async function deleteEvents(ids: string[]): Promise<void> {
  const db = getDb();
  await Promise.all(ids.map((id) => deleteDoc(doc(db, "events", id))));
}

// ─── Courses ─────────────────────────────────────────────────────────

export async function fetchCourses(): Promise<FirestoreCourse[]> {
  const snap = await getDocs(
    query(collection(getDb(), "courses"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      name: data.name || data.title || "",
      status: data.status || "Ongoing",
      instructor: data.instructor || "Unknown",
    } as FirestoreCourse;
  });
}

export async function addCourse(
  data: Omit<FirestoreCourse, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(getDb(), "courses"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateCourse(
  id: string,
  data: Partial<Omit<FirestoreCourse, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(getDb(), "courses", id), { ...data });
}

export async function deleteCourses(ids: string[]): Promise<void> {
  const db = getDb();
  await Promise.all(ids.map((id) => deleteDoc(doc(db, "courses", id))));
}

// ─── Blogs ───────────────────────────────────────────────────────────

export async function fetchBlogs(): Promise<FirestoreBlog[]> {
  const snap = await getDocs(
    query(collection(getDb(), "blogs"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      name: data.name || data.title || "",
      date: data.date || data.timestamp || "",
    } as FirestoreBlog;
  });
}

export async function addBlog(
  data: Omit<FirestoreBlog, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(getDb(), "blogs"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateBlog(
  id: string,
  data: Partial<Omit<FirestoreBlog, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(getDb(), "blogs", id), { ...data });
}

export async function deleteBlogs(ids: string[]): Promise<void> {
  const db = getDb();
  await Promise.all(ids.map((id) => deleteDoc(doc(db, "blogs", id))));
}

// ─── Contacts ────────────────────────────────────────────────────────

export async function fetchContacts(): Promise<FirestoreContact[]> {
  const snap = await getDocs(
    query(collection(getDb(), "contacts"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreContact));
}

export async function deleteContacts(ids: string[]): Promise<void> {
  const db = getDb();
  await Promise.all(ids.map((id) => deleteDoc(doc(db, "contacts", id))));
}

// ─── Donations ───────────────────────────────────────────────────────

export async function fetchDonations(): Promise<FirestoreDonation[]> {
  const snap = await getDocs(
    query(collection(getDb(), "donations"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreDonation));
}

export async function deleteDonations(ids: string[]): Promise<void> {
  const db = getDb();
  await Promise.all(ids.map((id) => deleteDoc(doc(db, "donations", id))));
}
