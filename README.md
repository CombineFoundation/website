# Combine Foundation — Official Website

> Official website of Combine Foundation — built with Next.js and Firebase by the Spring Internship 2026 team.

---

## About

Combine Foundation is a registered non-profit organization focused on measurable impact across **Education, Healthcare, Entrepreneurship, and Community Welfare**.

This repository contains the source code for the official Combine Foundation website, developed as part of the **Spring Internship 2026 — Website Development Program**.

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
├── pages/
│   ├── index.js          # Home
│   ├── about.js          # About Us
│   ├── programs.js       # Programs & Services
│   ├── events.js         # Events
│   ├── team.js           # Our Team
│   ├── projects.js       # Projects
│   ├── publications.js   # Publications
│   ├── volunteer.js      # Volunteer Program
│   └── donations.js      # Donations
├── components/
├── firebase/
│   ├── config.js
│   └── rules/
├── public/
└── styles/
```

---

## Local Setup

**Prerequisites:** Node.js, VS Code, Git access

```bash
# 1. Clone the repository
git clone https://github.com/combine-foundation/website.git

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

## Team Roles

| Role | Responsibility |
|---|---|
| Technical Lead | Code review, PR approval, final merge |
| Frontend Developer | UI components, layouts, Firebase Auth integration |
| Firebase Developer | Firestore schema, security rules, storage |
| UI/UX Designer | Screen designs, design system, developer assets |
| Content Manager | Website copy, SEO, tone consistency |

---

## Internship Program

- **Duration:** 3 months (April 15 – July 15, 2026)
- **Mode:** Remote / Hybrid
- **Managed by:** Shama Naz
- **Organization:** Combine Foundation, Karachi, Pakistan

---

## Contact

**Combine Foundation**
B-18, Block 16, Gulshan-e-Iqbal, Karachi, Pakistan
📧 combinefoundation@combinegrp.com
🌐 www.combinegrp.com

---

© 2026 Combine Foundation. All Rights Reserved.
