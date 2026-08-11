# MADAREK — Translation Strings (EN → AR) · ✅ TRANSLATED

This document lists every string on the site, segregated by page and section,
with the completed Arabic (Gulf/MSA) in the third column. It doubles as the
source-of-truth checklist and the delivered translation.

**Status — fully translated (2026-08-11).** The entire site renders in Arabic
(RTL) when the language is switched to العربية. Both `src/i18n/locales/en.json`
and `ar.json` are complete (356 keys each, exact parity), and the content in
`src/data.ts` carries parallel Arabic fields.

**How to read / maintain**
- Each row maps a **key** (path in `src/i18n/locales/*.json`) or a **content
  field** (in `src/data.ts`) to its **English** and **العربية**.
- `{{count}}` / `{{year}}` / `{{value}}` / `{{ages}}` / `{{language}}` are
  **interpolation variables** — kept verbatim in the Arabic.
- Proper nouns are transliterated, not literally translated (مدارك, مدرسة
  المعارف الأمريكية, لينكولن…). Arrows flip for RTL (← for forward actions).
- To revise: edit the value under the matching key in `ar.json`, or the
  `*Ar` field in `data.ts`. Missing keys fall back to English automatically.

**Coverage**
- ✅ UI (i18next): Global app shell, Home, About, Schools, School detail,
  Foundation, Academy, Contact, Leadership, Leader detail, Media, Media
  article, Careers, Schools explorer.
- ✅ Content data (`src/data.ts`): school profiles (name, location, curriculum,
  grades, languages, address, description, overview, highlights) via `*Ar`
  fields; all 4 media articles (title, excerpt, body, source) — see §14.
- ✅ Proper nouns: leader / board / shareholder names transliterated (§8);
  media category vocabulary translated (`media.categories.*`).
- `src/system.tsx` has no user-facing copy (only the logo `aria-label`).
- 🗑️ Dead code (never rendered, untranslated): `values` (About), `outcomes`
  (Academy), `CAREER_VALUES`, `LIFE_IMAGES` (Careers).

---

## 1. Global — App shell
Source: [`src/App.tsx`](src/App.tsx)

### 1.1 Navigation — `nav.*`
| Key | English | العربية |
| --- | --- | --- |
| `nav.home` | Home | الرئيسية |
| `nav.about` | About | من نحن |
| `nav.overview` | Overview | نظرة عامة |
| `nav.visionMission` | Vision & Mission | الرؤية والرسالة |
| `nav.leadership` | Leadership | القيادة |
| `nav.shareholders` | Shareholders | المساهمون |
| `nav.schools` | Schools | المدارس |
| `nav.allSchools` | All schools | جميع المدارس |
| `nav.media` | Media | المركز الإعلامي |
| `nav.careers` | Careers | الوظائف |
| `nav.contact` | Contact | تواصل معنا |

### 1.2 Header / menu — `header.*`
| Key | English | العربية |
| --- | --- | --- |
| `header.menu` | Menu | القائمة |
| `header.close` | Close | إغلاق |
| `header.openMenu` | Open menu | فتح القائمة |
| `header.closeMenu` | Close menu | إغلاق القائمة |
| `header.madarekHome` | Madarek home | الصفحة الرئيسية لمدارك |
| `header.primary` | Primary | القائمة الرئيسية |
| `header.siteNavigation` | Site navigation | تصفّح الموقع |

### 1.3 Footer — `footer.*`
| Key | English | العربية |
| --- | --- | --- |
| `footer.tagline` | A community of schools across the Gulf, dedicated to academic excellence and lasting educational impact. | مجتمعٌ من المدارس في أنحاء الخليج، مكرَّسٌ للتميّز الأكاديمي والأثر التعليمي المستدام. |
| `footer.explore` | Explore | استكشف |
| `footer.getInTouch` | Get in touch | تواصل معنا |
| `footer.copyright` | © {{year}} MADAREK Education | © {{year}} مدارك للتعليم |
| `footer.privacy` | Privacy | الخصوصية |
| `footer.terms` | Terms | الشروط |

### 1.4 Placeholder page (Privacy / Terms) — `stub.*`
| Key | English | العربية |
| --- | --- | --- |
| `stub.eyebrow` | Placeholder | قيد الإعداد |
| `stub.body` | This page exists in the structure but isn't a redesign focus area. | هذه الصفحة موجودة ضمن هيكل الموقع، غير أنها ليست من محاور إعادة التصميم الحالية. |

### 1.5 404 — `notFound.*`
| Key | English | العربية |
| --- | --- | --- |
| `notFound.eyebrow` | 404 | ٤٠٤ |
| `notFound.title` | Page not found. | الصفحة غير موجودة. |
| `notFound.body` | The page you're looking for isn't here — it may have moved, or the link may be out of date. | الصفحة التي تبحث عنها غير متوفّرة — ربما نُقلت أو لم يعد الرابط صالحًا. |
| `notFound.backHome` | Back to home | العودة إلى الرئيسية |
| `notFound.exploreSchools` | Explore the schools → | استكشف المدارس ← |

### 1.6 Language switch — `language.*`
| Key | English | العربية |
| --- | --- | --- |
| `language.label` | Language | اللغة |
| `language.english` | English | English |
| `language.arabic` | العربية | العربية |
| `language.switchTo` | Switch to {{language}} | التبديل إلى {{language}} |

---

## 2. Home page
Source: [`src/home.tsx`](src/home.tsx)

### 2.1 Hero — `home.hero.*`
| Key | English | العربية |
| --- | --- | --- |
| `home.hero.eyebrow` | MADAREK · Education across the GCC · Est. 2026 | مدارك · التعليم في دول مجلس التعاون الخليجي · تأسست عام 2026 |
| `home.hero.titleLine1` | Shaping the future | نصنع مستقبل |
| `home.hero.titleLine2` | of learning. | التعليم. |
| `home.hero.subtitle` | A growing network of international schools across the GCC. | شبكة متنامية من المدارس العالمية في أنحاء دول مجلس التعاون الخليجي. |
| `home.hero.cta` | Explore our schools | استكشف مدارسنا |
| `home.hero.scroll` | Scroll | مرِّر للأسفل |

### 2.2 About — `home.about.*`
| Key | English | العربية |
| --- | --- | --- |
| `home.about.eyebrow` | About MADAREK | عن مدارك |
| `home.about.title` | A regional education | منصّة تعليمية |
| `home.about.titleAccent` | platform. | إقليمية. |
| `home.about.introLabel` | Introduction | مقدّمة |
| `home.about.body1` | MADAREK is a growing network of schools across the GCC, united by one commitment: academic excellence and developing confident, well-rounded learners. | مدارك شبكة متنامية من المدارس في أنحاء دول مجلس التعاون الخليجي، تجمعها رؤية واحدة: التميّز الأكاديمي وإعداد طلبة واثقين متكاملي الشخصية. |
| `home.about.body2` | Through internationally recognised curricula and modern learning environments, we help students thrive — and contribute to the communities we serve. | من خلال مناهج معتمدة عالميًا وبيئات تعلّم حديثة، نساعد طلبتنا على التفوّق، ونُسهم في تنمية المجتمعات التي نخدمها. |
| `home.about.link` | Read the full story | اقرأ القصة كاملةً |

### 2.3 Four Pillars — `home.framework.*`
| Key | English | العربية |
| --- | --- | --- |
| `home.framework.eyebrow` | Our Four Pillars | ركائزنا الأربع |
| `home.framework.titleLine1` | Four pillars. | أربع ركائز. |
| `home.framework.titleLine2` | One direction. | واتجاه واحد. |
| `home.framework.pillars.excellence.title` | Educational Excellence | التميّز التعليمي |
| `home.framework.pillars.excellence.tagline` | High-quality learning that develops the whole student. | تعليمٌ عالي الجودة يُنمّي شخصية الطالب المتكاملة. |
| `home.framework.pillars.excellence.tags[0]` | Academic achievement | التحصيل الأكاديمي |
| `home.framework.pillars.excellence.tags[1]` | Critical thinking | التفكير الناقد |
| `home.framework.pillars.excellence.tags[2]` | Holistic development | التنمية الشاملة |
| `home.framework.pillars.innovation.title` | Innovation | الابتكار |
| `home.framework.pillars.innovation.tagline` | Future-ready environments built on creativity and technology. | بيئاتٌ مواكبة للمستقبل قائمة على الإبداع والتقنية. |
| `home.framework.pillars.innovation.tags[0]` | Technology | التقنية |
| `home.framework.pillars.innovation.tags[1]` | Creativity | الإبداع |
| `home.framework.pillars.innovation.tags[2]` | New approaches | أساليب جديدة |
| `home.framework.pillars.growth.title` | Regional Growth | النمو الإقليمي |
| `home.framework.pillars.growth.tagline` | A leading education ecosystem across the GCC and beyond. | منظومة تعليمية رائدة في أنحاء الخليج وخارجه. |
| `home.framework.pillars.growth.tags[0]` | Strategic expansion | التوسّع الاستراتيجي |
| `home.framework.pillars.growth.tags[1]` | Partnerships | الشراكات |
| `home.framework.pillars.growth.tags[2]` | GCC & beyond | الخليج وما بعده |
| `home.framework.pillars.impact.title` | Lasting Impact | أثرٌ مستدام |
| `home.framework.pillars.impact.tagline` | Positive, sustainable outcomes for generations to come. | نتائج إيجابية ومستدامة لأجيالٍ قادمة. |
| `home.framework.pillars.impact.tags[0]` | Students & educators | الطلبة والمعلّمون |
| `home.framework.pillars.impact.tags[1]` | Communities | المجتمعات |
| `home.framework.pillars.impact.tags[2]` | Future generations | الأجيال القادمة |

