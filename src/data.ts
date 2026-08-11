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
  students: string;   // enrolment for open schools; planned capacity for upcoming
  languages: string;
  image: string;
  gallery: string[];
  address: string;
  email: string;
  website: string;
  description: string;
  overview: string;
  highlights: string[];
  status?: 'open' | 'upcoming';  // omit/'open' = operating; 'upcoming' = in development
  /* Arabic parallel fields — populated for the `ar` locale and picked at
     render by the localize helpers. Missing fields fall back to English. */
  nameAr?: string;
  shortAr?: string;
  locationAr?: string;
  curriculumAr?: string;
  gradesAr?: string;
  languagesAr?: string;
  addressAr?: string;
  descriptionAr?: string;
  overviewAr?: string;
  highlightsAr?: string[];
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
  id: string;        // stable, unique, kebab-case — also the /media/:id slug
  date: string;      // ISO 'YYYY-MM-DD' — drives newest-first ordering
  title: string;
  excerpt: string;
  category: string;  // e.g. Press Release, Announcements, Achievements, Partnerships, Events
  source: string;    // who published it — 'MADAREK' or a school name
  image?: string;    // optional; '' → branded placeholder (pending photo)
  href?: string;     // optional external link (leave undefined for none)
  /* Full-article fields. When `body` is present the card links to an
     internal article page at /media/:id instead of an external href.
     The `*Ar` fields power a per-article English/العربية toggle. */
  body?: string;     // article HTML (English)
  titleAr?: string;
  excerptAr?: string;
  bodyAr?: string;   // article HTML (Arabic)
  sourceAr?: string; // publisher name in Arabic
  video?: string;    // optional external video / reel link (e.g. Instagram)
}

/* Article bodies — the exact press-release HTML, kept out of the array
   below for readability. "SANAM Group's education platform" is Madarek;
   it is named explicitly where the platform is referred to. */
const BODY_SHUROOQ_EN = `
<p><em>For immediate release — Sharjah, 24 May 2026</em></p>
<p>The Sharjah Investment and Development Authority (Shurooq) has signed an agreement with MADAREK, SANAM Group's education platform, to develop a new K-12 school in Sharjah Sustainable City.</p>
<p>The project, with an investment value expected to reach up to USD 50 million over the coming years, will be developed on a 29,275-square-metre plot owned by Shurooq in Sharjah Sustainable City, located in Um Fanain / Al Ruqa Al Hamra. The school will follow the American curriculum and serve around 2,435 students from kindergarten to Grade 12 under a 35-year agreement.</p>
<p>The signing took place at Al Bait Al Westi and was signed by Yousif Al Mutawa, Chief Real Estate Officer of Shurooq, and Dr. Sulaiman Tareq Al Abduljader, Vice Chairman and CEO of SANAM Group Holding Company.</p>
<h3>Strengthening education infrastructure in Sharjah's growing communities</h3>
<p>The new school will add key education infrastructure to Sharjah Sustainable City, one of the emirate's leading residential communities designed around sustainability, family living and integrated services.</p>
<p>The project supports Shurooq's efforts to activate strategic land assets through long-term partnerships that respond to the needs of Sharjah's growing communities. By bringing a full K-12 school into Sharjah Sustainable City, the development will provide families in the area and surrounding neighbourhoods with access to quality education close to home.</p>
<h3>Yousif Al Mutawa: "A project that supports families and creates long-term value"</h3>
<p>Yousif Al Mutawa said: "This agreement reflects Shurooq's commitment to developing projects that respond to the practical needs of Sharjah's communities while creating long-term value from strategic land assets. Education is one of the most important components of a complete residential community, and this school will support families, enhance quality of life and contribute to the development of a more connected and liveable environment in Sharjah Sustainable City."</p>
<p>He added: "Our partnership with MADAREK reflects the importance of working with specialised private sector partners that bring long-term vision and operational expertise. The project also reinforces Sharjah's ability to attract serious investment into sectors that support human development, community growth and sustainable urban planning."</p>
<h3>A modern campus for future-ready learning</h3>
<p>The school will be designed as a modern, student-centred learning environment that integrates advanced technologies, sustainability, wellbeing and collaborative learning across all academic stages.</p>
<p>The campus will include modern classrooms, science laboratories, information technology facilities, robotics, engineering and mathematics labs, maker and innovation spaces, and three libraries serving kindergarten, primary and upper school stages.</p>
<p>It will also feature open learning hubs, arts studios, a black box theatre and a 500-seat multi-purpose hall, supporting a learning environment that brings together academic learning, creativity, culture and collaboration.</p>
<h3>Facilities designed around wellbeing, safety and student experience</h3>
<p>The kindergarten section will be designed as an independent area with dedicated privacy and safety measures, including a separate entrance, reception and security procedures, as well as direct access to secure outdoor play areas.</p>
<p>The school will also include a learning support centre with therapy and sensory integration rooms, counselling offices, and three separate clinics for boys, girls and isolation cases.</p>
<p>Sports and recreation facilities will include an indoor sports hall, activity studio, football pitch, outdoor courts, a main swimming pool, a learner pool, rooftop recreational areas and a healthy cafeteria. The campus will also include green spaces, a botanical garden, internal courtyards, informal seating and play areas, and shaded pedestrian walkways.</p>
<p>The design will support smooth movement and safety across the campus through separate access routes for kindergarten, parents and buses, on-site bus parking, staff and parent parking, electric vehicle parking, bicycle facilities, monitored entry gates and safe pedestrian pathways.</p>
<h3>SANAM Group Holding Company: Supporting Sharjah's education ecosystem</h3>
<p>Dr. Sulaiman Tareq Al Abduljader said: "Our strategic partnership with Shurooq marks a pivotal step in advancing SANAM's long-term vision for sustainable education investments that meet the aspirations of students across the GCC. Sharjah's position as a leading hub for sustainable urban and educational development makes it an ideal destination for projects of this nature. Together, we look forward to developing an integrated educational environment that enables academic excellence and is defined by innovation, sustainability, and community engagement, while delivering sustainable value for future generations."</p>
<p>The new sustainable school project represents a significant milestone in SANAM Group Holding Company's expansion efforts across the GCC, reinforcing its position as a diversified holding company with growing investments in the education sector. It also aligns with broader regional trends, driving demand for advanced educational ecosystems and sustainable communities. Upon completion, the project will further support SANAM's strategic focus on responsible investment and long-term value creation through impactful projects that contribute meaningfully to social and economic development across the GCC.</p>
<h3>Enabling community-focused developments</h3>
<p>The project reflects Shurooq's wider role in enabling community-focused developments that support Sharjah's residential growth, strengthen quality of life and attract long-term private sector investment into key sectors.</p>
<p>Upon completion, the school will add a major education asset to Sharjah Sustainable City and support the emirate's continued development as a destination for family living, sustainable communities and future-ready education.</p>
`;

