import { collection, getDocs, query, where, limit } from "firebase/firestore/lite";
import { db } from "@/lib/firebase";

export interface CommentData {
  id: string;
  name: string;
  date: string;
  text: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  heroImage1: string;
  heroImage2: string;
  authorName: string;
  date: string;
  title: string;
  description: string;
  slug: string;
  status: "Published" | "Draft" | "Under Review";
  content: string[];
  conclusion: string;
  likes: number;
  comments: number;
  commentList: CommentData[];
}

export async function getAllBlogs(): Promise<BlogPost[]> {
    if (!db) return [];
    try {
        const snap = await getDocs(collection(db, "blogs"));
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
    if (!db) return undefined;
    try {
        const q = query(collection(db, "blogs"), where("slug", "==", slug), limit(1));
        const snap = await getDocs(q);
        if (snap.empty) return undefined;
        const doc = snap.docs[0];
        return { id: doc.id, ...doc.data() } as BlogPost;
    } catch (error) {
        console.error("Error fetching blog by slug:", error);
        return undefined;
    }
}

export async function getAllBlogSlugs() {
    const blogs = await getAllBlogs();
    return blogs.map((post) => ({ slug: post.slug }));
}
