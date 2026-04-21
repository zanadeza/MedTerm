// ==================== SERVICE WORKER ====================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('SW registered:', reg.scope);
    }).catch(err => console.log('SW error:', err));
  });
}

// ==================== INSTALL PROMPT ====================
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (!localStorage.getItem('installDismissed')) {
    document.getElementById('installBanner')?.classList.add('show');
  }
});
document.getElementById('installBtn')?.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
  }
  document.getElementById('installBanner')?.classList.remove('show');
});
document.getElementById('dismissBanner')?.addEventListener('click', () => {
  document.getElementById('installBanner')?.classList.remove('show');
  localStorage.setItem('installDismissed', '1');
});

// ==================== OFFLINE DETECTION ====================
function updateOnlineStatus() {
  const bar = document.querySelector('.offline-bar');
  if (!bar) {
    const el = document.createElement('div');
    el.className = 'offline-bar';
    el.textContent = '⚠️ أنت غير متصل بالإنترنت - التطبيق يعمل في وضع عدم الاتصال';
    document.body.prepend(el);
  }
  document.querySelector('.offline-bar')?.classList.toggle('show', !navigator.onLine);
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// ==================== DATA (مضمنة مباشرة) ====================
const coursesList = [
  {
    id: "nadhari",
    name: "أساسيات التمريض - نظري",
    description: "المفاهيم الأساسية والنظريات التمريضية",
    icon: "📖",
    color: "#38bdf8",
    bookChapters: [
      { name: "شابتر 1 - Asepsis", url: "https://www.mediafire.com/file/3ngj0dww90i5i7f/Asepsis.pdf/file" },
      { name: "شابتر 2 - Infection Control", url: "https://www.mediafire.com/file/14d312yhv4x1x7d/Infection_Control.pdf/file" },
      { name: "شابتر 3 - Safety", url: "https://www.mediafire.com/file/ofe0j0gqca2knxb/Safety.pdf/file" },
      { name: "شابتر 4 - Admission, Discharge, Transfer", url: "https://www.mediafire.com/file/jy3g11m8l3tt9g5/Admission%252C_Discharge%252C_Transfer%252C.pdf/file" },
      { name: "شابتر 5 - Recording and Reporting", url: "https://www.mediafire.com/file/5om84r45wbfeo70/Recording_and_Reporting.pdf/file" },
      { name: "شابتر 6 - Vital Signs", url: "https://www.mediafire.com/file/r4hiqhu8hedmx29/Vital_Signs.pdf/file" },
      { name: "شابتر 7 - Hygiene", url: "https://www.mediafire.com/file/q74kdfr41cit84g/Hygiene.pdf/file" },
      { name: "شابتر 8 - Body Mechanics, Positioning", url: "https://www.mediafire.com/file/hchz5hf38cszt1o/Body_Mechanics%252C_Positioning.pdf/file" }
    ],
    lectures: [
      { title: "Asepsis (الجزء الأول)", url: "https://youtu.be/Fj_cHc7qiHI" },
      { title: "Asepsis (الجزء الثاني)", url: "https://youtu.be/O1qCfxoZxXE" },
      { title: "Infection Control", url: "https://youtu.be/6AydMEgD2V0" },
      { title: "Safety", url: "https://youtu.be/YVBFkQ9gsoU" },
      { title: "Admission, Discharge, Transfer", url: "https://youtu.be/tt1ifco00W8" },
      { title: "Recording and Reporting", url: "https://youtu.be/tt1ifco00W8" },
      { title: "Vital Signs (الجزء الأول)", url: "https://youtu.be/B3gQJsvhuMs" },
      { title: "Vital Signs (الجزء الثاني)", url: "https://youtu.be/a3jdPLWsLbY" },
      { title: "Hygiene", url: "https://youtu.be/Us-PuSaWMaE" },
      { title: "Body Mechanics, Positioning", url: "https://youtu.be/nnwa61B0PVA" }
    ]
  },
  {
    id: "amali",
    name: "أساسيات التمريض - عملي",
    description: "المهارات السريرية والإجراءات العملية",
    icon: "💉",
    color: "#4ade80",
    bookChapters: [],
    lectures: []
  },
  {
    id: "tashreeh",
    name: "التشريح",
    description: "دراسة تركيب الجسم البشري",
    icon: "🧠",
    color: "#a78bfa",
    bookChapters: [],
    lectures: [
      { title: "محاضرة التشريح ووظائف اعضاء 1 2025 2026 المحاضرة الاولى", url: "https://youtu.be/zLoMS9bqnZY" },
      { title: "محاضرة التشريح الثانية 11 04 2026", url: "https://youtu.be/t7GbRUIYOxk" },
      { title: "محاضرة التشريح الثالثة 11 04 2026", url: "https://youtu.be/tMa5FO7hRgA" },
      { title: "INTEGUMENTARY SYSTEM 4 المحاضرة الرابعة", url: "https://youtu.be/KCSViIGdhqY" },
      { title: "Skeletal system 1 المحاضرة الخامسة", url: "https://youtu.be/T8KcYEFgilU" }
    ]
  },
  {
    id: "ahyaa",
    name: "الأحياء",
    description: "الأساسيات البيولوجية للجسم",
    icon: "🔬",
    color: "#fb923c",
    bookChapters: [],
    lectures: [
      { title: "Chapter 1: Introduction to Microbiology", url: "https://www.youtube.com/watch?v=JUwqdnDMnv4&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-" },
      { title: "Chapter 2: Bacterial cell structure (Part 1)", url: "https://www.youtube.com/watch?v=mOLOMgInvTU&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-" },
      { title: "Chapter 2: Bacterial cell structure (Part 2)", url: "https://www.youtube.com/watch?v=NP5P6m7pT6M&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=3" },
      { title: "Chapter 3: Bacterial growth and multiplication", url: "https://www.youtube.com/watch?v=NbUqxwae4R8&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=4" },
      { title: "Chapter 4: Bacterial Identification and Diagnosis", url: "https://www.youtube.com/watch?v=XUBKO_IKyVo&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=5" },
      { title: "Chapter 5 (Part 1): Sterilization and disinfection", url: "https://www.youtube.com/watch?v=DV-8CJ1z9xg&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=6" },
      { title: "Chapter 5 (Part 2): Sterilization and disinfection", url: "https://www.youtube.com/watch?v=BNAM6oAk_6o&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=7" },
      { title: "Chapter 6: Classification of bacteria (Part 1)", url: "https://www.youtube.com/watch?v=McWHmMMF8cc&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=8" },
      { title: "Chapter 6: Classification of bacteria (Part 2)", url: "https://www.youtube.com/watch?v=KxZuGg26Z4Q&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=9" },
      { title: "Chapter 6: Classification of bacteria (Part 3)", url: "https://www.youtube.com/watch?v=7gMBsyQLS90&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=10" },
      { title: "Chapter 6: Classification of bacteria (Part 4)", url: "https://www.youtube.com/watch?v=nmJd45pTF9Q&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=11" },
      { title: "Chapter 6: Classification of bacteria (Part 5)", url: "https://www.youtube.com/watch?v=NoyDyLmDvjQ&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=12" }
    ]
  }
];

const coursesData = {
  nadhari: {
    chapters: [
      {
        name: "Asepsis - العقامة (الفصل الأول)",
        pdfUrl: "https://www.mediafire.com/file/3ngj0dww90i5i7f/Asepsis.pdf/file",
        pages: [
          {
            title: "📚 أهداف التعلم (Learning Objectives)",
            sections: [
              { type: "heading", text: "🎯 أهداف هذا الفصل" },
              {
                type: "list",
                label: "بعد دراسة هذا الفصل، يجب أن تكون قادراً على:",
                items: [
                  "1. Describe microorganisms. (وصف الكائنات الحية الدقيقة)",
                  "2. Name and describe eight specific types of microorganisms. (تسمية ووصف 8 أنواع محددة من الكائنات الدقيقة)",
                  "3. Differentiate between nonpathogens and pathogens, resident and transient microorganisms, and aerobic and anaerobic microorganisms.",
                  "4. Give two examples of the ways some microorganisms have adapted for their survival.",
                  "5. Name the six components in the chain of infection.",
                  "6. Cite examples of biologic defense mechanisms.",
                  "7. Define health care-associated infection.",
                  "8. Discuss the concept of asepsis.",
                  "9. Differentiate between medical and surgical asepsis.",
                  "10. Identify at least three principles of medical asepsis.",
                  "11. List five examples of medical aseptic practices.",
                  "12. Name at least three techniques for sterilizing equipment.",
                  "13. Identify at least three principles of surgical asepsis.",
                  "14. List at least three nursing activities that require application of the principles of surgical asepsis."
                ]
              },
              { type: "info", style: "important", label: "📌 ملاحظة", text: "هذه الأهداف ستساعدك في التركيز على أهم النقاط أثناء دراسة هذا الفصل." }
            ]
          },
          {
            title: "مقدمة في العقامة (Asepsis) والكائنات الحية الدقيقة",
            sections: [
              { type: "heading", text: "🩺 أولاً: Asepsis — العقامة (منع العدوى)" },
              {
                type: "sentences",
                items: [
                  { en: "Preventing infections is one of the most important priorities in nursing.", pron: "بريڤنتنج إنفيكشنز إيز ون أوف ذا موست إمبورتنت برايوريتيز إن نيرسنج.", ar: "يُعدّ منع العدوى أحد أهم الأولويات في مهنة التمريض." },
                  { en: "Asepsis means those practices that decrease or eliminate infectious agents, their reservoirs, and vehicles for transmission.", pron: "أسيبسيس ميينز ذوز براكتسيز ذات ديكريس أور إليمينيت إنفيكشس إيجنتس، ذيير ريزيرڤوارز، آند ڤيهيكلز فور ترانسميشن.", ar: "العقامة (Asepsis) تعني الممارسات التي تقلل أو تقضي على العوامل المعدية ومستودعاتها ووسائل نقلها." },
                  { en: "It is the major method for controlling infection.", pron: "إت إيز ذا مايجر ميثود فور كونترولنج إنفيكشن.", ar: "وهي الطريقة الرئيسية لمكافحة العدوى." }
                ]
              },
              { type: "info", style: "important", label: "💡 تحليل المصطلح", text: "كلمة Asepsis تتكون من مقطعين:\n• \"A\" = بدون / نافية\n• \"Sepsis\" = إنتان / تعفن دم\n\n→ المعنى الكامل: بدون إنتان = منع العدوى" },
              { type: "heading", text: "🦠 ثانياً: Microorganisms — الكائنات الحية الدقيقة" },
              {
                type: "sentences",
                items: [
                  { en: "Microorganisms, living animals or plants visible only with a microscope, are commonly called germs.", pron: "مايكرو-أورجانيزمز، ليڤنج أنيملز أور بلانتس ڤيزيبل أونلي ويذ أ مايكروسكوب، آر كومونلي كولد جيرمز.", ar: "الكائنات الحية الدقيقة، وهي كائنات حية لا تُرى إلا بالمجهر، تُسمى عادةً بالجراثيم." },
                  { en: "What they lack in size, they make up for in numbers.", pron: "وات ذي لاك إن سايز، ذي ميك أب فور إن نمبرز.", ar: "وما تفتقر إليه هذه الكائنات في الحجم، تعوضه في أعدادها الكبيرة." },
                  { en: "Microorganisms are everywhere: in the air, soil, and water, and on and within virtually everything and everyone.", pron: "مايكرو-أورجانيزمز آر إيڤريوير: إن ذا إير، سويل، آند ووتر، آند أون آند ويذن ڤيرتشوالي إيڤريثينج آند إيڤريون.", ar: "تتواجد الكائنات الحية الدقيقة في كل مكان." }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

const quizData = {
  nadhari: {
    0: [
      { question: "ما هو تعريف Asepsis؟", options: ["تعقيم كامل", "الممارسات التي تقلل أو تقضي على العوامل المعدية", "نظافة عامة", "تطهير الأسطح فقط"], correct: 1 },
      { question: "ما هي المدة الدنيا لغسل اليدين بالصابون؟", options: ["5 ثوان", "10 ثوان", "15 ثانية", "30 ثانية"], correct: 2 },
      { question: "أي من هذه الكائنات هي أصغر الكائنات الحية الدقيقة؟", options: ["البكتيريا", "الفطريات", "الفيروسات", "الأوليات"], correct: 2 },
      { question: "ما هي البوغة (Spore)؟", options: ["ميكروب نشط دائماً", "شكل حياة ميكروبية غير نشطة مؤقتاً تقاوم الحرارة والمواد الكيميائية", "نوع من البكتيريا", "فيروس صغير"], correct: 1 },
      { question: "كم عدد مكونات سلسلة العدوى؟", options: ["4", "5", "6", "7"], correct: 2 }
    ]
  }
};

function getProgress() {
  try { return JSON.parse(localStorage.getItem('progress') || '{}'); } catch { return {}; }
}

function markPageRead(courseId, chapterIdx, pageIdx) {
  const p = getProgress();
  if (!p[courseId]) p[courseId] = {};
  if (!p[courseId][chapterIdx]) p[courseId][chapterIdx] = {};
  p[courseId][chapterIdx][pageIdx] = true;
  localStorage.setItem('progress', JSON.stringify(p));
}

const themeToggle = document.getElementById('themeToggle');
function applyTheme(theme) {
  document.body.classList.toggle('dark-mode', theme === 'dark');
  document.body.classList.toggle('light-mode', theme === 'light');
  if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);
themeToggle?.addEventListener('click', () => {
  const current = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

function navigateTo(page, params = {}) {
  let hash = `#${page}`;
  if (params.courseId) hash += `/${params.courseId}`;
  if (params.chapterIdx !== undefined) hash += `/${params.chapterIdx}`;
  if (params.pageIdx !== undefined) hash += `/${params.pageIdx}`;
  window.location.hash = hash;
}

function updateNavActive(page) {
  document.querySelectorAll('.nav-item').forEach(b => {
    b.classList.toggle('active', b.dataset.page === page);
  });
}

function renderPage() {
  const hash = window.location.hash.slice(1) || 'home';
  const parts = hash.split('/');
  const page = parts[0];
  const main = document.getElementById('mainContent');
  if (!main) return;
  switch (page) {
    case 'home': case '': updateNavActive('home'); renderHome(main); break;
    case 'course': renderCourse(main, parts[1]); break;
    case 'chapter': renderChapter(main, parts[1], parseInt(parts[2] || 0), parseInt(parts[3] || 0)); break;
    case 'lectures': renderLectures(main, parts[1]); break;
    case 'book': renderBook(main, parts[1]); break;
    case 'quiz': renderQuiz(main, parts[1], parseInt(parts[2] || 0)); break;
    default: updateNavActive('home'); renderHome(main);
  }
}

function renderHome(container) {
  const p = getProgress();
  container.innerHTML = `
    <div class="fade-in">
      <div class="welcome-hero">
        <h2>أهلاً وسهلاً! 👩‍⚕️</h2>
        <p>تعلم التمريض بطريقة منظمة ومبسطة</p>
        <div class="welcome-stats">
          <span class="stat-pill">📚 ${coursesList.length} مساقات</span>
        </div>
      </div>
      <div class="section-label">المساقات المتاحة</div>
      <div class="courses-grid" id="coursesGrid"></div>
    </div>
  `;
  const grid = document.getElementById('coursesGrid');
  if (grid) {
    grid.innerHTML = coursesList.map(c => `
      <div class="course-card" data-course-id="${c.id}">
        <div class="course-card-icon">${c.icon}</div>
        <h3>${c.name}</h3>
        <p>${c.description}</p>
      </div>
    `).join('');
    grid.querySelectorAll('.course-card').forEach(card => {
      card.addEventListener('click', () => navigateTo('course', { courseId: card.dataset.courseId }));
    });
  }
}

function renderCourse(container, courseId) {
  const course = coursesList.find(c => c.id === courseId);
  if (!course) { navigateTo('home'); return; }
  const courseData = coursesData[courseId];
  container.innerHTML = `
    <div class="fade-in">
      <div class="nav-bar">
        <button class="back-btn" id="backBtn">↩ رجوع</button>
        <span class="breadcrumb">${course.name}</span>
      </div>
      <div class="course-info-card">
        <div class="course-info-icon">${course.icon}</div>
        <div class="course-info-text">
          <h3>${course.name}</h3>
          <p>${course.description}</p>
        </div>
      </div>
      <div class="tab-row">
        <button class="tab-btn active" id="tabSummary">📖 ملخصات</button>
        <button class="tab-btn" id="tabLectures">🎥 محاضرات</button>
        <button class="tab-btn" id="tabBook">📕 الكتاب</button>
        <button class="tab-btn" id="tabQuizzes">📝 اختبارات</button>
      </div>
      <div id="tabContent"></div>
    </div>
  `;
  document.getElementById('backBtn')?.addEventListener('click', () => { history.back(); });
  const tabs = ['tabSummary', 'tabLectures', 'tabBook', 'tabQuizzes'];
  const renderers = [
    () => renderChaptersList(course, courseId, courseData),
    () => navigateTo('lectures', { courseId }),
    () => navigateTo('book', { courseId }),
    () => renderQuizzesList(course, courseId, courseData)
  ];
  tabs.forEach((id, i) => {
    document.getElementById(id)?.addEventListener('click', () => {
      tabs.forEach(t => document.getElementById(t)?.classList.remove('active'));
      document.getElementById(id)?.classList.add('active');
      if (i === 1 || i === 2) { renderers[i](); return; }
      const tc = document.getElementById('tabContent');
      if (tc) tc.innerHTML = renderers[i]();
    });
  });
  const tc = document.getElementById('tabContent');
  if (tc) tc.innerHTML = renderChaptersList(course, courseId, courseData);
}

function renderChaptersList(course, courseId, courseData) {
  const p = getProgress();
  if (!courseData?.chapters?.length) return '<div class="empty-state"><div class="empty-state-icon">📭</div><p>لا توجد ملخصات متاحة حالياً</p></div>';
  return `
    <div class="section-label">الشابترات</div>
    <div class="chapter-list">
      ${courseData.chapters.map((ch, idx) => {
        const totalP = ch.pages?.length || 0;
        const readP = Object.keys(p[course.id]?.[idx] || {}).length;
        const pct = totalP > 0 ? Math.round((readP / totalP) * 100) : 0;
        return `
          <div class="chapter-item" data-ch="${idx}" data-cid="${courseId}">
            <div class="chapter-num">${idx + 1}</div>
            <div class="chapter-info">
              <h4>${ch.name}</h4>
              <span>${totalP} صفحة · ${pct}% مكتمل</span>
            </div>
            <span class="chapter-arrow">›</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderQuizzesList(course, courseId, courseData) {
  if (!courseData?.chapters?.length) return '<div class="empty-state"><div class="empty-state-icon">📭</div><p>لا توجد اختبارات متاحة</p></div>';
  return `
    <div class="section-label">اختبارات الشابترات</div>
    <div class="chapter-list">
      ${courseData.chapters.map((ch, idx) => {
        const qs = quizData[courseId]?.[idx]?.length || 0;
        return `
          <div class="chapter-item" data-quiz="${idx}" data-cid="${courseId}">
            <div class="chapter-num" style="background:var(--green-bg);color:var(--green)">📝</div>
            <div class="chapter-info">
              <h4>اختبار ${ch.name}</h4>
              <span>${qs} سؤال</span>
            </div>
            <span class="chapter-arrow">›</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

document.addEventListener('click', (e) => {
  const chItem = e.target.closest('.chapter-item[data-ch]');
  if (chItem) {
    navigateTo('chapter', { courseId: chItem.dataset.cid, chapterIdx: parseInt(chItem.dataset.ch), pageIdx: 0 });
    return;
  }
  const quizItem = e.target.closest('.chapter-item[data-quiz]');
  if (quizItem) {
    navigateTo('quiz', { courseId: quizItem.dataset.cid, chapterIdx: parseInt(quizItem.dataset.quiz) });
  }
});

function renderSection(sec) {
  if (sec.type === 'heading') {
    return `<div style="font-size:0.9rem;font-weight:700;color:var(--text);padding:8px 0 4px;margin-bottom:6px;border-bottom:2px solid var(--border)">${sec.text}</div>`;
  }
  if (sec.type === 'sentences') {
    return sec.items.map(item => `
      <div class="sentence-card">
        <div class="sentence-en"><div class="sentence-en-text">${item.en || ''}</div></div>
        <div class="sentence-pron"><span class="pron-label">نطق</span><div class="sentence-pron-text">${item.pron || ''}</div></div>
        <div class="sentence-ar"><span class="ar-label">ترجمة</span><div class="sentence-ar-text">${item.ar || ''}</div></div>
      </div>
    `).join('');
  }
  if (sec.type === 'terms') {
    return sec.items.map(item => `
      <div class="term-card">
        <div class="term-en"><span class="term-en-word">${item.en || ''}</span><span class="term-pron">[${item.pron || ''}]</span></div>
        <div class="term-ar">${item.ar || ''}</div>
      </div>
    `).join('');
  }
  if (sec.type === 'info') {
    return `<div class="info-box ${sec.style || ''}"><div class="info-box-label">${sec.label || ''}</div><p style="white-space:pre-line">${sec.text || ''}</p></div>`;
  }
  if (sec.type === 'list') {
    return `
      <div class="info-box">
        <div class="info-box-label" style="color:var(--accent)">${sec.label || ''}</div>
        <div class="content-list" style="margin-top:8px">
          ${(sec.items || []).map((item, i) => `<div class="content-list-item"><span class="list-bullet">${i + 1}</span><span>${item}</span></div>`).join('')}
        </div>
      </div>
    `;
  }
  return '';
}

function renderChapter(container, courseId, chapterIdx, pageIdx = 0) {
  const course = coursesList.find(c => c.id === courseId);
  if (!course) { navigateTo('home'); return; }
  const courseData = coursesData[courseId];
  const chapter = courseData?.chapters?.[chapterIdx];
  if (!chapter) { navigateTo('course', { courseId }); return; }
  const pages = chapter.pages || [];
  const totalPages = pages.length;
  const currentPage = Math.min(pageIdx, totalPages - 1);
  const page = pages[currentPage] || pages[0];
  markPageRead(courseId, chapterIdx, currentPage);
  container.innerHTML = `
    <div class="fade-in chapter-viewer">
      <div class="nav-bar">
        <button class="back-btn" id="backBtn">↩ رجوع</button>
        <button class="back-btn" id="backCourse">📚 المساق</button>
        <span class="breadcrumb">${chapter.name}</span>
      </div>
      <div class="page-nav"><div><div class="page-nav-title">${page.title || ''}</div></div><span class="page-counter">${currentPage + 1} / ${totalPages}</span></div>
      ${totalPages > 1 ? `<div class="page-dots">${pages.map((_, i) => `<button class="page-dot ${i === currentPage ? 'active' : ''}" data-pi="${i}" title="صفحة ${i + 1}"></button>`).join('')}</div>` : ''}
      <div id="pageContent">${(page.sections || []).map(renderSection).join('')}</div>
      ${chapter.pdfUrl ? `<a href="${chapter.pdfUrl}" target="_blank" class="quiz-launch-btn" style="background:linear-gradient(135deg,var(--orange),#f97316);margin-top:14px;display:block;text-align:center;text-decoration:none">📥 تحميل ملف PDF للشابتر</a>` : ''}
      <div class="page-nav-btns" style="margin-top:14px">
        <button class="page-btn" id="prevPageBtn" ${currentPage === 0 ? 'disabled' : ''}>◀ السابقة</button>
        ${currentPage < totalPages - 1 ? `<button class="page-btn primary" id="nextPageBtn">التالية ▶</button>` : `<button class="quiz-launch-btn" id="toQuizBtn" style="margin-top:0;flex:1">📝 ابدأ الاختبار</button>`}
      </div>
    </div>
  `;
  document.getElementById('backBtn')?.addEventListener('click', () => history.back());
  document.getElementById('backCourse')?.addEventListener('click', () => navigateTo('course', { courseId }));
  document.getElementById('prevPageBtn')?.addEventListener('click', () => navigateTo('chapter', { courseId, chapterIdx, pageIdx: currentPage - 1 }));
  document.getElementById('nextPageBtn')?.addEventListener('click', () => navigateTo('chapter', { courseId, chapterIdx, pageIdx: currentPage + 1 }));
  document.getElementById('toQuizBtn')?.addEventListener('click', () => navigateTo('quiz', { courseId, chapterIdx }));
  document.querySelectorAll('.page-dot').forEach(dot => { dot.addEventListener('click', () => navigateTo('chapter', { courseId, chapterIdx, pageIdx: parseInt(dot.dataset.pi) })); });
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderLectures(container, courseId) {
  const course = coursesList.find(c => c.id === courseId);
  if (!course) { navigateTo('home'); return; }
  container.innerHTML = `
    <div class="fade-in">
      <div class="nav-bar"><button class="back-btn" id="backBtn">↩ رجوع</button><span class="breadcrumb">${course.name} / المحاضرات</span></div>
      <div class="section-label">محاضرات يوتيوب</div>
      <div class="lecture-list">
        ${(course.lectures || []).length === 0 ? '<div class="empty-state"><div class="empty-state-icon">🎬</div><p>لا توجد محاضرات متاحة حالياً</p></div>' : (course.lectures || []).map((lec, i) => `
          <div class="lecture-card" onclick="window.open('${lec.url}','_blank')">
            <div class="lec-icon">▶️</div>
            <div class="lec-info"><h4>${lec.title}</h4><span>يوتيوب</span></div>
            <button class="lec-btn" onclick="event.stopPropagation();window.open('${lec.url}','_blank')">مشاهدة</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  document.getElementById('backBtn')?.addEventListener('click', () => history.back());
}

function renderBook(container, courseId) {
  const course = coursesList.find(c => c.id === courseId);
  if (!course) { navigateTo('home'); return; }
  const bookChapters = course.bookChapters || [];
  container.innerHTML = `
    <div class="fade-in">
      <div class="nav-bar"><button class="back-btn" id="backBtn">↩ رجوع</button><span class="breadcrumb">${course.name} / الكتاب</span></div>
      <div class="section-label">ملفات الكتاب المقرر</div>
      ${bookChapters.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">📕</div><p>لم يتم إضافة الكتاب بعد</p></div>' : `
        <div class="book-list">${bookChapters.map(ch => `<div class="book-file-card"><div class="book-file-icon">📄</div><div class="book-file-info"><h4>${ch.name}</h4><span>ملف PDF</span></div><a href="${ch.url}" target="_blank" class="dl-btn">📥 تحميل</a></div>`).join('')}</div>
      `}
    </div>
  `;
  document.getElementById('backBtn')?.addEventListener('click', () => history.back());
}

function renderQuiz(container, courseId, chapterIdx) {
  const course = coursesList.find(c => c.id === courseId);
  if (!course) { navigateTo('home'); return; }
  const courseData = coursesData[courseId];
  const chapter = courseData?.chapters?.[chapterIdx];
  if (!chapter) { navigateTo('course', { courseId }); return; }
  const questions = quizData[courseId]?.[chapterIdx] || [];
  container.innerHTML = `
    <div class="fade-in">
      <div class="nav-bar"><button class="back-btn" id="backBtn">↩ رجوع</button><span class="breadcrumb">اختبار: ${chapter.name}</span></div>
      ${questions.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">📝</div><p>لا توجد أسئلة لهذا الشابتر بعد</p></div>' : `
        <div class="quiz-wrap" id="quizWrap">${questions.map((q, qi) => `
          <div class="question-card">
            <div class="q-num">السؤال ${qi + 1} من ${questions.length}</div>
            <div class="q-text">${q.question}</div>
            <div class="q-options">${q.options.map((opt, oi) => `<label class="q-option" data-q="${qi}" data-o="${oi}"><input type="radio" name="q${qi}" value="${oi}"><div class="q-radio"></div><span>${opt}</span></label>`).join('')}</div>
          </div>`).join('')}</div>
        <button class="quiz-submit" id="submitQuiz">✅ تأكيد الإجابات</button>
        <div id="quizResult"></div>
      `}
    </div>
  `;
  document.getElementById('backBtn')?.addEventListener('click', () => history.back());
  document.querySelectorAll('.q-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const qi = opt.dataset.q;
      document.querySelectorAll(`.q-option[data-q="${qi}"]`).forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      opt.querySelector('input').checked = true;
    });
  });
  document.getElementById('submitQuiz')?.addEventListener('click', () => {
    let score = 0, allAnswered = true;
    questions.forEach((q, qi) => {
      const selected = document.querySelector(`input[name="q${qi}"]:checked`);
      if (!selected) { allAnswered = false; return; }
      const optEls = document.querySelectorAll(`.q-option[data-q="${qi}"]`);
      optEls.forEach(o => { const oi = parseInt(o.dataset.o); if (oi === q.correct) o.classList.add('correct'); else if (o.classList.contains('selected')) o.classList.add('wrong'); });
      if (parseInt(selected.value) === q.correct) score++;
    });
    if (!allAnswered) { showToast('⚠️ يرجى الإجابة على جميع الأسئلة'); return; }
    document.getElementById('submitQuiz').style.display = 'none';
    const pct = Math.round(score / questions.length * 100);
    const pass = pct >= 60;
    const resultEl = document.getElementById('quizResult');
    if (resultEl) {
      resultEl.innerHTML = `<div class="result-banner" style="margin-top:14px"><div class="result-score ${pass ? 'pass' : 'fail'}">${pct}%</div><div class="result-msg">${score} من ${questions.length} إجابة صحيحة · ${pass ? '🎉 ممتاز، اجتزت الاختبار!' : '📚 راجع الشابتر وأعد المحاولة'}</div><button class="result-retry" onclick="renderQuiz(document.getElementById('mainContent'), '${courseId}', ${chapterIdx})">🔄 إعادة الاختبار</button></div>`;
      resultEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

window.addEventListener('hashchange', renderPage);
window.addEventListener('load', () => {
  renderPage();
  updateOnlineStatus();
});
