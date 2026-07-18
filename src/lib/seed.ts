import { getDb, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc } from "firebase/firestore/lite";
import { Program, Application, Message, Job } from "./collections";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Import JSON data
import eventsData from "@/data/events.json";
import coursesData from "@/data/courses.json";
import blogsData from "@/data/blogs.json";
import donationsData from "@/data/donations.json";
import mousData from "@/data/mous.json";

// Inline contactsData and projectsData
const contactsData: any[] = [];
const projectsData = [
  {
    "title": "SMIU FYP Evaluation and Pilot project design",
    "images": [
      "/about/hero/hero1.png",
      "/about/story/story.png"
    ],
    "description": "SMIU FYP Evaluation & Pilot Project Design is a joint project between SMIU (Sindh Madarssatul Islam University) and Combine Foundation. Its objective is to assist students in enhancing the quality and efficiency of their Final Year Projects. This project focuses on the aspects of project evaluation, validation, and piloting to make sure that the project is practically in demand.",
    "goal": "The objective of this project is to assess and improve the quality of projects done by the students of SMIU during their final year through assessment, validation, and pilot testing.",
    "stats": [
      { "value": "150+", "label": "Projects Evaluated" },
      { "value": "500+", "label": "Students Guided" },
      { "value": "10+", "label": "Pilot Designs" },
      { "value": "20+", "label": "Mentors & Evaluators" }
    ],
    "beforeImage": "/about/hero/hero1.png",
    "afterImage": "/about/story/story.png",
    "futurePlans": "As part of our future vision, Combine Foundation aims to operate throughout Pakistan to maximize the impact of our work toward youth development and community empowerment. Our plans involve enhancing collaboration with universities throughout the country to offer more opportunities for learning and networking. The future plans will involve structured leadership certifications aimed at empowering youths with the necessary skills needed for success both professionally and personally. Lastly, our goal is to establish internships in employment schemes that help youths to gain employment after their studies.",
    "partners": [
      "/about/hero/hero1.png"
    ],
    "location": "Karachi",
    "coordinates": "24.8504, 67.0031"
  },
  {
    "title": "Beach Cleanup drive with Hammad Foundation",
    "images": [
      "/home/impact/impact1.png",
      "/home/impact/impact2.jpg"
    ],
    "description": "The Beach Clean-up Drive was a collective effort between the Combine Foundation and the Hammad Foundation, in which youth contribute wholeheartedly with participation of more than 500 Gen Z volunteers. Through this activity, efforts were made to ensure a cleaner and greener environment by cleaning the beaches and spreading awareness regarding the need for protecting nature.",
    "goal": "The main goal is to Bring the youth together for the purpose of having a positive impact on the environment through beach clean-up activities aimed at reducing pollution and sustainable green future.",
    "stats": [
      { "value": "500+", "label": "Gen Z Volunteers" },
      { "value": "2+", "label": "Tons of Trash Cleared" },
      { "value": "3+", "label": "Beaches Cleaned" },
      { "value": "1,000+", "label": "Awareness Flyers" }
    ],
    "beforeImage": "/home/impact/impact1.png",
    "afterImage": "/home/impact/impact2.jpg",
    "futurePlans": "We aim to scale our beach cleaning activities to multiple coastal points across the region, partner with municipal corporations for waste disposal/recycling, and initiate a continuous awareness campaign on marine plastic reduction.",
    "partners": [
      "/about/hero/hero2.jpg"
    ],
    "location": "Karachi",
    "coordinates": "24.6800, 66.8200"
  },
  {
    "title": "Ramadan Bachat camp and Ration Drive with Hammad Foundation",
    "images": [
      "/home/impact/impact4.png",
      "/home/impact/impact5.png"
    ],
    "description": "The Ramadan Bachat Camp & Ration Drive was a joint initiative of Combine Foundation & Hammad Foundation to help needy families during the holy month of Ramadan. In this project, the daily basic necessities and essentials through the Bachat Camp and ration were arranged for those who needed it the most. In this way, financially stressed and needy people have their basic needs. Through this project, many people came forward to promote the act of kindness and support of needy families.",
    "goal": "The main objective of this initiative is to help poor and needy families during Ramadan through the provision of necessities and food, so that they can also live their life and Ramadan like others. This will not only help them fulfill their needs but also show compassion, solidarity, and generosity.",
    "stats": [
      { "value": "1,200+", "label": "Families Assisted" },
      { "value": "60%", "label": "Below Market Rates" },
      { "value": "100+", "label": "Volunteers Onboarded" },
      { "value": "8+", "label": "Ration Drives Held" }
    ],
    "beforeImage": "/home/impact/impact4.png",
    "afterImage": "/home/impact/impact5.png",
    "futurePlans": "We plan to establish a sustainable ration supply model that goes beyond Ramadan to support highly vulnerable families year-round, and expand the footprint to other districts.",
    "partners": [
      "/about/hero/hero2.jpg"
    ],
    "location": "Karachi",
    "coordinates": "25.0200, 67.1200"
  },
  {
    "title": "Risk-Based Internal Audit Session at NED University with Quants Society",
    "images": [
      "/about/story/story.png",
      "/home/impact/impact6.png"
    ],
    "description": "The Risk-Based Internal Audit Seminar was arranged by Combine Foundation in cooperation with Quants Society from NED University with the aim of providing students and young professionals with practical understanding of audit, risk management, and corporate governance. Facilitated by a renowned industry professional, and Director of Combine Consultant Farrukh Rehman, the seminar offered participants useful insight about contemporary auditing procedures and risks, as well as career options in finance and consulting industries.",
    "goal": "The main goal of this seminar is to enhance students' understanding of risk-based internal auditing and develop practical skills in risk management, governance, and professional decision-making for future career growth.",
    "stats": [
      { "value": "150+", "label": "Students & Professionals" },
      { "value": "1", "label": "Director Facilitator" },
      { "value": "5+", "label": "Key Audit Domains" },
      { "value": "100%", "label": "Interactive Q&A" }
    ],
    "beforeImage": "/about/story/story.png",
    "afterImage": "/home/impact/impact6.png",
    "futurePlans": "We intend to organize hands-on training sessions with industry-standard software, launch corporate mentorship pairings for participating students, and schedule regular academic guest lectures.",
    "partners": [
      "/about/story/story.png"
    ],
    "location": "Karachi",
    "coordinates": "25.1800, 67.2800"
  },
  {
    "title": "Breast Cancer and Gender-Based Violence Awareness Campaign with NGAS",
    "images": [
      "/events/eventsperson.png",
      "/about/achievements/achievements.png"
    ],
    "description": "The Breast Cancer and Gender-Based Violence Awareness Campaign will be organized in collaboration with NGAS, which is aimed at raising the community's awareness on the need for early detection of breast cancer and preventing gender-based violence. This program aims at creating awareness through activities such as discussion, health promotion programs, seminars, and other learning activities.",
    "goal": "The main purpose is to create awareness regarding breast cancer and gender-based violence, ensure early identification and prevention, and empower communities to move toward a better future.",
    "stats": [
      { "value": "400+", "label": "Attendees Reached" },
      { "value": "3+", "label": "Interactive Seminars" },
      { "value": "20+", "label": "Medical Volunteers" },
      { "value": "100%", "label": "Free Consultation" }
    ],
    "beforeImage": "/events/eventsperson.png",
    "afterImage": "/about/achievements/achievements.png",
    "futurePlans": "Our plans involve establishing a peer support network, launching hybrid seminars accessible to campuses nationwide, and partnering with medical specialists to provide subsidised checkup camps.",
    "partners": [
      "/events/eventsperson.png"
    ],
    "location": "Quetta",
    "coordinates": "30.2193, 66.9830"
  },
  {
    "title": "Kitchen Garden Festival Camp",
    "images": [
      "/home/impact/impact5.png",
      "/home/impact/impact1.png"
    ],
    "description": "The Kitchen Garden Festival Camp by Combine Foundation promotes healthy and ecofriendly living by educate people to reconnect with nature and adopting organic lifestyles. Through the Kitchen Garden Festival Camp and awareness sessions, families learn the benefits of fresh organic food, healthy eating habits, and growing fruits and vegetables at home. This initiative also spreads awareness about reducing the usage of processed food and building a more natural, sustainable, and wellness-focused lifestyle for a healthier future.",
    "goal": "To promote healthy and eco-friendly living by educating families on organic lifestyles, fresh food benefits, and home-growing techniques for a sustainable future.",
    "stats": [
      { "value": "300+", "label": "Families Participated" },
      { "value": "15+", "label": "Gardening Workshops" },
      { "value": "100%", "label": "Organic Focus" },
      { "value": "500+", "label": "Saplings Distributed" }
    ],
    "beforeImage": "/home/impact/impact5.png",
    "afterImage": "/home/impact/impact1.png",
    "futurePlans": "We plan to establish regular neighborhood gardening hubs and partner with educational institutions to set up model gardens for children.",
    "partners": [
      "/about/hero/hero2.jpg"
    ],
    "location": "Karachi",
    "coordinates": "25.0153, 67.2459"
  },
  {
    "title": "Healthy Lifestyle Awareness Program",
    "images": [
      "/home/impact/impact4.png",
      "/home/impact/impact6.png"
    ],
    "description": "The Healthy Lifestyle Awareness Program by Combine Foundation promotes preventive wellness, healthy habits, and positive lifestyle choices through interactive awareness sessions and educational activities. In these sessions, we guide individuals to gradually improve their daily routines according to their personal lifestyle in a practical and sustainable way, making it easier for them to follow and maintain healthy habits for the long-term. Through this awareness program we guide them about importance of balanced nutrition, regular physical activity, disciplined routines, and mindful living practices to improve overall well-being and productivity. Many individuals have benefited from these sessions and are now living healthier, more balanced, and wellness-focused lives.",
    "goal": "To promote preventive wellness, healthy habits, and positive lifestyle choices through practical guidelines for sustainable daily routines.",
    "stats": [
      { "value": "1,000+", "label": "People Reached" },
      { "value": "20+", "label": "Educational Seminars" },
      { "value": "90%", "label": "Adoption Rate" },
      { "value": "50+", "label": "Wellness Consultations" }
    ],
    "beforeImage": "/home/impact/impact4.png",
    "afterImage": "/home/impact/impact6.png",
    "futurePlans": "We plan to offer a mobile application for tracking habits, coordinate digital webinars with professional nutritionists, and establish regional wellness chapters.",
    "partners": [
      "/events/eventsperson.png"
    ],
    "location": "Karachi",
    "coordinates": "24.9178, 67.0946"
  },
  {
    "title": "RAISE (Rising Ambitions in Skills & Education)",
    "images": [
      "/about/hero/hero1.png",
      "/about/story/story.png"
    ],
    "description": "RAISE (Rising Ambitions in Skills & Education) is a project of the Combine Foundation that aims to empower students as well as employees with all the information, skills, and opportunities to excel in today's fast-paced environment. The aim of this project is to connect learners to practical training modules relevant to the industries which can help them secure their future employment. The RAISE project offers a variety of courses like Python with AI, Web Development, Basic Computer Skills, Quantitative Finance, Meta Ads Marketing, as well as programs designed to foster growth in personal qualities of learners. With a focus on building digital literacy, innovation, and a passion for learning, this project can help learners pursue freelancing jobs and improve their income and self-reliance.",
    "goal": "To empower students and employees with industry-relevant skills, digital literacy, and personal growth modules to enhance employment opportunities and self-reliance.",
    "stats": [
      { "value": "15+", "label": "Industry Courses" },
      { "value": "2,000+", "label": "Learners Trained" },
      { "value": "85%", "label": "Employment Success" },
      { "value": "100%", "label": "Self-Reliance Focus" }
    ],
    "beforeImage": "/about/hero/hero1.png",
    "afterImage": "/about/story/story.png",
    "futurePlans": "We plan to partner with corporate sponsors to offer internships, expand our course catalog to include advanced machine learning engineering, and build an online freelancing community board.",
    "partners": [
      "/about/hero/hero1.png"
    ],
    "location": "Online",
    "coordinates": "lorem"
  },
  {
    "title": "CSC Scholarship Program",
    "images": [
      "/home/impact/impact1.png",
      "/about/achievements/achievements.png"
    ],
    "description": "The CSC Scholarship Program by Combine Foundation was launched to support deserving and talented students in their educational journey. Who are unable to study due to financial reasons. The program provides financial assistance and all kinds of academic support to help students continue their studies and achieve their career goals with confidence without any fear of financial issues. Currently many deserving students are studying and growing under CSC Scholarship program.",
    "goal": "To support deserving and talented students who face financial barriers by providing tuition assistance and academic mentorship to ensure they complete their studies successfully.",
    "stats": [
      { "value": "100+", "label": "Scholarships Awarded" },
      { "value": "95%", "label": "Graduation Rate" },
      { "value": "10+", "label": "Partner Colleges" },
      { "value": "100%", "label": "Financial Support" }
    ],
    "beforeImage": "/home/impact/impact1.png",
    "afterImage": "/about/achievements/achievements.png",
    "futurePlans": "We aim to grow the scholarship fund to support 500+ students next year and partner with more universities in other provinces.",
    "partners": [
      "/about/hero/hero2.jpg"
    ],
    "location": "Online",
    "coordinates": "lorem"
  },
  {
    "title": "Freelancing & Online Earning Awareness sessions",
    "images": [
      "/about/hero/hero1.png",
      "/home/impact/impact6.png"
    ],
    "description": "Various Freelancing & Online Earning Awareness sessions by the Combine Foundation were conducted to help students and freelancers to teach them how to start earning online through digital skills and freelancing platforms. These sessions introduced practical ways to build freelance careers, work remotely, and generate income using skill-based services. Through these sessions Students and freelancers also received guidance on online marketplaces, career opportunities, and how to get clients through inbound and outbound leads.",
    "goal": "To introduce practical ways to build freelance careers, work remotely, generate income using skill-based services, and guide participants on getting clients via inbound and outbound leads.",
    "stats": [
      { "value": "1,500+", "label": "Students Trained" },
      { "value": "12+", "label": "Sessions Conducted" },
      { "value": "50+", "label": "Earning Successes" },
      { "value": "100%", "label": "Practical Guidance" }
    ],
    "beforeImage": "/about/hero/hero1.png",
    "afterImage": "/home/impact/impact6.png",
    "futurePlans": "We aim to expand these awareness sessions into structured, hands-on bootcamps with industry-expert mentors and build an online freelancing community board for lead sharing.",
    "partners": [
      "/about/hero/hero2.jpg"
    ],
    "location": "Karachi & Online",
    "coordinates": "24.8607, 67.0011"
  },
  {
    "title": "Volunteer program",
    "images": [
      "/home/impact/impact4.png",
      "/about/story/story.png"
    ],
    "description": "The Volunteer Program of Combine Foundation provides students with opportunities to work on real-world projects and gain practical experience through community involvement. This program has different niches on which volunteers can work. Through volunteering, skills like leadership, teamwork, responsibility, and communication skills are developed while it also encourages students to actively contribute to social and educational initiatives.",
    "goal": "To provide students with hands-on opportunities to work on community initiatives, develop critical soft skills like leadership and communication, and actively contribute to social impact.",
    "stats": [
      { "value": "350+", "label": "Active Volunteers" },
      { "value": "5+", "label": "Volunteer Niches" },
      { "value": "15+", "label": "Projects Completed" },
      { "value": "1,200+", "label": "Community Hours" }
    ],
    "beforeImage": "/home/impact/impact4.png",
    "afterImage": "/about/story/story.png",
    "futurePlans": "We plan to launch a formal volunteer tracking and reward system, establish campus-level volunteer chapters across major universities, and offer leadership training certifications.",
    "partners": [
      "/about/story/story.png"
    ],
    "location": "Pakistan",
    "coordinates": "lorem"
  },
  {
    "title": "Youth Leadership Program",
    "images": [
      "/about/hero/hero1.png",
      "/about/achievements/achievements.png"
    ],
    "description": "The Youth Leadership Program by Combine Foundation is a 6-month leadership development program designed to empower young individuals to become confident and responsible future leaders. Through different activities, real-world projects, teamwork, and social initiatives, students actively participate in decision-making and program execution while also improving their leadership, communication, and strategic thinking skills. This program helps youth to build confidence, personal growth, and strong community engagement skills for the future. We have a strong network for Youth leadership programs where many students from different universities are part of this program either as a youth leader or youth leader volunteer.",
    "goal": "To empower young individuals through a 6-month hands-on leadership development curriculum, enhancing their decision-making, team building, communication, and community engagement capabilities.",
    "stats": [
      { "value": "6 Months", "label": "Program Duration" },
      { "value": "200+", "label": "Youth Leaders" },
      { "value": "15+", "label": "Universities Involved" },
      { "value": "30+", "label": "Social Projects Led" }
    ],
    "beforeImage": "/about/hero/hero1.png",
    "afterImage": "/about/achievements/achievements.png",
    "futurePlans": "We plan to establish a permanent youth leadership council, collaborate with international youth development forums, and introduce national-level leadership summits.",
    "partners": [
      "/about/hero/hero1.png"
    ],
    "location": "Karachi & Online",
    "coordinates": "24.8504, 67.0031"
  },
  {
    "title": "One Follower One Plant: Plantation Drives",
    "images": [
      "/home/impact/impact1.png",
      "/home/impact/impact2.jpg"
    ],
    "description": "Through our “One Follower, One Plant” plantation drive by combine foundation, we are actively working to promote environmental sustainability and climate awareness. Our mission is to create a greener, cleaner, and healthier future for upcoming generations. We plant a tree for every new supporter to help improve air quality, reduce climate impact, and build a more sustainable future. We also organize plantation activities and awareness programs that highlight the importance of trees in maintaining ecological balance and protecting the environment.",
    "goal": "To promote environmental sustainability and combat climate change by planting a tree for every new supporter, raising awareness on environmental protection and ecological balance.",
    "stats": [
      { "value": "1,000+", "label": "Trees Planted" },
      { "value": "5,000+", "label": "Supporters Engaged" },
      { "value": "5+", "label": "Plantation Drives" },
      { "value": "95%", "label": "Sapling Survival Rate" }
    ],
    "beforeImage": "/home/impact/impact1.png",
    "afterImage": "/home/impact/impact2.jpg",
    "futurePlans": "We aim to digitize our planting verification system, expand the drives to major urban cities across Pakistan, and partner with schools to establish green student clubs.",
    "partners": [
      "/about/hero/hero2.jpg"
    ],
    "location": "Karachi & Islamabad",
    "coordinates": "24.8560, 67.0040"
  },
  {
    "title": "“Packet Palto Phir Kharido” Awareness Campaign",
    "images": [
      "/home/impact/impact5.png",
      "/home/impact/impact4.png"
    ],
    "description": "The “Packet Palto Phir Kharido”Awarness Campaign by Combine Foundation is a unique consumer awareness initiative that encourages people to make smarter and healthier food choices. Through this campaign, individuals are educated on the importance of reading product labels, understanding ingredients, avoiding harmful processed foods, and choosing healthier alternatives before making a purchase. This campaign is a remainder for people to make smarter food choices by understanding what they consume daily by Reading product labels for smarter buying decisions, making healthy food choices, avoiding harmful processed ingredients, by choosing healthier and safer alternatives.",
    "goal": "To educate and empower consumers to read food labels, avoid harmful processed ingredients, and choose healthy alternatives for a better and mindful lifestyle.",
    "stats": [
      { "value": "3,000+", "label": "Consumers Reached" },
      { "value": "20+", "label": "School/Uni Sessions" },
      { "value": "92%", "label": "Awareness Rating" },
      { "value": "500+", "label": "Labels Analyzed" }
    ],
    "beforeImage": "/home/impact/impact5.png",
    "afterImage": "/home/impact/impact4.png",
    "futurePlans": "We intend to scale this campaign digitally by launching barcode scanners or educational video series, and partner with local nutritionists for community grocery tours.",
    "partners": [
      "/about/hero/hero2.jpg"
    ],
    "location": "Lahore",
    "coordinates": "31.5204, 74.3587"
  }
];

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

