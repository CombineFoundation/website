export interface Module {
  id: number;
  title: string;
  bullets: string[];
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  bullets: string[];
  description: string;
  duration: string;
  level: string;
  lessons: number;
  price: number;
  originalPrice: number;
  image: string;
  imageBack: string;
  modules: Module[];
}

export const COURSES: Course[] = [
  {
    id: 1,
    title: "Quantitative Finance Course",
    slug: "quantitative-finance-course",
    bullets: [
      "Understand financial modeling and derivatives pricing.",
      "Build Python-driven risk models and backtest strategies.",
      "Learn the core math behind fixed income and options.",
      "Explore real-world case studies in quantitative trading.",
    ],
    description:
      "A practical introduction to quantitative finance, blending math, programming, and market intuition for future analysts and traders.",
    duration: "8 weeks",
    level: "Intermediate",
    lessons: 16,
    price: 1000,
    originalPrice: 15000,
    image: "/projects/projecthero.png",
    imageBack: "/home/impact/impact1.png",
    modules: [
      {
        id: 1,
        title: "Module 1",
        bullets: [
          "Understand financial modeling and derivatives pricing.",
          "Build Python-driven risk models and backtest strategies.",
          "Learn the core math behind fixed income and options.",
          "Explore real-world case studies in quantitative trading.",
        ],
      },
      {
        id: 2,
        title: "Module 2",
        bullets: [
          "Master time series analysis and forecasting techniques.",
          "Implement portfolio optimization algorithms.",
          "Understand risk management frameworks (VaR, CVaR).",
          "Backtest trading strategies with historical data.",
        ],
      },
      {
        id: 3,
        title: "Module 3",
        bullets: [
          "Explore machine learning applications in finance.",
          "Build automated trading systems with Python.",
          "Understand market microstructure and order flow.",
          "Develop real-time dashboards for market monitoring.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "UI/UX Design Course",
    slug: "ui-ux-design-course",
    bullets: [
      "Proficiency in Figma, Adobe XD, and Photoshop.",
      "Complete one end-to-end case study to show recruiters.",
      "Learn the ability to explain why a button is placed where it is.",
      "Design Thinking and product-led UX research.",
    ],
    description:
      "Learn the fundamentals of user-centered design, prototyping, and usability testing with portfolio-ready projects.",
    duration: "6 weeks",
    level: "Beginner",
    lessons: 12,
    price: 1000,
    originalPrice: 12000,
    image: "/home/blog/blog1.png",
    imageBack: "/home/blog/blog2.png",
    modules: [
      {
        id: 1,
        title: "Module 1",
        bullets: [
          "Proficiency in Figma, Adobe XD, and Photoshop.",
          "Complete one end-to-end case study to show recruiters.",
          "Learn the ability to explain why a button is placed where it is.",
          "Design Thinking and product-led UX research.",
        ],
      },
      {
        id: 2,
        title: "Module 2",
        bullets: [
          "Master typography, color theory, and layout principles.",
          "Build interactive prototypes with advanced Figma features.",
          "Conduct usability testing and iterate on designs.",
          "Understand accessibility standards and inclusive design.",
        ],
      },
      {
        id: 3,
        title: "Module 3",
        bullets: [
          "Create a professional portfolio showcasing your work.",
          "Learn design systems and component libraries.",
          "Explore motion design and micro-interactions.",
          "Prepare for UX designer interviews with mock presentations.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Data Science Course",
    slug: "data-science-course",
    bullets: [
      "Analyze data using Python, pandas, and NumPy.",
      "Build prediction models with scikit-learn.",
      "Visualize insights using charts and dashboards.",
      "Learn feature engineering and model evaluation.",
    ],
    description:
      "A hands-on data science course that teaches analytics, machine learning, and storytelling with real datasets.",
    duration: "7 weeks",
    level: "Beginner",
    lessons: 14,
    price: 1000,
    originalPrice: 14000,
    image: "/home/impact/impact4.png",
    imageBack: "/home/impact/impact5.png",
    modules: [
      {
        id: 1,
        title: "Module 1",
        bullets: [
          "Analyze data using Python, pandas, and NumPy.",
          "Build prediction models with scikit-learn.",
          "Visualize insights using charts and dashboards.",
          "Learn feature engineering and model evaluation.",
        ],
      },
      {
        id: 2,
        title: "Module 2",
        bullets: [
          "Master SQL for data extraction and manipulation.",
          "Understand supervised vs unsupervised learning.",
          "Build and tune machine learning pipelines.",
          "Learn cross-validation and hyperparameter optimization.",
        ],
      },
      {
        id: 3,
        title: "Module 3",
        bullets: [
          "Work with real-world datasets and messy data.",
          "Deploy ML models using Flask and cloud platforms.",
          "Explore deep learning fundamentals with TensorFlow.",
          "Complete a capstone project for your portfolio.",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Web Development Course",
    slug: "web-development-course",
    bullets: [
      "Build responsive websites with HTML, CSS, and JavaScript.",
      "Create interactive user experiences with React.",
      "Deploy apps using modern web tools.",
      "Learn front-end and simple back-end integration.",
    ],
    description:
      "Get practical web development experience building responsive apps and deploying them to the web.",
    duration: "6 weeks",
    level: "Beginner",
    lessons: 13,
    price: 1000,
    originalPrice: 13000,
    image: "/home/blog/blog3.png",
    imageBack: "/home/impact/impact6.png",
    modules: [
      {
        id: 1,
        title: "Module 1",
        bullets: [
          "Build responsive websites with HTML, CSS, and JavaScript.",
          "Create interactive user experiences with React.",
          "Deploy apps using modern web tools.",
          "Learn front-end and simple back-end integration.",
        ],
      },
      {
        id: 2,
        title: "Module 2",
        bullets: [
          "Master React hooks, state management, and routing.",
          "Build RESTful APIs with Node.js and Express.",
          "Work with databases using MongoDB and PostgreSQL.",
          "Implement authentication and authorization flows.",
        ],
      },
      {
        id: 3,
        title: "Module 3",
        bullets: [
          "Deploy full-stack applications to Vercel and AWS.",
          "Learn CI/CD pipelines and testing best practices.",
          "Optimize performance with lazy loading and caching.",
          "Build a complete capstone project from scratch.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Digital Marketing Course",
    slug: "digital-marketing-course",
    bullets: [
      "Master SEO, content strategy, and paid campaigns.",
      "Measure growth with analytics and conversion tracking.",
      "Create compelling social media campaigns.",
      "Understand customer journeys and brand messaging.",
    ],
    description:
      "Explore digital marketing channels, analytics, and campaign strategy for modern brands.",
    duration: "5 weeks",
    level: "Beginner",
    lessons: 11,
    price: 1000,
    originalPrice: 11000,
    image: "/donation/donation.png",
    imageBack: "/events/eventsperson.png",
    modules: [
      {
        id: 1,
        title: "Module 1",
        bullets: [
          "Master SEO, content strategy, and paid campaigns.",
          "Measure growth with analytics and conversion tracking.",
          "Create compelling social media campaigns.",
          "Understand customer journeys and brand messaging.",
        ],
      },
      {
        id: 2,
        title: "Module 2",
        bullets: [
          "Build and optimize Google Ads and Facebook campaigns.",
          "Master email marketing automation with Mailchimp.",
          "Learn A/B testing and conversion rate optimization.",
          "Analyze campaign performance with Google Analytics.",
        ],
      },
      {
        id: 3,
        title: "Module 3",
        bullets: [
          "Develop a complete digital marketing strategy.",
          "Create content calendars and editorial plans.",
          "Explore influencer marketing and affiliate programs.",
          "Present a campaign proposal for a real brand.",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Product Management Course",
    slug: "product-management-course",
    bullets: [
      "Learn product discovery, roadmaps, and stakeholder alignment.",
      "Build user stories and prioritize feature work.",
      "Understand metrics, KPIs, and product-market fit.",
      "Practice leadership skills for cross-functional teams.",
    ],
    description:
      "A practical product management course focused on building and launching customer-centered products.",
    duration: "6 weeks",
    level: "Beginner",
    lessons: 15,
    price: 1000,
    originalPrice: 15000,
    image: "/volunteer/vol1.png",
    imageBack: "/volunteer/vol2.png",
    modules: [
      {
        id: 1,
        title: "Module 1",
        bullets: [
          "Learn product discovery, roadmaps, and stakeholder alignment.",
          "Build user stories and prioritize feature work.",
          "Understand metrics, KPIs, and product-market fit.",
          "Practice leadership skills for cross-functional teams.",
        ],
      },
      {
        id: 2,
        title: "Module 2",
        bullets: [
          "Master Agile, Scrum, and sprint planning ceremonies.",
          "Write effective PRDs and technical specifications.",
          "Conduct user research and synthesize findings.",
          "Manage stakeholder expectations and communication.",
        ],
      },
      {
        id: 3,
        title: "Module 3",
        bullets: [
          "Define and track product success metrics (OKRs).",
          "Lead cross-functional teams through product launches.",
          "Learn data-driven decision making with A/B testing.",
          "Build a product strategy for a real-world scenario.",
        ],
      },
    ],
  },
];

export function getCourseBySlug(slug: string) {
  return COURSES.find((course) => course.slug === slug);
}

export function getAllCourseSlugs() {
  return COURSES.map((course) => ({ course: course.slug }));
}