### 2.4 Cinematic moment — `home.cinematic.*`
| Key | English | العربية |
| --- | --- | --- |
| `home.cinematic.eyebrow` | A school is a place | المدرسة مكانٌ |
| `home.cinematic.titleLine1` | Where every student is | يُعرَف فيه كل طالبٍ |
| `home.cinematic.titleAccent` | known. | حقّ المعرفة. |

### 2.5 Schools carousel — `home.schools.*`
| Key | English | العربية |
| --- | --- | --- |
| `home.schools.eyebrow` | Our Schools | مدارسنا |
| `home.schools.headlineCount` | {{count}} campuses today, | {{count}} مدارس عاملة اليوم، |
| `home.schools.headlineAccent` | and a region in the making. | ومنطقةٌ في طور التكوين. |
| `home.schools.dragToExplore` | Drag to explore | اسحب للاستكشاف |
| `home.schools.prevCampuses` | Previous campuses | المدارس السابقة |
| `home.schools.moreCampuses` | More campuses | مزيدٌ من المدارس |
| `home.schools.campuses` | Campuses | المدارس |
| `home.schools.openingSoon` | Opening soon | افتتاحٌ قريب |
| `home.schools.ages` | Ages | الأعمار |
| `home.schools.viewCampus` | View campus | عرض المدرسة |
| `home.schools.futureAria` | More campuses joining the network | مزيدٌ من المدارس تنضمّ إلى الشبكة |
| `home.schools.comingSoon` | Coming soon | قريبًا |
| `home.schools.futureTitle` | More campuses joining the network | مدارس جديدة تنضمّ إلى الشبكة |
| `home.schools.exploreAll` | Explore all | استكشف الكل |

### 2.6 Foundation & Academy — `home.foundationAcademy.*`
_(Section currently hidden on the live home page, but retained in code and translated for when it returns.)_
| Key | English | العربية |
| --- | --- | --- |
| `home.foundationAcademy.foundationEyebrow` | MADAREK Foundation | مؤسسة مدارك |
| `home.foundationAcademy.foundationTitle` | Lasting impact beyond the classroom. | أثرٌ مستدام يتجاوز حدود الفصل الدراسي. |
| `home.foundationAcademy.foundationBody` | Empowering communities and expanding opportunities through education. | تمكين المجتمعات وتوسيع الفرص من خلال التعليم. |
| `home.foundationAcademy.foundationLink` | Explore the Foundation | اكتشف المؤسسة |
| `home.foundationAcademy.academyEyebrow` | MADAREK Academy | أكاديمية مدارك |
| `home.foundationAcademy.academyTitle` | Learning beyond the classroom. | تعلّمٌ يتجاوز حدود الفصل الدراسي. |
| `home.foundationAcademy.academyBody` | Enrichment, global experiences, and leadership programmes for students. | برامج إثرائية وتجارب عالمية وبرامج قيادية للطلبة. |
| `home.foundationAcademy.academyLink` | Inside the Academy | داخل الأكاديمية |

### 2.7 Media — `home.media.*`
| Key | English | العربية |
| --- | --- | --- |
| `home.media.imageComingSoon` | Image coming soon | الصورة قريبًا |
| `home.media.eyebrow` | Media | المركز الإعلامي |
| `home.media.titleLine` | Latest | أحدث |
| `home.media.titleAccent` | updates. | المستجدّات. |
| `home.media.viewAll` | View all {{count}} updates | عرض كل المستجدّات ({{count}}) |
| `home.media.subtitle` | Announcements, achievements, and stories from across the MADAREK network. | إعلاناتٌ وإنجازاتٌ وقصصٌ من مختلف أنحاء شبكة مدارك. |
| `home.media.readMore` | Read more | اقرأ المزيد |

### 2.8 Contact CTA — `home.contact.*`
| Key | English | العربية |
| --- | --- | --- |
| `home.contact.eyebrow` | Get in touch | تواصل معنا |
| `home.contact.titleLine` | Let's shape the future | لِنصنع المستقبل |
| `home.contact.titleAccent` | together. | معًا. |
| `home.contact.body` | Whether you are a parent, educator, institution, or strategic partner, we welcome the opportunity to connect and explore how we can create meaningful educational experiences together. | سواء كنت وليّ أمرٍ أو معلّمًا أو مؤسسةً أو شريكًا استراتيجيًا، نرحّب بالتواصل معك لاستكشاف سبل صناعة تجارب تعليمية ذات معنى معًا. |
| `home.contact.cta` | Contact MADAREK | تواصل مع مدارك |

---

## 3. About page
Source: [`src/pages.tsx`](src/pages.tsx) · `AboutPage`

### 3.1 Hero — `about.hero.*`
| Key | English | العربية |
| --- | --- | --- |
| `about.hero.eyebrow` | Who We Are | من نحن |
| `about.hero.title` | A regional | منصّة تعليمية |
| `about.hero.italicTail` | education platform. | إقليمية. |
| `about.hero.lede` | A growing network of international schools across the GCC, built on academic excellence and the growth of confident, well-rounded learners. | شبكة متنامية من المدارس العالمية في أنحاء دول مجلس التعاون الخليجي، تقوم على التميّز الأكاديمي وإعداد طلبة واثقين متكاملي الشخصية. |

### 3.2 Our story — `about.story.*`
| Key | English | العربية |
| --- | --- | --- |
| `about.story.eyebrow` | Our story | قصّتنا |
| `about.story.title` | Bringing schools together across the Gulf. | نجمع المدارس معًا في أنحاء الخليج. |
| `about.story.body` | MADAREK brings together a growing network of schools across the GCC. From our first campuses in the UAE and Saudi Arabia, we continue to expand — guided by a single mission: to deliver internationally recognised education that develops well-rounded students and strengthens the communities we serve. | تجمع مدارك شبكة متنامية من المدارس في أنحاء دول مجلس التعاون الخليجي. ومن أولى مدارسنا في الإمارات والسعودية، نواصل التوسّع بدافع رسالةٍ واحدة: تقديم تعليمٍ معتمد عالميًا يُعِدّ طلبةً متكاملي الشخصية ويعزّز المجتمعات التي نخدمها. |

### 3.3 Vision & Mission — `about.visionMission.*`
| Key | English | العربية |
| --- | --- | --- |
| `about.visionMission.eyebrow` | Vision & Mission | الرؤية والرسالة |
| `about.visionMission.titleLine1` | Vision & | الرؤية |
| `about.visionMission.titleLine2` | mission. | والرسالة. |
| `about.visionMission.visionLabel` | Vision | الرؤية |
| `about.visionMission.vision` | To become a leading education platform recognized for delivering exceptional learning experiences and creating lasting value across the region. | أن نصبح منصّةً تعليمية رائدة يُشهَد لها بتقديم تجارب تعلّم استثنائية وخلق قيمة مستدامة في أنحاء المنطقة. |
| `about.visionMission.missionLabel` | Mission | الرسالة |
| `about.visionMission.mission` | To nurture future generations through accessible, high-quality education that combines academic excellence with innovation and global best practices. | أن نرعى الأجيال القادمة عبر تعليمٍ عالي الجودة وميسور المنال، يجمع بين التميّز الأكاديمي والابتكار وأفضل الممارسات العالمية. |

