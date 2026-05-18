"use client";

import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { Program } from "@/lib/collections";
import PageHeroMobile from "@/components/UI/Pageheromobile"
import DonationForm from "@/components/donation/DonationForm"
import DonationUsage from "@/components/donation/DonationUsage"
import SuccessfulVentures from "@/components/donation/successfulventures"
import CtaSection from "@/components/UI/CtaSection"

function Page() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            } catch (err: any) {
                console.error("Error fetching programs:", err);
                setError(err.message || "Failed to fetch programs");
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    return (
        <div>
            <PageHeroMobile title='Donate'
                imageSrc='/donation/donation.png'
                styles='object-top'
                Overlaycolor='bg-transparent'
            />
            
            <div className="container mx-auto px-4 py-8">
                {loading && <p className="text-center text-gray-500">Loading programs...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                
                {!loading && !error && programs.length > 0 && (
                    <div className="my-8">
                        <h2 className="text-2xl font-bold mb-4">Foundation Programs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {programs.map(prog => (
                                <div key={prog.id} className="p-4 border rounded shadow">
                                    <h3 className="font-bold">{prog.title}</h3>
                                    <p>{prog.description}</p>
                                    {prog.category && <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">{prog.category}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {!loading && !error && programs.length === 0 && (
                    <p className="text-center text-gray-500 my-8">No programs found in database.</p>
                )}
            </div>

            <DonationForm />
            <DonationUsage />
            <SuccessfulVentures />
            <CtaSection text="Do you have the same vision as us ?" buttonText="Donate Now" />
        </div>
    )
}

export default Page