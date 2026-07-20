import { collection, addDoc, serverTimestamp } from "firebase/firestore/lite";
import { getDb } from "./firebase";

const youthLeaders = [
  { name: "Subhan Khan", role: "Youth Leader", image: "/home/project/project.png" },
  { name: "Hafsah Khalil", role: "Youth Leader", image: "/home/impact/impact4.png" },
  { name: "Sundas Parri", role: "Youth Leader", image: "/home/impact/impact5.png" },
  { name: "Neha Rubab", role: "Youth Leader", image: "/home/impact/impact6.png" },
  { name: "Haseeb Fakhra", role: "Youth Leader", image: "/home/impact/impact2.jpg" },
  { name: "Muzamil Mustafa", role: "Youth Leader", image: "/projects/projecthero.png" },
  { name: "Farwa Rehman", role: "Youth Leader", image: "/home/founder/person.png" },
  { name: "Spogmay Arif", role: "Youth Leader", image: "/events/eventsperson.png" },
  { name: "Malik Kamran", role: "Youth Leader", image: "/about/hero/hero2.jpg" },
];

export async function seedYouthLeaders() {
  const db = getDb();
  const col = collection(db, "teamMembers");

  let count = 0;
  for (const member of youthLeaders) {
    await addDoc(col, {
      ...member,
      section: "Youth Forum",
      createdAt: serverTimestamp(),
    });
    count++;
  }

  return { added: count };
}