const BODY_SHUROOQ_AR = `
<p>الشارقة، 24 مايو 2026: أعلنت مجموعة سنام القابضة عن توقيع اتفاقية استراتيجية عن طريق الذراع التعليمي للمجموعة (مدارك) مع هيئة الشارقة للاستثمار والتطوير «شروق» لتطوير مدرسة متكاملة من مرحلة الروضة وحتى الصف الثاني عشر ضمن مدينة الشارقة المستدامة في دولة الإمارات العربية المتحدة.</p>
<p>ومن المتوقع أن تصل القيمة الاستثمارية الإجمالية للمشروع ومراحل تطويره المستقبلية إلى نحو 50 مليون دولار أمريكي خلال السنوات القادمة، بما يعكس التزام الطرفين بتطوير بنية تحتية تعليمية مستدامة ومواكبة لمتطلبات المستقبل، تسهم في دعم التنمية المجتمعية وتعزيز جودة الحياة في إمارة الشارقة والمنطقة.</p>
<p>وسيتم تطوير المشروع على مساحة تقارب 315,115 قدمًا مربعًا، حيث ستعتمد المدرسة المنهج الأمريكي، بطاقة استيعابية تصل إلى نحو 2,435 طالبًا وطالبة من مرحلة الروضة وحتى الصف الثاني عشر، ضمن بيئة تعليمية حديثة تركز على الابتكار والاستدامة والتقنيات المتقدمة والتعليم التفاعلي.</p>
<p>وسيضم الحرم المدرسي مرافق تعليمية متطورة تشمل مختبرات العلوم والتكنولوجيا والهندسة والرياضيات والروبوتات، ومساحات للابتكار والابداع، ومكتبات متعددة، إلى جانب مرافق للفنون والثقافة والأنشطة الرياضية والترفيهية، بما يوفر تجربة تعليمية متكاملة تدعم التطور الأكاديمي والشخصي للطلبة. كما سيراعي تصميم المدرسة أعلى معايير السلامة والرفاه والاستدامة، مع تخصيص مساحات خضراء ومناطق تفاعلية تعزز التواصل المجتمعي وجودة الحياة داخل البيئة التعليمية.</p>
<p>ومن جانبه، قال السيد أحمد عبيد القصير، الرئيس التنفيذي في هيئة الشارقة للاستثمار والتطوير «شروق»: "تعكس هذه الشراكة التزام «شروق» بتطوير مشاريع تلبي الاحتياجات المتنامية للمجتمع وتوفر قيمة طويلة الأمد خلال استثمارات استراتيجية نوعية في إمارة الشارقة. ويعد قطاع التعليم أحد أهم عناصر بناء المجتمعات السكنية المتكاملة، حيث سيسهم هذا المشروع في دعم جودة الحياة وجذب الاستثمارات طويلة الأمد في القطاعات الحيوية."</p>
<p>وأضاف: "كما تعكس شراكتنا مع مجموعة سنام القابضة أهمية التعاون مع شركاء من القطاع الخاص يمتلكون رؤية طويلة الأمد وخبرة تشغيلية متخصصة، بما يدعم استقطاب استثمارات نوعية تسهم في التنمية البشرية والنمو المجتمعي والتخطيط الحضري المستدام."</p>
<p>وبهذه المناسبة، أوضح الدكتور سليمان طارق العبدالجادر، نائب رئيس مجلس الإدارة والرئيس التنفيذي لمجموعة سنام القابضة: "إن شراكتنا الاستراتيجية مع شروق تمثل خطوة محورية ضمن رؤية سنام طويلة الأمد للاستثمار في قطاع التعليم المستدام، وتطوير بيئة تعليمية متقدمة تواكب تطلعات الأجيال القادمة في دول مجلس التعاون الخليجي. وتعد إمارة الشارقة نموذجًا رائدًا في التنمية الحضرية والتعليمية المستدامة، ما يجعلها الوجهة المثالية لهذا النوع من المشاريع النوعية."</p>
<p>وأضاف: "ونتطلع من خلال هذا المشروع إلى تطوير منظومة تعليمية متكاملة تجمع بين التميز الأكاديمي والابتكار والاستدامة والتفاعل المجتمعي، بما يسهم في خلق قيمة مستدامة طويلة الأمد للمجتمع والأجيال المقبلة."</p>
<p>ويشكل المشروع محطة استراتيجية هامة ضمن خطط مجموعة سنام القابضة للتوسع في قطاع التعليم بدول مجلس التعاون الخليجي، بما يعزز مكانتها كشركة قابضة ترتكز استثماراتها على خلق قيمة طويلة الأمد من خلال مشاريع مؤثرة تسهم في التنمية الاجتماعية والاقتصادية في المنطقة.</p>
`;

