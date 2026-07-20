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
  bulletPoints?: string[];
  endTime?: string;
  createdAt?: any;
}

export interface FirestoreCourse {
  id?: string;
  name: string;
  instructor: string;
  price: string;
  status: "Ongoing" | "Completed" | "Launch";
  category: string;
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
  content?: string[];
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

export interface FirestoreProject {
  id?: string;
  title: string;
  images: string[];
  description: string;
  goal: string;
  stats: { value: string; label: string }[];
  beforeImage: string;
  afterImage: string;
  futurePlans: string;
  partners: string[];
  location: string;
  coordinates: string;
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


// ─── Annual Reports ──────────────────────────────────────────────────

export interface FirestoreAnnualReport {
  id?: string;
  title: string;
  description: string;
  image: string;
  viewUrl: string;
  downloadUrl: string;
  createdAt?: any;
}

export async function fetchAnnualReports(): Promise<FirestoreAnnualReport[]> {
  const snap = await getDocs(
    query(collection(getDb(), "annualReports"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreAnnualReport));
}

export async function addAnnualReport(
  data: Omit<FirestoreAnnualReport, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(getDb(), "annualReports"), {

    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}


export async function updateAnnualReport(
  id: string,
  data: Partial<Omit<FirestoreAnnualReport, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(getDb(), "annualReports", id), { ...data });
}

export async function deleteAnnualReports(ids: string[]): Promise<void> {
  const db = getDb();
  await Promise.all(ids.map((id) => deleteDoc(doc(db, "annualReports", id))));
}

// ─── MOUs ────────────────────────────────────────────────────────────

export interface FirestoreMOU {
  id?: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  createdAt?: any;
}

export async function fetchMOUs(): Promise<FirestoreMOU[]> {
  const snap = await getDocs(
    query(collection(getDb(), "mous"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreMOU));
}

export async function addMOU(
  data: Omit<FirestoreMOU, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(getDb(), "mous"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateMOU(
  id: string,
  data: Partial<Omit<FirestoreMOU, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(getDb(), "mous", id), { ...data });
}

export async function deleteMOUs(ids: string[]): Promise<void> {
  const db = getDb();
  await Promise.all(ids.map((id) => deleteDoc(doc(db, "mous", id))));
}

// ─── Team Members ────────────────────────────────────────────────────

export interface FirestoreTeamMember {
  id?: string;
  name: string;
  role: string;
  section: string;
  image: string;
  createdAt?: any;
}

export async function fetchTeamMembers(): Promise<FirestoreTeamMember[]> {
  const snap = await getDocs(
    query(collection(getDb(), "teamMembers"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreTeamMember));
}

export async function addTeamMember(
  data: Omit<FirestoreTeamMember, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(getDb(), "teamMembers"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateTeamMember(
  id: string,
  data: Partial<Omit<FirestoreTeamMember, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(getDb(), "teamMembers", id), { ...data });
}

export async function deleteTeamMembers(ids: string[]): Promise<void> {
  const db = getDb();
  await Promise.all(ids.map((id) => deleteDoc(doc(db, "teamMembers", id))));
}

// ─── Partners ────────────────────────────────────────────────────────

export interface FirestorePartner {
  id?: string;
  name: string;
  description: string;
  image: string;
  createdAt?: any;
}

export async function fetchPartners(): Promise<FirestorePartner[]> {
  const snap = await getDocs(
    query(collection(getDb(), "partners"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestorePartner));
}

export async function addPartner(
  data: Omit<FirestorePartner, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(getDb(), "partners"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updatePartner(
  id: string,
  data: Partial<Omit<FirestorePartner, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(getDb(), "partners", id), { ...data });
}

export async function deletePartners(ids: string[]): Promise<void> {
  const db = getDb();
  await Promise.all(ids.map((id) => deleteDoc(doc(db, "partners", id))));
}

// ─── Jobs ────────────────────────────────────────────────────────────

export interface FirestoreJob {
  id?: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  active: boolean;
  createdAt?: any;
}

export async function fetchJobs(): Promise<FirestoreJob[]> {
  const snap = await getDocs(
    query(collection(getDb(), "jobs"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreJob));
}

export async function addJob(
  data: Omit<FirestoreJob, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(getDb(), "jobs"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateJob(
  id: string,
  data: Partial<Omit<FirestoreJob, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(getDb(), "jobs", id), { ...data });
}

export async function deleteJobs(ids: string[]): Promise<void> {
  const db = getDb();
  await Promise.all(ids.map((id) => deleteDoc(doc(db, "jobs", id))));
}

// ─── Splash Banners ──────────────────────────────────────────────────

export interface FirestoreSplash {
  id?: string;
  image: string;
  linkUrl: string;
  alt: string;
  createdAt?: any;
}

export async function fetchSplashBanners(): Promise<FirestoreSplash[]> {
  const snap = await getDocs(
    query(collection(getDb(), "splashBanners"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreSplash));
}

export async function addSplashBanner(
  data: Omit<FirestoreSplash, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(getDb(), "splashBanners"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function deleteSplashBanners(ids: string[]): Promise<void> {
  const db = getDb();
  await Promise.all(ids.map((id) => deleteDoc(doc(db, "splashBanners", id))));
}

// ─── Projects ────────────────────────────────────────────────────────

export async function fetchProjects(): Promise<FirestoreProject[]> {
  const snap = await getDocs(
    query(collection(getDb(), "projects"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreProject));
}

export async function addProject(
  data: Omit<FirestoreProject, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(getDb(), "projects"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProject(
  id: string,
  data: Partial<Omit<FirestoreProject, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(getDb(), "projects", id), { ...data });
}

export async function deleteProjects(ids: string[]): Promise<void> {
  const db = getDb();
  await Promise.all(ids.map((id) => deleteDoc(doc(db, "projects", id))));
}