// ─── Seed MOUs ───────────────────────────────────────────────────────
export async function seedMous() {
  const db = getDb();
  await clearCollection("mous");
  for (const mou of mousData as any[]) {
    await addDoc(collection(db, "mous"), {
      title: mou.title,
      paragraphs: mou.paragraphs,
      image: mou.image,
      imageAlt: mou.imageAlt || mou.title,
      createdAt: serverTimestamp(),
    });
  }
  console.log(`Seeded ${mousData.length} MOUs`);
}

// ─── Seed Team Members ────────────────────────────────────────────────
export async function seedTeamMembers() {
  const db = getDb();
  await clearCollection("teamMembers");
  
  const teamMembers = [
    // Board of Trustees
    { name: "Mr. Farrukh Rehman", role: "Director", section: "Board of Trustees", image: "/home/founder/person.png" },
    // Department Heads
    { name: "Muhammad Umar", role: "Projects Coordinator and Innovation Lead", section: "Department Head", image: "/volunteer/vol1.png" },
    { name: "Saifullah", role: "Finance Manager", section: "Department Head", image: "/volunteer/vol2.png" },
    { name: "Rizwan Ahmed", role: "Legal and Compliance Officer", section: "Department Head", image: "/avatar.svg" },
    { name: "Esha Adeel", role: "Lead Developer", section: "Department Head", image: "/events/eventsperson.png" },
    { name: "Vikram Singh", role: "Graphics Lead", section: "Department Head", image: "/avatar.svg" },
    { name: "Maliha Naz", role: "Content Department Lead", section: "Department Head", image: "/avatar.svg" },
    { name: "Ayan Ahmed", role: "Social Media Manager", section: "Department Head", image: "/avatar.svg" },
    { name: "Muhammad Usman", role: "Video Production Lead", section: "Department Head", image: "/avatar.svg" },
    // Ambassadors
    { name: "Miss Yasmeen", role: "Pakistan", section: "Ambassador", image: "/avatar.svg" },
    { name: "Aliza Hamid", role: "Spain", section: "Ambassador", image: "/avatar.svg" },
    { name: "Hira Kamal", role: "China", section: "Ambassador", image: "/avatar.svg" },
    { name: "Mirkamol Qobilov", role: "Uzbekistan", section: "Ambassador", image: "/avatar.svg" },
    // Youth Leaders
    { name: "Subhan Khan", role: "Youth Leader", section: "Youth Leader", image: "/avatar.svg" },
    { name: "Hafsah Khalil", role: "Youth Leader", section: "Youth Leader", image: "/avatar.svg" },
    { name: "Sundas Parri", role: "Youth Leader", section: "Youth Leader", image: "/avatar.svg" },
    { name: "Neha Rubab", role: "Youth Leader", section: "Youth Leader", image: "/avatar.svg" },
    { name: "Haseeb Fakhra", role: "Youth Leader", section: "Youth Leader", image: "/avatar.svg" },
    { name: "Muzamil Mustafa", role: "Youth Leader", section: "Youth Leader", image: "/avatar.svg" },
    { name: "Farwa Rehman", role: "Youth Leader", section: "Youth Leader", image: "/avatar.svg" },
    { name: "Spogmay Arif", role: "Youth Leader", section: "Youth Leader", image: "/avatar.svg" },
    { name: "Malik Kamran", role: "Youth Leader", section: "Youth Leader", image: "/avatar.svg" }
  ];

  for (const m of teamMembers) {
    await addDoc(collection(db, "teamMembers"), {
      ...m,
      createdAt: serverTimestamp(),
    });
  }
  console.log(`Seeded ${teamMembers.length} team members`);
}