const BODY_MGIS_EN = `
<p><strong>Strategic investment strengthens SANAM's presence in the Kingdom's education sector and supports expansion across Gulf markets</strong></p>
<p>SANAM Group Holding Company announced the acquisition of a 65% stake in Modern Global International Schools (MGIS) in the Kingdom of Saudi Arabia, as part of its investment expansion strategy in the education sector across GCC countries.</p>
<p>The announcement was made during the closing ceremony of the acquisition through First Educational Holding Company, a subsidiary of one of SANAM's affiliate companies. The transaction involved acquiring the owner of Modern Global International Schools, Modern MENA for Education, from the Bloom Education Fund, managed by Bloom Investment Saudi Arabia.</p>
<p>Commenting on the occasion, Dr. Sulaiman Tariq Al-Abduljader, Vice Chairman and CEO of SANAM Group Holding Company, said: "This acquisition represents the first major step in SANAM's strategy to expand across vital sectors in the Kingdom of Saudi Arabia. It reflects our commitment to sustainable growth and strengthening our position through high-impact investments that meet the highest quality standards."</p>
<p>From his side, Eng. Abdullah Al-Roshoudd, CEO and Managing Director of Bloom Investment Saudi Arabia, stated: "We are pleased to have achieved this successful exit, which marks an important milestone in the journey of private equity funds at Bloom Investment."</p>
<p>As part of the transaction, SANAM Group simultaneously signed an agreement with its partners at MENA for Education and Human Resources, an affiliate of the Abdulmohsen Al-Hokair Group, along with Josoor Contracting Company and the American company Global Education Excellence (GEE), to establish a joint-stock company that will support and accelerate the partners' expansion plans in the Kingdom's education sector.</p>
<p>Modern Global International Schools is considered one of the leading educational institutions in Riyadh. MGIS operates two established campuses in Qurtuba and Digital City, serving over 900 students from more than 40 nationalities. The school is distinguished by its accredited IB Primary Years Programme (IB PYP) and its strong academic reputation.</p>
<hr/>
<p><strong>About SANAM Group Holding Company</strong></p>
<p>Founded in Kuwait in 1982 and listed on Boursa Kuwait in 2004, SANAM Group Holding Company is a diversified holding company with investments across education, healthcare, industry, and services.</p>
<p><strong>About Bloom Investment Saudi Arabia</strong></p>
<p>Established in 2008, Bloom Investment Saudi Arabia provides a full suite of investment services including wealth management, corporate finance, financial advisory, and asset management. The company manages private equity funds across key sectors such as real estate, healthcare, and financing, with total assets under management exceeding SAR 20 billion.</p>
<p><strong>About Abdulmohsen Al-Hokair Group</strong></p>
<p>The Abdulmohsen Al-Hokair Group is one of the Kingdom's leading family investment groups, with more than 50 years of experience in developing and managing projects across education, entertainment, hospitality, and retail.</p>
`;

