"use client";

import dynamic from 'next/dynamic'
import PageHeroMobile from '@/components/UI/Pageheromobile'
import AchievementsList from '@/components/projects/Achievementslist '

const AchievementsMap = dynamic(() => import('@/components/projects/map'), { ssr: false })
const Projects = () => {
    return (
        <>
            <PageHeroMobile title="Projects" imageSrc="/projects/projecthero.png" styles="my-4 " />
            <AchievementsMap />
            <AchievementsList />
        </>
    )
}

export default Projects