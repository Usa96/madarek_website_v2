/* Madarek redesign — data
   --------------------------------------------------------------
   Image paths are absolute (`/redesign-assets/...`) so they
   resolve against the Vite public/ root from any route depth. */

export interface School {
  slug: string;
  name: string;
  short: string;
  location: string;
  curriculum: string;
  grades?: string;
  ages: string;
  languages: string;
  capacity: string;
  image: string;
  gallery: string[];
  address: string;
  email: string;
  website: string;
  description: string;
  overview: string;
  highlights: string[];
}

/* ── Media / News ─────────────────────────────────────────────
   Single source of truth for every announcement shown on the site
   (the Media page and, later, the homepage media section both read
   from here — never redefine this list anywhere else).

   Ordering is driven entirely by `date` (ISO `YYYY-MM-DD`): the site
   always renders newest-first via `mediaByNewest` below, so you can
   add a new item ANYWHERE in this array and older items are pushed
   back automatically. To publish, just add an object; to change the
   order, change its `date`.

   Images are pending — leave `image` empty ('') and the card shows a
   branded placeholder until the real photo is dropped in. */
export interface MediaItem {
  id: string;        // stable, unique, kebab-case
  date: string;      // ISO 'YYYY-MM-DD' — drives newest-first ordering
  title: string;
  excerpt: string;
  category: string;  // e.g. Announcements, Achievements, Partnerships, Events, Admissions, Community
  source: string;    // who published it — 'MADAREK' or a school name
  image?: string;    // optional; '' → branded placeholder (pending photo)
  href?: string;     // optional external link (leave undefined for none)
}

export const media: MediaItem[] = [
  { id: 'placeholder-01', date: '2026-07-20', category: 'Announcements', source: 'MADAREK',                       title: 'Welcoming students back for the new academic year',            excerpt: 'A message to our community as classrooms across the network open their doors for another year of learning.', image: '' },
  { id: 'placeholder-02', date: '2026-06-12', category: 'Admissions',    source: 'MADAREK',                       title: 'Registration is now open across our campuses',                  excerpt: 'Families can now register their interest for the upcoming intake at our schools in the UAE and Saudi Arabia.', image: '' },
  { id: 'placeholder-03', date: '2026-05-03', category: 'Achievements',  source: 'Al Maaref American School',     title: 'Celebrating our students’ latest achievements',                 excerpt: 'Highlights from a season of academic, sporting, and creative accomplishments across our student body.', image: '' },
  { id: 'placeholder-04', date: '2026-04-18', category: 'Partnerships',  source: 'MADAREK',                       title: 'A new partnership to expand learning opportunities',            excerpt: 'We are pleased to announce a collaboration that broadens the experiences available to our students.', image: '' },
  { id: 'placeholder-05', date: '2026-03-09', category: 'Events',        source: 'MGIS — Qortuba Campus',         title: 'Inside our annual community and family day',                    excerpt: 'A look back at a day that brought together students, parents, and educators across the campus.', image: '' },
  { id: 'placeholder-06', date: '2026-02-14', category: 'Community',     source: 'MADAREK',                       title: 'Giving back: our students in the community',                    excerpt: 'How learning beyond the classroom is helping our students contribute to the communities we serve.', image: '' },
  { id: 'placeholder-07', date: '2026-01-22', category: 'Achievements',  source: 'MGIS — Digital City Campus',    title: 'Recognising excellence in the classroom',                       excerpt: 'Spotlighting the educators and learners setting the standard across our youngest campus.', image: '' },
  { id: 'placeholder-08', date: '2025-12-05', category: 'Events',        source: 'MADAREK',                       title: 'Highlights from our end-of-term celebrations',                  excerpt: 'Scenes from the events that closed out the term across the MADAREK network.', image: '' },
  { id: 'placeholder-09', date: '2025-11-11', category: 'Announcements', source: 'MADAREK',                       title: 'Growing our network across the Gulf',                           excerpt: 'An update on our continued expansion and what it means for students and families in the region.', image: '' },
  { id: 'placeholder-10', date: '2025-10-02', category: 'Partnerships',  source: 'Al Maaref American School',     title: 'Bringing global best practice to our classrooms',               excerpt: 'New collaborations that connect our students to internationally recognised programmes and expertise.', image: '' },
];

/* Derived, always newest-first. Consumers MUST read from this (not the
   raw `media` array) so ordering is identical everywhere. */
export const mediaByNewest: MediaItem[] = [...media].sort(
  (a, b) => b.date.localeCompare(a.date),
);

/* ISO 'YYYY-MM-DD' → display date. `short` gives '22 Jul 2026', else
   '22 July 2026'. Parsed as local parts to avoid the UTC day-shift
   `new Date('2026-07-22')` can introduce. */
