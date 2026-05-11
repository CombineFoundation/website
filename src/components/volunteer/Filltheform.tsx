"use client";

const STEPS = [
  {
    title: "Fill the Form",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,",
    number: 1,
  },
  {
    title: "Fill the Form",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,",
    number: 2,
  },
  {
    title: "Fill the Form",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,",
    number: 3,
  },
];

function DocIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="1" width="12" height="16" rx="2" stroke="white" strokeWidth="1.6" />
      <line x1="5" y1="6" x2="11" y2="6" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="5" y1="9" x2="11" y2="9" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="5" y1="12" x2="8.5" y2="12" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="7.5" y1="1" x2="7.5" y2="4.5" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="5" y1="3" x2="11" y2="3" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export default function ProcessOfJoining() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#F7FBFF]">
      <div className="px-6 md:px-12 max-w-full  mx-auto">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">
          Process Of Joining
        </h2>

        {/* Full-width divider below title */}
        <div className="w-full h-px bg-gray-200 mb-10" />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="
                group relative flex flex-col bg-white rounded-2xl p-6 gap-4
                shadow-sm shadow-black/[0.06] border border-gray-100
                cursor-pointer overflow-hidden
                transition-all duration-300 ease-out
                hover:-translate-y-1.5
                hover:shadow-lg hover:shadow-[#0f2d5c]/10
                hover:border-[#0f2d5c]/20
              "
            >
              {/* Icon + heading row */}
              <div className="flex items-center gap-4">
                <div
                  className="
                    w-11 h-11 rounded-xl bg-[#0f2d5c] flex items-center justify-center shrink-0
                    transition-all duration-300
                    group-hover:scale-110 group-hover:rounded-2xl
                  "
                >
                  <DocIcon />
                </div>
                <h3
                  className="
                    text-lg font-bold text-gray-900 leading-snug
                    transition-colors duration-300
                    group-hover:text-[#0f2d5c]
                  "
                >
                  {step.title}
                </h3>
              </div>

              {/* Divider */}
              <div
                className="
                  h-px bg-gray-100
                  transition-colors duration-300
                  group-hover:bg-[#0f2d5c]/15
                "
              />

              {/* Description */}
              <p
                className="
                  text-sm text-gray-500 leading-relaxed flex-1
                  transition-colors duration-300
                  group-hover:text-gray-600
                "
              >
                {step.desc}
              </p>

              {/* Step number — bottom right watermark */}
              <span
                className="
                  self-end text-3xl font-black tabular-nums leading-none
                  transition-all duration-300
                  group-hover:scale-110 group-hover:origin-bottom-right
                "
                style={{ color: "#e5e7eb" }}
              >
                {step.number}
              </span>

              {/* Bottom accent bar — slides in from left on hover */}
              <div
                className="
                  absolute bottom-0 left-0 right-0 h-[3px]
                  bg-[#0f2d5c] rounded-b-2xl
                  scale-x-0 group-hover:scale-x-100
                  transition-transform duration-300 ease-out origin-left
                "
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}