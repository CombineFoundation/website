

export default function CeoProfile() {
  return (
    <section className="w-full px-6 py-10 lg:px-12 mx-auto">
      {/* Section Header */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black border-b border-black pb-4 mb-10">
        CEO Profile
      </h2>

      {/* Profile Container: Vertically centered on desktop */}
      <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-start">
        
        {/* Left Column: Profile Image (appears first on desktop, bottom on mobile) */}
        <div className="w-full md:w-[23rem] lg:w-[32rem] xl:w-[38rem] flex-shrink-0 order-2 md:order-1">
          <img
            src="/about/founder/founder.png"
            alt="Muhammad Ashfaq"
            className="w-full aspect-[4/3] md:aspect-square object-cover rounded-[2rem] shadow-sm"
          />
        </div>

        {/* Right Column: Biography Content (appears second on desktop, top on mobile) */}
        <div className="flex-1 order-1 md:order-2 mt-3">
          <h3 className="text-xl lg:text-3xl font-bold text-black uppercase tracking-wide mb-5">
            Muhammad Ashfaq
          </h3>

          <p className=" text-base sm:text-sm lg:text-lg xl:text-xl text-gray-800 leading-relaxed mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
            vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor
            ornare leo, non suscipit magna interdum eu.
          </p>

          <p className="text-base sm:text-sm lg:text-lg xl:text-xl text-gray-800 leading-relaxed">
            Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
            amet. Pellentesque commodo lacus at sodales sodales. Quisque
            sagittis orci ut diam condimentum, vel euismod erat placerat. In
            iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem
          </p>
        </div>
      </div>
    </section>
  );
}
