"use client";

import { useState } from "react";
import PageHeroMobile from "@/components/UI/Pageheromobile";
import OurIdeaAboutEvents from "@/components/events/ourideas";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import EventsAcheivementList from "@/components/events/EventsAcheivementList";

export default function Page() {
    const [activeId, setActiveId] = useState<string | null>(null);

    const handleCardToggle = (id: string) => {
        setActiveId((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <PageHeroMobile title="Events" imageSrc="/home/blog/blog2.png" />
            <OurIdeaAboutEvents />
            <UpcomingEvents />
            <EventsAcheivementList activeId={activeId} onToggle={handleCardToggle} />
        </>
    );
}