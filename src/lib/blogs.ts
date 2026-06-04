export interface CommentData {
  id: number;
  name: string;
  date: string;
  text: string;
  avatar: string;
}

export interface BlogPost {
  id: number;
  image: string;
  authorName: string;
  date: string;
  title: string;
  description: string;
  slug: string;
  content: string[];
  images: string[];
  likes: number;
  comments: number;
  commentList: CommentData[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    image: "/home/blog/blog1.png",
    authorName: "Person's Name",
    date: "Jan 20",
    title: "Name of the blog",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.Lorem ipsum dolor sit amet consectetur adipiscing elit Ut",
    slug: "blog-post-1",
    likes: 22,
    comments: 5,
    content: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.Lorem hendrerit urna. Pellentesque sit amet sapien.Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa miquam in hendrerit urna. Pellentesque sit amet sapien.",
    ],
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    ],
    commentList: [
      { id: 1, name: "Arsalan Sheikh", date: "10 feb 2022", text: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa miquam in hendrerit urna. Pellentesque sit amet sapien.", avatar: "/home/founder/person.png" },
      { id: 2, name: "Sarah Ahmed", date: "12 feb 2022", text: "Consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.", avatar: "/events/eventsperson.png" },
    ],
  },
  {
    id: 2,
    image: "/home/blog/blog2.png",
    authorName: "Person's Name",
    date: "Jan 20",
    title: "Name of the blog",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.Lorem ipsum dolor sit amet consectetur adipiscing elit Ut",
    slug: "blog-post-2",
    likes: 18,
    comments: 3,
    content: [
      "Consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.",
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Donec velit neque, auctor sit amet aliquam vel.",
      "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",
      "Nulla quis lorem ut libero malesuada feugiat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
    ],
    images: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    ],
    commentList: [
      { id: 1, name: "Usman Tariq", date: "5 mar 2022", text: "Praesent sapien massa convallis a pellentesque nec egestas non nisi. Curabitur arcu erat accumsan.", avatar: "/about/founder/founder.png" },
      { id: 2, name: "Ayesha Khan", date: "8 mar 2022", text: "Nulla quis lorem ut libero malesuada feugiat. Mauris blandit aliquet elit eget tincidunt nibh pulvinar a.", avatar: "/volunteer/vol1.png" },
    ],
  },
  {
    id: 3,
    image: "/home/blog/blog3.png",
    authorName: "Person's Name",
    date: "Jan 20",
    title: "Name of the blog",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.Lorem ipsum dolor sit amet consectetur adipiscing elit Ut",
    slug: "blog-post-3",
    likes: 31,
    comments: 8,
    content: [
      "Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.",
      "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales.",
      "Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      "Praesent lorem orci, mattis non efficitur id, Curabitur pellentesque nibh nibh. Lorem ipsum dolor sit amet consectetur.",
    ],
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    ],
    commentList: [
      { id: 1, name: "Ali Raza", date: "15 jan 2022", text: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna pellentesque.", avatar: "/volunteer/vol2.png" },
      { id: 2, name: "Fatima Noor", date: "18 jan 2022", text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec velit neque.", avatar: "/donation/df1.png" },
    ],
  },
  {
    id: 4,
    image: "/home/impact/impact1.png",
    authorName: "Person's Name",
    date: "Feb 10",
    title: "Community Impact Stories",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.",
    slug: "blog-post-4",
    likes: 15,
    comments: 4,
    content: [
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt.",
      "Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur.",
    ],
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    ],
    commentList: [
      { id: 1, name: "Hassan Ali", date: "12 feb 2022", text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.", avatar: "/projects/projecthero.png" },
      { id: 2, name: "Zara Malik", date: "14 feb 2022", text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur.", avatar: "/donation/donation.png" },
    ],
  },
  {
    id: 5,
    image: "/home/impact/impact4.png",
    authorName: "Person's Name",
    date: "Mar 5",
    title: "Education For All Initiative",
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
    slug: "blog-post-5",
    likes: 27,
    comments: 6,
    content: [
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.",
      "Similique sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
      "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est.",
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    ],
    images: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    ],
    commentList: [
      { id: 1, name: "Bilal Ahmed", date: "7 mar 2022", text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.", avatar: "/home/impact/impact5.png" },
      { id: 2, name: "Sana Tariq", date: "9 mar 2022", text: "Similique sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga.", avatar: "/home/impact/impact6.png" },
    ],
  },
  {
    id: 6,
    image: "/home/impact/impact6.png",
    authorName: "Person's Name",
    date: "Apr 18",
    title: "Volunteer Spotlight Series",
    description: "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque.",
    slug: "blog-post-6",
    likes: 19,
    comments: 7,
    content: [
      "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime.",
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
    ],
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    ],
    commentList: [
      { id: 1, name: "Omar Farooq", date: "20 apr 2022", text: "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis.", avatar: "/home/blog/blog1.png" },
      { id: 2, name: "Hira Batool", date: "22 apr 2022", text: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.", avatar: "/home/blog/blog2.png" },
    ],
  },
  {
    id: 7,
    image: "/projects/projecthero.png",
    authorName: "Person's Name",
    date: "May 2",
    title: "Project Milestone Achievements",
    description: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis.",
    slug: "blog-post-7",
    likes: 34,
    comments: 9,
    content: [
      "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde omnis iste natus error.",
      "Nemo enim ipsam voluptatem quia voluptas sit Aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt ut labore.",
      "Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur quis autem vel eum.",
    ],
    images: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    ],
    commentList: [
      { id: 1, name: "Tariq Jamil", date: "4 may 2022", text: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id.", avatar: "/home/impact/impact1.png" },
      { id: 2, name: "Amina Khan", date: "6 may 2022", text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur.", avatar: "/home/impact/impact4.png" },
      { id: 3, name: "Rayan Shah", date: "8 may 2022", text: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit.", avatar: "/home/impact/impact5.png" },
    ],
  },
  {
    id: 8,
    image: "/home/impact/impact5.png",
    authorName: "Person's Name",
    date: "Jun 15",
    title: "Digital Transformation Journey",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.",
    slug: "blog-post-8",
    likes: 25,
    comments: 5,
    content: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
      "Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
      "Nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed perspiciatis unde omnis.",
      "Iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.",
    ],
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    ],
    commentList: [
      { id: 1, name: "Danish Ali", date: "17 jun 2022", text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.", avatar: "/projects/projecthero.png" },
      { id: 2, name: "Mahnoor Sheikh", date: "19 jun 2022", text: "Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.", avatar: "/home/founder/person.png" },
    ],
  },
];

export function getBlogBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllBlogSlugs() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}
