# Combine Foundation Official Website

> Official website of Combine Foundation built with Next.js and Firebase by team.

---

## About

Combine Foundation is a registered non-profit organization focused on measurable impact across **Education, Healthcare, Entrepreneurship, and Community Welfare**.

This repository contains the source code for the official Combine Foundation website, developed as part of the **Spring Internship 2026 Website Development Program**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js |
| Authentication | Firebase Auth |
| Database | Firestore |
| Storage | Firebase Storage |
| Version Control | GitHub |

---

## Project Structure

```
/
├── app/
│   ├── page.tsx          # Home
│   ├── about.tsx          # About Us
│   ├── programs.tsx       # Programs & Services
│   ├── events.tsx         # Events
│   ├── team.tsx           # Our Team
│   ├── projects.tsx       # Projects
│   ├── publications.tsx   # Publications
│   ├── volunteer.tsx      # Volunteer Program
│   └── donations.tsx      # Donations
|   └── courses.tsx        # Courses
├── components/
├── firebase/
│   ├── config.ts
│   └── rules/
├── public/
└── styles/
```

---
## Local Setup

**Prerequisites:** Node.js, VS Code, Git access

```bash
# 1. Clone the repository
git clone [https://github.com/CombineFoundation/website.git](https://github.com/CombineFoundation/website.git)

# 2. Navigate into the project
cd website

# 3. Install dependencies
npm install

# 4. Add your environment variables
cp .env.example .env.local
# Fill in your Firebase config values

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the root with the following:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

> Never commit `.env.local` to the repository.

---

## Git Workflow

```
main        ← production (protected, no direct push)
  └── dev   ← integration branch
        └── feature/[name]   ← your working branch
```

**Branch naming examples:**
- `feature/home-layout`
- `feature/firebase-auth`
- `feature/firestore-schema`

**Commit format:**
```
feat: add contact form
fix: resolve Firestore permission error
docs: update setup instructions
chore: update Firebase SDK version
```

All PRs must be reviewed and approved by the **Technical Lead** before merging into `dev`.

---

## Contact

**Combine Foundation**
B-18, Block 16, Gulshan-e-Iqbal, Karachi, Pakistan
📧 combinefoundation@combinegrp.com
🌐 www.combinegrp.com

---

© 2026 Combine Foundation. All Rights Reserved.
