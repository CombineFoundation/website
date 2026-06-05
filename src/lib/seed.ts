import { getDb } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import {
  Program,
  Application,
  Message,
  TeamMember,
  AnnualReport,
  MOU,
  Certificate
} from "@/types/database";

// Helper function to clear a collection
const clearCollection = async (collectionName: string) => {
  const db = getDb();
  const querySnapshot = await getDocs(collection(db, collectionName));
  const deletePromises = querySnapshot.docs.map((document) =>
    deleteDoc(doc(db, collectionName, document.id))
  );
  await Promise.all(deletePromises);
  console.log(`Cleared collection: ${collectionName}`);
};

export const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");

    // 1. Seed Programs (Clear first)
    await clearCollection("programs");
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

    // 2. Seed Applications (Clear first)
    await clearCollection("applications");
    const applications: Omit<Application, 'id'>[] = [
      {
        userId: "user_001",
        programId: programIds[0],
        status: "pending",
        createdAt: serverTimestamp(),
      },
      {
        userId: "user_002",
        programId: programIds[1],
        status: "approved",
        createdAt: serverTimestamp(),
      }
    ];

    for (const app of applications) {
      const docRef = await addDoc(collection(getDb(), "applications"), app);
      console.log(`Application added with ID: ${docRef.id}`);
    }

    // 3. Seed Messages (Clear first)
    await clearCollection("messages");
    const messages: Omit<Message, 'id'>[] = [
      {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello, I have a question about the bootcamp.",
        createdAt: serverTimestamp(),
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        message: "When does the next cohort start?",
        createdAt: serverTimestamp(),
      }
    ];

    for (const msg of messages) {
      const docRef = await addDoc(collection(getDb(), "messages"), msg);
      console.log(`Message added with ID: ${docRef.id}`);
    }

    // 4. Seed Team Members (Clear first)
    await clearCollection("team_members");
    const teamMembers: Omit<TeamMember, 'id'>[] = [
      {
        name: "Muhammad Junaid Makhani",
        role: "Founder",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
        category: "founder",
        description: [
          "Muhammad Junaid Makhani is the visionary behind Combine Foundation. With a passion for community service and youth empowerment, he established this organization to bridge the gap between education and opportunity.",
          "Under his leadership, Combine Foundation has reached thousands of students across the region, providing them with the tools and mentorship needed to succeed in a rapidly changing world."
        ],
        order: 1
      },
      {
        name: "Muhammad Ashfaq",
        role: "CEO",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
        category: "ceo",
        description: [
          "Muhammad Ashfaq brings years of executive experience to Combine Foundation. As CEO, he oversees the daily operations and strategic planning of the organization.",
          "His focus on operational excellence and sustainable growth has been instrumental in expanding our programs and building strong partnerships with international bodies."
        ],
        order: 2
      },
      // Trustees
      { name: "Faysal Aziz Khan", role: "Trustee", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400", category: "trustee", order: 3 },
      { name: "Sajid Mahmood", role: "Trustee", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", category: "trustee", order: 4 },
      { name: "Zia Ullah", role: "Trustee", image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=400", category: "trustee", order: 5 },
      // Department Heads
      { name: "Ahmed Raza", role: "Head of Education", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400", category: "head", order: 6 },
      { name: "Sarah Khan", role: "Head of Marketing", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", category: "head", order: 7 },
      { name: "Umar Farooq", role: "Head of Operations", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400", category: "head", order: 8 },
      // Ambassadors
      { name: "Ali Hamza", role: "Global Ambassador", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400", category: "ambassador", order: 9 },
      { name: "Fatima Jamil", role: "Youth Ambassador", image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400", category: "ambassador", order: 10 },
      { name: "Zainab Ali", role: "Culture Ambassador", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400", category: "ambassador", order: 11 },
      // Youth Leaders
      { name: "Usman Ghani", role: "Youth Leader", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400", category: "leader", order: 12 },
      { name: "Ibrahim Malik", role: "Youth Leader", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=400", category: "leader", order: 13 },
      { name: "Maryam Noor", role: "Youth Leader", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400", category: "leader", order: 14 },
      // Partners
      { name: "Hamdard Foundation", role: "Strategic Partner", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800", category: "partner", order: 15 },
      { name: "Saylani Trust", role: "Development Partner", image: "https://images.unsplash.com/photo-1551836022-83587b97143c?auto=format&fit=crop&q=80&w=800", category: "partner", order: 16 }
    ];

    for (const member of teamMembers) {
      await addDoc(collection(getDb(), "team_members"), member);
    }
    console.log("Team members seeded.");

    // 5. Seed Annual Reports (Clear first)
    await clearCollection("annual_reports");
    const annualReports: Omit<AnnualReport, 'id'>[] = [
      {
        title: "Annual Report 2022",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,",
        image: "/publications/pub1.png",
        viewUrl: "#",
        downloadUrl: "#",
        order: 1
      },
      {
        title: "Annual Report 2021",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,",
        image: "/publications/pub1.png",
        viewUrl: "#",
        downloadUrl: "#",
        order: 2
      },
      {
        title: "Annual Report 2020",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,",
        image: "/publications/pub1.png",
        viewUrl: "#",
        downloadUrl: "#",
        order: 3
      }
    ];

    for (const report of annualReports) {
      await addDoc(collection(getDb(), "annual_reports"), report);
    }
    console.log("Annual reports seeded.");

    // 6. Seed MOUs (Clear first)
    await clearCollection("mous");
    const mous: Omit<MOU, 'id'>[] = [
      {
        title: "Hammad Foundation X Combine Foundation MOU",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
          "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem"
        ],
        image: "/publications/pub1.png",
        imageAlt: "MOU signing between Hammad Foundation and Combine Foundation",
        order: 1
      },
      {
        title: "Hammad Foundation X Green Earth MOU",
        paragraphs: [
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
        ],
        image: "/publications/pub1.png",
        imageAlt: "MOU signing between Hammad Foundation and Green Earth",
        order: 2
      },
      {
        title: "Hammad Foundation X Education Trust MOU",
        paragraphs: [
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
          "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio."
        ],
        image: "/publications/pub1.png",
        imageAlt: "MOU signing between Hammad Foundation and Education Trust",
        order: 3
      }
    ];

    for (const mouItem of mous) {
      await addDoc(collection(getDb(), "mous"), mouItem);
    }
    console.log("MOUs seeded.");

    // 7. Seed Certificates (Clear first)
    await clearCollection("certificates");
    const certificates: Omit<Certificate, 'id'>[] = [
      {
        title: "Tax Certificate for the year 2024",
        image: "/publications/pub1.png",
        imageAlt: "Tax Certificate 2024",
        url: "/certificates/tax-2024",
        order: 1
      },
      {
        title: "Tax Certificate for the year 2023",
        image: "/publications/pub1.png",
        imageAlt: "Tax Certificate 2023",
        url: "/certificates/tax-2023",
        order: 2
      },
      {
        title: "Tax Certificate for the year 2022",
        image: "/publications/pub1.png",
        imageAlt: "Tax Certificate 2022",
        url: "/certificates/tax-2022",
        order: 3
      }
    ];

    for (const cert of certificates) {
      await addDoc(collection(getDb(), "certificates"), cert);
    }
    console.log("Certificates seeded.");

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};