const BODY_MGIS_AR = `
<p><strong>استثمار استراتيجي يعزز حضور سنام في قطاع التعليم بالمملكة ويدعم التوسع في الأسواق الخليجية</strong></p>
<p>أعلنت شركة مجموعة سنام القابضة عن الاستحواذ على حصة 65% في مدارس جلوبال العالمية الحديثة (MGIS) في المملكة العربية السعودية، ضمن استراتيجيتها للتوسع الاستثماري في قطاع التعليم على مستوى دول مجلس التعاون الخليجي.</p>
<p>جاء الإعلان خلال حفل إغلاق صفقة الاستحواذ عبر شركة الأولى التعليمية القابضة، إحدى الشركات الزميلة لمجموعة سنام. وتضمنت الصفقة الاستحواذ على المالك لمدارس مودرن جلوبال إنترناشيونال، شركة «مودرن مينا للتعليم»، من صندوق بلوم التعليمي المُدار من قبل بلوم للاستثمار السعودية.</p>
<p>وتعليقًا على المناسبة، قال الدكتور سليمان طارق العبدالجادر، نائب رئيس مجلس الإدارة والرئيس التنفيذي لمجموعة سنام القابضة: «يمثل هذا الاستحواذ الخطوة الكبرى الأولى ضمن استراتيجية سنام للتوسع في القطاعات الحيوية بالمملكة العربية السعودية، ويعكس التزامنا بالنمو المستدام وتعزيز مكانتنا عبر استثمارات عالية الأثر تستوفي أعلى معايير الجودة.»</p>
<p>ومن جانبه، صرّح المهندس عبدالله الرشود، الرئيس التنفيذي والعضو المنتدب لشركة بلوم للاستثمار السعودية: «يسرنا تحقيق هذا التخارج الناجح، الذي يمثل محطة مهمة في مسيرة صناديق الملكية الخاصة لدى بلوم للاستثمار.»</p>
<p>وكجزء من الصفقة، وقّعت مجموعة سنام في الوقت ذاته اتفاقية مع شركائها في شركة «مينا للتعليم والموارد البشرية»، التابعة لمجموعة عبدالمحسن الحكير، إضافة إلى شركة جسور للمقاولات والشركة الأمريكية Global Education Excellence (GEE)، لتأسيس شركة مساهمة تدعم وتسرّع خطط التوسع للشركاء في قطاع التعليم بالمملكة.</p>
<p>وتُعد مدارس جلوبال العالمية الحديثة إحدى أبرز المؤسسات التعليمية في الرياض. وتدير المدارس حرمَين رئيسيَين في حي قرطبة والمدينة الرقمية، وتستقبل أكثر من 900 طالب وطالبة من أكثر من 40 جنسية. وتتميز المدارس باعتمادها لبرنامج البكالوريا الدولية للسنوات الابتدائية (IB PYP) وبسمعتها الأكاديمية القوية.</p>
<hr/>
<p><strong>عن شركة مجموعة سنام القابضة</strong></p>
<p>تأسست شركة مجموعة سنام القابضة في الكويت عام 1982 وأُدرجت في بورصة الكويت عام 2004، وهي شركة قابضة متنوعة لها استثمارات في قطاعات التعليم والرعاية الصحية والصناعة والخدمات.</p>
<p><strong>عن شركة بلوم للاستثمار السعودية</strong></p>
<p>تأسست بلوم للاستثمار السعودية عام 2008 وتقدم مجموعة متكاملة من الخدمات الاستثمارية تشمل إدارة الثروات وتمويل الشركات والاستشارات المالية وإدارة الأصول. وتدير الشركة صناديق ملكية خاصة في قطاعات رئيسية كالعقارات والرعاية الصحية والتمويل، بإجمالي أصول تحت الإدارة يتجاوز 20 مليار ريال سعودي.</p>
<p><strong>عن مجموعة عبدالمحسن الحكير</strong></p>
<p>تُعد مجموعة عبدالمحسن الحكير إحدى أبرز المجموعات الاستثمارية العائلية في المملكة العربية السعودية، ولها أكثر من 50 عامًا من الخبرة في تطوير وإدارة المشاريع في قطاعات التعليم والترفيه والضيافة والتجزئة.</p>
`;

