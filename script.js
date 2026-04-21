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

// ==================== DATA STRUCTURES ====================
const coursesData = {
  courses: [
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
      chapters: [
        // ==================== CHAPTER 1: ASEPSIS (EXISTING) ====================
        {
          name: "Asepsis - العقامة (الفصل الأول)",
          pdfUrl: "https://www.mediafire.com/file/3ngj0dww90i5i7f/Asepsis.pdf/file",
          pages: [
            // (Pages 0-13 from previous code - kept as is)
            // ... existing Asepsis pages content ...
          ]
        },
        // ==================== CHAPTER 2: INFECTION CONTROL (NEW) ====================
        {
          name: "Infection Control - مكافحة العدوى (الفصل الثاني)",
          pdfUrl: "https://www.mediafire.com/file/14d312yhv4x1x7d/Infection_Control.pdf/file",
          pages: [
            // ==================== PAGE 0: LEARNING OBJECTIVES ====================
            {
              title: "📚 أهداف التعلم (Learning Objectives)",
              sections: [
                {
                  type: "heading",
                  text: "🎯 أهداف هذا الفصل"
                },
                {
                  type: "list",
                  label: "بعد دراسة هذا الفصل، يجب أن تكون قادراً على:",
                  items: [
                    "1. Explain the meaning of infectious diseases. (شرح معنى الأمراض المعدية)",
                    "2. Differentiate between infection and colonization. (التفريق بين العدوى والاستعمار الميكروبي)",
                    "3. Define infection control measures. (تعريف إجراءات مكافحة العدوى)",
                    "4. Name two major techniques for infection control. (تسمية تقنيتين رئيسيتين لمكافحة العدوى)",
                    "5. Identify three new elements of standard precautions. (تحديد ثلاثة عناصر جديدة للاحتياطات القياسية)",
                    "6. Discuss situations in which nurses use standard precautions and transmission-based precautions. (مناقشة الحالات التي تستخدم فيها الممرضات الاحتياطات القياسية والاحتياطات القائمة على طريقة الانتقال)",
                    "7. Describe the rationale for using airborne, droplet, and contact precautions. (وصف الأساس المنطقي لاستخدام احتياطات الانتقال بالهواء، والقطيرات، والتلامس)",
                    "8. Explain the purpose of personal protective equipment (PPE). (شرح الغرض من معدات الوقاية الشخصية)",
                    "9. Discuss the rationale for removing PPE in a specific sequence. (مناقشة الأساس المنطقي لنزع معدات الوقاية الشخصية بتسلسل محدد)",
                    "10. Explain how nurses perform double bagging. (شرح كيفية قيام الممرضات بالتكيس المزدوج)",
                    "11. List two psychological problems common among clients with infectious diseases. (سرد مشكلتين نفسيتين شائعتين لدى مرضى الأمراض المعدية)",
                    "12. Provide at least three teaching suggestions for preventing infections. (تقديم ثلاثة اقتراحات تعليمية على الأقل للوقاية من العدوى)"
                  ]
                },
                {
                  type: "info",
                  style: "important",
                  label: "📌 ملاحظة",
                  text: "هذه الأهداف ستساعدك في التركيز على أهم النقاط أثناء دراسة هذا الفصل. تأكد من مراجعتها قبل وبعد الدراسة."
                }
              ]
            },
            // ==================== PAGE 1: INFECTION CONTROL INTRODUCTION ====================
            {
              title: "مقدمة في مكافحة العدوى (Infection Control)",
              sections: [
                {
                  type: "heading",
                  text: "🦠 Infectious Diseases — الأمراض المعدية"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Infectious diseases (diseases spread from one person to another) are also called contagious or communicable diseases and community acquired infections.",
                      pron: "إنفيكشس ديزيزز (ديزيزز سبرید فروم ون پرسن تو أناذر) آر أولسو كولد كونتايجس أور كوميونيكابل ديزيزز آند كوميونيتي أكوايرد إنفيكشنز.",
                      ar: "الأمراض المعدية (الأمراض التي تنتقل من شخص إلى آخر) تسمى أيضاً الأمراض السارية أو الأمراض المعدية والعدوى المكتسبة من المجتمع."
                    },
                    {
                      en: "Colonization: condition that results when microbes are present but host is without signs or symptoms of infection.",
                      pron: "كولونايزيشن: كونديشن ذات ريزولتس وين مايكروبات آر بريزنت بوت هوست إز ويذاوت ساينز أور سيمبتومز أوف إنفيكشن.",
                      ar: "الاستعمار الميكروبي (Colonization): حالة تحدث عندما تكون الميكروبات موجودة ولكن المضيف لا تظهر عليه علامات أو أعراض العدوى."
                    },
                    {
                      en: "Incubation period: Infectious agent reproduces, but there are no recognized symptoms.",
                      pron: "إنكوبيشن پيريود: إنفيكشس إيجنت ريبروديوسز، بوت ذير آر نو ريكوگنايزد سيمبتومز.",
                      ar: "فترة الحضانة (Incubation period): يتكاثر العامل المعدي، ولكن لا تظهر أعراض معترف بها."
                    },
                    {
                      en: "The infectious agent may, however, exit the host at this time and infect others.",
                      pron: "ذا إنفيكشس إيجنت ماي، هاوإيڤر، إكزيت ذا هوست أت ذس تايم آند إنفيكت أذرس.",
                      ar: "قد يغادر العامل المعدي المضيف في هذا الوقت وينقل العدوى للآخرين."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "🩺 Infection — العدوى"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Infection is a condition that results when microorganisms cause injury to a host.",
                      pron: "إنفيكشن إز أ كونديشن ذات ريزولتس وين مايكروأورغانيزمز كوز إنجري تو أ هوست.",
                      ar: "العدوى (Infection) هي حالة تحدث عندما تسبب الكائنات الحية الدقيقة ضرراً للمضيف."
                    },
                    {
                      en: "The host can transmit pathogens and infectious diseases to others.",
                      pron: "ذا هوست كان ترانسميت باثوجنز آند إنفيكشس ديزيزز تو أذرس.",
                      ar: "يمكن للمضيف نقل مسببات الأمراض والأمراض المعدية إلى الآخرين."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "🛡️ Infection Control Precautions — احتياطات مكافحة العدوى"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Infection control precautions are physical measures designed to curtail the spread of infectious diseases.",
                      pron: "إنفيكشن كونترول بريكوشنز آر فيزيكال ميجرديز ديزايند تو كيرتيل ذا سبرید أوف إنفيكشس ديزيزز.",
                      ar: "احتياطات مكافحة العدوى هي إجراءات فيزيائية مصممة للحد من انتشار الأمراض المعدية."
                    },
                    {
                      en: "They are essential when caring for clients.",
                      pron: "ذَي آر إسينشال وين كيرينغ فور كلاينتس.",
                      ar: "وهي ضرورية عند رعاية المرضى."
                    },
                    {
                      en: "Infection control precautions require knowledge of the mechanisms by which an infectious disease is transmitted and the methods that will interfere with the chain of infection.",
                      pron: "إنفيكشن كونترول بريكوشنز ريكواير نالج أوف ذا ميكانيزمز باي وِتش أن إنفيكشس ديزيز إز ترانسميتد آند ذا ميثودز ذات ويل إنترفير ويذ ذا تشين أوف إنفيكشن.",
                      ar: "تتطلب احتياطات مكافحة العدوى معرفة آليات انتقال المرض المعدي والطرق التي تتداخل مع سلسلة العدوى."
                    },
                    {
                      en: "The Centers for Disease Control and Prevention have established guidelines for two major categories of infection control precautions: standard precautions and transmission-based precautions.",
                      pron: "ذا سنترز فور ديزيز كونترول آند پريڤينشن هاف إستابليشد گايدلاينز فور تو ميجور كاتيجوريز أوف إنفيكشن كونترول بريكوشنز: ستاندارد بريكوشنز آند ترانسميشن-بيزد بريكوشنز.",
                      ar: "وضعت مراكز السيطرة على الأمراض والوقاية منها (CDC) مبادئ توجيهية لفئتين رئيسيتين من احتياطات مكافحة العدوى: الاحتياطات القياسية والاحتياطات القائمة على طريقة الانتقال."
                    }
                  ]
                },
                {
                  type: "info",
                  style: "important",
                  label: "📌 ملاحظة مهمة",
                  text: "مصطلحات أساسية:\n• Infectious diseases = أمراض معدية\n• Colonization = استعمار ميكروبي (وجود ميكروبات بدون أعراض)\n• Incubation period = فترة الحضانة"
                }
              ]
            },
            // ==================== PAGE 2: STANDARD PRECAUTIONS ====================
            {
              title: "الاحتياطات القياسية (Standard Precautions)",
              sections: [
                {
                  type: "heading",
                  text: "🩺 تعريف الاحتياطات القياسية"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Standard precautions are measures for reducing the risk for microorganism transmission from both recognized and unrecognized sources of infection.",
                      pron: "ستاندارد بريكوشنز آر ميجردز فور ريديوسينغ ذا ريسك فور مايكروأورغانيزم ترانسميشن فروم باث ريكوگنايزد آند أنريكوگنايزد سورسز أوف إنفيكشن.",
                      ar: "الاحتياطات القياسية هي إجراءات للحد من خطر انتقال الكائنات الدقيقة من مصادر العدوى المعروفة وغير المعروفة."
                    },
                    {
                      en: "Health care personnel follow standard precautions when caring for all clients, regardless of diagnosis or infection status.",
                      pron: "هيلث كير پرسونيل فولو ستاندارد بريكوشنز وين كيرينغ فور أول كلاينتس، ريگاردليس أوف داياجنوسس أور إنفيكشن ستيوتس.",
                      ar: "يتبع أفراد الرعاية الصحية الاحتياطات القياسية عند رعاية جميع المرضى، بغض النظر عن التشخيص أو حالة العدوى."
                    },
                    {
                      en: "This precautionary system combines methods previously known as universal precautions.",
                      pron: "ذس بريكوشنري سيستم كومباينز ميثودز پريفيوسلي نون آز يونيڤيرسال بريكوشنز.",
                      ar: "يجمع هذا النظام الوقائي بين الطرق المعروفة سابقاً باسم الاحتياطات الشاملة (Universal Precautions)."
                    }
                  ]
                },
                {
                  type: "list",
                  label: "📋 متى تتبع الاحتياطات القياسية؟",
                  items: [
                    "الدم (Blood)",
                    "جميع سوائل الجسم باستثناء العرق، بغض النظر عن وجود دم مرئي (All body fluids except sweat)",
                    "الجلد غير السليم (Nonintact skin)",
                    "الأغشية المخاطية (Mucous membranes)"
                  ]
                },
                {
                  type: "heading",
                  text: "🧼 Handwashing — غسل اليدين"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Wash hands after touching blood, body fluids, secretions, excretions, and contaminated items, whether or not gloves are worn.",
                      pron: "ووش هاندز آفتر تاتشينغ بلاد، بودي فلويدز، سيكريشنز، إكسكريشنز، آند كونتامينيتد آيتمز، ويذر أور نوت غلافز آر وورن.",
                      ar: "اغسل يديك بعد لمس الدم، سوائل الجسم، الإفرازات، المفرزات، والأدوات الملوثة، سواء ارتديت قفازات أم لا."
                    },
                    {
                      en: "Wash hands immediately after gloves are removed, between patient contacts, and when otherwise indicated.",
                      pron: "ووش هاندز إميدياتلي آفتر غلافز آر ريموفد، بيتوين پيشنٹ كونتاكتس، آند وين أذروايز إنديكيتد.",
                      ar: "اغسل يديك فوراً بعد خلع القفازات، وبين ملامسة المرضى، وعندما يكون ذلك ضرورياً."
                    },
                    {
                      en: "Use plain (non-antibacterial) soap for routine handwashing.",
                      pron: "يوز پلاين (نون-أنتيباكتيريال) سوب فور روتين هاندووشينغ.",
                      ar: "استخدم صابوناً عادياً (غير مضاد للبكتيريا) لغسل اليدين الروتيني."
                    },
                    {
                      en: "Use an antimicrobial agent or a waterless antiseptic agent to control outbreaks or hyperendemic infections.",
                      pron: "يوز أن أنتيمايكروبيال إيجنت أور أ ووترليس أنتيسيبتيك إيجنت تو كونترول آوت بريكس أور هايپيرإنديميك إنفيكشنز.",
                      ar: "استخدم عامل مضاد للميكروبات أو عامل مطهر بدون ماء للسيطرة على الفاشيات أو العدوى شديدة الانتشار."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "🧤 Gloves — القفازات"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Wear clean, nonsterile gloves when touching blood, body fluids, secretions, excretions, and contaminated items.",
                      pron: "وير كلين، نونستيريل غلافز وين تاتشينغ بلاد، بودي فلويدز، سيكريشنز، إكسكريشنز، آند كونتامينيتد آيتمز.",
                      ar: "ارتد قفازات نظيفة غير معقمة عند لمس الدم، سوائل الجسم، الإفرازات، المفرزات، والأدوات الملوثة."
                    },
                    {
                      en: "Change gloves between tasks on the same patient after contact with material that may contain a high concentration of microorganisms.",
                      pron: "تشانج غلافز بيتوين تاسكس أون ذا سيم پيشنٹ آفتر كونتاكت وِذ ماتيريال ذات ماي كونتين أ هاي كونسنترايشن أوف مايكروأورغانيزمز.",
                      ar: "غيّر القفازات بين المهام على نفس المريض بعد التلامس مع مواد قد تحتوي على تركيز عالٍ من الكائنات الدقيقة."
                    },
                    {
                      en: "Remove gloves and wash hands immediately before caring for another patient.",
                      pron: "ريموف غلافز آند ووش هاندز إميدياتلي بيفور كيرينغ فور أناذر پيشنٹ.",
                      ar: "اخلع القفازات واغسل يديك فوراً قبل رعاية مريض آخر."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "😷 Mask, Eye Protection, Face Shield — الكمامة، حماية العين، واقي الوجه"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Wear a mask and eye protection, or face shield to protect the eyes, nose, and mouth when there is a likelihood that splashes or sprays of blood, body fluids, secretions, or excretions will occur.",
                      pron: "وير أ ماسك آند آي بروتيكشن، أور فيس شيلد تو بروتيكت ذا آيز، نوز، آند ماوث وين ذير إز أ لايكليهود ذات سبلاشز أور سبرايز أوف بلاد، بودي فلويدز، سيكريشنز، أور إكسكريشنز ويل أوكر.",
                      ar: "ارتدِ كمامة وحماية للعينين، أو واقي وجه لحماية العينين والأنف والفم عندما يكون هناك احتمال لحدوث رذاذ أو بخاخات من الدم أو سوائل الجسم أو الإفرازات أو المفرزات."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "👘 Gown — الرداء (العباءة)"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Wear a clean, nonsterile gown when there is a likelihood that splashes or sprays of blood, body fluids, secretions, or excretions will occur.",
                      pron: "وير أ كلين، نونستيريل گاون وين ذير إز أ لايكليهود ذات سبلاشز أور سبرايز أوف بلاد، بودي فلويدز، سيكريشنز، أور إكسكريشنز ويل أوكر.",
                      ar: "ارتدِ رداءً نظيفاً غير معقم عندما يكون هناك احتمال لحدوث رذاذ أو بخاخات من الدم أو سوائل الجسم أو الإفرازات أو المفرزات."
                    },
                    {
                      en: "Remove a soiled gown promptly and wash hands.",
                      pron: "ريموف أ سويلد گاون پرومپتلي آند ووش هاندز.",
                      ar: "اخلع الرداء المتسخ فوراً واغسل يديك."
                    }
                  ]
                }
              ]
            },
            // ==================== PAGE 3: PATIENT-CARE EQUIPMENT & ENVIRONMENTAL CONTROL ====================
            {
              title: "معدات رعاية المرضى والتحكم البيئي",
              sections: [
                {
                  type: "heading",
                  text: "🩺 Patient-Care Equipment — معدات رعاية المرضى"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Handle equipment soiled with blood, body fluids, secretions, and excretions so as to prevent the transfer of microorganisms to oneself, others, or the environment.",
                      pron: "هاندل إكويبمنت سويلد وِذ بلاد، بودي فلويدز، سيكريشنز، آند إكسكريشنز سو آز تو پريڤنت ذا ترانسفر أوف مايكروأورغانيزمز تو ون سيلف، أذرس، أور ذا إنڤايرونمنت.",
                      ar: "تعامل مع المعدات الملوثة بالدم وسوائل الجسم والإفرازات والمفرزات لمنع انتقال الكائنات الدقيقة إلى نفسك أو إلى الآخرين أو إلى البيئة."
                    },
                    {
                      en: "Ensure that soiled reusable equipment is cleaned before another subsequent use.",
                      pron: "إنشور ذات سويلد ريوزابل إكويبمنت إز كليند بيفور أناذر سابسيكوينت يوز.",
                      ar: "تأكد من تنظيف المعدات الملوثة القابلة لإعادة الاستخدام قبل استخدامها مرة أخرى."
                    },
                    {
                      en: "Discard soiled single-use equipment properly.",
                      pron: "ديسكارد سويلد سينغل-يوز إكويبمنت پراپرلي.",
                      ar: "تخلص من المعدات الملوثة أحادية الاستخدام بشكل صحيح."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "🧹 Environmental Control — التحكم البيئي"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Ensure that procedures for routine cleaning and disinfection of environmental surfaces, beds, bedrails, bedside equipment, and other frequently touched surfaces are carried out.",
                      pron: "إنشور ذات بروسيجرز فور روتين كلينينغ آند ديسإنفيكشن أوف إنڤايرونمنتل سيرفيسز، بيدز، بيدريلز، بيدسايد إكويبمنت، آند أذز فريكوينتلي تاتشتد سيرفيسز آر كارييد آوت.",
                      ar: "تأكد من تنفيذ إجراءات التنظيف والتطهير الروتينية للأسطح البيئية والأسرة وقضبان السرير ومعدات السرير والأسطح الأخرى التي يتم لمسها بشكل متكرر."
                  ]
                },
                {
                  type: "heading",
                  text: "🛏️ Linen — البياضات (الملاءات)"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Handle, transport, and process soiled linen in such a way as to prevent exposure to oneself, others, and the environment.",
                      pron: "هاندل، ترانسبورت، آند بروسس سويلد لينن إن ساتش أ وي آز تو پريڤنت إكسبوجر تو ون سيلف، أذرس، آند ذا إنڤايرونمنت.",
                      ar: "تعامل مع البياضات المتسخة وانقلها وجهزها بطريقة تمنع التعرض لنفسك وللآخرين والبيئة."
                    }
                  ]
                }
              ]
            },
            // ==================== PAGE 4: OCCUPATIONAL HEALTH & PATIENT PLACEMENT ====================
            {
              title: "الصحة المهنية ومسببات الأمراض المنقولة بالدم ووضع المرضى",
              sections: [
                {
                  type: "heading",
                  text: "🩸 Occupational Health and Blood-borne Pathogens — الصحة المهنية ومسببات الأمراض المنقولة بالدم"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Prevent injuries when using needles, scalpels, and other sharp devices.",
                      pron: "پريڤنت إنجريز وين يوزينغ نيدلز، سكالپلز، آند أذز شارب ديفايسز.",
                      ar: "امنع الإصابات عند استخدام الإبر والمشارط والأدوات الحادة الأخرى."
                    },
                    {
                      en: "Never recap used needles.",
                      pron: "نيفر ريكاب يوزد نيدلز.",
                      ar: "لا تعيد غطاء الإبر المستخدمة أبداً."
                    },
                    {
                      en: "Use either a one-handed 'scoop' method or mechanical device for covering a needle.",
                      pron: "يوز إيذر أ ون-هانديد 'سكوب' ميثود أور ميكانيكال ديفايس فور كاڤرينغ أ نيدل.",
                      ar: "استخدم إما طريقة 'المغرفة' بيد واحدة أو جهازاً ميكانيكياً لتغطية الإبرة."
                    },
                    {
                      en: "Place all disposable sharp items in a puncture-resistant container as close to the location of use as possible.",
                      pron: "پليس أول ديسپوزابل شارب آيتمز إن أ بانكتشر-ريزيستنت كونتينر آز كلوز تو ذا لوكيشن أوف يوز آز پوسيبال.",
                      ar: "ضع جميع الأدوات الحادة التي تستخدم لمرة واحدة في حاوية مقاومة للثقب قريبة قدر الإمكان من موقع الاستخدام."
                    },
                    {
                      en: "Use mouthpieces, resuscitation bags, or other ventilation devices as an alternative to mouth-to-mouth resuscitation methods.",
                      pron: "يوز ماوثپيسز، ريسوسيتيشن باغز، أور أذز ڤينتليشن ديفايسز آز ألترناتيڤ تو ماوث-تو-ماوث ريسوسيتيشن ميثودز.",
                      ar: "استخدم قطعة الفم أو أكياس الإنعاش أو أجهزة التنفس الأخرى كبديل لطرق الإنعاش من الفم إلى الفم."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "🏥 Patient Placement — وضع المريض"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Place a patient who contaminates the environment, who does not—or cannot be expected to—assist in maintaining appropriate hygiene or environmental control in a private room.",
                      pron: "پليس أ پيشنٹ هو كونتامينيتس ذا إنڤايرونمنت، هو داز نوت—أور كانوت بي إكسبيكتد تو—أسيست إن مينتينينغ أپروپريت هايجين أور إنڤايرونمنتل كونترول إن أ پرايڤت روم.",
                      ar: "ضع المريض الذي يلوث البيئة، والذي لا يتوقع منه—أو لا يمكنه—المساعدة في الحفاظ على النظافة المناسبة أو التحكم البيئي في غرفة خاصة."
                    }
                  ]
                }
              ]
            },
            // ==================== PAGE 5: TRANSMISSION-BASED PRECAUTIONS ====================
            {
              title: "الاحتياطات القائمة على طريقة الانتقال (Transmission-Based Precautions)",
              sections: [
                {
                  type: "heading",
                  text: "🛡️ تعريف الاحتياطات القائمة على طريقة الانتقال"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Transmission-based precautions are measures for controlling the spread of infectious agents from clients known to be or suspected of being infected with highly transmissible or epidemiologically important pathogens.",
                      pron: "ترانسميشن-بيزد بريكوشنز آر ميجردز فور كونترولينغ ذا سبرید أوف إنفيكشس إيجنتس فروم كلاينتس نون تو بي أور سوسپيكتيد أوف بيينغ إنفيكتيد وِث هايلي ترانسميسيبال أور إپيديميولوجيكلي إمبورتنت باثوجنز.",
                      ar: "الاحتياطات القائمة على طريقة الانتقال هي إجراءات للسيطرة على انتشار العوامل المعدية من المرضى المعروف أو المشتبه بإصابتهم بمسببات أمراض شديدة العدوى أو مهمة وبائياً."
                    },
                    {
                      en: "They are also called the three types of transmission-based precautions: Airborne precautions, Droplet precautions, Contact precautions.",
                      pron: "ذَي آر أولسو كولد ذا ثري تايبز أوف ترانسميشن-بيزد بريكوشنز: إيربورن بريكوشنز، دروپليت بريكوشنز، كونتاكت بريكوشنز.",
                      ar: "وتسمى أيضاً الأنواع الثلاثة للاحتياطات القائمة على طريقة الانتقال: احتياطات الانتقال بالهواء، واحتياطات الانتقال بالقطيرات، واحتياطات الانتقال بالتلامس."
                    }
                  ]
                },
                {
                  type: "info",
                  style: "important",
                  label: "📌 ملاحظة",
                  text: "هذه الأنواع الثلاثة حلت محل الفئات السابقة: العزل الصارم، عزل التلامس، عزل الجهاز التنفسي، عزل السل، احتياطات الأمعاء، واحتياطات التصريف/الإفرازات."
                },
                {
                  type: "heading",
                  text: "📊 جدول 22-2: الاحتياطات القائمة على طريقة الانتقال"
                },
                {
                  type: "heading",
                  text: "💨 Airborne Precautions — احتياطات الانتقال بالهواء"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Airborne precautions are measures that reduce the risk for transmitting airborne infectious agents. They block pathogens 5 microns or smaller that are present in the residue of evaporated droplets that remain suspended in the air, as well as those attached to dust particles.",
                      pron: "إيربورن بريكوشنز آر ميجردز ذات ريديوس ذا ريسك فور ترانسميتينغ إيربورن إنفيكشس إيجنتس. ذَي بلوك باثوجنز فايف مايكرونز أور سمولر ذات آر بريزنت إن ذا ريزيديو أوف إيڤاپوريتد دروپليتس ذات ريمين سوسپينديد إن ذا إير، آز ويل آز ذوز أتاتشد تو داست پارتیكلز.",
                      ar: "احتياطات الانتقال بالهواء هي إجراءات تقلل من خطر نقل العوامل المعدية عبر الهواء. تمنع مسببات الأمراض التي يبلغ حجمها 5 ميكرون أو أقل والموجودة في بقايا القطيرات المتبخرة التي تبقى معلقة في الهواء، وكذلك تلك المرتبطة بجزيئات الغبار."
                    },
                    {
                      en: "Tuberculosis (TB) is an example of a disease transmitted in the air.",
                      pron: "توبيركولوسيس (تي بي) إز أن إكزامبل أوف أ ديزيز ترانسميتد إن ذا إير.",
                      ar: "السل (TB) هو مثال على مرض ينتقل عبر الهواء."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "💧 Droplet Precautions — احتياطات الانتقال بالقطيرات"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Droplet precautions are measures that block pathogens within moist droplets larger than 5 microns. They are used to reduce pathogen transmission from close contact (usually 3 feet or less) between an infected person or a person who is a carrier of a droplet-spread microorganism and others.",
                      pron: "دروپليت بريكوشنز آر ميجردز ذات بلوك باثوجنز ويذن مويست دروپليتس لارجر ذان فايف مايكرونز. ذَي آر يوزد تو ريديوس باثوجن ترانسميشن فروم كلوز كونتاكت (يوجوالي ثري فيت أور لیس) بيتوين أن إنفيكتد پرسن أور أ پرسن هو إز أ كاريير أوف أ دروپليت-سبرید مايكروأورغانيزم أند أذرس.",
                      ar: "احتياطات الانتقال بالقطيرات هي إجراءات تمنع مسببات الأمراض داخل القطيرات الرطبة التي يزيد حجمها عن 5 ميكرون. تستخدم لتقليل انتقال مسببات الأمراض من الاتصال الوثيق (عادة 3 أقدام أو أقل) بين شخص مصاب أو شخص حامل لميكروب ينتقل بالقطيرات والآخرين."
                    },
                    {
                      en: "Microorganisms carried on droplets commonly exit the body during coughing, sneezing, talking, and procedures such as airway suctioning and bronchoscopy.",
                      pron: "مايكروأورغانيزمز كارييد أون دروپليتس كومونلي إكزيت ذا بودي ديرينغ كوفينغ، سنيزينغ، توكينغ، آند بروسيجرز ساتش آز إيروي ساكشنينغ آند برونكوسكوبي.",
                      ar: "تخرج الكائنات الدقيقة المحمولة على القطيرات عادة من الجسم أثناء السعال والعطاس والتحدث والإجراءات مثل شفط مجرى الهواء وتنظير القصبات."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "🖐️ Contact Precautions — احتياطات الانتقال بالتلامس"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Contact precautions are measures used to block the transmission of pathogens by direct or indirect contact.",
                      pron: "كونتاكت بريكوشنز آر ميجردز يوزد تو بلوك ذا ترانسميشن أوف باثوجنز باي دايريكت أور إيندايريكت كونتاكت.",
                      ar: "احتياطات التلامس هي إجراءات تستخدم لمنع انتقال مسببات الأمراض عن طريق التلامس المباشر أو غير المباشر."
                    },
                    {
                      en: "Direct contact involves skin-to-skin contact with an infected or colonized person.",
                      pron: "دايريكت كونتاكت إنڤولڤز سكين-تو-سكين كونتاكت وِذ أن إنفيكتد أور كولونايزد پرسن.",
                      ar: "التلامس المباشر يتضمن ملامسة الجلد للجلد مع شخص مصاب أو مستعمر ميكروبياً."
                    },
                    {
                      en: "Indirect contact occurs by touching a contaminated intermediate object in the client's environment.",
                      pron: "إيندايريكت كونتاكت أوكرز باي تاتشينغ أ كونتامينيتد إنترميدييت أوبجيكت إن ذا كلاينتس إنڤايرونمنت.",
                      ar: "يحدث التلامس غير المباشر عن طريق لمس جسم وسيط ملوث في بيئة المريض."
                    }
                  ]
                }
              ]
            },
            // ==================== PAGE 6: TRANSMISSION-BASED PRECAUTIONS TABLE DETAILS ====================
            {
              title: "تفاصيل الاحتياطات القائمة على طريقة الانتقال (الجدول 22-2)",
              sections: [
                {
                  type: "heading",
                  text: "📋 جدول 22-2: تفاصيل الاحتياطات"
                },
                {
                  type: "heading",
                  text: "💨 Airborne Precautions (احتياطات الانتقال بالهواء)"
                },
                {
                  type: "list",
                  label: "الخصائص",
                  items: [
                    "وضع المريض: غرفة خاصة أو مع مريض مصاب بنفس العدوى. ضغط هواء سلبي. 6-12 تغيير هواء في الساعة.",
                    "الحماية: اتبع الاحتياطات القياسية. أغلق الباب. ارتدِ كمامة مثل N95 أو جهاز تنقية هواء مزود بطاقة (PAPR).",
                    "أمثلة على الأمراض: السل الرئوي (Pulmonary TB), الحصبة (Measles), جدري الماء (Varicella), المتلازمة التنفسية الحادة الوخيمة (SARS)."
                  ]
                },
                {
                  type: "heading",
                  text: "💧 Droplet Precautions (احتياطات الانتقال بالقطيرات)"
                },
                {
                  type: "list",
                  label: "الخصائص",
                  items: [
                    "وضع المريض: غرفة خاصة أو مع مريض مصاب بنفس العدوى، أو على الأقل 3 أقدام بين المرضى.",
                    "الحماية: اتبع الاحتياطات القياسية. ارتدِ كمامة عند دخول الغرفة (دائماً في حدود 3 أقدام من المريض). ضع كمامة على المريض إذا كان النقل ضرورياً.",
                    "أمثلة على الأمراض: الإنفلونزا (Influenza), الحصبة الألمانية (Rubella), الالتهاب الرئوي العقدي (Streptococcal pneumonia), التهاب السحايا بالمكورات السحائية (Meningococcal meningitis), السعال الديكي (Whooping cough)."
                  ]
                },
                {
                  type: "heading",
                  text: "🖐️ Contact Precautions (احتياطات الانتقال بالتلامس)"
                },
                {
                  type: "list",
                  label: "الخصائص",
                  items: [
                    "وضع المريض: غرفة خاصة أو مع مريض مصاب بنفس العدوى.",
                    "الحماية: اتبع الاحتياطات القياسية. ارتدِ قفازات قبل دخول الغرفة. غيّر القفازات بعد التلامس مع مواد معدية. اخلع القفازات قبل مغادرة الغرفة. اغسل يديك فوراً بعد خلع القفازات. ارتدِ رداءً إذا كان هناك احتمال تلامس الملابس مع المريض أو الأسطح.",
                    "أمثلة على الأمراض: عدوى الجهاز الهضمي أو التنفسي أو الجلد أو الجروح المقاومة للأدوية، الغرغرينا الغازية (Gas gangrene)، الإسهال الحاد، التهاب الملتحمة الفيروسي الحاد."
                  ]
                }
              ]
            },
            // ==================== PAGE 7: INFECTION CONTROL ROOM & PPE ====================
            {
              title: "غرفة مكافحة العدوى ومعدات الوقاية الشخصية",
              sections: [
                {
                  type: "heading",
                  text: "🏥 Infection Control Room — غرفة مكافحة العدوى"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Most health care agencies assign infectious or potentially infectious clients to private rooms.",
                      pron: "موست هيلث كير إيجنسيز أساين إنفيكشس أور بوتينشيالي إنفيكشس كلاينتس تو پرايڤت رومز.",
                      ar: "تخصص معظم مؤسسات الرعاية الصحية غرفاً خاصة للمرضى المصابين بعدوى أو المحتمل إصابتهم."
                    },
                    {
                      en: "They keep the door to the room closed to control air currents and the circulation of dust particles.",
                      pron: "ذَي كيب ذا دور تو ذا روم كلوزد تو كونترول إير كورنتس آند ذا سيركوليشن أوف داست پارتیكلز.",
                      ar: "يحافظون على إغلاق باب الغرفة للتحكم في تيارات الهواء ودوران جزيئات الغبار."
                    },
                    {
                      en: "The room has a private bathroom so that personnel can flush contaminated liquids and biodegradable solids.",
                      pron: "ذا روم هاز أ پرايڤت باثروم سو ذات پرسونيل كان فلاش كونتامينيتد ليكويدز آند بايوديگرايدابل سوليدز.",
                      ar: "تحتوي الغرفة على حمام خاص حتى يتمكن الموظفون من طرد السوائل والمواد الصلبة القابلة للتحلل الحيوي الملوثة."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "🛡️ Personal Protective Equipment (PPE) — معدات الوقاية الشخصية"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Infection control measures involve the use of one or more items for personal protection.",
                      pron: "إنفيكشن كونترول ميجردز إنڤولڤ ذا يوز أوف ون أور مور آيتمز فور پرسونال بروتيكشن.",
                      ar: "تشمل إجراءات مكافحة العدوى استخدام عنصر واحد أو أكثر للحماية الشخصية."
                    },
                    {
                      en: "Personal protective equipment, also called barrier garments, includes gowns, masks, respirators, goggles or face shields, and gloves.",
                      pron: "پرسونال بروتيكتيڤ إكويبمنت، أولسو كولد باريير گارمنتس، إنكلودز گاونز، ماسكس، ريسپيراتورز، گوگلز أور فيس شيلدز، آند غلافز.",
                      ar: "معدات الوقاية الشخصية، وتسمى أيضاً ملابس الحاجز، تشمل الأردية والكمامات وأجهزة التنفس والنظارات الواقية أو واقيات الوجه والقفازات."
                    },
                    {
                      en: "These items are located just outside the client's room or in an anteroom.",
                      pron: "ذيز آيتمز آر لوكيتد جاست آوتسايد ذا كلاينتس روم أور إن أن أنتيروم.",
                      ar: "توجد هذه العناصر خارج غرفة المريض مباشرة أو في غرفة الانتظار."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "🧤 Removing Personal Protective Equipment — نزع معدات الوقاية الشخصية"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "The procedure involves making contact between two contaminated surfaces or two clean surfaces.",
                      pron: "ذا بروسيجر إنڤولڤز ميكينغ كونتاكت بيتوين تو كونتامينيتد سيرفيسز أور تو كلين سيرفيسز.",
                      ar: "يتضمن الإجراء إجراء تلامس بين سطحين ملوثين أو سطحين نظيفين."
                    },
                    {
                      en: "Nurses remove the garments that are most contaminated first, preserving the clean uniform underneath.",
                      pron: "نيرسز ريموف ذا گارمنتس ذات آر موست كونتامينيتد فرست، پريزيرفينغ ذا كلين يونيفورم أندرنيذ.",
                      ar: "تخلع الممرضات الملابس الأكثر تلوثاً أولاً، للحفاظ على الزي النظيف الذي تحتها."
                    }
                  ]
                },
                {
                  type: "list",
                  label: "📋 ترتيب نزع معدات الوقاية الشخصية (من الأكثر تلوثاً إلى الأقل)",
                  items: [
                    "1. خلع القفازات (Gloves) — الأكثر تلوثاً",
                    "2. خلع النظارات الواقية أو واقي الوجه (Goggles/Face shield)",
                    "3. خلع الرداء (Gown)",
                    "4. خلع الكمامة أو جهاز التنفس (Mask/Respirator) — الأقل تلوثاً"
                  ]
                }
              ]
            },
            // ==================== PAGE 8: DOUBLE BAGGING & TRANSPORTING CLIENTS ====================
            {
              title: "التكيس المزدوج ونقل المرضى وإزالة العناصر القابلة لإعادة الاستخدام",
              sections: [
                {
                  type: "heading",
                  text: "🛍️ Double Bagging — التكيس المزدوج"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Double-bagging is an infection control measure in which one bag of contaminated items, such as trash or laundry, is placed within another.",
                      pron: "دابل-باغينغ إز أن إنفيكشن كونترول ميجرد إن وِتش ون باغ أوف كونتامينيتد آيتمز، ساتش آز تراش أور لاندرِي، إز پلايسد ويذن أناذر.",
                      ar: "التكيس المزدوج هو إجراء لمكافحة العدوى يتم فيه وضع كيس واحد من العناصر الملوثة، مثل القمامة أو البياضات، داخل كيس آخر."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "🚑 Transporting Clients — نقل المرضى"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "During transport, nurses use methods to prevent the spread of pathogens either directly or indirectly from the client.",
                      pron: "ديرينغ ترانسبورت، نيرسز يوز ميثودز تو پريڤنت ذا سبرید أوف باثوجنز إيذر دايريكتلي أور إيندايريكتلي فروم ذا كلاينت.",
                      ar: "أثناء النقل، تستخدم الممرضات طرقاً لمنع انتشار مسببات الأمراض بشكل مباشر أو غير مباشر من المريض."
                    },
                    {
                      en: "The client wears a mask or particulate air filter respirator if the pathogen is transmitted by the airborne or droplet route.",
                      pron: "ذا كلاينت ويرز أ ماسك أور پارتیکیوليت إير فيلتر ريسپيراتور إف ذا باثوجن إز ترانسميتد باي ذا إيربورن أور دروپليت روت.",
                      ar: "يرتدي المريض كمامة أو جهاز تنفس بفلتر هواء للجسيمات إذا كان العامل الممرض ينتقل عبر الهواء أو القطيرات."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "🔄 Removing Reusable Items — إزالة العناصر القابلة لإعادة الاستخدام"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "They are cleaned with an antimicrobial disinfectant, bagged, and sterilized using heat or chemicals.",
                      pron: "ذَي آر كليند وِذ أن أنتيمايكروبيال ديسإنفيكتنت، باغد، آند ستيريلايزد يوزينغ هيت أور كيميكلز.",
                      ar: "تُنظف بمطهر مضاد للميكروبات، وتُكيس، وتُعقم باستخدام الحرارة أو المواد الكيميائية."
                    }
                  ]
                },
                {
                  type: "info",
                  style: "tip",
                  label: "💡 ملاحظة مهمة",
                  text: "تذكر دائماً:\n• القفازات تُخلع أولاً (الأكثر تلوثاً)\n• الكمامة تُخلع أخيراً (الأقل تلوثاً)\n• اغسل يديك فوراً بعد خلع جميع المعدات"
                }
              ]
            },
            // ==================== PAGE 9: PSYCHOLOGICAL IMPLICATIONS & NURSING IMPLICATIONS ====================
            {
              title: "الآثار النفسية والآثار التمريضية",
              sections: [
                {
                  type: "heading",
                  text: "🧠 Psychological Implications — الآثار النفسية"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Although infection control measures are necessary, they often leave clients feeling shunned or abandoned.",
                      pron: "ألذو إنفيكشن كونترول ميجردز آر نيسيسري، ذَي أوفن ليف كلاينتس فيلينغ شاند أور أباندد.",
                      ar: "على الرغم من أن إجراءات مكافحة العدوى ضرورية، إلا أنها غالباً ما تجعل المرضى يشعرون بالتجنب أو الهجر."
                    },
                    {
                      en: "Clients with infectious diseases continue to need human contact and interaction.",
                      pron: "كلاينتس وِذ إنفيكشس ديزيزز كونتينيو تو نيد هيومن كونتاكت آند إنترأكشن.",
                      ar: "يستمر مرضى الأمراض المعدية في الحاجة إلى التواصل والتفاعل البشري."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "👥 Promoting Social Interaction — تعزيز التفاعل الاجتماعي"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Nurses encourage visitors to come as often as the agency's policies and the client's condition permit.",
                      pron: "نيرسز إنكوراج ڤيزيتورز تو كام آز أوفن آز ذا إيجنسيز پوليسيز آند ذا كلاينتس كونديشن پرميت.",
                      ar: "تشجع الممرضات الزوار على القدوم بقدر ما تسمح به سياسات المؤسسة وحالة المريض."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "😴 Combating Sensory Deprivation — مكافحة الحرمان الحسي"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Sensory deprivation results when a person experiences insufficient sensory stimulation or is exposed to sensory stimulation that is continuous and monotonous.",
                      pron: "سينسوري ديپريڤيشن ريزولتس وين أ پرسن إكسبيرينسز إنسفيشنت سينسوري ستيوليشن أور إز إكسبوزد تو سينسوري ستيوليشن ذات إز كونتينيووس آند مونوتونس.",
                      ar: "يحدث الحرمان الحسي عندما يعاني الشخص من تحفيز حسي غير كافٍ أو يتعرض لتحفيز حسي مستمر ورتيب."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "📋 Nursing Implications — الآثار التمريضية"
                },
                {
                  type: "terms",
                  items: [
                    { en: "Risk for Infection", pron: "ريسك فور إنفيكشن", ar: "خطر الإصابة بالعدوى" },
                    { en: "Ineffective Protection", pron: "إينإفكتيف بروتيكشن", ar: "حماية غير فعالة" },
                    { en: "Risk for Infection Transmission", pron: "ريسك فور إنفيكشن ترانسميشن", ar: "خطر انتقال العدوى" },
                    { en: "Impaired Social Interaction", pron: "إمپيرد سوشال إنترأكشن", ar: "ضعف التفاعل الاجتماعي" },
                    { en: "Social Isolation", pron: "سوشال آيسوليشن", ar: "العزلة الاجتماعية" },
                    { en: "Risk for Loneliness", pron: "ريسك فور لونلينس", ar: "خطر الشعور بالوحدة" },
                    { en: "Deficient Diversional Activity", pron: "ديفيشنت دايفيرجونال أكتيڤيتي", ar: "نقص النشاط الترفيهي" },
                    { en: "Powerlessness", pron: "پاورلسنيس", ar: "العجز" },
                    { en: "Fear", pron: "فير", ar: "الخوف" }
                  ]
                }
              ]
            },
            // ==================== PAGE 10: CRITICAL THINKING & NCLEX QUESTIONS ====================
            {
              title: "تمارين التفكير النقدي وأسئلة على غرار NCLEX",
              sections: [
                {
                  type: "heading",
                  text: "🧠 Critical Thinking Exercises — تمارين التفكير النقدي"
                },
                {
                  type: "info",
                  style: "tip",
                  label: "❓ السؤال الأول",
                  text: "Give some reasons why controlling the spread of infectious diseases is difficult among children cared for in day-care centers.\n\nاذكر بعض الأسباب التي تجعل السيطرة على انتشار الأمراض المعدية صعبة بين الأطفال في مراكز الرعاية النهارية.\n\n📌 الإجابة المقترحة: قلة النظافة الشخصية لدى الأطفال، التلامس الوثيق المستمر، مشاركة الألعاب والأدوات، ضعف جهاز المناعة لدى الأطفال الصغار، وصعوبة تطبيق احتياطات مكافحة العدوى بشكل صارم."
                },
                {
                  type: "info",
                  style: "tip",
                  label: "❓ السؤال الثاني",
                  text: "What action(s) is/are appropriate to take if there are several residents in a long-term care facility who acquire an infection with a transmittable pathogen and there are not enough private rooms to relocate them?\n\nما الإجراءات المناسبة إذا كان هناك عدة نزلاء في منشأة رعاية طويلة الأجل أصيبوا بعدوى بمسبب مرض معدٍ ولا توجد غرف خاصة كافية لنقلهم؟\n\n📌 الإجابة المقترحة: تجميع المصابين بنفس العدوى في غرفة واحدة (Cohorting)، استخدام الستائر الفاصلة بين الأسرة، تعزيز احتياطات مكافحة العدوى، وزيادة وتيرة التنظيف والتطهير."
                },
                {
                  type: "heading",
                  text: "📝 NCLEX-Style Review Questions — أسئلة على غرار اختبار الترخيص"
                },
                {
                  type: "info",
                  style: "important",
                  label: "❓ السؤال الأول",
                  text: "When a nurse empties the secretions from a wound suction container, which of the following personal protective measures is most important at this time?\n\nعند قيام ممرضة بتفريغ إفرازات من حاوية شفط الجرح، أي من إجراءات الحماية الشخصية التالية هو الأكثر أهمية في هذا الوقت؟\n\nA) Wear a mask. (ارتداء كمامة)\nB) Wear a gown. (ارتداء رداء)\nC) Wear goggles. (ارتداء نظارات واقية)\nD) Wear gloves. (ارتداء قفازات) ✓\n\n📌 Test Taking Strategy: اختر الخيار الذي يحدد الحاجز الأساسي من سوائل الجسم التي قد تحتوي على مسببات الأمراض. القفازات هي الأكثر أهمية لأنها تمنع التلامس المباشر مع السوائل الملوثة."
                },
                {
                  type: "info",
                  style: "important",
                  label: "❓ السؤال الثاني",
                  text: "When a person comes to the emergency department with respiratory symptoms, which of the following infection control measures is appropriate to use initially?\n\nعندما يأتي شخص إلى قسم الطوارئ يعاني من أعراض تنفسية، أي من إجراءات مكافحة العدوى التالية مناسب للاستخدام أولاً؟\n\nA) Contact precautions (احتياطات التلامس)\nB) Airborne precautions (احتياطات الانتقال بالهواء)\nC) Respiratory hygiene/cough etiquette (نظافة الجهاز التنفسي/آداب السعال) ✓\nD) Droplet precautions (احتياطات الانتقال بالقطيرات)\n\n📌 Test Taking Strategy: اختر الخيار المناسب للاستخدام عند نقطة المواجهة الأولى مع مريض يعاني من حالة تنفسية معدية محتملة. نظافة الجهاز التنفسي هي الإجراء الأولي المناسب."
                },
                {
                  type: "info",
                  style: "important",
                  label: "❓ السؤال الثالث (ترتيب الخطوات)",
                  text: "When exiting the room of a client being cared for with contact precautions, arrange the steps in the order in which personal protection items are removed. Use all the options.\n\nعند الخروج من غرفة مريض يتم رعايته باحتياطات التلامس، رتب الخطوات حسب الترتيب الذي تُنزع به عناصر الحماية الشخصية. استخدم جميع الخيارات.\n\n✅ الترتيب الصحيح:\n1. Remove gloves one at a time. (خلع القفازات واحدة تلو الأخرى) — الأكثر تلوثاً\n2. Remove goggles, if worn. (خلع النظارات الواقية، إذا كانت مرتدية)\n3. Untie and remove the gown. (فك وخلع الرداء)\n4. Take off the mask or particulate air respirator. (خلع الكمامة أو جهاز التنفس) — الأقل تلوثاً\n\n📌 Test Taking Strategy: رتب عناصر الحماية الشخصية من الأكثر تلوثاً إلى الأقل تلوثاً."
                },
                {
                  type: "info",
                  style: "important",
                  label: "❓ السؤال الرابع (حساسية اللاتكس)",
                  text: "What is the best advice the nurse can give to someone who is allergic to latex, yet must wear gloves for standard precautions?\n\nما هي أفضل نصيحة يمكن للممرضة تقديمها لشخص يعاني من حساسية اللاتكس، ومع ذلك يجب عليه ارتداء قفازات للاحتياطات القياسية؟\n\nA) Rinse the latex gloves with running tap water before donning them.\nB) Apply a petroleum ointment to both hands before donning latex gloves.\nC) Eliminate wearing gloves, but wash both hands vigorously with alcohol afterward.\nD) Wear two pairs of vinyl gloves if there is a potential for contact with blood or body fluid. ✓\n\n📌 Test Taking Strategy: اختر الخيار الذي يوفر الحماية من التلامس مع مسببات الأمراض ومسببات الحساسية. القفازات الفينيلية هي بديل آمن للاتكس."
                },
                {
                  type: "info",
                  style: "important",
                  label: "❓ السؤال الخامس (الوقاية من الإنفلونزا)",
                  text: "Other than obtaining an immunization against influenza, what is the best advice the nurse can give to high-risk people to avoid acquiring this infection?\n\nبخلاف الحصول على تطعيم ضد الإنفلونزا، ما هي أفضل نصيحة يمكن للممرضة تقديمها للأشخاص المعرضين لخطر كبير لتجنب الإصابة بهذه العدوى؟\n\nA) Consume adequate vitamin C.\nB) Avoid going to crowded places. ✓\nC) Dress warmly in cold weather.\nD) Reduce daily stress and anxiety.\n\n📌 Test Taking Strategy: اختر الخيار الأفضل من بين الخيارات الأخرى للوقاية من احتمالية الإصابة بعدوى الجهاز التنفسي مثل الإنفلونزا. تجنب الأماكن المزدحمة يقلل من التعرض للعامل الممرض."
                }
              ]
            }
          ]
        }
      ],
      lectures: [
        { title: "Asepsis (الجزء الأول)", url: "https://youtu.be/Fj_cHc7qiHI" },
        { title: "Asepsis (الجزء الثاني)", url: "https://youtu.be/O1qCfxoZxXE" },
        { title: "Infection Control", url: "https://youtu.be/6AydMEgD2V0" },
        { title: "Safety", url: "https://youtu.be/YVBFkQ9gsoU" },
        { title: "Admission, Discharge, Transfer (الجزء الأول والثاني)", url: "https://youtu.be/tt1ifco00W8" },
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
      chapters: [
        { name: "العلامات الحيوية", pdfUrl: "", pages: [{ title: "مقدمة", sections: [{ type: "info", style: "tip", label: "🔜 قريباً", text: "محتوى هذا الشابتر قيد الإعداد" }] }] },
        { name: "العناية بالجروح", pdfUrl: "", pages: [{ title: "مقدمة", sections: [{ type: "info", style: "tip", label: "🔜 قريباً", text: "محتوى هذا الشابتر قيد الإعداد" }] }] },
        { name: "إعطاء الأدوية", pdfUrl: "", pages: [{ title: "مقدمة", sections: [{ type: "info", style: "tip", label: "🔜 قريباً", text: "محتوى هذا الشابتر قيد الإعداد" }] }] }
      ],
      lectures: []
    },
    {
      id: "tashreeh",
      name: "التشريح",
      description: "دراسة تركيب الجسم البشري",
      icon: "🧠",
      color: "#a78bfa",
      bookChapters: [],
      chapters: [
        { name: "الجهاز الهيكلي", pdfUrl: "", pages: [{ title: "مقدمة", sections: [{ type: "info", style: "tip", label: "🔜 قريباً", text: "محتوى هذا الشابتر قيد الإعداد" }] }] },
        { name: "الجهاز العضلي", pdfUrl: "", pages: [{ title: "مقدمة", sections: [{ type: "info", style: "tip", label: "🔜 قريباً", text: "محتوى هذا الشابتر قيد الإعداد" }] }] }
      ],
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
      chapters: [
        { name: "الخلية", pdfUrl: "", pages: [{ title: "مقدمة", sections: [{ type: "info", style: "tip", label: "🔜 قريباً", text: "محتوى هذا الشابتر قيد الإعداد" }] }] }
      ],
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
  ]
};

