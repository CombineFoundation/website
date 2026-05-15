"use client";

import { useEffect, useState, FormEvent } from "react";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { Program } from "@/lib/collections";
import Hero from "@/components/UI/hero"
import HowItWorks from "@/components/volunteer/Howitworks"
import WhyJoinUs from "@/components/volunteer/Whyjoinus"
import Filltheform from "@/components/volunteer/Filltheform"
import CtaSection from "@/components/UI/CtaSection";
import HearFromVolunteers from "@/components/volunteer/ourVolunteer";
import FAQs from "@/components/home/FaqSection"

export default function VolunteerPage() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Application Form State
    const [userId, setUserId] = useState("");
    const [selectedProgramId, setSelectedProgramId] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const db = getDb();
                const querySnapshot = await getDocs(collection(db, "programs"));
                const fetchedPrograms: Program[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedPrograms.push({ id: doc.id, ...doc.data() } as Program);
                });
                setPrograms(fetchedPrograms);
                if (fetchedPrograms.length > 0) {
                    setSelectedProgramId(fetchedPrograms[0].id || "");
                }
            } catch (err: any) {
                console.error("Error fetching programs:", err);
                setError(err.message || "Failed to fetch programs");
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    const handleApply = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitMessage("");

        try {
            const db = getDb();
            await addDoc(collection(db, "applications"), {
                userId,
                programId: selectedProgramId,
                status: "pending",
                createdAt: serverTimestamp()
            });
            setSubmitMessage("Application submitted successfully!");
            setUserId("");
        } catch (err: any) {
            console.error("Error submitting application:", err);
            setSubmitMessage("Error: " + (err.message || "Failed to submit"));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Hero text1="VOLUNTEER" text2="PROGRAM"
                image1="/volunteer/vol1.png"
                image2="/volunteer/vol2.png"
                text1Size="small"
                text2Size="small"
                mobileTitle="Volunteer"
            />
            
            {/* Display Programs */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-center mb-8">Available Volunteer Programs</h2>
                {loading && <p className="text-center text-gray-500">Loading programs...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                
                {!loading && !error && programs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        {programs.map(prog => (
                            <div key={prog.id} className="p-4 border rounded shadow">
                                <h3 className="font-bold">{prog.title}</h3>
                                <p>{prog.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Application Form */}
                <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
                    <h3 className="text-xl font-bold mb-4">Submit Application</h3>
                    <form onSubmit={handleApply} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Your Name / User ID</label>
                            <input 
                                type="text" 
                                required 
                                value={userId} 
                                onChange={(e) => setUserId(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter your ID or Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Select Program</label>
                            <select 
                                value={selectedProgramId}
                                onChange={(e) => setSelectedProgramId(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            >
                                {programs.map(p => (
                                    <option key={p.id} value={p.id}>{p.title}</option>
                                ))}
                            </select>
                        </div>
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className="w-full bg-[#0f2d5c] text-white py-2 rounded hover:bg-[#0f2d5c]/90 disabled:opacity-50"
                        >
                            {submitting ? "Submitting..." : "Apply"}
                        </button>
                        {submitMessage && (
                            <p className={`text-center mt-2 ${submitMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                                {submitMessage}
                            </p>
                        )}
                    </form>
                </div>
            </div>

            <HowItWorks />
            <WhyJoinUs />
            <Filltheform />
            <CtaSection text="Ready to Contribute for Good ?" buttonText="Contact Us" url="/contact" />
            <HearFromVolunteers />
            <FAQs />
        </div>
    );
}