export const media: MediaItem[] = [
  {
    id: 'mgis-third-campus-riyadh',
    date: '2026-07-28',
    category: 'Announcements',
    source: 'MADAREK',
    sourceAr: 'مدارك',
    image: '/redesign-assets/news/mgis-third-campus.webp',
    title: 'MADAREK United signs 25-year agreement to develop a third MGIS campus in Riyadh',
    excerpt: 'Through its subsidiary Modern MENA Company for Education, MADAREK United has signed a 25-year investment agreement to develop the third Modern Global International Schools (MGIS) campus in Riyadh.',
    body: `
<p>MADAREK United, through its subsidiary Modern MENA Company for Education, has signed a 25-year investment agreement to develop the third MGIS campus in Riyadh.</p>
<p>The agreement expands Modern Global International Schools' presence in the Saudi capital, building on the network's established campuses in Qurtuba and Digital City. It reflects MADAREK's long-term commitment to widening access to high-quality, internationally recognised education across the Kingdom.</p>
<p>The new campus adds further capacity to one of Riyadh's leading American-curriculum school networks, supporting continued demand for future-ready learning environments across the GCC.</p>
`,
    titleAr: 'مدارك المتحدة توقّع اتفاقية مدتها 25 عامًا لتطوير فرعٍ ثالث لمدارس جلوبال العالمية الحديثة في الرياض',
    excerptAr: 'من خلال شركتها التابعة «مودرن مينا للتعليم»، وقّعت مدارك المتحدة اتفاقية استثمارية مدتها 25 عامًا لتطوير الفرع الثالث لمدارس جلوبال العالمية الحديثة (MGIS) في الرياض.',
    bodyAr: `
<p>وقّعت مدارك المتحدة، عبر شركتها التابعة «مودرن مينا للتعليم»، اتفاقية استثمارية مدتها 25 عامًا لتطوير الفرع الثالث لمدارس جلوبال العالمية الحديثة في الرياض.</p>
<p>وتوسّع الاتفاقية حضور مدارس جلوبال العالمية الحديثة في العاصمة السعودية، بالبناء على فرعَي الشبكة القائمَين في قرطبة والمدينة الرقمية، وتعكس التزام مدارك طويل الأمد بتوسيع إتاحة التعليم عالي الجودة المعتمد عالميًا في أنحاء المملكة.</p>
<p>ويضيف الفرع الجديد طاقةً استيعابية إضافية إلى إحدى أبرز شبكات المدارس ذات المنهج الأمريكي في الرياض، بما يلبّي الطلب المتنامي على بيئات تعلّم مواكبة للمستقبل في أنحاء دول مجلس التعاون الخليجي.</p>
`,
  },
  {
    id: 'mas-wellbeing-award-for-schools',
    date: '2026-06-30',
    category: 'Achievements',
    source: 'Al Maaref American School',
    sourceAr: 'مدرسة المعارف الأمريكية',
    image: '/redesign-assets/news/mas-wellbeing-award.webp',
    title: 'Al Maaref American School achieves the Wellbeing Award for Schools',
    excerpt: "Al Maaref American School has been awarded the Wellbeing Award for Schools (WAS), delivered in partnership with the National Children's Bureau — accredited through 2029.",
    body: `
<p>Al Maaref American School has achieved the Wellbeing Award for Schools (WAS), a recognised accreditation delivered in partnership with the National Children's Bureau. The award is held through 2029.</p>
<p>The Wellbeing Award recognises schools that place emotional wellbeing and mental health at the heart of school life — for students and staff alike — through a whole-school approach embedded across culture, curriculum, and community.</p>
<p>The recognition reflects Al Maaref American School's commitment to nurturing confident, well-rounded learners in a supportive and inclusive environment, as part of the wider MADAREK framework across the network.</p>
`,
    titleAr: 'مدرسة المعارف الأمريكية تحصل على جائزة الرفاه للمدارس',
    excerptAr: 'حصلت مدرسة المعارف الأمريكية على جائزة الرفاه للمدارس (WAS)، المقدَّمة بالشراكة مع المكتب الوطني للطفولة — باعتمادٍ ساري المفعول حتى عام 2029.',
    bodyAr: `
<p>حصلت مدرسة المعارف الأمريكية على جائزة الرفاه للمدارس (WAS)، وهي اعتمادٌ معترف به يُقدَّم بالشراكة مع المكتب الوطني للطفولة، وتظلّ سارية حتى عام 2029.</p>
<p>وتكرّم جائزة الرفاه المدارس التي تضع الرفاه العاطفي والصحة النفسية في صميم الحياة المدرسية — للطلبة والموظفين على حدٍّ سواء — من خلال نهجٍ مدرسي شامل يمتدّ عبر الثقافة والمنهج والمجتمع.</p>
<p>ويعكس هذا التكريم التزام مدرسة المعارف الأمريكية برعاية متعلّمين واثقين متكاملي الشخصية في بيئة داعمة وشاملة، ضمن إطار مدارك الأوسع عبر الشبكة.</p>
`,
  },
  {
    id: 'shurooq-madarek-sharjah-k12',
    date: '2026-05-24',
    category: 'Press Release',
    source: 'MADAREK',
    sourceAr: 'مدارك',
    image: '/redesign-assets/news/mashrooq_signing.jpg',
    video: 'https://www.instagram.com/reels/DYrFrd1iBWX/',
    title: 'Shurooq and SANAM Group sign agreement to develop USD 50 million K-12 school in Sharjah Sustainable City',
    excerpt: "The new American curriculum school, developed in partnership with MADAREK, SANAM Group's education platform, will serve around 2,435 students from kindergarten to Grade 12.",
    body: BODY_SHUROOQ_EN,
    titleAr: 'شراكة استراتيجية بين مجموعة سنام القابضة وهيئة الشارقة للاستثمار والتطوير «شروق» لتأسيس مدرسة دولية بقيمة استثمار تصل إلى 50 مليون دولار',
    excerptAr: 'المشروع يعزز رؤية سنام طويلة الأمد للاستثمار في البنية التحتية التعليمية المبتكرة والمستدامة في دول الخليج والإسهام في تطوير قطاع التعليم بالمنطقة',
    bodyAr: BODY_SHUROOQ_AR,
  },
  {
    id: 'sanam-acquires-mgis-riyadh',
    date: '2025-12-08',
    category: 'Press Release',
    source: 'MADAREK',
    sourceAr: 'مدارك',
    image: '/redesign-assets/news/05_dec_2025_v2.webp',
    title: 'SANAM Group Holding Company Acquires Modern Global International Schools in Saudi Arabia',
    excerpt: 'SANAM Group Holding Company announced the acquisition of a 65% stake in Modern Global International Schools (MGIS) in the Kingdom of Saudi Arabia, as part of its investment expansion strategy in the education sector across GCC countries.',
    body: BODY_MGIS_EN,
    titleAr: 'مجموعة سنام القابضة تستحوذ على مدارس جلوبال العالمية الحديثة في السعودية',
    excerptAr: 'أعلنت مجموعة سنام القابضة الاستحواذ على حصة 65% في مدارس جلوبال العالمية الحديثة في المملكة العربية السعودية ضمن استراتيجية التوسع في قطاع التعليم.',
    bodyAr: BODY_MGIS_AR,
  },
];

