"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { Program } from "@/lib/collections";
import PageHeroMobile from "@/components/UI/Pageheromobile";
import OurIdeaAboutEvents from "@/components/events/ourideas";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import MeetOurSpeakers from "@/components/events/meetourspeakers";

const Page = () => {
    const [events, setEvents] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const db = getDb();
                const q = query(collection(db, "programs"), where("category", "==", "event"));
                const querySnapshot = await getDocs(q);
                const fetchedEvents: Program[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedEvents.push({ id: doc.id, ...doc.data() } as Program);
                });
                setEvents(fetchedEvents);
            } catch (err: any) {
                console.error("Error fetching events:", err);
                setError(err.message || "Failed to fetch events");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <PageHeroMobile title="Events" imageSrc="/home/blog/blog2.png" />
            
            <div className="container mx-auto px-4 py-8">
                {loading && <p className="text-center text-gray-500">Loading events...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                
                {!loading && !error && events.length > 0 && (
                    <div className="my-8">
                        <h2 className="text-2xl font-bold mb-4">Firestore Events</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {events.map(event => (
                                <div key={event.id} className="p-4 border rounded shadow">
                                    <h3 className="font-bold">{event.title}</h3>
                                    <p>{event.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {!loading && !error && events.length === 0 && (
                    <p className="text-center text-gray-500 my-8">No events found in database.</p>
                )}
            </div>

            <OurIdeaAboutEvents />
            <UpcomingEvents />
            <MeetOurSpeakers />
        </>
    );
};

export default Page;