### 3.4 Four Pillars (full) — `about.pillars.*`
| Key | English | العربية |
| --- | --- | --- |
| `about.pillars.eyebrow` | Our Four Pillars | ركائزنا الأربع |
| `about.pillars.titleLine1` | Four pillars, | أربع ركائز، |
| `about.pillars.titleLine2` | one direction. | واتجاه واحد. |
| `about.pillars.items.excellence.title` | Educational Excellence | التميّز التعليمي |
| `about.pillars.items.excellence.detail` | Delivering high-quality learning experiences that foster academic achievement, critical thinking, and holistic development. | تقديم تجارب تعلّم عالية الجودة تُنمّي التحصيل الأكاديمي والتفكير الناقد والتنمية الشاملة. |
| `about.pillars.items.excellence.tags[0..2]` | Academic achievement · Critical thinking · Holistic development | التحصيل الأكاديمي · التفكير الناقد · التنمية الشاملة |
| `about.pillars.items.innovation.title` | Innovation | الابتكار |
| `about.pillars.items.innovation.detail` | Creating future-ready learning environments that embrace technology, creativity, and new approaches to education. | بناء بيئات تعلّم مواكبة للمستقبل تحتضن التقنية والإبداع والأساليب الحديثة في التعليم. |
| `about.pillars.items.innovation.tags[0..2]` | Technology · Creativity · New approaches | التقنية · الإبداع · أساليب جديدة |
| `about.pillars.items.growth.title` | Regional Growth | النمو الإقليمي |
| `about.pillars.items.growth.detail` | Building a leading education ecosystem through strategic expansion, partnerships, and collaboration across the GCC and beyond. | بناء منظومة تعليمية رائدة عبر التوسّع الاستراتيجي والشراكات والتعاون في أنحاء الخليج وخارجه. |
| `about.pillars.items.growth.tags[0..2]` | Strategic expansion · Partnerships · GCC & beyond | التوسّع الاستراتيجي · الشراكات · الخليج وما بعده |
| `about.pillars.items.impact.title` | Lasting Impact | أثرٌ مستدام |
| `about.pillars.items.impact.detail` | Creating positive and sustainable outcomes for students, educators, communities, and future generations. | تحقيق نتائج إيجابية ومستدامة للطلبة والمعلّمين والمجتمعات والأجيال القادمة. |
| `about.pillars.items.impact.tags[0..2]` | Students & educators · Communities · Future generations | الطلبة والمعلّمون · المجتمعات · الأجيال القادمة |

### 3.5 Educational Excellence — `about.excellence.*`
| Key | English | العربية |
| --- | --- | --- |
| `about.excellence.eyebrow` | Educational Excellence | التميّز التعليمي |
| `about.excellence.titleLine1` | A commitment to | التزامٌ تجاه |
| `about.excellence.titleLine2` | lifelong learning. | التعلّم مدى الحياة. |
| `about.excellence.body` | At MADAREK, we believe exceptional education extends beyond academic achievement. We strive to cultivate well-rounded individuals equipped with the skills, values, and mindset needed to succeed in an evolving world. | في مدارك، نؤمن بأن التعليم الاستثنائي يتجاوز حدود التحصيل الأكاديمي. فنحن نسعى إلى إعداد أفرادٍ متكاملي الشخصية يمتلكون المهارات والقيم والعقلية اللازمة للنجاح في عالمٍ متغيّر. |
| `about.excellence.items.studentCentered.title` | Student-Centered Learning | تعلّمٌ محوره الطالب |
| `about.excellence.items.studentCentered.note` | Placing students at the heart of the educational journey and fostering environments that encourage curiosity, creativity, and personal growth. | وضع الطالب في قلب المسيرة التعليمية، وتهيئة بيئات تحفّز الفضول والإبداع والنمو الشخصي. |
| `about.excellence.items.innovation.title` | Innovation in Education | الابتكار في التعليم |
| `about.excellence.items.innovation.note` | Embracing technology and modern teaching methodologies to prepare learners for the future. | احتضان التقنية وأساليب التدريس الحديثة لإعداد المتعلّمين للمستقبل. |
| `about.excellence.items.globalStandards.title` | Global Standards | معايير عالمية |
| `about.excellence.items.globalStandards.note` | Delivering internationally recognised curricula and best practices that support academic excellence. | تقديم مناهج وأفضل ممارسات معتمدة عالميًا تدعم التميّز الأكاديمي. |
| `about.excellence.items.holistic.title` | Holistic Development | تنمية شاملة |
| `about.excellence.items.holistic.note` | Supporting academic, personal, social, and emotional growth to develop well-rounded individuals. | دعم النمو الأكاديمي والشخصي والاجتماعي والعاطفي لإعداد أفرادٍ متكاملي الشخصية. |

---

## 4. Schools page & School detail
Source: [`src/pages.tsx`](src/pages.tsx) · `SchoolsPage`, `SchoolDetailPage`

### 4.1 Schools page hero — `schoolsPage.hero.*`
| Key | English | العربية |
| --- | --- | --- |
| `schoolsPage.hero.eyebrow` | Our Schools | مدارسنا |
| `schoolsPage.hero.title` | Investing in | استثمارٌ في |
| `schoolsPage.hero.italicTail` | educational excellence. | التميّز التعليمي. |
| `schoolsPage.hero.lede` | MADAREK's schools provide diverse learning environments designed to nurture academic achievement, creativity, and personal growth. | توفّر مدارس مدارك بيئات تعلّم متنوّعة مصمّمة لرعاية التحصيل الأكاديمي والإبداع والنمو الشخصي. |

### 4.2 School detail (UI labels) — `schoolDetail.*`
_The school values (name, overview, highlights…) are content — see §14._
| Key | English | العربية |
| --- | --- | --- |
| `schoolDetail.notFound` | School not found. | المدرسة غير موجودة. |
| `schoolDetail.backToAll` | Back to all schools | العودة إلى جميع المدارس |
| `schoolDetail.breadcrumb` | Breadcrumb | مسار التصفّح |
| `schoolDetail.facts` | Facts | معلومات أساسية |
| `schoolDetail.curriculum` | Curriculum | المنهج |
| `schoolDetail.grades` | Grades | الصفوف |
| `schoolDetail.ages` | Ages | الأعمار |
| `schoolDetail.languages` | Languages | اللغات |
| `schoolDetail.plannedCapacity` | Planned capacity | الطاقة الاستيعابية المخطّطة |
| `schoolDetail.totalStudents` | Total students | إجمالي الطلبة |
| `schoolDetail.overview` | Overview | نظرة عامة |
| `schoolDetail.highlights` | Highlights | أبرز المزايا |
| `schoolDetail.gallery` | Campus gallery | معرض صور المدرسة |
| `schoolDetail.contact` | Contact | تواصل |
| `schoolDetail.interestedIn` | Interested in | هل أنت مهتمّ بـ |
| `schoolDetail.address` | Address | العنوان |
| `schoolDetail.email` | Email | البريد الإلكتروني |
| `schoolDetail.contactAdmissions` | Contact admissions | تواصل مع القبول |

---

## 5. Foundation page
Source: [`src/pages.tsx`](src/pages.tsx) · `FoundationPage`

### 5.1 Hero & mission — `foundation.hero.*`, `foundation.mission.*`
| Key | English | العربية |
| --- | --- | --- |
| `foundation.hero.eyebrow` | MADAREK Foundation | مؤسسة مدارك |
| `foundation.hero.title` | Creating lasting impact | نصنع أثرًا مستدامًا |
| `foundation.hero.italicTail` | through education. | عبر التعليم. |
| `foundation.hero.lede` | Empowering communities and expanding opportunities through meaningful educational initiatives and partnerships. | تمكين المجتمعات وتوسيع الفرص من خلال مبادرات وشراكات تعليمية ذات معنى. |
| `foundation.mission.eyebrow` | Our mission | رسالتنا |
| `foundation.mission.title` | Education transforms lives. | التعليم يغيّر الحياة. |
| `foundation.mission.body` | The MADAREK Foundation reflects our commitment to creating positive and sustainable impact beyond the classroom. Through educational initiatives, community engagement, and strategic collaborations, we empower future generations and contribute to the advancement of the communities we serve — guided by the belief that education has the power to transform lives. | تجسّد مؤسسة مدارك التزامنا بخلق أثرٍ إيجابي ومستدام يتجاوز حدود الفصل الدراسي. فمن خلال المبادرات التعليمية والانخراط المجتمعي والشراكات الاستراتيجية، نمكّن الأجيال القادمة ونُسهم في تنمية المجتمعات التي نخدمها، إيمانًا منّا بقدرة التعليم على تغيير الحياة. |