/* Derived, always newest-first. Consumers MUST read from this (not the
   raw `media` array) so ordering is identical everywhere. */
export const mediaByNewest: MediaItem[] = [...media].sort(
  (a, b) => b.date.localeCompare(a.date),
);

/* Look up a single article by its id (the /media/:id slug). */
export const findMedia = (id: string | undefined): MediaItem | undefined =>
  media.find((m) => m.id === id);

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
    students: '1,439',
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
    nameAr: 'مدرسة المعارف الأمريكية',
    shortAr: 'مدرسة المعارف الأمريكية',
    locationAr: 'دبي، الإمارات',
    curriculumAr: 'أمريكي',
    gradesAr: 'الروضة–الصف 12',
    languagesAr: 'الإنجليزية · العربية',
    addressAr: 'البرشاء جنوب، دبي، الإمارات العربية المتحدة',
    descriptionAr:
      'مدرسة تتبع المنهج الأمريكي في دبي، تأسست عام 1987 — تُعلّم الطلبة من المراحل المبكرة حتى المرحلة الثانوية وصولًا إلى دبلوم الثانوية الأمريكية.',
    overviewAr:
      'تأسست مدرسة المعارف الأمريكية عام 1987، وهي من أعرق المدارس الأمريكية في دبي. تقدّم منهجًا وفق المعايير الأمريكية من المراحل المبكرة حتى المرحلة الثانوية، بنهجٍ يقوم على التفكير المستقل والإبداع وحلّ المشكلات الواقعية — ضمن مجتمعٍ متسامح وشامل يجمع طلبةً من جنسيات متعددة.',
    highlightsAr: [
      'تأسست عام 1987 — من أعرق المدارس الأمريكية في دبي',
      'منهج أمريكي متوافق مع المعايير الأمريكية يُفضي إلى دبلوم الثانوية الأمريكية',
      'معتمدة من NEASC وCognia، وتقدّم برامج College Board',
      'تعلّمٌ قائم على التفكير المستقل والإبداع وحلّ المشكلات الواقعية',
      'مرافق حديثة — مختبرات علوم ومكتبات واستوديوهات فنون ومناطق لعب مخصّصة',
    ],
  },
  {
    slug: 'mgis-qortuba-campus',
    name: 'MGIS — Qortuba Campus',
    short: 'MGIS Qortuba',
    location: 'Riyadh, KSA',
    curriculum: 'American (IB-PYP)',
    grades: 'Nursery–Grade 9',
    ages: '3–15',
    languages: 'English · Arabic',
    students: '630',
    image: '/redesign-assets/MGIS_Qortuba/01.webp',
    gallery: ['/redesign-assets/MGIS_Qortuba/3.webp', '/redesign-assets/MGIS_Qortuba/4.webp', '/redesign-assets/MGIS_Qortuba/5.webp', '/redesign-assets/MGIS_Qortuba/6.webp'],
    address: 'Qortuba District, Riyadh, Kingdom of Saudi Arabia',
    email: 'info@mgis-sa.com',
    website: 'https://mgis-sa.com/',
    description:
      'An American curriculum enriched by the IB framework — Nursery to Grade 9, in the heart of Riyadh.',
    overview:
      'MGIS Qortuba Campus is a leading international school in Riyadh offering an American curriculum enriched by the IB framework. Serving students from Nursery to Grade 9, the campus provides a nurturing learning environment that promotes academic excellence, character development, and global citizenship while preparing students for lifelong success.',
    highlights: [
      'American curriculum structured around IB-PYP framework',
      'Average class size of 18 students, maximum 24',
      'Comprehensive facilities: science labs, art, music, theatre',
      'Clubs across reading, chess, music, recycling, art',
      'Sports: soccer, basketball, gymnastics, aerobics',
      'Strong Arabic instruction and Manners programme',
    ],
    nameAr: 'مدارس جلوبال العالمية الحديثة — فرع قرطبة',
    shortAr: 'جلوبال قرطبة',
    locationAr: 'الرياض، السعودية',
    curriculumAr: 'أمريكي (IB-PYP)',
    gradesAr: 'الحضانة–الصف 9',
    languagesAr: 'الإنجليزية · العربية',
    addressAr: 'حي قرطبة، الرياض، المملكة العربية السعودية',
    descriptionAr:
      'منهج أمريكي مُثرى بإطار البكالوريا الدولية — من الحضانة حتى الصف التاسع، في قلب الرياض.',
    overviewAr:
      'يُعدّ فرع قرطبة لمدارس جلوبال العالمية الحديثة من المدارس العالمية الرائدة في الرياض، ويقدّم منهجًا أمريكيًا مُثرى بإطار البكالوريا الدولية. وبخدمته الطلبة من الحضانة حتى الصف التاسع، يوفّر الفرع بيئة تعلّم راعية تعزّز التميّز الأكاديمي وبناء الشخصية والمواطنة العالمية، مع إعداد الطلبة للنجاح مدى الحياة.',
    highlightsAr: [
      'منهج أمريكي مبني على إطار البكالوريا الدولية للسنوات الابتدائية (IB-PYP)',
      'متوسط حجم الصف 18 طالبًا، بحدٍّ أقصى 24',
      'مرافق متكاملة: مختبرات علوم وفنون وموسيقى ومسرح',
      'أندية في القراءة والشطرنج والموسيقى وإعادة التدوير والفنون',
      'رياضات: كرة القدم وكرة السلة والجمباز والأيروبيك',
      'تعليمٌ قوي للغة العربية وبرنامج للسلوك والأخلاق',
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
    students: '321',
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
    nameAr: 'مدارس جلوبال العالمية الحديثة — فرع المدينة الرقمية',
    shortAr: 'جلوبال المدينة الرقمية',
    locationAr: 'الرياض، السعودية',
    curriculumAr: 'أمريكي (الأساس المشترك الأمريكي)',
    gradesAr: 'الروضة–الصف 6',
    languagesAr: 'الإنجليزية · العربية · الفرنسية',
    addressAr: 'المدينة الرقمية، الرياض، المملكة العربية السعودية',
    descriptionAr:
      'يقدّم تجارب تعلّم مبتكرة تُلهم الفضول والإبداع والإنجاز مدى الحياة.',
    overviewAr:
      'فرع المدينة الرقمية هو أحدث فروع الشبكة — ثلاثي اللغة وغني بالتقنية، ومصمَّم حول الشراكة مع الأسرة ونهج حبّ التعلّم.',
    highlightsAr: [
      'منهج أمريكي قائم على معايير الأساس المشترك الأمريكية',
      'دمج تقني متقدّم في جميع الفصول',
      'ثلاثي اللغة: الإنجليزية والعربية والفرنسية',
      'تعليم مختلط مع انخراط قوي لأولياء الأمور',
      'ثقافة تُعنى بالأسرة',
      'ساعات العمل: الأحد–الخميس، 7:30 صباحًا–2:00 ظهرًا',
    ],
  },
  {
    slug: 'sharjah-sustainable-city',
    name: 'Sharjah Sustainable City School',
    short: 'Sharjah Sustainable City',
    location: 'Sharjah, UAE',
    curriculum: 'American',
    grades: 'KG–Grade 12',
    ages: '4–18',
    students: '2,435',
    languages: 'English · Arabic',
    status: 'upcoming',
    image: '/redesign-assets/shurooq/aerial.webp',
    gallery: [
      '/redesign-assets/shurooq/classroom-courtyard.webp',
      '/redesign-assets/shurooq/classroom-walkway.webp',
      '/redesign-assets/shurooq/classrooms.webp',
      '/redesign-assets/shurooq/admin-01.webp',
      '/redesign-assets/shurooq/admin-03.webp',
      '/redesign-assets/shurooq/sports.webp',
    ],
    address: 'Sharjah Sustainable City, Um Fanain / Al Ruqa Al Hamra, Sharjah, United Arab Emirates',
    email: 'info@madarek.me',
    website: 'https://madarek.me/',
    description:
      'An upcoming American curriculum K-12 school in Sharjah Sustainable City — a USD 50 million campus designed for around 2,435 students, developed in partnership with Shurooq.',
    overview:
      "An upcoming K-12 school in Sharjah Sustainable City, developed in partnership between MADAREK and the Sharjah Investment and Development Authority (Shurooq). Following the American curriculum, the USD 50 million campus is designed for around 2,435 students from kindergarten to Grade 12 — set within one of the emirate's leading sustainable communities and built around innovation, wellbeing, and collaborative learning.",
    highlights: [
      'American curriculum, kindergarten to Grade 12',
      'USD 50 million campus in Sharjah Sustainable City',
      'Designed for around 2,435 students on a 29,275 m² site',
      'Science, IT, robotics, engineering and mathematics labs, with maker and innovation spaces',
      'Three libraries, arts studios, a black box theatre, and a 500-seat multi-purpose hall',
      'Learning support centre with therapy and sensory rooms, and dedicated clinics',
      'Indoor sports hall, main and learner swimming pools, and rooftop recreation',
      'Green spaces, a botanical garden, and shaded pedestrian walkways',
    ],
    nameAr: 'مدرسة مدينة الشارقة المستدامة',
    shortAr: 'مدينة الشارقة المستدامة',
    locationAr: 'الشارقة، الإمارات',
    curriculumAr: 'أمريكي',
    gradesAr: 'الروضة–الصف 12',
    languagesAr: 'الإنجليزية · العربية',
    addressAr: 'مدينة الشارقة المستدامة، أم فنين / الرقعة الحمراء، الشارقة، الإمارات العربية المتحدة',
    descriptionAr:
      'مدرسة أمريكية مرتقبة من الروضة حتى الصف الثاني عشر في مدينة الشارقة المستدامة — حرمٌ بقيمة 50 مليون دولار أمريكي مصمَّم لنحو 2,435 طالبًا، يُطوَّر بالشراكة مع «شروق».',
    overviewAr:
      'مدرسة مرتقبة من الروضة حتى الصف الثاني عشر في مدينة الشارقة المستدامة، تُطوَّر بالشراكة بين مدارك وهيئة الشارقة للاستثمار والتطوير «شروق». وباتّباعها المنهج الأمريكي، صُمِّم الحرم البالغة قيمته 50 مليون دولار أمريكي لنحو 2,435 طالبًا من الروضة حتى الصف الثاني عشر — ضمن إحدى أبرز المجتمعات المستدامة في الإمارة، وهو مبنيٌّ حول الابتكار والرفاه والتعلّم التعاوني.',
    highlightsAr: [
      'منهج أمريكي، من الروضة حتى الصف الثاني عشر',
      'حرمٌ بقيمة 50 مليون دولار أمريكي في مدينة الشارقة المستدامة',
      'مصمَّم لنحو 2,435 طالبًا على موقعٍ مساحته 29,275 م²',
      'مختبرات للعلوم وتقنية المعلومات والروبوتات والهندسة والرياضيات، مع مساحات للابتكار والصناعة',
      'ثلاث مكتبات واستوديوهات فنون ومسرح صندوقي أسود وقاعة متعددة الأغراض تتّسع لـ500 مقعد',
      'مركز لدعم التعلّم يضمّ غرف علاج ودمج حسّي وعيادات مخصّصة',
      'صالة رياضية مغلقة ومسبح رئيسي ومسبح للمتعلّمين ومرافق ترفيهية على السطح',
      'مساحات خضراء وحديقة نباتية وممرات مشاة مظلّلة',
    ],
  },
];
