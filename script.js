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
        {
          name: "Asepsis - العقامة (الفصل الأول)",
          pdfUrl: "https://www.mediafire.com/file/3ngj0dww90i5i7f/Asepsis.pdf/file",
          pages: [
            // ==================== PAGE 1: INTRODUCTION TO ASEPSIS ====================
            {
              title: "مقدمة في العقامة (Asepsis) والكائنات الحية الدقيقة",
              sections: [
                {
                  type: "heading",
                  text: "🩺 أولاً: Asepsis — العقامة (منع العدوى)"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Preventing infections is one of the most important priorities in nursing.",
                      pron: "بريڤنتنج إنفيكشنز إيز ون أوف ذا موست إمبورتنت برايوريتيز إن نيرسنج.",
                      ar: "يُعدّ منع العدوى أحد أهم الأولويات في مهنة التمريض."
                    },
                    {
                      en: "Asepsis means those practices that decrease or eliminate infectious agents, their reservoirs, and vehicles for transmission.",
                      pron: "أسيبسيس ميينز ذوز براكتسيز ذات ديكريس أور إليمينيت إنفيكشس إيجنتس، ذيير ريزيرڤوارز، آند ڤيهيكلز فور ترانسميشن.",
                      ar: "العقامة (Asepsis) تعني الممارسات التي تقلل أو تقضي على العوامل المعدية ومستودعاتها ووسائل نقلها."
                    },
                    {
                      en: "It is the major method for controlling infection.",
                      pron: "إت إيز ذا مايجر ميثود فور كونترولنج إنفيكشن.",
                      ar: "وهي الطريقة الرئيسية لمكافحة العدوى."
                    }
                  ]
                },
                {
                  type: "info",
                  style: "important",
                  label: "💡 تحليل المصطلح (Etymology)",
                  text: "كلمة Asepsis تتكون من مقطعين:\n• \"A\" = بدون / نافية (Without)\n• \"Sepsis\" = إنتان / تعفن دم (Infection)\n\n→ المعنى الكامل: بدون إنتان = منع العدوى\n\n⚠️ فرق مهم: Infection = عدوى | Sepsis = إنتان (حالة خطيرة)"
                },
                {
                  type: "heading",
                  text: "🦠 ثانياً: Microorganisms — الكائنات الحية الدقيقة (الجراثيم)"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Microorganisms, living animals or plants visible only with a microscope, are commonly called germs.",
                      pron: "مايكرو-أورجانيزمز، ليڤنج أنيملز أور بلانتس ڤيزيبل أونلي ويذ أ مايكروسكوب، آر كومونلي كولد جيرمز.",
                      ar: "الكائنات الحية الدقيقة، وهي كائنات حية (حيوانات أو نباتات) لا تُرى إلا بالمجهر، تُسمى عادةً بالجراثيم."
                    },
                    {
                      en: "What they lack in size, they make up for in numbers.",
                      pron: "وات ذي لاك إن سايز، ذي ميك أب فور إن نمبرز.",
                      ar: "وما تفتقر إليه هذه الكائنات في الحجم، تعوضه في أعدادها الكبيرة."
                    },
                    {
                      en: "Microorganisms are everywhere: in the air, soil, and water, and on and within virtually everything and everyone.",
                      pron: "مايكرو-أورجانيزمز آر إيڤريوير: إن ذا إير، سويل، آند ووتر، آند أون آند ويذن ڤيرتشوالي إيڤريثينج آند إيڤريون.",
                      ar: "تتواجد الكائنات الحية الدقيقة في كل مكان: في الهواء والتربة والماء، وعلى (وفي داخل) كل شيء وكل شخص تقريباً."
                    }
                  ]
                }
              ]
            },
            // ==================== PAGE 2: TYPES OF MICROORGANISMS ====================
            {
              title: "أنواع الكائنات الحية الدقيقة (Types of Microorganisms)",
              sections: [
                {
                  type: "heading",
                  text: "🧫 تصنيف الكائنات الحية الدقيقة"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Microorganisms are divided into two main groups: nonpathogens or normal flora and pathogens.",
                      pron: "مايكرو-أورجانيزمز آر ديڤايدد إنتو تو ميين جروبس: نون-باثوجنز أور نورمال فلورا آند باثوجنز.",
                      ar: "تنقسم الكائنات الحية الدقيقة إلى مجموعتين رئيسيتين: غير الممرضة (أو الفلورا الطبيعية) والممرضة."
                    },
                    {
                      en: "Non-Pathogens are mutually beneficial, or neither harming nor helping the host.",
                      pron: "نون-باثوجنز آر ميوتشوالي بينيفيشل، أور نيذر هارمنج نور هيلبنج ذا هوست.",
                      ar: "غير الممرضة: كائنات متعايشة أو نافعة أحياناً، ولا تسبب ضرراً للعائل (المضيف)."
                    },
                    {
                      en: "Pathogens have high potential for causing infectious communicable diseases, also called contagious diseases and community-acquired infections.",
                      pron: "باثوجنز هاڤ هاي بوتنشل فور كوزنج إنفيكشس كوميونيكابل ديزيزز، أولسو كولد كونتايجس ديزيزز آند كوميونيتي-أكويرد إنفيكشنز.",
                      ar: "الممرضة: لديها إمكانية عالية للتسبب في أمراض معدية منقولة، وتسمى أيضاً بالأمراض السارية (المعدية) والعدوى المكتسبة من المجتمع."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "📋 أنواع الميكروبات المسببة للأمراض (Pathogenic Microorganisms)"
                },
                {
                  type: "terms",
                  items: [
                    { en: "Bacteria", pron: "باكتيريا", ar: "البكتيريا — كائنات حية دقيقة وحيدة الخلية" },
                    { en: "Viruses", pron: "ڤايرسز", ar: "الفيروسات — أصغر الكائنات الحية الدقيقة" },
                    { en: "Fungi", pron: "فانجاي", ar: "الفطريات — تشمل الخمائر والعفن" },
                    { en: "Rickettsiae", pron: "ريكيتسيا", ar: "الريكتسيا — تشبه البكتيريا؛ توجد مثل الفيروسات في البراغيث والقمل" },
                    { en: "Protozoans", pron: "بروتوزوانز", ar: "الأوليات (البروتوزوا) — كائنات وحيدة الخلية مثل الأميبا" },
                    { en: "Mycoplasmas", pron: "مايكوبلازمز", ar: "الميكوبلازما — تفتقر إلى جدار خلوي، يشار إليها بأنها متعددة الأشكال (Pleomorphic)" },
                    { en: "Helminths", pron: "هيلمينثس", ar: "الديدان الطفيلية — ديدان معدية" },
                    { en: "Prions", pron: "برايونز", ar: "البريونات — بروتينات معدية تسبب أمراضاً تنكسية عصبية" }
                  ]
                },
                {
                  type: "info",
                  style: "tip",
                  label: "💡 معلومة مهمة",
                  text: "بعض الكائنات الدقيقة أقل خطورة من غيرها. مثال: البكتيريا المعوية تساعد في إنتاج فيتامين K الذي يساعد في السيطرة على النزيف."
                }
              ]
            },
            // ==================== PAGE 3: SURVIVAL OF MICROORGANISMS & SPORES ====================
            {
              title: "بقاء الميكروبات على قيد الحياة (Survival of Microorganisms) والأبواغ (Spores)",
              sections: [
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Many pathogens have mutated to adapt to hostile environments and unfavorable living conditions.",
                      pron: "ميني باثوجنز هاڤ ميوتيتد تو أدابت تو هوستايل إنڤايرونمنتس آند أنفيڤورابل ليڤنج كوندشنز.",
                      ar: "لقد تحورت العديد من مسببات الأمراض للتكيف مع البيئات المعادية وظروف المعيشة غير المواتية."
                    },
                    {
                      en: "Such adaptability has ensured that they continue to pose a threat to humans.",
                      pron: "سيتش أداپتابيليتي هاز إنشيورد ذات ذي كونتيniu تو بوز أ ثريت تو هيومنز.",
                      ar: "وقد ضمنت هذه القدرة على التكيف استمرارها في تشكيل تهديد للبشر."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "🔵 Spore — البوغة (الحويصلة)"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "A spore is a temporarily inactive microbial life form that can resist heat and destructive chemicals and survive without moisture.",
                      pron: "أ سبور إيز أ تمبورارلي إنآكتيڤ مايكروبيال لايف فورم ذات كان ريزيست هيت آند ديستراكتيڤ كيميكلز آند سيرڤايف ويذاوت مويستشر.",
                      ar: "البوغة (Spore): هي شكل من أشكال الحياة الميكروبية غير النشطة مؤقتاً، والتي يمكنها مقاومة الحرارة والمواد الكيميائية المدمرة والبقاء على قيد الحياة دون رطوبة."
                    }
                  ]
                },
                {
                  type: "list",
                  label: "✅ خصائص البوغة (Characteristics of Spores)",
                  items: [
                    "طور غير نشط مؤقتاً (Temporarily inactive)",
                    "تقاوم الحرارة العالية (Resist heat)",
                    "تقاوم المواد الكيميائية (Resist chemicals)",
                    "تعيش بدون رطوبة (Survive without moisture)",
                    "تنشط مجدداً عند توفر الظروف المناسبة (Reactivate when conditions become favorable)"
                  ]
                },
                {
                  type: "info",
                  style: "warning",
                  label: "⚠️ الأهمية السريرية (Clinical Importance)",
                  text: "الأبواغ تجعل بعض البكتيريا مقاومة للتعقيم العادي وتتطلب التعقيم الجراحي (Sterilization).\nمثال: بكتيريا Clostridium difficile (C. diff) المسببة للإسهال المرتبط بالمضادات الحيوية."
                }
              ]
            },
            // ==================== PAGE 4: CHAIN OF INFECTION ====================
            {
              title: "سلسلة العدوى (Chain of Infection)",
              sections: [
                {
                  type: "sentences",
                  items: [
                    {
                      en: "By interfering with the conditions that perpetuate the transmission of microorganisms, humans can avoid acquiring infectious diseases.",
                      pron: "باي إنترفيرنج ويذ ذا كوندشنز ذات بيربيتشويت ذا ترانسميشن أوف مايكرو-أورجانيزمز، هيومنز كان أڤويد أكواير'نج إنفيكشس ديزيزز.",
                      ar: "من خلال التدخل في الظروف التي تسمح باستمرار انتقال الكائنات الدقيقة، يمكن للبشر تجنب الإصابة بالأمراض المعدية."
                    },
                    {
                      en: "The six essential components of the chain of infection must be in place if pathogens are to be transmitted from one location or person to another.",
                      pron: "ذا سيكس إسينشل كومبوننتس أوف ذا تشين أوف إنفيكشن موست بي إن بليس إف باثوجنز آر تو بي ترانسميتد فروم ون لوكيشن أور بيرسن تو أناذر.",
                      ar: "يجب أن تكتمل المكونات الستة الأساسية لسلسلة العدوى لكي تنتقل مسببات الأمراض من مكان أو شخص إلى آخر."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "🔗 المكونات الستة لسلسلة العدوى"
                },
                {
                  type: "terms",
                  items: [
                    { en: "1. Infectious Agent", pron: "إنفيكشس إيجنت", ar: "العامل المعدي — الميكروب المسبب للمرض (بكتيريا، فيروسات، فطريات، إلخ)" },
                    { en: "2. Reservoir", pron: "ريزيرڤوار", ar: "المستودع — المكان الذي ينمو فيه الميكروب ويتكاثر (بيئة مناسبة للبقاء)" },
                    { en: "3. Portal of Exit", pron: "بورتل أوف إكزيت", ar: "منفذ الخروج — كيف يخرج الميكروب من المستودع (الدم، الإفرازات، البول، البراز، الرذاذ)" },
                    { en: "4. Mode of Transmission", pron: "مود أوف ترانسميشن", ar: "طريقة الانتقال — كيف ينتقل الميكروب إلى موقع آخر" },
                    { en: "5. Portal of Entry", pron: "بورتل أوف إنتري", ar: "منفذ الدخول — مكان دخول الميكروب للعائل الجديد (الأغشية المخاطية، الجهاز التنفسي، الجروح)" },
                    { en: "6. Susceptible Host", pron: "سوسبتيبل هوست", ar: "العائل القابل للإصابة — شخص لديه استعداد للمرض بسبب ضعف المناعة" }
                  ]
                },
                {
                  type: "info",
                  style: "important",
                  label: "🎯 المبدأ الوقائي (The Preventive Principle)",
                  text: "منع انتشار العدوى يعتمد على \"كسر\" حلقة واحدة على الأقل من الحلقات الست في سلسلة العدوى.\n\nأمثلة على المستودعات (Reservoirs):\n• الأشخاص (People) • المعدات (Equipment) • الماء (Water) • الجلد (Skin) • الدم (Blood) • جذوع الشعيرات (Shafts of hair) • الجروح المفتوحة (Open wounds) • السبيل الهضمي السفلي (Lower digestive tract) • الممرات الأنفية (Nasal passages)"
                }
              ]
            },
            // ==================== PAGE 5: METHODS OF TRANSMISSION ====================
            {
              title: "طرق انتقال العدوى (Methods of Transmission)",
              sections: [
                {
                  type: "heading",
                  text: "📡 طرق الانتقال (Methods of Transmission)"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Direct contact transmission is the actual physical transfer from one infected person to another (body surface to body surface contact).",
                      pron: "دايريكت كونتاكت ترانسميشن إيز ذا آكتشوال فيزيكل ترانسفر فروم ون إنفيكتد بيرسن تو أناذر.",
                      ar: "انتقال التلامس المباشر: هو النقل الفيزيائي الفعلي من شخص مصاب إلى آخر (تلامس سطح الجسم مع سطح الجسم)."
                    },
                    {
                      en: "Indirect contact is contact between a susceptible person and a contaminated object.",
                      pron: "إيندايريكت كونتاكت إيز كونتاكت بيتوين أ سوسبتيبل بيرسن آند أ كونتامينيتد أوبجيكت.",
                      ar: "التلامس غير المباشر: هو التماس بين شخص قابل للإصابة وجسم ملوث (Fomites)."
                    },
                    {
                      en: "Droplet transmission is the transfer of moist particles from an infected person who is within a radius of 3 feet.",
                      pron: "دروبليت ترانسميشن إيز ذا ترانسفر أوف مويست بارتيكلز فروم أن إنفيكتد بيرسن هو إيز ويذن أ رايدييس أوف ثري فيت.",
                      ar: "انتقال القطيرات (الرذاذ): نقل جزيئات رطبة من شخص مصاب ضمن نطاق 3 أقدام (حوالي 90 سم). مثال: استنشاق القطيرات المنطلقة أثناء العطاس أو السعال أو التحدث."
                    },
                    {
                      en: "Airborne transmission is the movement of microorganisms attached to evaporated water droplets or dust particles carried over distances greater than 3 feet.",
                      pron: "إيربورن ترانسميشن إيز ذا موومنت أوف مايكرو-أورجانيزمز أتاتشد تو إيڤاپوريتد ووتر دروپليتس أور داست بارتيكلز.",
                      ar: "الانتقال المحمول جواً: حركة الكائنات الدقيقة المرتبطة بقطيرات متبخرة أو جزيئات غبار تنتقل لمسافات تزيد عن 3 أقدام. مثال: استنشاق الأبواغ."
                    },
                    {
                      en: "Vehicle transmission is the transfer of microorganisms present in contaminated items such as food, water, medications, and equipment.",
                      pron: "ڤيهيكل ترانسميشن إيز ذا ترانسفر أوف مايكرو-أورجانيزمز بريزنت إن كونتامينيتد آيتمز.",
                      ar: "الانتقال عبر وسائط (ناقل غير حي): نقل الكائنات الدقيقة عبر مواد ملوثة كالطعام والماء والأدوية والمعدات. مثال: تناول ماء ملوث بالكائنات الدقيقة."
                    },
                    {
                      en: "Vector transmission is the transfer of microorganisms from an infected animal carrier.",
                      pron: "ڤيكتور ترانسميشن إيز ذا ترانسفر أوف مايكرو-أورجانيزمز فروم أن إنفيكتد أنيمل كاريير.",
                      ar: "الانتقال بواسطة ناقل حيوي: نقل الكائنات الدقيقة من حيوان حامل مصاب. مثال: أمراض ينقلها البعوض، البراغيث، القراد، أو الجرذان."
                    }
                  ]
                },
                {
                  type: "info",
                  style: "tip",
                  label: "📌 ملخص طرق الانتقال (Summary)",
                  text: "• التلامس المباشر (Direct Contact) • التلامس غير المباشر (Indirect Contact)\n• القطيرات/الرذاذ (Droplet) • المحمول جواً (Airborne)\n• الوسيط/الناقل غير الحي (Vehicle) • الناقل الحي (Vector)"
                }
              ]
            },
            // ==================== PAGE 6: SUSCEPTIBLE HOST ====================
            {
              title: "العائل القابل للإصابة (Susceptible Host)",
              sections: [
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Humans become susceptible to infections when their defense mechanisms are diminished or impaired.",
                      pron: "هيومنز بيكوم سوسبتيبل تو إنفيكشنز وين ذيير ديفنس ميكانيزمز آر ديمينيشد أور إمبيرد.",
                      ar: "يصبح البشر عرضة للإصابة بالعدوى عندما تضعف أو تتعطل آليات دفاعهم."
                    },
                    {
                      en: "A susceptible host, the last link in the chain of infection, is one whose biologic defense mechanisms are weakened in some way.",
                      pron: "أ سوسبتيبل هوست، ذا لاست لينك إن ذا تشين أوف إنفيكشن، إيز ون هوز بايولوجيك ديفنس ميكانيزمز آر ويكند إن سوم وي.",
                      ar: "العائل القابل للإصابة، وهو الحلقة الأخيرة في سلسلة العدوى، هو الذي تكون آلياته الدفاعية البيولوجية ضعيفة بشكل ما."
                    },
                    {
                      en: "Nurses must understand and practice methods to prevent nosocomial infections (infections acquired while a person is receiving care in a health care agency).",
                      pron: "نيرسز موست أندرستاند آند براكتس ميثودز تو بريڤنت نوزوكوميال إنفيكشنز.",
                      ar: "يجب على الممرضين فهم وممارسة أساليب الوقاية من العدوى المكتسبة في المستشفى (Nosocomial Infections)."
                    }
                  ]
                },
                {
                  type: "list",
                  label: "👥 الأشخاص الأكثر عرضة للإصابة (High-Risk Groups)",
                  items: [
                    "كبار السن (Older adults) والرضع المبتسرون (Premature infants)",
                    "ضحايا الحروق (Burn victims)",
                    "من تعرضوا لرضوض كبيرة (Major trauma)",
                    "مرضى السكري (Diabetes) والجراحة (Surgery)",
                    "من يحتاجون إجراءات تدخلية مثل التنظير (Endoscopy)",
                    "من يحتاجون قسطرة بولية (Urinary catheter) أو أجهزة وريدية مقيمة (Indwelling IV catheters)",
                    "من يتلقون مضادات حيوية بطريقة غير مناسبة (Inappropriate antibiotics) مما يعزز مقاومة الميكروبات",
                    "متلقو أدوية مثبطة للمناعة (Immunosuppression) مثل الكورتيكوستيرويدات (Corticosteroids) والأدوية المضادة للسرطان (Anticancer drugs)",
                    "المصابون بفيروس نقص المناعة البشرية (HIV)"
                  ]
                },
                {
                  type: "info",
                  style: "warning",
                  label: "🏥 Nosocomial Infection (العدوى المكتسبة من المستشفى)",
                  text: "تسمى أيضاً Hospital-acquired infection، وهي العدوى التي تصيب المريض أثناء تلقيه الرعاية داخل المستشفى. غالباً ما تنتج عن خلل في إجراءات التعقيم أو نظافة الطاقم الطبي. ميكروبات المستشفى غالباً مقاومة للمضادات الحيوية."
                }
              ]
            },
            // ==================== PAGE 7: TYPES OF ASEPSIS (MEDICAL VS SURGICAL) ====================
            {
              title: "أنواع العقامة (Types of Asepsis): الطبي مقابل الجراحي",
              sections: [
                {
                  type: "terms",
                  items: [
                    { en: "Medical Asepsis", pron: "ميديكل أسيبسيس", ar: "العقامة الطبية (التقنية النظيفة - Clean Technique) — الممارسات التي تقلل عدد الميكروبات وتمنع انتشارها" },
                    { en: "Surgical Asepsis", pron: "سيرجيكل أسيبسيس", ar: "العقامة الجراحية (التقنية المعقمة - Sterile Technique) — القضاء التام على جميع الميكروبات بما فيها الأبواغ" }
                  ]
                },
                {
                  type: "heading",
                  text: "📜 قواعد العقامة الطبية (Principles of Medical Asepsis)"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Microorganisms exist everywhere except on sterilized equipment.",
                      pron: "مايكرو-أورجانيزمز إيكزيست إيڤريوير إكسيبت أون ستيريلايزد إكويبمنت.",
                      ar: "الميكروبات موجودة في كل مكان إلا في الأدوات المعقمة."
                    },
                    {
                      en: "Frequent hand hygiene and maintaining intact skin are the best methods for reducing the transmission of microorganisms.",
                      pron: "فريكوينت هاند هايجين آند مينتيننج إنتاكت سكين آر ذا بيست ميثودز فور ريديوسنج ذا ترانسميشن أوف مايكرو-أورجانيزمز.",
                      ar: "غسل اليدين المتكرر والحفاظ على سلامة الجلد هما أفضل طرق الحد من انتقال الميكروبات."
                    },
                    {
                      en: "Blood, body fluids, cells, and tissues are considered major reservoirs of microorganisms.",
                      pron: "بلاد، بودي فلويدز، سيلز، آند تيشوز آر كونسيدرد مايجر ريزيرڤوارز أوف مايكرو-أورجانيزمز.",
                      ar: "الدم، سوائل الجسم، الخلايا، والأنسجة تعتبر مستودعات رئيسية للميكروبات."
                    },
                    {
                      en: "Personal protective equipment such as gloves, gowns, masks, goggles, and hair and shoe covers serves as a barrier to microbial transmission.",
                      pron: "بيرسونل بروتيكتيڤ إكويبمنت ساتش آز غلاڤز، جاونز، ماسكس، جوجلز، آند هير آند شو كاڤرز سيرڤز آز أ باريير.",
                      ar: "معدات الوقاية الشخصية (PPE) — القفازات، الأردية، الأقنعة، النظارات، أغطية الرأس والحذاء — تشكل حاجزاً ضد انتقال الميكروبات."
                    },
                    {
                      en: "A clean environment reduces microorganisms.",
                      pron: "أ كلين إنڤايرونمنت ريديوسز مايكرو-أورجانيزمز.",
                      ar: "البيئة النظيفة تقلل من الكائنات الحية الدقيقة."
                    },
                    {
                      en: "Certain areas—the floor, toilets, and insides of sinks—are more contaminated than others.",
                      pron: "سيرتن إيرياز — ذا فلور، تويليتس، آند إنسايدز أوف سينكس — آر مور كونتامينيتد ذان أذرس.",
                      ar: "بعض المناطق — الأرضية، المراحيض، وداخل الأحواض — أكثر تلوثاً من غيرها."
                    },
                    {
                      en: "Cleaning should be done from cleaner to dirtier areas.",
                      pron: "كليننج شود بي دان فروم كليينر تو ديرتيير إيريياز.",
                      ar: "يجب أن يتم التنظيف من المناطق النظيفة إلى المناطق المتسخة."
                    }
                  ]
                },
                {
                  type: "list",
                  label: "🧼 أمثلة على ممارسات العقامة الطبية (Examples of Medical Aseptic Practices)",
                  items: [
                    "استخدام العوامل المضادة للميكروبات (Using antimicrobial agents)",
                    "غسل اليدين (Performing hand hygiene)",
                    "ارتداء الملابس المستشفى (Wearing hospital garments)",
                    "حصر المواد المتسخة بشكل مناسب (Confining and containing soiled materials appropriately)",
                    "الحفاظ على البيئة نظيفة قدر الإمكان (Keeping the environment as clean as possible)"
                  ]
                }
              ]
            },
            // ==================== PAGE 8: ANTIMICROBIAL AGENTS (TABLE 10-2) ====================
            {
              title: "العوامل المضادة للميكروبات (Antimicrobial Agents) — جدول 10-2",
              sections: [
                {
                  type: "heading",
                  text: "🧪 جدول العوامل المضادة للميكروبات (Antimicrobial Agents)"
                },
                {
                  type: "terms",
                  items: [
                    { en: "Soap", pron: "سوب", ar: "الصابون — يخفض التوتر السطحي للزيت على الجلد مما يسهل إزالة الميكروبات أثناء الشطف. الاستخدام: النظافة الشخصية. أمثلة: Dial, Safeguard" },
                    { en: "Detergent", pron: "ديترجنت", ar: "المنظف — يعمل مثل الصابون لكنه لا يشكل راسباً مع الماء العسر. الاستخدام: تعقيم أدوات الأكل والغسيل. أمثلة: Dreft, Tide" },
                    { en: "Alcohol (70%)", pron: "ألكوهول سيڤنتي بيرسنت", ar: "الكحول 70% — يصيب البروتين والدهون في الغشاء الخلوي. الاستخدام: تنظيف الجلد والأدوات. مثال: Isopropyl ethanol" },
                    { en: "Iodine (Betadine)", pron: "أيودين (بيتادين)", ar: "اليود — يتلف الغشاء الخلوي ويعطل الإنزيمات. غير فعال ضد Pseudomonas. الاستخدام: تنظيف الجلد" },
                    { en: "Chlorine (Bleach)", pron: "كلورين (بليتش)", ar: "الكلور — يتداخل مع أنظمة الإنزيمات الميكروبية. الاستخدام: تطهير الماء والأسطح وبقع الدم. أمثلة: Bleach, Clorox" },
                    { en: "Chlorhexidine (Hibiclens)", pron: "كلوروهيكسيدين (هيبيكلينس)", ar: "الكلورهيكسيدين — يتلف الغشاء الخلوي. غير فعال ضد الأبواغ ومعظم الفيروسات. الاستخدام: الجلد والمعدات" },
                    { en: "Mercury", pron: "ميركوري", ar: "الزئبق — يغير بروتينات الخلايا الميكروبية. الاستخدام: تطهير الجلد. أمثلة: Merthiolate, Mercurochrome" },
                    { en: "Glutaraldehyde (Cidex)", pron: "جلوتارالدهايد (سايدكس)", ar: "الغلوتارالدهيد — يعطل بروتينات البكتيريا والفيروسات والميكروبات التي تشكل الأبواغ. الاستخدام: تعقيم المعدات" }
                  ]
                },
                {
                  type: "info",
                  style: "important",
                  label: "🔑 فرق مهم: Antiseptics vs Disinfectants vs Antibiotics",
                  text: "• Antiseptics (مطهرات) → تستخدم على الجلد، تمنع نمو الميكروبات. مثال: الكحول، اليود\n• Disinfectants (معقمات) → تستخدم للأسطح والجدران، تقتل الميكروبات النشطة (ليس بالضرورة الأبواغ). مثال: الكلور، الفورمالديهايد\n\n• Antibiotics (مضادات حيوية) → تؤثر على البكتيريا فقط، لا تعالج الفيروسات. تتلف جدار الخلية البكتيرية أو آليات التكاثر\n• Antivirals (مضادات فيروسية) → لا تدمر الفيروسات بل تتحكم في تكاثرها أو إطلاقها من الخلايا المصابة"
                }
              ]
            },
            // ==================== PAGE 9: HAND WASHING & SURGICAL SCRUB (TABLE 10-3) ====================
            {
              title: "غسل اليدين (Hand Washing) والتعقيم الجراحي (Surgical Scrub)",
              sections: [
                {
                  type: "heading",
                  text: "🙌 Hand Washing — غسل اليدين"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Hand washing is an aseptic practice that involves scrubbing the hands with soap, water, and friction.",
                      pron: "هاند ووشنج إيز أن أسيبتيك براكتس ذات إنڤولڤز سكرابنج ذا هاندز ويذ سوب، ووتر، آند فريكشن.",
                      ar: "غسل اليدين هو ممارسة تعقيمية تتضمن فرك اليدين بالصابون والماء والاحتكاك."
                    },
                    {
                      en: "Handwashing is the single most effective way to prevent infections.",
                      pron: "هاند-ووشنج إيز ذا سنجل موست إفيكتيڤ وي تو بريڤنت إنفيكشنز.",
                      ar: "يُعدّ غسل اليدين الطريقة الأكثر فعالية لمنع العدوى."
                    },
                    {
                      en: "Washing lasts a minimum of 15 seconds.",
                      pron: "ووشنج لاستس أ مينيمم أوف فيفتين سيكوندز.",
                      ar: "يجب أن يستمر الفرك بالصابون لمدة 15 ثانية على الأقل."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "🧴 Alcohol-Based Hand Rubs — فرك اليدين بالكحول"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Alcohol-based hand rubs remove microorganisms on the hands.",
                      pron: "ألكوهول-بيزد هاند رابس ريموف مايكرو-أورجانيزمز أون ذا هاندز.",
                      ar: "فرك اليدين بالكحول يزيل الكائنات الدقيقة من اليدين."
                    },
                    {
                      en: "Alcohol formulations have a brief rather than sustained antiseptic effect, so nurses must reuse them over the course of a day.",
                      pron: "ألكوهول فورموليشنز هاڤ أ بريف راذر ذان سستيند أنتيسيبتيك إفيكت، سو نيرسز موست رييوز ذيم أوفر ذا كورس أوف أ داي.",
                      ar: "التركيبات الكحولية لها تأثير مطهر قصير وليس طويل الأمد، لذلك يجب على الممرضين إعادة استخدامها على مدار اليوم."
                    }
                  ]
                },
                {
                  type: "list",
                  label: "✅ مزايا فرك اليدين بالكحول (Advantages of Alcohol-Based Hand Rubs)",
                  items: [
                    "يستغرق وقتاً أقل (Takes less time)",
                    "أكثر سهولة في الوصول (More accessible)",
                    "يزيد الالتزام بممارسات النظافة (Increases compliance)",
                    "يوفر الراحة كونه موجوداً في نقطة رعاية المريض (Provides convenience at point of care)"
                  ]
                },
                {
                  type: "heading",
                  text: "🔬 Surgical Hand Antisepsis — التعقيم الجراحي لليدين (الفرك الجراحي)"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "A surgical scrub is performed before donning sterile gloves and garments when the nurse is actively involved in an operative or obstetric procedure.",
                      pron: "أ سيرجيكل سكراب إيز بيرفورمد بيفور دوننج ستيريل غلاڤز آند جارمنتس وين ذا نيرس إيز أكتيڤلي إنڤولڤد إن أن أوپيراتيڤ أور أوبستيتريك بروسيجر.",
                      ar: "الفرك الجراحي يُؤدى قبل ارتداء القفازات والملابس المعقمة عندما يشارك الممرض بنشاط في إجراء عملية جراحية أو توليدية."
                    },
                    {
                      en: "The purpose is to more extensively remove transient microorganisms from the nails, hands, and forearms.",
                      pron: "ذا بَيربَوس إيز تو مور إكستنسیفلي ريموف ترانزنَت مايكرو-أورجانيزمز فروم ذا نيلز، هاندز، آند فورآرمز.",
                      ar: "الهدف هو إزالة الكائنات الدقيقة العابرة بشكل أكثر شمولاً من الأظافر واليدين والساعدين."
                    }
                  ]
                },
                {
                  type: "heading",
                  text: "📊 مقارنة: غسل اليدين مقابل التعقيم الجراحي (جدول 10-3)"
                },
                {
                  type: "terms",
                  items: [
                    { en: "Hand Washing — Jewelry", pron: "هاند ووشنج", ar: "قد يُلبس خاتم زواج عادي (Plain wedding band may be worn)" },
                    { en: "Surgical Scrub — Jewelry", pron: "سيرجيكل سكراب", ar: "تُخلع جميع حلي اليد بما فيها الساعات (All jewelry removed)" },
                    { en: "Hand Washing — Duration", pron: "هاند ووشنج", ar: "15 ثانية كحد أدنى (Minimum 15 seconds)" },
                    { en: "Surgical Scrub — Duration", pron: "سيرجيكل سكراب", ar: "2-6 دقائق حسب العامل المضاد (2-6 minutes)" },
                    { en: "Hand Washing — Hand Position", pron: "هاند ووشنج", ar: "اليدين تحت مستوى المرفقين (Hands lower than elbows)" },
                    { en: "Surgical Scrub — Hand Position", pron: "سيرجيكل سكراب", ar: "اليدين فوق مستوى المرفقين (Hands higher than elbows)" },
                    { en: "Hand Washing — Product", pron: "هاند ووشنج", ar: "صابون عادي (Regular soap)" },
                    { en: "Surgical Scrub — Product", pron: "سيرجيكل سكراب", ar: "صابون سائل مضاد للبكتيريا + فرشاة/إسفنجة (Antibacterial soap + brush/sponge)" },
                    { en: "Hand Washing — Drying", pron: "هاند ووشنج", ar: "مناشف ورقية (Paper towels)" },
                    { en: "Surgical Scrub — Drying", pron: "سيرجيكل سكراب", ar: "مناشف معقمة (Sterile towels)" },
                    { en: "Hand Washing — Gloves", pron: "هاند ووشنج", ar: "قفازات نظيفة (Clean gloves)" },
                    { en: "Surgical Scrub — Gloves", pron: "سيرجيكل سكراب", ar: "قفازات معقمة فوراً بعد التجفيف (Sterile gloves immediately)" }
                  ]
                }
              ]
            },
            // ==================== PAGE 10: PPE & ENVIRONMENTAL HYGIENE ====================
            {
              title: "معدات الوقاية الشخصية (PPE) ونظافة البيئة",
              sections: [
                {
                  type: "list",
                  label: "🛡️ Personal Protective Equipment (PPE) — معدات الوقاية الشخصية",
                  items: [
                    "Uniforms (الزي الرسمي)",
                    "Scrub suits or gowns (البدلات الجراحية أو الأردية)",
                    "Masks (الأقنعة)",
                    "Gloves (القفازات) — نظيفة للفحص (Clean/Examination)، معقمة للعمليات (Sterile)",
                    "Protective eyewear / goggles (النظارات الواقية)",
                    "Hair covers (أغطية الرأس)",
                    "Shoe covers (أغطية الحذاء)"
                  ]
                },
                {
                  type: "heading",
                  text: "🏥 Confining Soiled Articles — حصر المواد المتسخة"
                },
                {
                  type: "sentences",
                  items: [
                    {
                      en: "Health care agencies have at least two utility rooms: one designated clean and the other considered dirty.",
                      pron: "هيلث كير إيجنسيز هاڤ أت ليست تو يوتيليتي رومز: ون ديزيجنيتد كلين آند ذا أذر كونسيدرد ديرتي.",
                      ar: "تمتلك مؤسسات الرعاية الصحية غرفتي خدمة على الأقل: واحدة للنظيف والأخرى للمتسخ."
                    },
                    {
                      en: "Personnel must not place soiled articles in the clean utility room.",
                      pron: "بيرسونيل موست نوت بليس سويلد أارتيكلز إن ذا كلين يوتيليتي روم.",
                      ar: "يجب على الموظفين عدم وضع المواد المتسخة في غرفة الخدمات النظيفة."
                    },
                    {
                      en: "Most client rooms have a wall-mounted puncture-resistant container for needles or other sharp objects.",
                      pron: "موست كلاينت رومز هاڤ أ وول-مونتد بانكتشر-ريزيستنت كونتينر فور نيدلز أور أذر شارب أوبجيكتس.",
                      ar: "تحتوي معظم غرف المرضى على حاوية مثبتة على الحائط مقاومة للثقب للإبر والأشياء الحادة (Sharps Container)."
                    }
                  ]
                },
                {
                  type: "list",
                  label: "🧹 ملاحظات نظافة البيئة (Environmental Hygiene Notes)",
                  items: [
                    "غرف الخدمات (Utility Rooms): نظيفة ومتسخة منفصلة",
                    "صناديق الأدوات الحادة (Sharps Containers): للتخلص من الإبر والشفرات",
                    "التطهير النهائي (Terminal Disinfection): تنظيف شامل للغرفة والسرير والجدران بالكلور بعد خروج المريض (Discharge)"
                  ]
                },
                {
                  type: "info",
                  style: "tip",
                  label: "🎓 ملاحظة ختامية",
                  text: "Nosocomial Infection = Hospital-acquired infection = العدوى المكتسبة من المستشفى\nغالباً تنتج عن خلل في إجراءات التعقيم أو نظافة الطاقم الطبي.\nميكروبات المستشفى غالباً مقاومة للمضادات الحيوية.\n\nتذكر: منع العدوى يبدأ بفهم سلسلة العدوى وكسر إحدى حلقاتها!"
                }
              ]
            }
          ]
        }
      ],
      lectures: [
        { title: "محاضرة 1 - Chapter 1 Introduction to Microbiology", url: "https://www.youtube.com/watch?v=JUwqdnDMnv4&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-" },
        { title: "محاضرة 2 الجزء الأول - Chapter 2 Bacterial cell structure (part 1)", url: "https://www.youtube.com/watch?v=mOLOMgInvTU&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-" },
        { title: "محاضرة 2 الجزء الثاني - Chapter 2 Bacterial cell structure (part 2)", url: "https://www.youtube.com/watch?v=NP5P6m7pT6M&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=3" },
        { title: "محاضرة 3 - Chapter 3: Bacterial growth and multiplication", url: "https://www.youtube.com/watch?v=NbUqxwae4R8&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=4" },
        { title: "محاضرة 4 - Chapter 4: Bacterial Identification and Diagnosis", url: "https://www.youtube.com/watch?v=XUBKO_IKyVo&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=5" },
        { title: "محاضرة 5 الجزء الأول - Sterilization and disinfection (Part 1)", url: "https://www.youtube.com/watch?v=DV-8CJ1z9xg&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=6" },
        { title: "محاضرة 5 الجزء الثاني - Sterilization and disinfection (Part 2)", url: "https://www.youtube.com/watch?v=BNAM6oAk_6o&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=7" },
        { title: "محاضرة 6 الجزء الأول - Classification of bacteria (Part 1)", url: "https://www.youtube.com/watch?v=McWHmMMF8cc&list=PLGtcDK7BxqpKkYpAwmLXdAjecJG1KZcc-&index=8" }
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
      lectures: []
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
      lectures: []
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