### 5.2 Focus areas — `foundation.focusAreas.*`
| Key | English | العربية |
| --- | --- | --- |
| `foundation.focusAreas.eyebrow` | What we do | ما نقوم به |
| `foundation.focusAreas.title` | Where we focus. | مجالات تركيزنا. |
| `foundation.focusAreas.intro` | Five areas where the Foundation concentrates its programmes, initiatives, and partnerships. | خمسة مجالاتٍ تركّز فيها المؤسسة برامجها ومبادراتها وشراكاتها. |
| `foundation.focusAreas.items.access.title` | Access to Education | إتاحة التعليم |
| `foundation.focusAreas.items.access.detail` | Supporting initiatives that promote inclusive and accessible learning opportunities for individuals and communities. | دعم المبادرات التي تعزّز فرص تعلّم شاملة وميسورة للأفراد والمجتمعات. |
| `foundation.focusAreas.items.community.title` | Community Development | تنمية المجتمع |
| `foundation.focusAreas.items.community.detail` | Contributing to programs that strengthen communities and create meaningful, lasting social impact. | الإسهام في البرامج التي تعزّز المجتمعات وتُحدث أثرًا اجتماعيًا مستدامًا وذا معنى. |
| `foundation.focusAreas.items.empowerment.title` | Student Empowerment | تمكين الطلبة |
| `foundation.focusAreas.items.empowerment.detail` | Encouraging leadership, creativity, and lifelong learning so students can reach their full potential. | تشجيع القيادة والإبداع والتعلّم مدى الحياة ليبلغ الطلبة كامل إمكاناتهم. |
| `foundation.focusAreas.items.partnerships.title` | Partnerships for Good | شراكاتٌ للخير |
| `foundation.focusAreas.items.partnerships.detail` | Collaborating with institutions and organizations that share our vision of positive change through education. | التعاون مع المؤسسات والجهات التي تشاركنا رؤية التغيير الإيجابي عبر التعليم. |
| `foundation.focusAreas.items.sustainability.title` | Sustainability & Impact | الاستدامة والأثر |
| `foundation.focusAreas.items.sustainability.detail` | Creating long-term value through responsible initiatives that build a better future for generations to come. | خلق قيمة طويلة الأمد عبر مبادرات مسؤولة تبني مستقبلًا أفضل للأجيال القادمة. |

### 5.3 Get involved — `foundation.involvement.*`
| Key | English | العربية |
| --- | --- | --- |
| `foundation.involvement.eyebrow` | Get involved | شارك معنا |
| `foundation.involvement.title` | Be part of the work. | كن جزءًا من العمل. |
| `foundation.involvement.items.partner.title` | Partner with us | كن شريكًا لنا |
| `foundation.involvement.items.partner.detail` | For institutions and organizations whose mission aligns with advancing education across the region. | للمؤسسات والجهات التي تنسجم رسالتها مع النهوض بالتعليم في أنحاء المنطقة. |
| `foundation.involvement.items.support.title` | Support a cause | ادعم قضية |
| `foundation.involvement.items.support.detail` | Back the initiatives that expand access, strengthen communities, and empower students. | ادعم المبادرات التي توسّع الإتاحة وتعزّز المجتمعات وتمكّن الطلبة. |
| `foundation.involvement.items.collaborate.title` | Collaborate | تعاون معنا |
| `foundation.involvement.items.collaborate.detail` | For educators and changemakers bringing programs and ideas to the communities we serve. | للمعلّمين وصنّاع التغيير الذين يقدّمون برامج وأفكارًا للمجتمعات التي نخدمها. |
| `foundation.involvement.cta` | Partner with the Foundation | كن شريكًا للمؤسسة |

---

## 6. Academy page
Source: [`src/pages.tsx`](src/pages.tsx) · `AcademyPage`

### 6.1 Hero & overview — `academy.hero.*`, `academy.overview.*`
| Key | English | العربية |
| --- | --- | --- |
| `academy.hero.eyebrow` | MADAREK Academy | أكاديمية مدارك |
| `academy.hero.title` | Learning beyond | تعلّمٌ يتجاوز |
| `academy.hero.italicTail` | the classroom. | حدود الفصل الدراسي. |
| `academy.hero.lede` | Inspiring the next generation through enrichment programs, global experiences, and lifelong learning opportunities. | نُلهم الجيل القادم عبر برامج إثرائية وتجارب عالمية وفرص للتعلّم مدى الحياة. |
| `academy.overview.eyebrow` | Overview | نظرة عامة |
| `academy.overview.title` | A platform for student enrichment. | منصّةٌ لإثراء الطلبة. |
| `academy.overview.body` | MADAREK Academy is a platform for enrichment, leadership development, and collaborative experiences that empower students to explore new perspectives and unlock their full potential. By extending learning beyond traditional classrooms, we prepare students to thrive in a globally connected, rapidly evolving world. | أكاديمية مدارك منصّةٌ للإثراء وتطوير القيادة والتجارب التعاونية التي تمكّن الطلبة من استكشاف آفاقٍ جديدة وبلوغ كامل إمكاناتهم. وبتوسيع نطاق التعلّم خارج الفصول التقليدية، نُعِدّ الطلبة للنجاح في عالمٍ مترابط وسريع التغيّر. |

### 6.2 Programs — `academy.programs.*`
| Key | English | العربية |
| --- | --- | --- |
| `academy.programs.eyebrow` | Programs | البرامج |
| `academy.programs.title` | Six ways to grow. | ستّ طرقٍ للنمو. |
| `academy.programs.intro` | Enrichment that extends learning beyond the classroom — across the MADAREK ecosystem and around the world. | إثراءٌ يمتدّ بالتعلّم خارج الفصل الدراسي، عبر منظومة مدارك وحول العالم. |
| `academy.programs.items.exchange.title` | Student Exchange Programs | برامج التبادل الطلابي |
| `academy.programs.items.exchange.detail` | Opportunities to engage with peers across the MADAREK ecosystem and beyond — promoting cultural understanding, broader perspectives, and global citizenship. | فرصٌ للتفاعل مع الأقران عبر منظومة مدارك وخارجها، بما يعزّز التفاهم الثقافي واتّساع الآفاق والمواطنة العالمية. |
| `academy.programs.items.leadership.title` | Leadership Development | تطوير القيادة |
| `academy.programs.items.leadership.detail` | Mentorship programs, workshops, and experiential learning that cultivate confidence, collaboration, and responsibility in future leaders. | برامج إرشادية وورش عمل وتعلّم تجريبي تُنمّي الثقة والتعاون والمسؤولية لدى قادة المستقبل. |
| `academy.programs.items.innovation.title` | Innovation & Entrepreneurship | الابتكار وريادة الأعمال |
| `academy.programs.items.innovation.detail` | Initiatives that encourage creativity, critical thinking, and problem-solving to inspire the next generation of innovators and changemakers. | مبادرات تشجّع الإبداع والتفكير الناقد وحلّ المشكلات لإلهام الجيل القادم من المبتكرين وصنّاع التغيير. |
| `academy.programs.items.enrichment.title` | Academic Enrichment | الإثراء الأكاديمي |
| `academy.programs.items.enrichment.detail` | Competitions, educational camps, workshops, and specialized programs that complement and extend classroom education. | مسابقات ومخيّمات تعليمية وورش عمل وبرامج متخصّصة تُكمّل التعليم الصفّي وتوسّعه. |
| `academy.programs.items.collaboration.title` | Cross-School Collaboration | التعاون بين المدارس |
| `academy.programs.items.collaboration.detail` | Shared initiatives, projects, and experiences that connect students and educators across the MADAREK ecosystem. | مبادرات ومشاريع وتجارب مشتركة تربط الطلبة والمعلّمين عبر منظومة مدارك. |
| `academy.programs.items.partnerships.title` | Global Partnerships | الشراكات العالمية |
| `academy.programs.items.partnerships.detail` | Collaborations with leading institutions and organizations that open broader opportunities and exposure to international best practices. | شراكاتٌ مع مؤسسات وجهات رائدة تتيح فرصًا أوسع وانفتاحًا على أفضل الممارسات العالمية. |

### 6.3 Who it's for & vision — `academy.whoFor.*`, `academy.vision.*`
| Key | English | العربية |
| --- | --- | --- |
| `academy.whoFor.eyebrow` | Who it's for | لمن هذه الأكاديمية |
| `academy.whoFor.title` | Open to every MADAREK student. | مفتوحةٌ لكل طالبٍ في مدارك. |
| `academy.whoFor.whoLabel` | Who it's for | لمن هذه الأكاديمية |
| `academy.whoFor.who` | MADAREK Academy is open to students across our schools and the wider community, with programmes designed for a range of ages and stages. | أكاديمية مدارك مفتوحةٌ للطلبة في مختلف مدارسنا وللمجتمع الأوسع، ببرامج مصمّمة لمختلف الأعمار والمراحل. |
| `academy.whoFor.joinLabel` | How to join | كيفية الانضمام |
| `academy.whoFor.join` | Enrolment opens ahead of each programme. To register interest or learn more about dates and eligibility, get in touch with our team. | يُفتَح التسجيل قبل كل برنامج. للتعبير عن اهتمامك أو معرفة المزيد عن المواعيد وشروط الالتحاق، تواصل مع فريقنا. |
| `academy.vision.title` | To inspire lifelong learners and future leaders. | لنُلهم متعلّمين مدى الحياة وقادةً للمستقبل. |
| `academy.vision.body` | By creating experiences that extend beyond the classroom and prepare students to succeed in an interconnected world. | عبر إتاحة تجارب تتجاوز حدود الفصل الدراسي وتُعِدّ الطلبة للنجاح في عالمٍ مترابط. |
| `academy.vision.cta` | Express interest | سجّل اهتمامك |

