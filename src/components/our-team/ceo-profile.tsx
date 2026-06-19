

export default function CeoProfile() {
  return (
    <section className="w-full px-6 py-10 lg:px-12 mx-auto">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black border-b border-black pb-4 mb-10">
        Our CEO
      </h2>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-start">
        
        <div className="w-full md:w-[23rem] lg:w-[32rem] xl:w-[38rem] flex-shrink-0 order-2 md:order-1">
          <img
            src="/about/founder/founder.png"
            alt="Mr. Ashfaq Nathani"
            className="w-full aspect-[4/3] md:aspect-square object-cover rounded-[2rem] shadow-sm"
          />
        </div>

        <div className="flex-1 order-1 md:order-2 mt-3">
          <h3 className="text-xl lg:text-3xl font-bold text-black uppercase tracking-wide mb-1">
            Mr. Ashfaq Nathani
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-5">
            Chief Executive Officer & Board of Director
          </p>

          <p className="text-base sm:text-sm lg:text-lg xl:text-xl text-gray-800 leading-relaxed mb-5">
            Ashfaq Nathani serves as the Chief Executive Officer and board member at Combine Foundation, responsible for managing the operations and youth development programs. He is deeply committed to developing young people into leaders and innovators of the future through effective leadership training programs. He guides the organization&apos;s strategy, operational plans, and youth development initiatives, focusing on empowering youth through leadership development, technology training, innovation, and applied learning opportunities.
          </p>

          <p className="text-base sm:text-sm lg:text-lg xl:text-xl text-gray-800 leading-relaxed">
            He is highly concerned about developing young people into leaders and innovators of the future through effective leadership training programs. Sustainable development has been the prime focus as he believes that quality education, healthcare, leadership, and accountability are the keys to the development of stronger communities and a positive impact in Pakistan. Under his leadership, Combine Foundation seeks to inspire and prepare the next generation of leaders, innovators, and problem solvers to compete globally.
          </p>
        </div>
      </div>
    </section>
  );
}
