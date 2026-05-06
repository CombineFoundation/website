import PageHeroMobile from '@/components/UI/Pageheromobile'
import AchievementsMap from '@/components/projects/map'
import AchievementsList from '@/components/projects/Achievementslist '
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