---

## 7. Contact page
Source: [`src/pages.tsx`](src/pages.tsx) · `ContactPage`

### 7.1 Header — `contactPage.*`
| Key | English | العربية |
| --- | --- | --- |
| `contactPage.eyebrow` | Contact | تواصل |
| `contactPage.titleLine` | Let's shape the future | لِنصنع المستقبل |
| `contactPage.titleAccent` | together. | معًا. |
| `contactPage.intro` | Whether you are a parent, educator, institution, or strategic partner, we welcome the opportunity to connect and explore how we can create meaningful educational experiences together. | سواء كنت وليّ أمرٍ أو معلّمًا أو مؤسسةً أو شريكًا استراتيجيًا، نرحّب بالتواصل معك لاستكشاف سبل صناعة تجارب تعليمية ذات معنى معًا. |

### 7.2 Form — `contactPage.form.*`
| Key | English | العربية |
| --- | --- | --- |
| `contactPage.form.eyebrow` | Send us a note | أرسل لنا رسالة |
| `contactPage.form.thankYou` | Thank you. | شكرًا لك. |
| `contactPage.form.thankYouBody` | Your note is on its way. Someone from our team will reply within two working days. In the meantime, you can also reach us at | رسالتك في طريقها إلينا. سيردّ عليك أحد أفراد فريقنا خلال يومَي عمل. وفي غضون ذلك، يمكنك أيضًا مراسلتنا على |
| `contactPage.form.name` | Your name | اسمك |
| `contactPage.form.email` | Email | البريد الإلكتروني |
| `contactPage.form.role` | I am a... | أنا... |
| `contactPage.form.roleParent` | Parent | وليّ أمر |
| `contactPage.form.roleEducator` | Educator | معلّم |
| `contactPage.form.rolePartner` | Partner | شريك |
| `contactPage.form.roleOther` | Other | أخرى |
| `contactPage.form.message` | Message | الرسالة |
| `contactPage.form.submit` | Send message → | إرسال الرسالة ← |

### 7.3 Direct contact — `contactPage.direct.*`
| Key | English | العربية |
| --- | --- | --- |
| `contactPage.direct.eyebrow` | Direct | تواصل مباشر |
| `contactPage.direct.generalLabel` | General Inquiries | الاستفسارات العامة |
| `contactPage.direct.general` | For general questions and information, please contact our team. | للأسئلة والمعلومات العامة، يُرجى التواصل مع فريقنا. |
| `contactPage.direct.partnershipsLabel` | Partnerships | الشراكات |
| `contactPage.direct.partnerships` | Interested in collaborating with MADAREK? We welcome opportunities to build meaningful partnerships that advance education and create lasting impact. | مهتمٌّ بالتعاون مع مدارك؟ نرحّب بفرص بناء شراكات ذات معنى تنهض بالتعليم وتُحدث أثرًا مستدامًا. |
| `contactPage.direct.careersLabel` | Careers | الوظائف |
| `contactPage.direct.careers` | Join us in shaping the future of learning. | انضمّ إلينا في صناعة مستقبل التعليم. |
| `contactPage.direct.locationsLabel` | Locations | المواقع |
| `contactPage.direct.locations` | Dubai, UAE · Riyadh, KSA | دبي، الإمارات · الرياض، السعودية |
| `contactPage.direct.socialLabel` | Social | وسائل التواصل |

---

## 8. Leadership (About subsection)
Source: [`src/pages.tsx`](src/pages.tsx) · `LeadershipSection`, `BoardWall`, `LeadershipFeature`, `ShareholdingSection`

### 8.1 Section chrome — `leadership.*`
| Key | English | العربية |
| --- | --- | --- |
| `leadership.governance.eyebrow` | Governance | الحوكمة |
| `leadership.governance.titleLine1` | Board of | مجلس |
| `leadership.governance.titleLine2` | Directors. | الإدارة. |
| `leadership.governance.body` | Strategic oversight, governance, and stewardship across the group. | إشرافٌ استراتيجي وحوكمة ورعاية على مستوى المجموعة. |
| `leadership.boardUnited` | MADAREK United | مدارك المتحدة |
| `leadership.boardHoldings` | MADAREK Holdings | مدارك القابضة |
| `leadership.team.eyebrow` | Leadership & Management | القيادة والإدارة |
| `leadership.team.titleLine1` | The people | الأشخاص |
| `leadership.team.titleLine2` | behind the schools. | خلف المدارس. |
| `leadership.team.body` | Executive leadership steering MADAREK's growth, school operations, and long-term education platform strategy. | قيادةٌ تنفيذية توجّه نمو مدارك وعمليات المدارس واستراتيجية المنصّة التعليمية طويلة الأمد. |
| `leadership.leadershipLabel` | Leadership | القيادة |
| `leadership.managementLabel` | Management | الإدارة |

### 8.2 Board roles — `board.*`
| Key | English | العربية |
| --- | --- | --- |
| `board.roles.chairman` | Chairman of the Board | رئيس مجلس الإدارة |
| `board.roles.viceChairman` | Vice Chairman of the Board | نائب رئيس مجلس الإدارة |
| `board.roles.member` | Board Member | عضو مجلس الإدارة |
| `board.tba` | To be announced | يُعلَن لاحقًا |
| `board.seatTba` | Board seat to be announced | مقعدٌ في المجلس يُعلَن لاحقًا |

Board member **names** — transliterated (`board.names.*`); `BOARD_UNITED`/`BOARD_HOLDINGS` in `src/pages.tsx` reference these by `nameKey`.
| Key | English | العربية |
| --- | --- | --- |
| `board.names.majid-al-hokair` | Majid Abdulhassan bin Abdulaziz Al Hokair | ماجد عبدالحسن بن عبدالعزيز الحكير |
| `board.names.sulaiman-al-abduljader` | Dr. Sulaiman Tareq Al Abduljader | د. سليمان طارق العبدالجادر |
| `board.names.shukri-mansoor` | Shukri Abdulfattah Shukri Mansoor | شكري عبدالفتاح شكري منصور |
| `board.names.omar-al-jassar` | Omar Abdulaziz Sulaiman Al Jassar | عمر عبدالعزيز سليمان الجسار |
| `board.names.fahad-albassam` | Fahad Abdulrahman Muhammad Albassam | فهد عبدالرحمن محمد البسام |
| `board.names.omar-alshayeji` | Omar Saleh Shayej AlShayeji | عمر صالح شايع الشايجي |
| `board.names.monira-al-wugayan` | Monira Adel Ahmad Al Wugayan | منيرة عادل أحمد الوقيان |
| `board.names.jassem-zainal` | Jassem Hassan Zainal | جاسم حسن زينل |
| `board.names.issah-al-muzaini` | Issah Abdullah Issah Al Muzaini | عيسى عبدالله عيسى المزيني |

