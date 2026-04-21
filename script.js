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

// ==================== GLOBAL DATA ====================
let coursesList = [];
let coursesData = {};

// ==================== LOAD DATA FROM JSON FILES ====================
async function loadAllData() {
  try {
    const coursesRes = await fetch('./data/courses.json');
    if (!coursesRes.ok) throw new Error('Failed to load courses.json');
    const coursesJson = await coursesRes.json();
    coursesList = coursesJson.courses;
    
    for (const course of coursesList) {
      try {
        const courseRes = await fetch(`./data/${course.id}.json`);
        if (!courseRes.ok) {
          coursesData[course.id] = { chapters: [] };
          continue;
        }
        const courseData = await courseRes.json();
        coursesData[course.id] = courseData;
      } catch (err) {
        coursesData[course.id] = { chapters: [] };
      }
    }
    
    console.log('All data loaded successfully');
    renderPage();
  } catch (error) {
    console.error('Error loading data:', error);
    document.getElementById('mainContent').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <p>حدث خطأ في تحميل البيانات. يرجى تحديث الصفحة.</p>
      </div>
    `;
  }
}

// ==================== QUIZ DATA ====================
const quizData = {
  nadhari: {
    0: [
      { question: "ما هو تعريف Asepsis؟", options: ["تعقيم كامل", "الممارسات التي تقلل أو تقضي على العوامل المعدية", "نظافة عامة", "تطهير الأسطح فقط"], correct: 1 },
      { question: "ما هي المدة الدنيا لغسل اليدين بالصابون؟", options: ["5 ثوان", "10 ثوان", "15 ثانية", "30 ثانية"], correct: 2 },
      { question: "أي من هذه الكائنات هي أصغر الكائنات الحية الدقيقة؟", options: ["البكتيريا", "الفطريات", "الفيروسات", "الأوليات"], correct: 2 },
      { question: "ما هي البوغة (Spore)؟", options: ["ميكروب نشط دائماً", "شكل حياة ميكروبية غير نشطة مؤقتاً تقاوم الحرارة", "نوع من البكتيريا", "فيروس صغير"], correct: 1 },
      { question: "كم عدد مكونات سلسلة العدوى؟", options: ["4", "5", "6", "7"], correct: 2 },
      { question: "ما هو الفرق بين Medical Asepsis و Surgical Asepsis؟", options: ["لا يوجد فرق", "Medical تقلل الميكروبات، Surgical تقضي عليها تماماً", "Surgical أسهل تطبيقاً", "Medical للعمليات فقط"], correct: 1 },
      { question: "ما المقصود بـ Nosocomial Infection؟", options: ["عدوى منقولة جنسياً", "عدوى مكتسبة من المستشفى", "عدوى فيروسية", "عدوى الجلد"], correct: 1 },
      { question: "في الفرك الجراحي، كيف يجب أن تكون وضعية اليدين؟", options: ["أسفل المرفقين", "فوق مستوى المرفقين", "على مستوى الصدر", "لا يهم"], correct: 1 },
      { question: "ما هو طريق انتقال العدوى الذي يحدث في مسافة أقل من 3 أقدام؟", options: ["Airborne", "Vehicle", "Droplet", "Vector"], correct: 2 }
    ]
  },
  amali: {
    0: [
      { question: "ما هي النسبة الصحيحة للضغطات إلى التنفس في الإنعاش القلبي الرئوي؟", options: ["30:2", "15:2", "30:1", "15:1"], correct: 0 }
    ]
  },
  tashreeh: {
    0: [
      { question: "كم عدد عظام الإنسان البالغ؟", options: ["200", "206", "210", "215"], correct: 1 }
    ]
  },
  ahyaa: {
    0: [
      { question: "ما هي الوحدة الأساسية للحياة؟", options: ["النسيج", "العضو", "الخلية", "الجزيء"], correct: 2 }
    ]
  }
};

// ==================== PROGRESS TRACKING ====================
function getProgress() {
  try {
    return JSON.parse(localStorage.getItem('progress') || '{}');
  } catch { return {}; }
}

function markPageRead(courseId, chapterIdx, pageIdx) {
  const p = getProgress();
  if (!p[courseId]) p[courseId] = {};
  if (!p[courseId][chapterIdx]) p[courseId][chapterIdx] = {};
  p[courseId][chapterIdx][pageIdx] = true;
  localStorage.setItem('progress', JSON.stringify(p));
}

// ==================== THEME ====================
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

// ==================== NAVIGATION ====================
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

function showSearch() {
  updateNavActive('search');
  const main = document.getElementById('mainContent');
  if (!main) return;
  main.innerHTML = `
    <div class="fade-in">
      <h2 style="font-size:1rem;font-weight:700;margin-bottom:14px;">🔍 البحث في المحتوى</h2>
      <div class="search-box">
        <input class="search-input" id="searchInput" placeholder="ابحث عن مصطلح أو جملة..." autocomplete="off">
      </div>
      <div id="searchResults"></div>
    </div>
  `;
  const input = document.getElementById('searchInput');
  input?.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    const resultsEl = document.getElementById('searchResults');
    if (!q || q.length < 2) { resultsEl.innerHTML = ''; return; }
    const results = [];
    for (const course of coursesList) {
      const courseData = coursesData[course.id];
      if (!courseData || !courseData.chapters) continue;
      for (let ci = 0; ci < courseData.chapters.length; ci++) {
        const ch = courseData.chapters[ci];
        for (let pi = 0; pi < (ch.pages || []).length; pi++) {
          const page = ch.pages[pi];
          for (const sec of (page.sections || [])) {
            if (sec.type === 'sentences') {
              for (const item of sec.items) {
                if (item.en?.toLowerCase().includes(q) || item.ar?.includes(q) || item.pron?.includes(q)) {
                  results.push({ course, ci, pi, item, chName: ch.name, pageTitle: page.title });
                }
              }
            } else if (sec.type === 'terms') {
              for (const item of sec.items) {
                if (item.en?.toLowerCase().includes(q) || item.ar?.includes(q) || item.pron?.includes(q)) {
                  results.push({ course, ci, pi, item: { en: item.en, pron: item.pron, ar: item.ar }, chName: ch.name, pageTitle: page.title });
                }
              }
            }
          }
        }
      }
    }
    if (!results.length) {
      resultsEl.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔎</div><p>لا توجد نتائج</p></div>';
      return;
    }
    resultsEl.innerHTML = results.slice(0,20).map(r => `
      <div class="sentence-card fade-in" style="margin-bottom:10px;cursor:pointer;" onclick="navigateTo('chapter',{courseId:'${r.course.id}',chapterIdx:${r.ci},pageIdx:${r.pi}})">
        <div class="sentence-en"><div class="sentence-en-text">${r.item.en || ''}</div></div>
        <div class="sentence-ar"><span class="ar-label">ترجمة</span><div class="sentence-ar-text">${r.item.ar || ''}</div></div>
        <div style="padding:5px 13px;font-size:0.65rem;color:var(--text3)">${r.course.name} / ${r.chName}</div>
      </div>
    `).join('');
  });
  input?.focus();
}

function showProgress() {
  updateNavActive('progress');
  const main = document.getElementById('mainContent');
  if (!main) return;
  const p = getProgress();
  main.innerHTML = `
    <div class="fade-in">
      <h2 class="progress-title">📊 تقدمي في الدراسة</h2>
      ${coursesList.map(course => {
        const courseData = coursesData[course.id];
        const chapters = courseData?.chapters || [];
        const totalPages = chapters.reduce((sum, ch) => sum + (ch.pages?.length || 0), 0);
        const readPages = chapters.reduce((sum, ch, ci) => sum + Object.keys(p[course.id]?.[ci] || {}).length, 0);
        const pct = totalPages > 0 ? Math.round((readPages / totalPages) * 100) : 0;
        return `
          <div class="progress-card">
            <h4>${course.icon} ${course.name}</h4>
            <div class="progress-bar-wrap">
              <div class="progress-bar-fill" style="width:${pct}%"></div>
            </div>
            <div class="progress-pct">${readPages} من ${totalPages} صفحة (${pct}%)</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ==================== HOME PAGE ====================
function renderHome(container) {
  const p = getProgress();
  const totalPages = coursesList.reduce((s, c) => {
    const courseData = coursesData[c.id];
    return s + (courseData?.chapters || []).reduce((cs, ch) => cs + (ch.pages?.length || 0), 0);
  }, 0);
  const readPages = coursesList.reduce((s, c) => {
    const courseData = coursesData[c.id];
    return s + (courseData?.chapters || []).reduce((cs, ch, ci) => cs + Object.keys(p[c.id]?.[ci] || {}).length, 0);
  }, 0);

  container.innerHTML = `
    <div class="fade-in">
      <div class="welcome-hero">
        <h2>أهلاً وسهلاً! 👩‍⚕️</h2>
        <p>تعلم التمريض بطريقة منظمة ومبسطة</p>
        <div class="welcome-stats">
          <span class="stat-pill">📚 ${coursesList.length} مساقات</span>
          <span class="stat-pill">📄 ${readPages}/${totalPages} صفحة</span>
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

// ==================== COURSE PAGE ====================
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

// Attach chapter/quiz click events via event delegation
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

// ==================== CHAPTER VIEWER ====================
function renderSection(sec) {
  if (sec.type === 'heading') {
    return `<div style="font-size:0.9rem;font-weight:700;color:var(--text);padding:8px 0 4px;margin-bottom:6px;border-bottom:2px solid var(--border)">${sec.text}</div>`;
  }
  if (sec.type === 'sentences') {
    return sec.items.map(item => `
      <div class="sentence-card">
        <div class="sentence-en">
          <div class="sentence-en-text">${item.en || ''}</div>
        </div>
        <div class="sentence-pron">
          <span class="pron-label">نطق</span>
          <div class="sentence-pron-text">${item.pron || ''}</div>
        </div>
        <div class="sentence-ar">
          <span class="ar-label">ترجمة</span>
          <div class="sentence-ar-text">${item.ar || ''}</div>
        </div>
      </div>
    `).join('');
  }
  if (sec.type === 'terms') {
    return sec.items.map(item => `
      <div class="term-card">
        <div class="term-en">
          <span class="term-en-word">${item.en || ''}</span>
          <span class="term-pron">[${item.pron || ''}]</span>
        </div>
        <div class="term-ar">${item.ar || ''}</div>
      </div>
    `).join('');
  }
  if (sec.type === 'info') {
    return `
      <div class="info-box ${sec.style || ''}">
        <div class="info-box-label">${sec.label || ''}</div>
        <p style="white-space:pre-line">${sec.text || ''}</p>
      </div>
    `;
  }
  if (sec.type === 'list') {
    return `
      <div class="info-box">
        <div class="info-box-label" style="color:var(--accent)">${sec.label || ''}</div>
        <div class="content-list" style="margin-top:8px">
          ${(sec.items || []).map((item, i) => `
            <div class="content-list-item">
              <span class="list-bullet">${i + 1}</span>
              <span>${item}</span>
            </div>
          `).join('')}
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

      <div class="page-nav">
        <div>
          <div class="page-nav-title">${page.title || ''}</div>
        </div>
        <span class="page-counter">${currentPage + 1} / ${totalPages}</span>
      </div>

      ${totalPages > 1 ? `
        <div class="page-dots">
          ${pages.map((_, i) => `<button class="page-dot ${i === currentPage ? 'active' : ''}" data-pi="${i}" title="صفحة ${i + 1}"></button>`).join('')}
        </div>
      ` : ''}

      <div id="pageContent">
        ${(page.sections || []).map(renderSection).join('')}
      </div>

      ${chapter.pdfUrl ? `<a href="${chapter.pdfUrl}" target="_blank" class="quiz-launch-btn" style="background:linear-gradient(135deg,var(--orange),#f97316);margin-top:14px;display:block;text-align:center;text-decoration:none">📥 تحميل ملف PDF للشابتر</a>` : ''}

      <div class="page-nav-btns" style="margin-top:14px">
        <button class="page-btn" id="prevPageBtn" ${currentPage === 0 ? 'disabled' : ''}>◀ السابقة</button>
        ${currentPage < totalPages - 1
          ? `<button class="page-btn primary" id="nextPageBtn">التالية ▶</button>`
          : `<button class="quiz-launch-btn" id="toQuizBtn" style="margin-top:0;flex:1">📝 ابدأ الاختبار</button>`
        }
      </div>
    </div>
  `;

  document.getElementById('backBtn')?.addEventListener('click', () => history.back());
  document.getElementById('backCourse')?.addEventListener('click', () => navigateTo('course', { courseId }));
  document.getElementById('prevPageBtn')?.addEventListener('click', () => navigateTo('chapter', { courseId, chapterIdx, pageIdx: currentPage - 1 }));
  document.getElementById('nextPageBtn')?.addEventListener('click', () => navigateTo('chapter', { courseId, chapterIdx, pageIdx: currentPage + 1 }));
  document.getElementById('toQuizBtn')?.addEventListener('click', () => navigateTo('quiz', { courseId, chapterIdx }));

  document.querySelectorAll('.page-dot').forEach(dot => {
    dot.addEventListener('click', () => navigateTo('chapter', { courseId, chapterIdx, pageIdx: parseInt(dot.dataset.pi) }));
  });

  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ==================== LECTURES PAGE ====================
function renderLectures(container, courseId) {
  const course = coursesList.find(c => c.id === courseId);
  if (!course) { navigateTo('home'); return; }

  container.innerHTML = `
    <div class="fade-in">
      <div class="nav-bar">
        <button class="back-btn" id="backBtn">↩ رجوع</button>
        <span class="breadcrumb">${course.name} / المحاضرات</span>
      </div>
      <div class="section-label">محاضرات يوتيوب</div>
      <div class="lecture-list">
        ${(course.lectures || []).length === 0
          ? '<div class="empty-state"><div class="empty-state-icon">🎬</div><p>لا توجد محاضرات متاحة حالياً</p></div>'
          : (course.lectures || []).map((lec, i) => `
            <div class="lecture-card" onclick="window.open('${lec.url}','_blank')">
              <div class="lec-icon">▶️</div>
              <div class="lec-info">
                <h4>${lec.title}</h4>
                <span>يوتيوب</span>
              </div>
              <button class="lec-btn" onclick="event.stopPropagation();window.open('${lec.url}','_blank')">مشاهدة</button>
            </div>
          `).join('')
        }
      </div>
    </div>
  `;
  document.getElementById('backBtn')?.addEventListener('click', () => history.back());
}

// ==================== BOOK PAGE ====================
function renderBook(container, courseId) {
  const course = coursesList.find(c => c.id === courseId);
  if (!course) { navigateTo('home'); return; }

  const bookChapters = course.bookChapters || [];

  container.innerHTML = `
    <div class="fade-in">
      <div class="nav-bar">
        <button class="back-btn" id="backBtn">↩ رجوع</button>
        <span class="breadcrumb">${course.name} / الكتاب</span>
      </div>
      <div class="section-label">ملفات الكتاب المقرر</div>
      ${bookChapters.length === 0
        ? '<div class="empty-state"><div class="empty-state-icon">📕</div><p>لم يتم إضافة الكتاب بعد</p></div>'
        : `<div class="book-list">
            ${bookChapters.map(ch => `
              <div class="book-file-card">
                <div class="book-file-icon">📄</div>
                <div class="book-file-info">
                  <h4>${ch.name}</h4>
                  <span>ملف PDF</span>
                </div>
                <a href="${ch.url}" target="_blank" class="dl-btn">📥 تحميل</a>
              </div>
            `).join('')}
          </div>`
      }
    </div>
  `;
  document.getElementById('backBtn')?.addEventListener('click', () => history.back());
}

// ==================== QUIZ PAGE ====================
function renderQuiz(container, courseId, chapterIdx) {
  const course = coursesList.find(c => c.id === courseId);
  if (!course) { navigateTo('home'); return; }
  const courseData = coursesData[courseId];
  const chapter = courseData?.chapters?.[chapterIdx];
  if (!chapter) { navigateTo('course', { courseId }); return; }
  const questions = quizData[courseId]?.[chapterIdx] || [];

  container.innerHTML = `
    <div class="fade-in">
      <div class="nav-bar">
        <button class="back-btn" id="backBtn">↩ رجوع</button>
        <span class="breadcrumb">اختبار: ${chapter.name}</span>
      </div>
      ${questions.length === 0
        ? '<div class="empty-state"><div class="empty-state-icon">📝</div><p>لا توجد أسئلة لهذا الشابتر بعد</p></div>'
        : `
          <div class="quiz-wrap" id="quizWrap">
            ${questions.map((q, qi) => `
              <div class="question-card">
                <div class="q-num">السؤال ${qi + 1} من ${questions.length}</div>
                <div class="q-text">${q.question}</div>
                <div class="q-options">
                  ${q.options.map((opt, oi) => `
                    <label class="q-option" data-q="${qi}" data-o="${oi}">
                      <input type="radio" name="q${qi}" value="${oi}">
                      <div class="q-radio"></div>
                      <span>${opt}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          <button class="quiz-submit" id="submitQuiz">✅ تأكيد الإجابات</button>
          <div id="quizResult"></div>
        `
      }
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
    let score = 0;
    let allAnswered = true;
    questions.forEach((q, qi) => {
      const selected = document.querySelector(`input[name="q${qi}"]:checked`);
      if (!selected) { allAnswered = false; return; }
      const optEls = document.querySelectorAll(`.q-option[data-q="${qi}"]`);
      optEls.forEach(o => {
        const oi = parseInt(o.dataset.o);
        if (oi === q.correct) o.classList.add('correct');
        else if (o.classList.contains('selected')) o.classList.add('wrong');
      });
      if (parseInt(selected.value) === q.correct) score++;
    });

    if (!allAnswered) { showToast('⚠️ يرجى الإجابة على جميع الأسئلة'); return; }

    document.getElementById('submitQuiz').style.display = 'none';
    const pct = Math.round(score / questions.length * 100);
    const pass = pct >= 60;
    const resultEl = document.getElementById('quizResult');
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="result-banner" style="margin-top:14px">
          <div class="result-score ${pass ? 'pass' : 'fail'}">${pct}%</div>
          <div class="result-msg">${score} من ${questions.length} إجابة صحيحة · ${pass ? '🎉 ممتاز، اجتزت الاختبار!' : '📚 راجع الشابتر وأعد المحاولة'}</div>
          <button class="result-retry" onclick="renderQuiz(document.getElementById('mainContent'), '${courseId}', ${chapterIdx})">🔄 إعادة الاختبار</button>
        </div>
      `;
      resultEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ==================== TOAST ====================
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ==================== INIT ====================
window.addEventListener('hashchange', renderPage);
window.addEventListener('load', () => {
  loadAllData();
  updateOnlineStatus();
});
