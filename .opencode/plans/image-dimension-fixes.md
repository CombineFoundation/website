# Image Dimension Fixes

## Overview
Align all image containers/components to match Figma dimensions.
Figma dimensions are the source of truth.

---

## Home Page

### Hero.tsx (`src/components/home/Hero.tsx`)
- **Issue:** Container `h-[520px]` — Figma is 1280×480 (2.67:1)
- **Fix:** Change container height to match 2.67:1 ratio, e.g., `aspect-[1280/480]`

### OurImpact.tsx (`src/components/home/OurImpact.tsx`)
- **Issue:** Image area fixed `h-[180px]` — Figma 336×176 (1.91:1)
- **Fix:** Adjust image container height or use `aspect-[336/176]`

### OurProject.tsx (`src/components/home/OurProject.tsx`)
- **Issue:** Container `h-[430px]` — Figma 1152×400 (2.88:1)
- **Fix:** Change to `aspect-[1152/400]`

### FounderInfo.tsx (`src/components/home/FounderInfo.tsx`)
- **Issue:** Container `w-[500px] h-[380px]` (1.32:1) vs Figma 616×508 (1.21:1)
- **Fix:** Adjust container dimensions to match 1.21:1 ratio

### BlogSection.tsx (`src/components/home/BlogSection.tsx`)
- **Issue:** Image `h-[320px]` landscape — Figma 372×368 (~1:1 square)
- **Fix:** Change image container to square aspect ratio

---

## About Page

### hero.tsx (`src/components/UI/hero.tsx`)
- **Issue:** `<Image width={800} height={400}>` (2:1) — Figma 524×208 (2.52:1)
- **Fix:** Update to `width={524} height={208}` or switch to `fill` with proper container aspect ratio

### OurStory.tsx (`src/components/about/OurStory.tsx`)
- **Issue:** Height `clamp(220px, 30vw, 360px)` — Figma 560×464 (1.21:1) near-square
- **Fix:** Adjust clamp formula or add aspect ratio to match

### AboutFounder.tsx (`src/components/about/AboutFounder.tsx`)
- **Status:** ALREADY MATCHES (1152×336 ≈ 3.43:1 in both)
- **No change needed**

### Combineachievements.tsx (`src/components/about/Combineachievements.tsx`)
- **Issue:** Height `clamp(120px, 14vw, 190px)` — Figma 212×200 (1.06:1) near-square
- **Fix:** Adjust clamp or use aspect ratio to match near-square

---

## Projects Page

### PageHeroMobile (`src/components/UI/Pageheromobile.tsx`)
- **Issue:** `h-[350px]` — Figma 1152×452 (2.55:1)
- **Fix:** Adjust height or add aspect ratio

### Achievementslist.tsx (`src/components/projects/Achievementslist .tsx`)
- **Gallery thumbnails:** `w-[250px] h-[250px]` — Figma 376×352 (~1.07:1)
  - Fix: Change to near-square dimensions
- **Before/After:** `aspect-video` (16:9) — Figma 568×496 (1.15:1)
  - Fix: Change to `aspect-[568/496]`
- **Partner logos:** `200×200` square — Figma 176×176 (1:1)
  - Fix: Both square — just resize to match. No aspect change needed.

---

## Events Page

### PageHeroMobile (`src/components/UI/Pageheromobile.tsx`) — hero image
- **Fix:** Same as other hero pages — adjust to 1152×452 (2.55:1)

### meetourspeakers.tsx (`src/components/events/meetourspeakers.tsx`)
- **Fix #1:** Replace `<img>` tag with next/`<Image>` component
- **Fix #2:** Container 144×128px vs Figma 196×188 — increase container size

---

## Publications Page

### PageHeroMobile — hero image
- **Fix:** Adjust to 1152×452 (same as other heroes)

### annual.tsx (`src/components/publications/annual.tsx`)
- **Fix #1:** Replace `<img>` tag with next/`<Image>`
- **Fix #2:** Container w 200→430px × h 220→300px vs Figma 336×176 — adjust ratio

### Mouseslider.tsx (`src/components/publications/Mouseslider.tsx`)
- **Issue:** `h-80 sm:h-96` — Figma 1152×452 (2.55:1)
- **Fix:** Adjust container aspect ratio

### Taxshariacertificates.tsx (`src/components/publications/Taxshariacertificates .tsx`)
- **Issue:** `aspect-square` (1:1) — Figma 373×289 (1.29:1) NOT square
- **Fix:** Change to `aspect-[373/289]`

---

## Volunteer Page

### hero.tsx (`src/components/UI/hero.tsx`) — hero images vol1, vol2
- **Issue:** `width={800} height={400}` (2:1) — Figma 528×213 (2.48:1)
- **Fix:** Update explicit dimensions to 528×213

### Howitworks.tsx (`src/components/volunteer/Howitworks.tsx`)
- **Issue:** `h-[450px] lg:h-[620px]` — Figma 471×528 (0.89:1) portrait
- **Fix:** Adjust container height to match portrait ratio

### Whyjoinus.tsx (`src/components/volunteer/Whyjoinus.tsx`)
- **Issue:** fill + object-cover vs Figma 363×273 (1.33:1)
- **Fix:** Adjust container aspect ratio

### ourVolunteer.tsx (`src/components/volunteer/ourVolunteer.tsx`)
- **Issue:** Container `w-48 h-60` (192×240, 0.8:1 portrait) — Figma 196×188 (~1:1)
- **Fix:** Change to near-square container dimensions

---

## Donations Page

### PageHeroMobile — hero image
- **Fix:** Adjust to 1152×528 (2.18:1)

### DonationForm.tsx (`src/components/donation/DonationForm.tsx`)
- **Fix #1:** Replace `<img>` tags with next/`<Image>`
- **Fix #2:** Adjust layered image positions/sizes to match Figma 276×301

### successfulventures.tsx (`src/components/donation/successfulventures.tsx`)
- **Issue:** `aspect-ratio: 4/3` (1.33:1) — Figma 568×470 (1.21:1)
- **Fix:** Change to `aspect-[568/470]`

---

## Files to replace `<img>` with next/`<Image>`

1. `src/components/publications/annual.tsx` — line 47
2. `src/components/donation/DonationForm.tsx` — lines 164, 176
3. `src/components/events/meetourspeakers.tsx` — line 40

---

## Files with no changes needed

- `src/components/about/AboutFounder.tsx` — proportion already matches
- Partner logos in `Achievementslist.tsx` — both 1:1 square, just resize number