### 8.3 Executive leaders — `leaders.<slug>.*`
| Key | English | العربية |
| --- | --- | --- |
| `leaders.shukri-mansour.name` | Dr Shukri A. Mansour | د. شكري أ. منصور |
| `leaders.mohamed-hussein-motawea.name` | Mohamed Hussein Motawea | محمد حسين المتوّع |
| `leaders.haris-moideen.name` | Haris Moideen | هاريس مويدين |
| `leaders.shukri-mansour.eyebrow` | CEO for MADAREK KSA | الرئيس التنفيذي لمدارك السعودية |
| `leaders.shukri-mansour.title` | Chief Executive Officer | الرئيس التنفيذي |
| `leaders.shukri-mansour.preview` | Leads MADAREK KSA across strategy, operations, and organizational direction. | يقود مدارك السعودية في الاستراتيجية والعمليات والتوجّه المؤسسي. |
| `leaders.mohamed-hussein-motawea.eyebrow` | CEO for MADAREK UAE | الرئيس التنفيذي لمدارك الإمارات |
| `leaders.mohamed-hussein-motawea.title` | Chief Executive Officer & Schools Director | الرئيس التنفيذي ومدير المدارس |
| `leaders.mohamed-hussein-motawea.preview` | Strategic and operational leadership for MADAREK UAE and Al Maaref American School, with 30+ years transforming schools across the region. | قيادةٌ استراتيجية وتشغيلية لمدارك الإمارات ومدرسة المعارف الأمريكية، بخبرةٍ تتجاوز 30 عامًا في تطوير المدارس عبر المنطقة. |
| `leaders.mohamed-hussein-motawea.bio[0]` | As Chief Executive Officer and Schools Director at MADAREK UAE, Mohamed Hussein Motawea provides strategic and operational leadership for Al Maaref American School in Dubai. | بصفته الرئيس التنفيذي ومدير المدارس في مدارك الإمارات، يتولّى محمد حسين المتوّع القيادة الاستراتيجية والتشغيلية لمدرسة المعارف الأمريكية في دبي. |
| `leaders.mohamed-hussein-motawea.bio[1]` | With over 30 years of experience transforming schools across the UAE and Egypt — including 15 years in senior leadership — he is widely recognised for building high-performing teams, driving measurable school improvement, and embedding a culture of excellence across entire school communities. | وبخبرةٍ تتجاوز 30 عامًا في تطوير المدارس عبر الإمارات ومصر — منها 15 عامًا في المناصب القيادية العليا — يُعرَف بقدرته على بناء فرقٍ عالية الأداء وتحقيق تحسّنٍ مدرسي ملموس وترسيخ ثقافة التميّز في مجتمعات المدارس بأكملها. |
| `leaders.mohamed-hussein-motawea.bio[2]` | In 2025, he was honoured with the NEASC Commission on International Education Service Award, a prestigious global recognition of his contributions to international education. Among his key achievements, he led Al Zuhour Private School from an 'Acceptable' to a 'Good' rating by SPEA, guiding a community of over 3,000 students and 300 staff through a sustained improvement journey. | وفي عام 2025، حظي بجائزة الخدمة من لجنة نيو إنجلاند لاعتماد المدارس والكليات (NEASC) في مجال التعليم الدولي، وهي تكريمٌ عالمي مرموق لإسهاماته في التعليم الدولي. ومن أبرز إنجازاته، ارتقاؤه بمدرسة الزهور الخاصة من تقييم «مقبول» إلى «جيّد» وفق هيئة الشارقة للتعليم الخاص (SPEA)، بقيادة مجتمعٍ يضمّ أكثر من 3٬000 طالب و300 موظف عبر مسيرة تحسّنٍ متواصلة. |
| `leaders.mohamed-hussein-motawea.bio[3]` | He brings deep expertise in UAE regulatory frameworks, including KHDA and SPEA/MOE inspections, as well as international accreditation through NEASC and Cognia. He has served as a NEASC Visiting Team Member and has chaired accreditation visits for international schools across the Gulf and beyond. | ويمتلك خبرةً عميقة في الأطر التنظيمية بدولة الإمارات، بما في ذلك تفتيش هيئة المعرفة والتنمية البشرية (KHDA) وهيئة الشارقة للتعليم الخاص ووزارة التربية والتعليم، إلى جانب الاعتماد الدولي عبر NEASC وCognia. وقد عمل عضوًا في فرق الزيارة التابعة لـNEASC وترأّس زيارات اعتماد لمدارس دولية في الخليج وخارجه. |
| `leaders.mohamed-hussein-motawea.bio[4]` | He holds a Master's degree in Management from the University of Lincoln, UK, and dual bachelor's degrees in Education and Business & Finance from Alexandria University, and is a licensed School Principal by the UAE Ministry of Education. | ويحمل درجة الماجستير في الإدارة من جامعة لينكولن بالمملكة المتحدة، ودرجتَي بكالوريوس في التربية وفي إدارة الأعمال والتمويل من جامعة الإسكندرية، وهو مدير مدرسة مرخّص من وزارة التربية والتعليم بدولة الإمارات. |
| `leaders.haris-moideen.eyebrow` | Finance Leadership | القيادة المالية |
| `leaders.haris-moideen.title` | Acting CFO & Board Secretary | الرئيس التنفيذي المالي بالإنابة وأمين سرّ المجلس |
| `leaders.haris-moideen.preview` | A Chartered Accountant with over 25 years in finance and governance, overseeing financial management, compliance, and board affairs. | محاسبٌ قانوني بخبرةٍ تتجاوز 25 عامًا في المالية والحوكمة، يشرف على الإدارة المالية والامتثال وشؤون المجلس. |
| `leaders.haris-moideen.bio[0]` | A Chartered Accountant and member of the Institute of Chartered Accountants of India, Haris Moideen brings over 25 years of experience across accounting, finance, and corporate governance. | محاسبٌ قانوني وعضوٌ في معهد المحاسبين القانونيين بالهند، يمتلك هاريس مويدين خبرةً تتجاوز 25 عامًا في المحاسبة والمالية وحوكمة الشركات. |
| `leaders.haris-moideen.bio[1]` | His career spans respected organisations including ICFAI University, the Arenco Group, and EXL Inc. He joined MADAREK in 2013 and today serves as Acting Chief Financial Officer and Board Secretary, overseeing financial management, compliance, and governance. | امتدّت مسيرته المهنية عبر مؤسسات مرموقة من بينها جامعة ICFAI ومجموعة أرينكو وشركة EXL. وقد انضمّ إلى مدارك عام 2013، ويشغل اليوم منصب الرئيس التنفيذي المالي بالإنابة وأمين سرّ المجلس، مشرفًا على الإدارة المالية والامتثال والحوكمة. |

_Leader names are transliterated above (`leaders.<slug>.name`); `LEADERS` in `src/pages.tsx` keeps the Latin form for image alt/initials._

### 8.4 Shareholders — `shareholders.*`
| Key | English | العربية |
| --- | --- | --- |
| `shareholders.eyebrow` | Ownership | الملكية |
| `shareholders.titleLine1` | Our | مساهمونا |
| `shareholders.titleLine2` | shareholders. | الكرام. |
| `shareholders.intro` | The institutions and partners invested in MADAREK's continued growth across the region. | المؤسسات والشركاء المستثمرون في نمو مدارك المتواصل عبر المنطقة. |
| `shareholders.visitWebsite` | Visit website | زيارة الموقع |
| `shareholders.names.sanam` | SANAM Capital Holding | سنام كابيتال القابضة |
| `shareholders.names.al-hokair` | Al Hokair Group | مجموعة الحكير |
| `shareholders.names.gee` | Global Educational Excellence | جلوبال التعليمية للتميّز |
| `shareholders.names.al-jasser` | Al Jasser Holding | الجسار القابضة |

_Shareholder names are transliterated above (`shareholders.names.*`); logos remain the brands' own artwork._

---

## 9. Leader detail page
Source: [`src/pages.tsx`](src/pages.tsx) · `LeaderDetailPage`

| Key | English | العربية |
| --- | --- | --- |
| `leaderDetail.notFound` | Leader not found. | القيادي غير موجود. |
| `leaderDetail.backToLeadership` | Back to leadership | العودة إلى القيادة |
| `leaderDetail.leadership` | Leadership | القيادة |
| `leaderDetail.about` | About | نبذة |
| `leaderDetail.teamEyebrow` | The team | الفريق |
| `leaderDetail.otherLine1` | Other | قياديون |
| `leaderDetail.otherLine2` | leaders. | آخرون. |
| `leaderDetail.ctaLine1` | Meet the rest | تعرّف على بقية |
| `leaderDetail.ctaLine2` | of the team. | الفريق. |
| `leaderDetail.viewAll` | View all leadership | عرض جميع القيادات |
| `leaderDetail.readFullProfile` | Read full profile | اقرأ الملف الكامل |

---

## 10. Media page
Source: [`src/pages.tsx`](src/pages.tsx) · `MediaPage`, `MediaCard`, `FeaturedMedia`
_Article titles, excerpts, categories & sources are content — see §14._

| Key | English | العربية |
| --- | --- | --- |
| `media.hero.eyebrow` | Media | المركز الإعلامي |
| `media.hero.title` | Stay | ابقَ |
| `media.hero.italicTail` | connected. | على تواصل. |
| `media.hero.lede` | The latest announcements, achievements, partnerships, and stories from across the MADAREK ecosystem. | أحدث الإعلانات والإنجازات والشراكات والقصص من مختلف أنحاء منظومة مدارك. |
| `media.filterAll` | All | الكل |
| `media.latest` | Latest | الأحدث |
| `media.moreNews` | More news | مزيدٌ من الأخبار |
| `media.empty` | No news in this category yet. | لا توجد أخبارٌ في هذا التصنيف بعد. |
| `media.readMore` | Read more | اقرأ المزيد |
| `media.readArticle` | Read article | اقرأ المقال |
| `media.readAnnouncement` | Read the announcement | اقرأ الإعلان |
| `media.categories.Announcements` | Announcements | إعلانات |
| `media.categories.Achievements` | Achievements | إنجازات |
| `media.categories.Press Release` | Press Release | بيان صحفي |
| `media.categories.Partnerships` | Partnerships | شراكات |
| `media.categories.Events` | Events | فعاليات |

---

