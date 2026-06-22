/* Madarek redesign — data
   --------------------------------------------------------------
   Shaped for the prototype. Image paths point to redesign-assets/
   because this prototype is loaded as a static HTML file, not
   from the live Vite app. */

window.MadarekData = {
  schools: [
    {
      slug: "al-maaref-american-school",
      name: "Al Maaref American School",
      short: "Al Maaref",
      location: "Dubai, UAE",
      curriculum: "International Baccalaureate",
      ages: "3–18 years old",
      languages: "English · Arabic",
      capacity: "1,200 students",
      image: "redesign-assets/2.webp",
      gallery: ["redesign-assets/2.webp", "redesign-assets/3.webp", "redesign-assets/4.webp", "redesign-assets/5.webp"],
      address: "Al Barsha South, Dubai, United Arab Emirates",
      email: "admissions@mas-edu.ae",
      website: "https://mas-edu.ae/",
      description:
        "Providing students with a comprehensive educational experience built upon academic excellence and holistic development.",
      overview:
        "Al Maaref American School is an IB World School in the heart of Dubai. The campus brings together students from many nationalities inside a curriculum that values Arabic, Islamic studies, and global readiness equally.",
      highlights: [
        "IB World School with full PYP, MYP, and DP programmes",
        "State-of-the-art science labs, maker spaces, sports complexes",
        "Strong Arabic language and Islamic studies tradition",
        "University counselling from Grade 9",
      ],
    },
    {
      slug: "mgis-qortuba-campus",
      name: "MGIS — Qortuba Campus",
      short: "MGIS Qortuba",
      location: "Riyadh, KSA",
      curriculum: "American (IB-PYP Framework)",
      ages: "KG through Grade 8 (~3–15)",
      languages: "English · Arabic",
      capacity: "600 students",
      image: "redesign-assets/6.webp",
      gallery: ["redesign-assets/6.webp", "redesign-assets/3.webp", "redesign-assets/4.webp"],
      address: "Qortuba District, Riyadh, Kingdom of Saudi Arabia",
      email: "info@mgis-sa.com",
      website: "https://mgis-sa.com/",
      description:
        "Delivering internationally recognized education within a dynamic learning environment that prepares students for future success.",
      overview:
        "MGIS Qortuba combines the American academic structure with the IB-PYP's inquiry-led pedagogy, in classrooms designed for small group teaching and rigorous individual attention.",
      highlights: [
        "American curriculum structured around IB-PYP framework",
        "Average class size of 18 students, maximum 24",
        "Comprehensive facilities: science labs, art, music, theatre",
        "Clubs across reading, chess, music, recycling, art",
        "Sports: soccer, basketball, gymnastics, aerobics",
        "Strong Arabic instruction and Manners programme",
      ],
    },
    {
      slug: "mgis-digital-city-campus",
      name: "MGIS — Digital City Campus",
      short: "MGIS Digital City",
      location: "Riyadh, KSA",
      curriculum: "American (US Common Core)",
      ages: "KG through Grade 6 (~3–12)",
      languages: "English · Arabic · French",
      capacity: "500 students",
      image: "redesign-assets/1.webp",
      gallery: ["redesign-assets/1.webp", "redesign-assets/7.webp", "redesign-assets/3.webp"],
      address: "Digital City, Riyadh, Kingdom of Saudi Arabia",
      email: "info@mgis-sa.com",
      website: "https://mgis-sa.com/",
      description:
        "Providing innovative learning experiences that inspire curiosity, creativity, and lifelong achievement.",
      overview:
        "MGIS Digital City is the network's youngest campus — trilingual, technology-rich, and designed around family partnerships and a love-of-learning approach.",
      highlights: [
        "American curriculum based on US Common Core Standards",
        "Advanced technology integration across all classrooms",
        "Trilingual: English, Arabic, French",
        "Co-educational with strong parent engagement",
        "Family-oriented culture",
        "Operating hours: Sunday–Thursday, 7:30 AM–2:00 PM",
      ],
    },
  ],
};