export function formatMediaDate(iso: string, opts?: { short?: boolean }): string {
  const [y, m, day] = iso.split('-').map(Number);
  return new Date(y, m - 1, day).toLocaleDateString('en-GB', {
    day: 'numeric', month: opts?.short ? 'short' : 'long', year: 'numeric',
  });
}

export const schools: School[] = [
  {
    slug: 'al-maaref-american-school',
    name: 'Al Maaref American School',
    short: 'Al Maaref American School',
    location: 'Dubai, UAE',
    curriculum: 'American',
    grades: 'KG–Grade 12',
    ages: '3–18',
    languages: 'English · Arabic',
    capacity: '1,200 students',
    image: '/redesign-assets/Maaref/11.webp',
    gallery: ['/redesign-assets/Maaref/1.webp', '/redesign-assets/Maaref/2.webp', '/redesign-assets/Maaref/3.webp', '/redesign-assets/Maaref/4.webp'],
    address: 'Al Barsha South, Dubai, United Arab Emirates',
    email: 'admissions@mas-edu.ae',
    website: 'https://mas-edu.ae/',
    description:
      'An American curriculum school in Dubai, established in 1987 — educating students from Early Years to High School through to the US High School Diploma.',
    overview:
      "Established in 1987, Al Maaref American School is one of Dubai's longest-standing American schools. It delivers a US-standards curriculum from Early Years to High School, with an approach built around independent thinking, creativity, and real-world problem-solving — inside a kind, inclusive community that brings together students of many nationalities.",
    highlights: [
      "Established in 1987 — one of Dubai's longest-standing American schools",
      'American curriculum aligned to US standards, leading to the US High School Diploma',
      'Accredited by NEASC and Cognia, with College Board programmes',
      'Learning built on independent thinking, creativity, and real-world problem-solving',
      'Modern facilities — science labs, libraries, arts studios, and dedicated play areas',
    ],
  },
  {
    slug: 'mgis-qortuba-campus',
    name: 'MGIS — Qortuba Campus',
    short: 'MGIS Qortuba',
    location: 'Riyadh, KSA',
    curriculum: 'American (IB-PYP)',
    grades: 'KG–Grade 8',
    ages: '3–15',
    languages: 'English · Arabic',
    capacity: '600 students',
    image: '/redesign-assets/MGIS_Qortuba/01.webp',
    gallery: ['/redesign-assets/MGIS_Qortuba/3.webp', '/redesign-assets/MGIS_Qortuba/4.webp', '/redesign-assets/MGIS_Qortuba/5.webp', '/redesign-assets/MGIS_Qortuba/6.webp'],
    address: 'Qortuba District, Riyadh, Kingdom of Saudi Arabia',
    email: 'info@mgis-sa.com',
    website: 'https://mgis-sa.com/',
    description:
      'Delivering internationally recognized education within a dynamic learning environment that prepares students for future success.',
    overview:
      "MGIS Qortuba combines the American academic structure with the IB-PYP's inquiry-led pedagogy, in classrooms designed for small group teaching and rigorous individual attention.",
    highlights: [
      'American curriculum structured around IB-PYP framework',
      'Average class size of 18 students, maximum 24',
      'Comprehensive facilities: science labs, art, music, theatre',
      'Clubs across reading, chess, music, recycling, art',
      'Sports: soccer, basketball, gymnastics, aerobics',
      'Strong Arabic instruction and Manners programme',
    ],
  },
  {
    slug: 'mgis-digital-city-campus',
    name: 'MGIS — Digital City Campus',
    short: 'MGIS Digital City',
    location: 'Riyadh, KSA',
    curriculum: 'American (US Common Core)',
    grades: 'KG–Grade 6',
    ages: '3–12',
    languages: 'English · Arabic · French',
    capacity: '500 students',
    image: '/redesign-assets/MGIS_DC/1.webp',
    gallery: ['/redesign-assets/MGIS_DC/2.webp', '/redesign-assets/MGIS_DC/3.webp', '/redesign-assets/MGIS_DC/5.webp', '/redesign-assets/MGIS_DC/6.webp'],
    address: 'Digital City, Riyadh, Kingdom of Saudi Arabia',
    email: 'info@mgis-sa.com',
    website: 'https://mgis-sa.com/',
    description:
      'Providing innovative learning experiences that inspire curiosity, creativity, and lifelong achievement.',
    overview:
      "MGIS Digital City is the network's youngest campus — trilingual, technology-rich, and designed around family partnerships and a love-of-learning approach.",
    highlights: [
      'American curriculum based on US Common Core Standards',
      'Advanced technology integration across all classrooms',
      'Trilingual: English, Arabic, French',
      'Co-educational with strong parent engagement',
      'Family-oriented culture',
      'Operating hours: Sunday–Thursday, 7:30 AM–2:00 PM',
    ],
  },
];
