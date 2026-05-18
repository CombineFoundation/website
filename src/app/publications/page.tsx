"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { Program } from "@/lib/collections";
import PageHeroMobile from "@/components/UI/Pageheromobile"
import AnnualReports from "@/components/publications/annual"
import Mouslider from "@/components/publications/Mouseslider"
import TaxShariaCertificates from "@/components/publications/Taxshariacertificates "

const Page = () => {
    const [publications, setPublications] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const db = getDb();
                const q = query(collection(db, "programs"), where("category", "==", "publication"));
                const querySnapshot = await getDocs(q);
                const fetchedPublications: Program[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedPublications.push({ id: doc.id, ...doc.data() } as Program);
                });
                setPublications(fetchedPublications);
            } catch (err: any) {
                console.error("Error fetching publications:", err);
                setError(err.message || "Failed to fetch publications");
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
    }, []);

    return (
        <div>
            <PageHeroMobile
                imageSrc="/publications/pub1.png"
                title="Publications"
                mobileStyles="!text-5xl"
            />
            
            <div className="container mx-auto px-4 py-8">
                {loading && <p className="text-center text-gray-500">Loading publications...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                
                {!loading && !error && publications.length > 0 && (
                    <div className="my-8">
                        <h2 className="text-2xl font-bold mb-4">Firestore Publications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {publications.map(pub => (
                                <div key={pub.id} className="p-4 border rounded shadow">
                                    <h3 className="font-bold">{pub.title}</h3>
                                    <p>{pub.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {!loading && !error && publications.length === 0 && (
                    <p className="text-center text-gray-500 my-8">No publications found in database.</p>
                )}
            </div>

            <AnnualReports />
            <Mouslider />
            <TaxShariaCertificates />
        </div>
    )
}

export default Page