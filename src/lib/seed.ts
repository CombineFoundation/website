import { getDb, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc } from "firebase/firestore/lite";
import { Program, Application, Message, Job } from "./collections";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Import JSON data
import eventsData from "@/data/events.json";
import coursesData from "@/data/courses.json";
import blogsData from "@/data/blogs.json";
import contactsData from "@/data/contacts.json";
import donationsData from "@/data/donations.json";
import projectsData from "@/data/projects.json";

// Helper: clear a collection before seeding
async function clearCollection(collectionName: string) {
  const db = getDb();
  const snap = await getDocs(collection(db, collectionName));
  const deletes = snap.docs.map((d) => deleteDoc(d.ref));
  await Promise.all(deletes);
  console.log(`Cleared ${snap.docs.length} docs from "${collectionName}"`);
}

// ─── Seed Events ─────────────────────────────────────────────────────
export async function seedEvents() {
  const db = getDb();
  await clearCollection("events");
  for (const event of eventsData as any[]) {
    // Parse "24 Jun 26 / 4:00 PM" if needed
    let dateStr = event.date || "2026-06-24";
    let startStr = event.startTime || "4:00 PM";
    let endStr = event.endTime || "6:00 PM";
    try {
      if (!event.date && event.dateTime && event.dateTime.includes(" / ")) {
        const [d, t] = event.dateTime.split(" / ");
        dateStr = d;
        startStr = t;
      }
    } catch (e) {}

    await addDoc(collection(db, "events"), {
      title: event.name || event.title || "",
      description: event.description || "",
      bulletPoints: event.bulletPoints || (event.description ? [event.description] : ["Join us for this event.", "Learn new skills.", "Meet the community."]),
      date: dateStr,
      startTime: startStr,
      endTime: endStr,
      location: event.location || "",
      registerLink: event.registrationLink || "",
      createdAt: serverTimestamp(),
    });
  }
  console.log(`Seeded ${eventsData.length} events`);
}

// ─── Seed Courses ────────────────────────────────────────────────────
export async function seedCourses() {
  const db = getDb();
  await clearCollection("courses");
  for (const course of coursesData as any[]) {
    await addDoc(collection(db, "courses"), {
      title: course.name || course.title,
      name: course.name,
      slug: course.slug || course.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      instructor: course.instructor,
      price: course.price,
      status: course.status,
      description: course.description || "",
      heroImage1: course.heroImage1 || "",
      heroImage2: course.heroImage2 || "",
      lessons: course.lessons || 0,
      duration: course.duration || "",
      level: course.level || "Beginner",
      enrollmentLink: course.enrollmentLink || "",
      guidelineFile: course.guidelineFile || "",
      modules: course.modules || [],
      successStories: course.successStories || [],
      createdAt: serverTimestamp(),
    });
  }
  console.log(`Seeded ${coursesData.length} courses`);
}

// ─── Seed Blogs ──────────────────────────────────────────────────────
export async function seedBlogs() {
  const db = getDb();
  await clearCollection("blogs");
  for (const blog of blogsData as any[]) {
    await addDoc(collection(db, "blogs"), {
      title: blog.title || blog.name || "",
      name: blog.title || blog.name || "",
      slug: blog.slug || (blog.title || blog.name || "").toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      authorName: blog.authorName || "",
      date: blog.date || "",
      status: blog.status || "Published",
      description: blog.description || "",
      content: blog.content || [],
      conclusion: blog.conclusion || "",
      likes: blog.likes || 0,
      comments: blog.comments || 0,
      commentList: blog.commentList || [],
      heroImage1: blog.heroImage1 || "",
      heroImage2: blog.heroImage2 || "",
      createdAt: serverTimestamp(),
    });
  }
  console.log(`Seeded ${blogsData.length} blogs`);
}

// ─── Seed Contacts ───────────────────────────────────────────────────
export async function seedContacts() {
  const db = getDb();
  await clearCollection("contacts");
  for (const contact of contactsData as any[]) {
    await addDoc(collection(db, "contacts"), {
      name: contact.name,
      email: contact.email,
      timestamp: contact.timestamp,
      subject: contact.subject,
      message: contact.message,
      createdAt: serverTimestamp(),
    });
  }
  console.log(`Seeded ${contactsData.length} contacts`);
}

// ─── Seed Donations ──────────────────────────────────────────────────
export async function seedDonations() {
  const db = getDb();
  await clearCollection("donations");
  for (const donation of donationsData as any[]) {
    await addDoc(collection(db, "donations"), {
      name: donation.name,
      email: donation.email,
      phone: donation.phone,
      amount: donation.amount,
      paymentMethod: donation.paymentMethod,
      createdAt: serverTimestamp(),
    });
  }
  console.log(`Seeded ${donationsData.length} donations`);
}