## 11. Media article page
Source: [`src/pages.tsx`](src/pages.tsx) · `MediaArticlePage`
_Article title & body HTML are content — see §14._

| Key | English | العربية |
| --- | --- | --- |
| `mediaArticle.notFound` | Article not found. | المقال غير موجود. |
| `mediaArticle.backToMedia` | Back to media | العودة إلى المركز الإعلامي |
| `mediaArticle.allNews` | All news | جميع الأخبار |
| `mediaArticle.watchReel` | Watch the reel | شاهد المقطع |
| `mediaArticle.backToAllNews` | Back to all news | العودة إلى جميع الأخبار |

---

## 12. Careers page
Source: [`src/pages.tsx`](src/pages.tsx) · `CareersPage`

| Key | English | العربية |
| --- | --- | --- |
| `careers.hero.eyebrow` | Careers at MADAREK | الوظائف في مدارك |
| `careers.hero.title` | Join the future | انضمّ إلى مستقبل |
| `careers.hero.italicTail` | of education. | التعليم. |
| `careers.hero.lede` | We attract, develop, and empower talented people who share our passion for education and innovation. | نستقطب المواهب ونطوّرها ونمكّنها ممن يشاركوننا شغف التعليم والابتكار. |
| `careers.general.eyebrow` | General application | التقديم العام |
| `careers.general.titleLine1` | Don't see | لم تجد |
| `careers.general.titleLine2` | your role? | وظيفتك؟ |
| `careers.general.body` | We're always looking for talented educators and professionals who share our mission. Send us your CV and tell us how you'd like to contribute. | نبحث دائمًا عن معلّمين ومهنيين موهوبين يشاركوننا رسالتنا. أرسل لنا سيرتك الذاتية وأخبرنا كيف تودّ أن تُسهم. |
| `careers.general.cta` | Submit application | قدّم طلبك |

---

## 13. Schools explorer (map)
Source: [`src/schools-explorer.tsx`](src/schools-explorer.tsx)

| Key | English | العربية |
| --- | --- | --- |
| `schoolsExplorer.eyebrow` | Our presence | حضورنا |
| `schoolsExplorer.titleLine1` | Growing across | ننمو في أنحاء |
| `schoolsExplorer.titleLine2` | the Gulf. | الخليج. |
| `schoolsExplorer.intro` | Premium campuses across the UAE and Saudi Arabia — each carrying its own character, all sharing the MADAREK framework, with more on the way. | مدارس متميّزة في الإمارات والسعودية، لكلٍّ منها طابعها الخاص، وتجمعها منظومة مدارك، ومزيدٌ في الطريق. |
| `schoolsExplorer.stats.campuses` | Campuses | المدارس |
| `schoolsExplorer.stats.cities` | Cities | المدن |
| `schoolsExplorer.stats.countries` | Countries | الدول |
| `schoolsExplorer.stats.curricula` | Curricula | المناهج |
| `schoolsExplorer.ourCampuses` | Our campuses | مدارسنا |
| `schoolsExplorer.mapLabel` | Map of the Gulf showing {{count}} Madarek campuses | خريطة الخليج تُظهر {{count}} من مدارس مدارك |
| `schoolsExplorer.viewCampusDetails` | View campus details → | عرض تفاصيل المدرسة ← |
| `schoolsExplorer.card.ages` | Ages {{ages}} | الأعمار {{ages}} |
| `schoolsExplorer.card.capacity` | Capacity {{value}} | الطاقة الاستيعابية {{value}} |
| `schoolsExplorer.card.students` | {{value}} students | {{value}} طالبًا |
| `schoolsExplorer.card.details` | Details | التفاصيل |

---

## 14. Content data (`src/data.ts`)

This content lives in [`src/data.ts`](src/data.ts) as structured records with
parallel Arabic fields. The `useLocalizedSchool` / `useLocalizedMedia` helpers
(`src/i18n/localize.ts`) swap in the Arabic field when the language is `ar`.

- **Schools** — ✅ each record carries `nameAr`, `shortAr`, `locationAr`,
  `curriculumAr`, `gradesAr`, `languagesAr`, `addressAr`, `descriptionAr`,
  `overviewAr`, `highlightsAr[]`. The prose is shown below.
- **Media** — ✅ all four items carry `titleAr`, `excerptAr`, `bodyAr`,
  `sourceAr`. Category labels are translated via `media.categories.*` (§10).
- **Not translated (identifiers):** `slug`, `id`, image paths, emails, website
  URLs, and dates.

### 14.1 Schools — profile prose
_Structural fields (curriculum codes, ages, student counts, addresses) shown for context but usually left as-is._

**Al Maaref American School** (`al-maaref-american-school`)
| Field | English | العربية |
| --- | --- | --- |
| description | An American curriculum school in Dubai, established in 1987 — educating students from Early Years to High School through to the US High School Diploma. | مدرسة تتبع المنهج الأمريكي في دبي، تأسست عام 1987 — تُعلّم الطلبة من المراحل المبكرة حتى المرحلة الثانوية وصولًا إلى دبلوم الثانوية الأمريكية. |
| overview | Established in 1987, Al Maaref American School is one of Dubai's longest-standing American schools. It delivers a US-standards curriculum from Early Years to High School, with an approach built around independent thinking, creativity, and real-world problem-solving — inside a kind, inclusive community that brings together students of many nationalities. | تأسست مدرسة المعارف الأمريكية عام 1987، وهي من أعرق المدارس الأمريكية في دبي. تقدّم منهجًا وفق المعايير الأمريكية من المراحل المبكرة حتى المرحلة الثانوية، بنهجٍ يقوم على التفكير المستقل والإبداع وحلّ المشكلات الواقعية — ضمن مجتمعٍ متسامح وشامل يجمع طلبةً من جنسيات متعددة. |
| highlights[0] | Established in 1987 — one of Dubai's longest-standing American schools | تأسست عام 1987 — من أعرق المدارس الأمريكية في دبي |
| highlights[1] | American curriculum aligned to US standards, leading to the US High School Diploma | منهج أمريكي متوافق مع المعايير الأمريكية يُفضي إلى دبلوم الثانوية الأمريكية |
| highlights[2] | Accredited by NEASC and Cognia, with College Board programmes | معتمدة من NEASC وCognia، وتقدّم برامج College Board |
| highlights[3] | Learning built on independent thinking, creativity, and real-world problem-solving | تعلّمٌ قائم على التفكير المستقل والإبداع وحلّ المشكلات الواقعية |
| highlights[4] | Modern facilities — science labs, libraries, arts studios, and dedicated play areas | مرافق حديثة — مختبرات علوم ومكتبات واستوديوهات فنون ومناطق لعب مخصّصة |

**MGIS — Qortuba Campus** (`mgis-qortuba-campus`)
| Field | English | العربية |
| --- | --- | --- |
| description | An American curriculum enriched by the IB framework — Nursery to Grade 9, in the heart of Riyadh. | منهج أمريكي مُثرى بإطار البكالوريا الدولية — من الحضانة حتى الصف التاسع، في قلب الرياض. |
| overview | MGIS Qortuba Campus is a leading international school in Riyadh offering an American curriculum enriched by the IB framework. Serving students from Nursery to Grade 9, the campus provides a nurturing learning environment that promotes academic excellence, character development, and global citizenship while preparing students for lifelong success. | يُعدّ فرع قرطبة لمدارس جلوبال العالمية الحديثة من المدارس العالمية الرائدة في الرياض، ويقدّم منهجًا أمريكيًا مُثرى بإطار البكالوريا الدولية. وبخدمته الطلبة من الحضانة حتى الصف التاسع، يوفّر الفرع بيئة تعلّم راعية تعزّز التميّز الأكاديمي وبناء الشخصية والمواطنة العالمية، مع إعداد الطلبة للنجاح مدى الحياة. |
| highlights[0] | American curriculum structured around IB-PYP framework | منهج أمريكي مبني على إطار البكالوريا الدولية للسنوات الابتدائية (IB-PYP) |
| highlights[1] | Average class size of 18 students, maximum 24 | متوسط حجم الصف 18 طالبًا، بحدٍّ أقصى 24 |
| highlights[2] | Comprehensive facilities: science labs, art, music, theatre | مرافق متكاملة: مختبرات علوم وفنون وموسيقى ومسرح |
| highlights[3] | Clubs across reading, chess, music, recycling, art | أندية في القراءة والشطرنج والموسيقى وإعادة التدوير والفنون |
| highlights[4] | Sports: soccer, basketball, gymnastics, aerobics | رياضات: كرة القدم وكرة السلة والجمباز والأيروبيك |
| highlights[5] | Strong Arabic instruction and Manners programme | تعليمٌ قوي للغة العربية وبرنامج للسلوك والأخلاق |