// ─── Seed Partners ────────────────────────────────────────────────────
export async function seedPartners() {
  const db = getDb();
  await clearCollection("partners");
  
  const partnersList = [
    {
      name: "Sindh Madarasatul Islam University (SMIU)",
      description: "Sindh Madarasatul Islam University (SMIU) is a highly valued partner organization associated with Combine Foundation to provide educational and innovative learning opportunities for students. In this connection, both partner organizations are looking forward to providing a platform where students can learn and develop skills.",
      image: "/about/hero/hero1.png",
    },
    {
      name: "Hammad Foundation",
      description: "Hammad Foundation is one of our valued community partners that help us in our mission to serve the community in terms of social welfare and environmental awareness, along with other community services. It shows the commitment of both foundations in bringing about a positive impact on society.",
      image: "/about/hero/hero2.jpg",
    },
    {
      name: "Quants Society (NED University)",
      description: "Quants Society, being one of the Department Societies of NED University, is a valued academic and community society that works in collaboration with the Combine Foundation in helping students develop their skills and careers. Under this collaboration, a session was conducted at NED University.",
      image: "/about/story/story.png",
    },
    {
      name: "NGAS — NED Girls Affairs Society (NED University)",
      description: "NGAS – NED Girls Affairs Society is a valued partner organization collaborating with Combine Foundation to promote awareness, education, and community empowerment initiatives focused on social wellbeing and women’s development.",
      image: "/events/eventsperson.png",
    },
  ];

  for (const p of partnersList) {
    await addDoc(collection(db, "partners"), {
      ...p,
      createdAt: serverTimestamp(),
    });
  }
  console.log(`Seeded ${partnersList.length} partners`);
}

