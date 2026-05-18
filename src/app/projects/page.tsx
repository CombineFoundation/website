"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { Program } from "@/lib/collections";
import dynamic from 'next/dynamic'
import PageHeroMobile from '@/components/UI/Pageheromobile'
import AchievementsList from '@/components/projects/Achievementslist '

const AchievementsMap = dynamic(() => import('@/components/projects/map'), { ssr: false })

const Projects = () => {
    const [projects, setProjects] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const db = getDb();
                const q = query(collection(db, "programs"), where("category", "==", "project"));
                const querySnapshot = await getDocs(q);
                const fetchedProjects: Program[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedProjects.push({ id: doc.id, ...doc.data() } as Program);
                });
                setProjects(fetchedProjects);
            } catch (err: any) {
                console.error("Error fetching projects:", err);
                setError(err.message || "Failed to fetch projects");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <>
            <PageHeroMobile title="Projects" imageSrc="/projects/projecthero.png" styles="my-4 " />
            
            <div className="container mx-auto px-4 py-8">
                {loading && <p className="text-center text-gray-500">Loading projects...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                
                {!loading && !error && projects.length > 0 && (
                    <div className="my-8">
                        <h2 className="text-2xl font-bold mb-4">Firestore Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map(project => (
                                <div key={project.id} className="p-4 border rounded shadow">
                                    <h3 className="font-bold">{project.title}</h3>
                                    <p>{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {!loading && !error && projects.length === 0 && (
                    <p className="text-center text-gray-500 my-8">No projects found in database.</p>
                )}
            </div>

            <AchievementsMap />
            <AchievementsList />
        </>
    )
}

export default Projects