**MGIS — Digital City Campus** (`mgis-digital-city-campus`)
| Field | English | العربية |
| --- | --- | --- |
| description | Providing innovative learning experiences that inspire curiosity, creativity, and lifelong achievement. | يقدّم تجارب تعلّم مبتكرة تُلهم الفضول والإبداع والإنجاز مدى الحياة. |
| overview | MGIS Digital City is the network's youngest campus — trilingual, technology-rich, and designed around family partnerships and a love-of-learning approach. | فرع المدينة الرقمية هو أحدث فروع الشبكة — ثلاثي اللغة وغني بالتقنية، ومصمَّم حول الشراكة مع الأسرة ونهج حبّ التعلّم. |
| highlights[0] | American curriculum based on US Common Core Standards | منهج أمريكي قائم على معايير الأساس المشترك الأمريكية |
| highlights[1] | Advanced technology integration across all classrooms | دمج تقني متقدّم في جميع الفصول |
| highlights[2] | Trilingual: English, Arabic, French | ثلاثي اللغة: الإنجليزية والعربية والفرنسية |
| highlights[3] | Co-educational with strong parent engagement | تعليم مختلط مع انخراط قوي لأولياء الأمور |
| highlights[4] | Family-oriented culture | ثقافة تُعنى بالأسرة |
| highlights[5] | Operating hours: Sunday–Thursday, 7:30 AM–2:00 PM | ساعات العمل: الأحد–الخميس، 7:30 صباحًا–2:00 ظهرًا |

**Sharjah Sustainable City School** (`sharjah-sustainable-city`, upcoming)
| Field | English | العربية |
| --- | --- | --- |
| description | An upcoming American curriculum K-12 school in Sharjah Sustainable City — a USD 50 million campus designed for around 2,435 students, developed in partnership with Shurooq. | مدرسة أمريكية مرتقبة من الروضة حتى الصف الثاني عشر في مدينة الشارقة المستدامة — حرمٌ بقيمة 50 مليون دولار أمريكي مصمَّم لنحو 2,435 طالبًا، يُطوَّر بالشراكة مع «شروق». |
| overview | An upcoming K-12 school in Sharjah Sustainable City, developed in partnership between MADAREK and the Sharjah Investment and Development Authority (Shurooq). Following the American curriculum, the USD 50 million campus is designed for around 2,435 students from kindergarten to Grade 12 — set within one of the emirate's leading sustainable communities and built around innovation, wellbeing, and collaborative learning. | مدرسة مرتقبة من الروضة حتى الصف الثاني عشر في مدينة الشارقة المستدامة، تُطوَّر بالشراكة بين مدارك وهيئة الشارقة للاستثمار والتطوير «شروق». وباتّباعها المنهج الأمريكي، صُمِّم الحرم البالغة قيمته 50 مليون دولار أمريكي لنحو 2,435 طالبًا من الروضة حتى الصف الثاني عشر — ضمن إحدى أبرز المجتمعات المستدامة في الإمارة، وهو مبنيٌّ حول الابتكار والرفاه والتعلّم التعاوني. |
| highlights[0] | American curriculum, kindergarten to Grade 12 | منهج أمريكي، من الروضة حتى الصف الثاني عشر |
| highlights[1] | USD 50 million campus in Sharjah Sustainable City | حرمٌ بقيمة 50 مليون دولار أمريكي في مدينة الشارقة المستدامة |
| highlights[2] | Designed for around 2,435 students on a 29,275 m² site | مصمَّم لنحو 2,435 طالبًا على موقعٍ مساحته 29,275 م² |
| highlights[3] | Science, IT, robotics, engineering and mathematics labs, with maker and innovation spaces | مختبرات للعلوم وتقنية المعلومات والروبوتات والهندسة والرياضيات، مع مساحات للابتكار والصناعة |
| highlights[4] | Three libraries, arts studios, a black box theatre, and a 500-seat multi-purpose hall | ثلاث مكتبات واستوديوهات فنون ومسرح صندوقي أسود وقاعة متعددة الأغراض تتّسع لـ500 مقعد |
| highlights[5] | Learning support centre with therapy and sensory rooms, and dedicated clinics | مركز لدعم التعلّم يضمّ غرف علاج ودمج حسّي وعيادات مخصّصة |
| highlights[6] | Indoor sports hall, main and learner swimming pools, and rooftop recreation | صالة رياضية مغلقة ومسبح رئيسي ومسبح للمتعلّمين ومرافق ترفيهية على السطح |
| highlights[7] | Green spaces, a botanical garden, and shaded pedestrian walkways | مساحات خضراء وحديقة نباتية وممرات مشاة مظلّلة |

### 14.2 Media — titles & excerpts
_`body` (and `titleAr`/`excerptAr`/`bodyAr`) hold the full press releases. Existing Arabic status noted per item._

**`mgis-third-campus-riyadh`** — category: Announcements · _Arabic: ✅ (data.ts)_
| Field | English | العربية |
| --- | --- | --- |
| title | MADAREK United signs 25-year agreement to develop a third MGIS campus in Riyadh | مدارك المتحدة توقّع اتفاقية مدتها 25 عامًا لتطوير فرعٍ ثالث لمدارس جلوبال العالمية الحديثة في الرياض |
| excerpt | Through its subsidiary Modern MENA Company for Education, MADAREK United has signed a 25-year investment agreement to develop the third Modern Global International Schools (MGIS) campus in Riyadh. | من خلال شركتها التابعة «مودرن مينا للتعليم»، وقّعت مدارك المتحدة اتفاقية استثمارية مدتها 25 عامًا لتطوير الفرع الثالث لمدارس جلوبال العالمية الحديثة (MGIS) في الرياض. |
| body | _(3-paragraph HTML in `data.ts` — translate to `bodyAr`)_ | ✅ نصّ عربي كامل في data.ts (bodyAr) |

**`mas-wellbeing-award-for-schools`** — category: Achievements · _Arabic: ✅ (data.ts)_
| Field | English | العربية |
| --- | --- | --- |
| title | Al Maaref American School achieves the Wellbeing Award for Schools | مدرسة المعارف الأمريكية تحصل على جائزة الرفاه للمدارس |
| excerpt | Al Maaref American School has been awarded the Wellbeing Award for Schools (WAS), delivered in partnership with the National Children's Bureau — accredited through 2029. | حصلت مدرسة المعارف الأمريكية على جائزة الرفاه للمدارس (WAS)، المقدَّمة بالشراكة مع المكتب الوطني للطفولة — باعتمادٍ ساري المفعول حتى عام 2029. |
| body | _(3-paragraph HTML in `data.ts` — translate to `bodyAr`)_ | ✅ نصّ عربي كامل في data.ts (bodyAr) |

**`shurooq-madarek-sharjah-k12`** — category: Press Release · _Arabic: ✅ already present (`titleAr`/`excerptAr`/`bodyAr`)_
| Field | English | العربية |
| --- | --- | --- |
| title | Shurooq and SANAM Group sign agreement to develop USD 50 million K-12 school in Sharjah Sustainable City | شراكة استراتيجية بين مجموعة سنام القابضة وهيئة الشارقة للاستثمار والتطوير «شروق» لتأسيس مدرسة دولية بقيمة استثمار تصل إلى 50 مليون دولار |
| excerpt | The new American curriculum school, developed in partnership with MADAREK, SANAM Group's education platform, will serve around 2,435 students from kindergarten to Grade 12. | المشروع يعزز رؤية سنام طويلة الأمد للاستثمار في البنية التحتية التعليمية المبتكرة والمستدامة في دول الخليج والإسهام في تطوير قطاع التعليم بالمنطقة |
| body | _(full HTML `BODY_SHUROOQ_EN` / `BODY_SHUROOQ_AR` in `data.ts`)_ | ✅ نصّ عربي كامل في data.ts (bodyAr) |

**`sanam-acquires-mgis-riyadh`** — category: Press Release · _Arabic: ✅ already present_
| Field | English | العربية |
| --- | --- | --- |
| title | SANAM Group Holding Company Acquires Modern Global International Schools in Saudi Arabia | مجموعة سنام القابضة تستحوذ على مدارس جلوبال العالمية الحديثة في السعودية |
| excerpt | SANAM Group Holding Company announced the acquisition of a 65% stake in Modern Global International Schools (MGIS) in the Kingdom of Saudi Arabia, as part of its investment expansion strategy in the education sector across GCC countries. | أعلنت مجموعة سنام القابضة الاستحواذ على حصة 65% في مدارس جلوبال العالمية الحديثة في المملكة العربية السعودية ضمن استراتيجية التوسع في قطاع التعليم. |
| body | _(full HTML `BODY_MGIS_EN` / `BODY_MGIS_AR` in `data.ts`)_ | ✅ نصّ عربي كامل في data.ts (bodyAr) |