// ==================== QUIZ DATA ====================
const quizData = {
  nadhari: {
    0: [
      { question: "ما هو تعريف Asepsis؟", options: ["تعقيم كامل", "الممارسات التي تقلل أو تقضي على العوامل المعدية", "نظافة عامة", "تطهير الأسطح فقط"], correct: 1 },
      { question: "ما هي المدة الدنيا لغسل اليدين بالصابون؟", options: ["5 ثوان", "10 ثوان", "15 ثانية", "30 ثانية"], correct: 2 },
      { question: "أي من هذه الكائنات هي أصغر الكائنات الحية الدقيقة؟", options: ["البكتيريا", "الفطريات", "الفيروسات", "الأوليات"], correct: 2 },
      { question: "ما هي البوغة (Spore)؟", options: ["ميكروب نشط دائماً", "شكل حياة ميكروبية غير نشطة مؤقتاً تقاوم الحرارة والمواد الكيميائية", "نوع من البكتيريا", "فيروس صغير"], correct: 1 },
      { question: "كم عدد مكونات سلسلة العدوى؟", options: ["4", "5", "6", "7"], correct: 2 },
      { question: "ما هو الفرق بين Medical Asepsis و Surgical Asepsis؟", options: ["لا يوجد فرق", "Medical تقلل الميكروبات، Surgical تقضي عليها تماماً بما فيها الأبواغ", "Surgical أسهل تطبيقاً", "Medical للعمليات فقط"], correct: 1 },
      { question: "أي من هذه المواد يُستخدم لتعقيم المعدات ويقضي على الأبواغ؟", options: ["الكحول", "الصابون", "الكلور", "الغلوتارالدهيد (Cidex)"], correct: 3 },
      { question: "ما المقصود بـ Nosocomial Infection؟", options: ["عدوى منقولة جنسياً", "عدوى مكتسبة من المستشفى أثناء تلقي الرعاية", "عدوى فيروسية", "عدوى الجلد"], correct: 1 },
      { question: "في الفرك الجراحي، كيف يجب أن تكون وضعية اليدين؟", options: ["أسفل المرفقين", "فوق مستوى المرفقين", "على مستوى الصدر", "لا يهم الوضعية"], correct: 1 },
      { question: "ما هو طريق انتقال العدوى الذي يحدث في مسافة أقل من 3 أقدام؟", options: ["Airborne", "Vehicle", "Droplet", "Vector"], correct: 2 }
    ],
    1: [
      { question: "ما هي مراحل العدوى الأربعة بالترتيب الصحيح؟", options: ["الحضانة-البادرات-الذروة-النقاهة", "البادرات-الحضانة-الذروة-النقاهة", "الذروة-الحضانة-البادرات-النقاهة", "النقاهة-الذروة-البادرات-الحضانة"], correct: 0 }
    ],
    2: [
      { question: "ما هي أكثر المخاطر شيوعاً بين كبار السن في المستشفى؟", options: ["الحروق", "السقوط", "التسمم الدوائي", "الاختناق"], correct: 1 }
    ]
  },
  amali: {
    0: [
      { question: "ما هي النسبة الصحيحة للضغطات إلى التنفس في الإنعاش القلبي الرئوي؟", options: ["30:2", "15:2", "30:1", "15:1"], correct: 0 }
    ]
  },
  tashreeh: {
    0: [
      { question: "كم عدد عظام الإنسان البالغ؟", options: ["200", "206", "210", "215"], correct: 1 },
      { question: "أي من هذه ليس جزءاً من الجهاز الهيكلي؟", options: ["الجمجمة", "القفص الصدري", "الكبد", "العمود الفقري"], correct: 2 }
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
function getChapterProgress(courseId, chapterIdx, totalPages) {
  const p = getProgress();
  const read = Object.keys(p[courseId]?.[chapterIdx] || {}).length;
  return totalPages > 0 ? Math.round((read / totalPages) * 100) : 0;
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
    for (const course of coursesData.courses) {
      for (let ci = 0; ci < (course.chapters || []).length; ci++) {
        const ch = course.chapters[ci];
        for (let pi = 0; pi < (ch.pages || []).length; pi++) {
          const page = ch.pages[pi];
          for (const sec of (page.sections || [])) {
            if (sec.type === 'sentences') {
              for (const item of sec.items) {
                if (item.en.toLowerCase().includes(q) || item.ar.includes(q) || item.pron.includes(q)) {
                  results.push({ course, ci, pi, item, chName: ch.name, pageTitle: page.title });
                }
              }
            } else if (sec.type === 'terms') {
              for (const item of sec.items) {
                if (item.en.toLowerCase().includes(q) || item.ar.includes(q) || item.pron.includes(q)) {
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
        <div class="sentence-en"><div class="sentence-en-text">${r.item.en}</div></div>
        <div class="sentence-ar"><span class="ar-label">ترجمة</span><div class="sentence-ar-text">${r.item.ar}</div></div>
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
      ${coursesData.courses.map(course => {
        const chapters = course.chapters || [];
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
  const totalPages = coursesData.courses.reduce((s, c) => s + (c.chapters || []).reduce((cs, ch) => cs + (ch.pages?.length || 0), 0), 0);
  const readPages = coursesData.courses.reduce((s, c) => s + (c.chapters || []).reduce((cs, ch, ci) => cs + Object.keys(p[c.id]?.[ci] || {}).length, 0), 0);

  container.innerHTML = `
    <div class="fade-in">
      <div class="welcome-hero">
        <h2>أهلاً وسهلاً! 👩‍⚕️</h2>
        <p>تعلم التمريض بطريقة منظمة ومبسطة</p>
        <div class="welcome-stats">
          <span class="stat-pill">📚 ${coursesData.courses.length} مساقات</span>
          <span class="stat-pill">📄 ${readPages}/${totalPages} صفحة</span>
        </div>
      </div>
      <div class="section-label">المساقات المتاحة</div>
      <div class="courses-grid" id="coursesGrid"></div>
    </div>
  `;
  const grid = document.getElementById('coursesGrid');
  if (grid) {
    grid.innerHTML = coursesData.courses.map(c => `
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
  const course = coursesData.courses.find(c => c.id === courseId);
  if (!course) { navigateTo('home'); return; }

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
    () => renderChaptersList(course, courseId),
    () => navigateTo('lectures', { courseId }),
    () => navigateTo('book', { courseId }),
    () => renderQuizzesList(course, courseId)
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
  if (tc) tc.innerHTML = renderChaptersList(course, courseId);
}

function renderChaptersList(course, courseId) {
  const p = getProgress();
  if (!course.chapters?.length) return '<div class="empty-state"><div class="empty-state-icon">📭</div><p>لا توجد ملخصات متاحة حالياً</p></div>';
  return `
    <div class="section-label">الشابترات</div>
    <div class="chapter-list">
      ${course.chapters.map((ch, idx) => {
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

function renderQuizzesList(course, courseId) {
  if (!course.chapters?.length) return '<div class="empty-state"><div class="empty-state-icon">📭</div><p>لا توجد اختبارات متاحة</p></div>';
  return `
    <div class="section-label">اختبارات الشابترات</div>
    <div class="chapter-list">
      ${course.chapters.map((ch, idx) => {
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
          <div class="sentence-en-text">${item.en}</div>
        </div>
        <div class="sentence-pron">
          <span class="pron-label">نطق</span>
          <div class="sentence-pron-text">${item.pron}</div>
        </div>
        <div class="sentence-ar">
          <span class="ar-label">ترجمة</span>
          <div class="sentence-ar-text">${item.ar}</div>
        </div>
      </div>
    `).join('');
  }
  if (sec.type === 'terms') {
    return sec.items.map(item => `
      <div class="term-card">
        <div class="term-en">
          <span class="term-en-word">${item.en}</span>
          <span class="term-pron">[${item.pron}]</span>
        </div>
        <div class="term-ar">${item.ar}</div>
      </div>
    `).join('');
  }
  if (sec.type === 'info') {
    return `
      <div class="info-box ${sec.style || ''}">
        <div class="info-box-label">${sec.label}</div>
        <p style="white-space:pre-line">${sec.text}</p>
      </div>
    `;
  }
  if (sec.type === 'list') {
    return `
      <div class="info-box">
        <div class="info-box-label" style="color:var(--accent)">${sec.label}</div>
        <div class="content-list" style="margin-top:8px">
          ${sec.items.map((item, i) => `
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
  const course = coursesData.courses.find(c => c.id === courseId);
  if (!course) { navigateTo('home'); return; }
  const chapter = course.chapters?.[chapterIdx];
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
          <div class="page-nav-title">${page.title}</div>
        </div>
        <span class="page-counter">${currentPage + 1} / ${totalPages}</span>
      </div>

      ${totalPages > 1 ? `
        <div class="page-dots">
          ${pages.map((_, i) => `<button class="page-dot ${i === currentPage ? 'active' : ''}" data-pi="${i}" title="صفحة ${i + 1}"></button>`).join('')}
        </div>
      ` : ''}

      <div id="pageContent">
        ${page.sections.map(renderSection).join('')}
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

  // Scroll to top
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ==================== LECTURES PAGE ====================
function renderLectures(container, courseId) {
  const course = coursesData.courses.find(c => c.id === courseId);
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
  const course = coursesData.courses.find(c => c.id === courseId);
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
  const course = coursesData.courses.find(c => c.id === courseId);
  if (!course) { navigateTo('home'); return; }
  const chapter = course.chapters?.[chapterIdx];
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

  // Option selection
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
  renderPage();
  updateOnlineStatus();
});