// ─── Seed Splash Banners ──────────────────────────────────────────────
export async function seedSplashBanners() {
  const db = getDb();
  await clearCollection("splashBanners");
  await addDoc(collection(db, "splashBanners"), {
    image: "/home/project/project.png",
    linkUrl: "/events",
    alt: "Applications open for the Youth Leadership Program! Engage with your community and start projects.",
    createdAt: serverTimestamp(),
  });
  console.log("Seeded 1 splash banner");
}

// ─── Seed Annual Reports ──────────────────────────────────────────────
export async function seedAnnualReports() {
  const db = getDb();
  await clearCollection("annualReports");
  
  const reportsList = [
    {
      title: "Annual Report 2022",
      description: "Highlights of Combine Foundation's key milestones, financial summary, and community achievements across Pakistan for the year 2022.",
      image: "/publications/pub1.png",
      viewUrl: "#",
      downloadUrl: "#",
    },
    {
      title: "Annual Report 2021",
      description: "Detailed overview of our youth-led social projects, university collaborations, and development programs conducted in 2021.",
      image: "/publications/pub1.png",
      viewUrl: "#",
      downloadUrl: "#",
    },
    {
      title: "Annual Report 2020",
      description: "Our inaugural annual report outlining the creation, mission, and initial project launches of the Combine Foundation.",
      image: "/publications/pub1.png",
      viewUrl: "#",
      downloadUrl: "#",
    },
  ];

  for (const r of reportsList) {
    await addDoc(collection(db, "annualReports"), {
      ...r,
      createdAt: serverTimestamp(),
    });
  }
  console.log(`Seeded ${reportsList.length} annual reports`);
}

// ─── Seed Jobs ────────────────────────────────────────────────────────
export async function seedJobs() {
  const db = getDb();
  await clearCollection("jobs");
  
  const jobsList = [
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

  for (const job of jobsList) {
    await addDoc(collection(db, "jobs"), job);
  }
  console.log(`Seeded ${jobsList.length} jobs`);
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
  await seedMous();
  await seedTeamMembers();
  await seedPartners();
  await seedSplashBanners();
  await seedAnnualReports();
  await seedJobs();
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