// ─── Seed Projects ───────────────────────────────────────────────────
export async function seedProjects() {
  const db = getDb();
  await clearCollection("projects");
  for (const project of projectsData as any[]) {
    await addDoc(collection(db, "projects"), {
      title: project.title,
      images: project.images || [],
      description: project.description || "",
      goal: project.goal || "",
      stats: project.stats || [],
      beforeImage: project.beforeImage || "",
      afterImage: project.afterImage || "",
      futurePlans: project.futurePlans || "",
      partners: project.partners || [],
      location: project.location || "",
      coordinates: project.coordinates || "",
      createdAt: serverTimestamp(),
    });
  }
  console.log(`Seeded ${projectsData.length} projects`);
}

async function authenticateAdmin() {
  if (!auth) {
    console.warn("Auth is not initialized");
    return;
  }
  const email = "admin@combinefoundation.com";
  const password = "admin123"; // default temporary password for seeding
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Authenticated as admin successfully");
  } catch (error: any) {
    if (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Created and authenticated as admin successfully");
      } catch (createErr) {
        console.error("Failed to create admin user during seeding:", createErr);
      }
    } else {
      console.error("Authentication failed during seeding:", error);
    }
  }
}

// ─── Seed All Collections ────────────────────────────────────────────
export async function seedAllCollections() {
  console.log("Starting full database seed...");
  await authenticateAdmin();
  await seedEvents();
  await seedCourses();
  await seedBlogs();
  await seedContacts();
  await seedDonations();
  await seedProjects();
  console.log("All collections seeded successfully!");
}

// ─── Original seed (programs, applications, messages, jobs) ──────────
export const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");

    // 1. Seed Programs
    const programs: Omit<Program, 'id'>[] = [
      {
        title: "Web Development Bootcamp",
        description: "A comprehensive guide to modern web development.",
        published: true,
        createdAt: serverTimestamp(),
      },
      {
        title: "Data Science Specialization",
        description: "Learn Python, R, and Machine Learning from scratch.",
        published: true,
        createdAt: serverTimestamp(),
      },
      {
        title: "Advanced AI Ethics",
        description: "Exploring the social implications of AI.",
        published: false,
        createdAt: serverTimestamp(),
      }
    ];

    const programIds: string[] = [];
    for (const prog of programs) {
      const docRef = await addDoc(collection(getDb(), "programs"), prog);
      programIds.push(docRef.id);
      console.log(`Program added with ID: ${docRef.id}`);
    }

    // 2. Seed Applications
    const applications: Omit<Application, 'id'>[] = [
      {
        userId: "user_001",
        programId: programIds[0],
        status: "pending",
        appliedAt: serverTimestamp(),
      },
      {
        userId: "user_002",
        programId: programIds[1],
        status: "approved",
        appliedAt: serverTimestamp(),
      }
    ];

    for (const app of applications) {
      const docRef = await addDoc(collection(getDb(), "applications"), app);
      console.log(`Application added with ID: ${docRef.id}`);
    }

    // 3. Seed Messages
    const messages: Omit<Message, 'id'>[] = [
      {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello, I have a question about the bootcamp.",
        sentAt: serverTimestamp(),
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        message: "When does the next cohort start?",
        sentAt: serverTimestamp(),
      }
    ];

    for (const msg of messages) {
      const docRef = await addDoc(collection(getDb(), "messages"), msg);
      console.log(`Message added with ID: ${docRef.id}`);
    }

    // 4. Seed Jobs
    const jobs: Omit<Job, 'id'>[] = [
      {
        title: "Front-End Developer",
        department: "Technology",
        location: "Karachi (Hybrid)",
        type: "Full-time",
        description: "We are looking for a skilled Front-End Developer with React/Next.js experience to help build and maintain our digital platforms and tools.",
        requirements: [
          "Proficiency in HTML, CSS, JavaScript/TypeScript",
          "1+ years of experience with React and Next.js",
          "Familiarity with Tailwind CSS and responsive design",
          "Good communication skills and teamwork mindset"
        ],
        active: true,
        createdAt: serverTimestamp(),
      },
      {
        title: "Social Media Manager",
        department: "Marketing",
        location: "Karachi, Pakistan",
        type: "Part-time",
        description: "Help us expand our reach by managing our social media profiles, creating engaging content, and interacting with our community.",
        requirements: [
          "Experience running social media campaigns (Facebook, Instagram, LinkedIn)",
          "Strong copywriting and content creation skills in Urdu and English",
          "Basic graphic design skills (Canva/Photoshop) is a plus",
          "Passion for social work and community development"
        ],
        active: true,
        createdAt: serverTimestamp(),
      },
      {
        title: "Graphic Designer",
        department: "Design",
        location: "Remote",
        type: "Internship",
        description: "Design brochures, banner images, and social media posts for our programs.",
        requirements: [
          "Knowledge of Adobe Illustrator, Photoshop, or Canva",
          "Creative eye for branding and design layouts",
          "Ability to deliver projects within deadlines"
        ],
        active: false,
        createdAt: serverTimestamp(),
      }
    ];

    for (const job of jobs) {
      const docRef = await addDoc(collection(getDb(), "jobs"), job);
      console.log(`Job added with ID: ${docRef.id}`);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
