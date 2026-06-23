"use client";

const STEPS = [
  {
    title: "Fill Out the Application Form",
    desc: "Search for the \"Combine Foundation Volunteer Program\" and complete the volunteer application form. Enter your basic details and select the skills you want to improve or work on through real-world projects. Choose your area of interest, preferred volunteering role, available days, and how many hours you can dedicate to volunteer work each week.",
    number: 1,
  },
  {
    title: "Application Review & Portal Access",
    desc: "After submitting your form, our team will send you a confirmation email that your application has been received. If you are selected, you will receive access through email to Pakistan's first volunteer portal, where you can access different paid courses for free, receive assigned tasks and volunteer opportunities, and manage your volunteer activities. You will also be able to download your official volunteer ID card directly from the portal.",
    number: 2,
  },
  {
    title: "Start Learning, Working & Growing",
    desc: "Once you get portal access, you can start participating in real-world volunteer projects, complete assigned tasks, and gain practical experience in different fields. You will also get free access to professional courses that help you build valuable career skills, improve your CV or resume, and prepare for future opportunities. Connect with industry professionals, receive mentorship, and grow in a safe, supportive environment.",
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
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
      <div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-secondary-500 tracking-tight mb-4">
          Steps to Become a Volunteer
        </h2>

        {/* Full-width divider below title */}
        <div className="w-full h-1 bg-gray-300 mb-10" />

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
                hover:shadow-lg hover:shadow-secondary-700/10
                hover:border-secondary-700/20
              "
            >
              {/* Icon + heading row */}
              <div className="flex items-center gap-4">
                <div
                  className="
                    w-11 h-11 rounded-xl bg-primary-500 flex items-center justify-center shrink-0
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
                    group-hover:text-secondary-700
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
                  group-hover:bg-secondary-700/15
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
                  bg-secondary-500 rounded-b-2xl
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
