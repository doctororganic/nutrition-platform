<details type="reasoning" done="false">
<summary>Thinking…</summary>
> I need to create structured JSON files for various types of injuries. Each file should contain:
> 1. Complete management plans
> 2. Supplements, drugs, and doses
> 3. Plants and recipes
> 4. Tips for gym and specific month-generated workouts for the injury
> 5. Plants and helping exercises for recovery
> 6. Rehabilitation strategies
> 7. Support for both Arabic and English
> 8. Evidence-based links
> 9. A simple disclaimer
> 
> I'll create a JSON structure that can be used for each injury type. Let me design a template first, then I'll create the JSON files for each injury.
> 
> Template structure:
> ```json
> {
>   "title_en": "Injury Name",
>   "title_ar": "إصابة باللغة العربية",
>   "description_en": "Brief description of the injury",
>   "description_ar": "وصف موجز للإصابة باللغة العربية",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Step 1", "Step 2"],
>       "ar": ["الخطوة 1", "الخطوة 2"]
>     },
>     "short_term_care": {
>       "en": ["Step 1", "Step 2"],
>       "ar": ["الخطوة 1", "الخطوة 2"]
>     },
>     "long_term_care": {
>       "en": ["Step 1", "Step 2"],
>       "ar": ["الخطوة 1", "الخطوة 2"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Supplement Name",
>       "name_ar": "اسم المكمل",
>       "dosage_en": "Dosage instructions",
>       "dosage_ar": "تعليمات الجرعة",
>       "benefits_en": "Benefits",
>       "benefits_ar": "الفوائد"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "Medication Name",
>       "name_ar": "اسم الدواء",
>       "dosage_en": "Dosage instructions",
>       "dosage_ar": "تعليمات الجرعة",
>       "benefits_en": "Benefits",
>       "benefits_ar": "الفوائد",
>       "cautions_en": "Cautions",
>       "cautions_ar": "تحذيرات"
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Plant Name",
>       "plant_name_ar": "اسم النبات",
>       "recipe_en": "Recipe instructions",
>       "recipe_ar": "تعليمات الوصفة",
>       "benefits_en": "Benefits",
>       "benefits_ar": "الفوائد"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Tip 1", "Tip 2"],
>     "ar": ["نصيحة 1", "نصيحة 2"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Exercise 1", "Exercise 2"],
>       "exercises_ar": ["تمرين 1", "تمرين 2"],
>       "frequency_en": "Frequency instructions",
>       "frequency_ar": "تعليمات التكرار"
>     },
>     "month_2": {
>       "exercises_en": ["Exercise 1", "Exercise 2"],
>       "exercises_ar": ["تمرين 1", "تمرين 2"],
>       "frequency_en": "Frequency instructions",
>       "frequency_ar": "تعليمات التكرار"
>     },
>     "month_3": {
>       "exercises_en": ["Exercise 1", "Exercise 2"],
>       "exercises_ar": ["تمرين 1", "تمرين 2"],
>       "frequency_en": "Frequency instructions",
>       "frequency_ar": "تعليمات التكرار"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Exercise Name",
>       "name_ar": "اسم التمرين",
>       "instructions_en": "Exercise instructions",
>       "instructions_ar": "تعليمات التمرين",
>       "benefits_en": "Benefits",
>       "benefits_ar": "الفوائد"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Strategy 1", "Strategy 2"],
>     "ar": ["استراتيجية 1", "استراتيجية 2"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Article Title",
>       "title_ar": "عنوان المقال",
>       "url": "https://example.com"
>     }
>   ],
>   "disclaimer": {
>     "en": "Disclaimer text in English",
>     "ar": "نص إخلاء المسؤولية باللغة العربية"
>   }
> }
> ```
> 
> Now, I'll create JSON files for each injury type. I'll start with the first few injuries and create comprehensive content for each.
> 
> Let me start with "Contusions - الكدمات":
> 
> ```json
> {
>   "title_en": "Contusions",
>   "title_ar": "الكدمات",
>   "description_en": "A contusion is a bruise that appears when blood vessels beneath the skin are damaged due to trauma, causing blood to leak into surrounding tissues.",
>   "description_ar": "الكدمة هي كدمة تظهر عندما تتعرض الأوعية الدموية تحت الجلد للتلف بسبب الصدمة، مما يتسبب في تسرب الدم إلى الأنسجة المحيطة.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Apply ice to the affected area for 15-20 minutes every 1-2 hours", "Rest the injured area", "Elevate the injured area above heart level if possible", "Use compression bandage to reduce swelling"],
>       "ar": ["ضع الثلج على المنطقة المصابة لمدة 15-20 دقيقة كل 1-2 ساعة", "ارح المنطقة المصابة", "ارفع المنطقة المصابة فوق مستوى القلب إذا أمكن", "استخدم ضمادة ضغط لتقليل التورم"]
>     },
>     "short_term_care": {
>       "en": ["Continue ice therapy for 24-48 hours", "Use over-the-counter pain relievers as needed", "Avoid activities that could aggravate the injury", "Gently massage the area after 48 hours to promote blood flow"],
>       "ar": ["استمر في العلاج بالثلج لمدة 24-48 ساعة", "استخدم مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة", "تجنب الأنشطة التي قد تزيد الإصابة سوءًا", "دلك المنطقة بلطف بعد 48 ساعة لتعزيز تدفق الدم"]
>     },
>     "long_term_care": {
>       "en": ["Gradually return to normal activities", "Apply heat to the area to promote healing after swelling subsides", "Perform gentle stretching exercises to restore flexibility", "Protect the area from further injury"],
>       "ar": ["عد تدريجيًا إلى الأنشطة الطبيعية", "ضع الحرارة على المنطقة لتعزيز الشفاء بعد زوال التورم", "قم بأداء تمارين التمدد اللطيفة لاستعادة المرونة", "احمِ المنطقة من الإصابة مرة أخرى"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Bromelain",
>       "name_ar": "بروميلين",
>       "dosage_en": "500 mg 2-3 times daily between meals",
>       "dosage_ar": "500 مجم 2-3 مرات يوميًا بين الوجبات",
>       "benefits_en": "Reduces inflammation and swelling, speeds up healing process",
>       "benefits_ar": "يقلل الالتهاب والتورم، ويسرع عملية الشفاء"
>     },
>     {
>       "name_en": "Arnica",
>       "name_ar": "الأرنيكا",
>       "dosage_en": "Apply topically as cream or gel 2-3 times daily",
>       "dosage_ar": "ضع موضعيًا ككريم أو جل 2-3 مرات يوميًا",
>       "benefits_en": "Reduces bruising and swelling, relieves pain",
>       "benefits_ar": "يقلل الكدمات والتورم، ويخفف الألم"
>     },
>     {
>       "name_en": "Vitamin C",
>       "name_ar": "فيتامين سي",
>       "dosage_en": "1000 mg daily",
>       "dosage_ar": "1000 مجم يوميًا",
>       "benefits_en": "Supports collagen production and tissue repair",
>       "benefits_ar": "يدعم إنتاج الكولاجين وإصلاح الأنسجة"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "Ibuprofen",
>       "name_ar": "إيبوبروفين",
>       "dosage_en": "200-400 mg every 4-6 hours as needed for pain",
>       "dosage_ar": "200-400 مجم كل 4-6 ساعات حسب الحاجة للألم",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May cause stomach upset, take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب اضطراب المعدة، تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     },
>     {
>       "name_en": "Acetaminophen",
>       "name_ar": "باراسيتامول",
>       "dosage_en": "500-1000 mg every 4-6 hours as needed for pain",
>       "dosage_ar": "500-1000 مجم كل 4-6 ساعات حسب الحاجة للألم",
>       "benefits_en": "Relieves pain but has less anti-inflammatory effect than NSAIDs",
>       "benefits_ar": "يخفف الألم لكن له تأثير مضاد للالتهابات أقل من مضادات الالتهاب غير الستيرويدية",
>       "cautions_en": "Do not exceed 3000 mg in 24 hours. Avoid with liver disease or alcohol consumption.",
>       "cautions_ar": "لا تتجاوز 3000 مجم في 24 ساعة. تجنبه مع أمراض الكبد أو استهلاك الكحول."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Comfrey",
>       "plant_name_ar": "القراص",
>       "recipe_en": "Make a poultice by crushing fresh comfrey leaves and applying directly to the bruise. Cover with a bandage and leave for 2-3 hours. Repeat 1-2 times daily.",
>       "recipe_ar": "اصنع ضمادة عن طريق سحق أوراق القراص الطازجة وتطبيقها مباشرة على الكدمة. غطها بضمادة واتركها لمدة 2-3 ساعات. كرر 1-2 مرات يوميًا.",
>       "benefits_en": "Contains allantoin which promotes cell growth and reduces inflammation",
>       "benefits_ar": "يحتوي على الألانتوين الذي يعزز نمو الخلايا ويقلل الالتهاب"
>     },
>     {
>       "plant_name_en": "Witch Hazel",
>       "plant_name_ar": "هاملاميس",
>       "recipe_en": "Soak a cloth in witch hazel and apply to the bruised area for 10-15 minutes, 2-3 times daily.",
>       "recipe_ar": "انقع قطعة قماش في الهاملاميس وضعها على المنطقة المكتومة لمدة 10-15 دقيقة، 2-3 مرات يوميًا.",
>       "benefits_en": "Reduces swelling and pain, speeds up healing",
>       "benefits_ar": "يقلل التورم والألم، ويسرع الشفاء"
>     },
>     {
>       "plant_name_en": "Turmeric",
>       "plant_name_ar": "الكركم",
>       "recipe_en": "Mix 1 teaspoon of turmeric powder with enough water to make a paste. Apply to the bruise and cover with a bandage. Leave for 30 minutes before rinsing. Repeat twice daily.",
>       "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع كمية كافية من الماء لصنع عجينة. ضعها على الكدمة وغطها بضمادة. اتركها لمدة 30 دقيقة قبل الشطف. كرر مرتين يوميًا.",
>       "benefits_en": "Curcumin in turmeric has strong anti-inflammatory properties",
>       "benefits_ar": "الكركمين في الكركم له خصائص مضادة قوية للالتهاب"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid exercises that put direct pressure on the bruised area", "Focus on exercises that don't involve the injured body part", "Start with light activities and gradually increase intensity", "Stop immediately if you feel pain", "Consider working with a trainer to modify your workout routine"],
>     "ar": ["تجنب التمارين التي تضع ضغطًا مباشرًا على المنطقة المكتومة", "ركز على التمارين التي لا تتضمن جزء الجسم المصاب", "ابدأ بالأنشطة الخفيفة وزد الشدة تدريجيًا", "توقف فورًا إذا شعرت بألم", "فكر في العمل مع مدرب لتعديل روتين التمرين الخاص بك"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle range of motion exercises", "Low-impact cardio (walking, swimming)", "Stretching exercises for unaffected areas"],
>       "exercises_ar": ["تمارين نطاق الحركة اللطيفة", "التمارين القلبية منخفضة التأثير (المشي، السباحة)", "تمارين التمدد للمناطق غير المتأثرة"],
>       "frequency_en": "3-4 times per week, 20-30 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Light resistance training for unaffected areas", "Low-impact cardio", "Gentle stretching of the bruised area once healed"],
>       "exercises_ar": ["تدريب المقاومة الخفيف للمناطق غير المتأثرة", "التمارين القلبية منخفضة التأثير", "تمارين التمدد اللطيفة للمنطقة المكتومة بمجرد الشفاء"],
>       "frequency_en": "4-5 times per week, 30-45 minutes per session",
>       "frequency_ar": "4-5 مرات في الأسبوع، 30-45 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Gradual reintroduction of exercises involving the previously bruised area", "Moderate resistance training", "Full range of motion exercises"],
>       "exercises_ar": ["إعادة تدريجية للتمارين التي تشمل المنطقة المكتومة سابقًا", "تدريب المقاومة المعتدل", "تمارين نطاق الحركة الكاملة"],
>       "frequency_en": "4-5 times per week, 45-60 minutes per session",
>       "frequency_ar": "4-5 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Gentle Range of Motion",
>       "name_ar": "نطاق الحركة اللطيف",
>       "instructions_en": "Slowly move the injured joint or muscle through its full range of motion without causing pain. Perform 10 repetitions, 2-3 times daily.",
>       "instructions_ar": "حرك المفصل أو العضلة المصابة ببطء عبر نطاق حركتها الكامل دون التسبب في الألم. قم بأداء 10 تكرارات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains joint mobility and prevents stiffness",
>       "benefits_ar": "يحافظ على حركة المفصل ويمنع التصلب"
>     },
>     {
>       "name_en": "Contrast Bath",
>       "name_ar": "حمام التباين",
>       "instructions_en": "Alternate between warm water (3-4 minutes) and cold water (1 minute) for 15-20 minutes. End with cold water.",
>       "instructions_ar": "تناوب بين الماء الدافئ (3-4 دقائق) والماء البارد (دقيقة واحدة) لمدة 15-20 دقيقة. انتهِ بالماء البارد.",
>       "benefits_en": "Improves circulation and reduces swelling",
>       "benefits_ar": "يحسن الدورة الدموية ويقلل التورم"
>     },
>     {
>       "name_en": "Light Massage",
>       "name_ar": "تدليك خفيف",
>       "instructions_en": "Gently massage the area around the bruise in circular motions. Avoid direct pressure on the bruise itself. Perform for 5-10 minutes, 1-2 times daily.",
>       "instructions_ar": "دلك المنطقة حول الكدمة بلطف بحركات دائرية. تجنب الضغط المباشر على الكدمة نفسها. قم بذلك لمدة 5-10 دقائق، 1-2 مرات يوميًا.",
>       "benefits_en": "Increases blood flow and helps break down pooled blood",
>       "benefits_ar": "يزيد من تدفق الدم ويساعد في تكسير الدم المتجمع"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["RICE method (Rest, Ice, Compression, Elevation) for the first 48 hours", "Gradual return to activities", "Protect the area from further injury", "Maintain overall fitness while healing", "Apply heat after 48 hours to promote blood flow"],
>     "ar": ["طريقة RICE (الراحة، الثلج، الضغط، الرفع) لمدة 48 ساعة الأولى", "العودة التدريجية للأنشطة", "احمِ المنطقة من الإصابة مرة أخرى", "حافظ على اللياقة العامة أثناء الشفاء", "ضع الحرارة بعد 48 ساعة لتعزيز تدفق الدم"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Contusion Management: Current Concepts",
>       "title_ar": "إدارة الكدمات: المفاهيم الحالية",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6429557/"
>     },
>     {
>       "title_en": "Treatment of Bruises and Contusions",
>       "title_ar": "علاج الكدمات والرضوض",
>       "url": "https://www.aafp.org/pubs/afp/issues/2001/1015/p1574.html"
>     },
>     {
>       "title_en": "Complementary Approaches to Bruise Management",
>       "title_ar": "النهج التكميلية لإدارة الكدمات",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5796214/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> Now, I'll create the JSON for "Muscle Tear - التمزق العضلي":
> 
> ```json
> {
>   "title_en": "Muscle Tear",
>   "title_ar": "التمزق العضلي",
>   "description_en": "A muscle tear occurs when muscle fibers are overstretched or torn due to excessive force or overuse. This can range from minor micro-tears to complete ruptures.",
>   "description_ar": "يحدث التمزق العضلي عندما تتمدد ألياف العضلات بشكل مفرط أو تتمزق بسبب القوة المفرطة أو الإفراط في الاستخدام. يمكن أن يتراوح هذا من تمزقات دقيقة صغيرة إلى تمزقات كاملة.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Stop activity immediately", "Apply ice to the injured area for 15-20 minutes every 1-2 hours", "Compress the area with an elastic bandage", "Elevate the injured limb above heart level", "Rest the injured muscle"],
>       "ar": ["توقف عن النشاط فورًا", "ضع الثلج على المنطقة المصابة لمدة 15-20 دقيقة كل 1-2 ساعة", "اضغط على المنطقة بضمادة مرنة", "ارفع الطرف المصاب فوق مستوى القلب", "ارح العضلة المصابة"]
>     },
>     "short_term_care": {
>       "en": ["Continue ice therapy for 24-72 hours", "Use crutches or supports if needed", "Take anti-inflammatory medications as directed", "Begin gentle range of motion exercises after 48-72 hours", "Avoid stretching or strengthening exercises initially"],
>       "ar": ["استمر في العلاج بالثلج لمدة 24-72 ساعة", "استخدم العكازات أو الدعامات إذا لزم الأمر", "تناول الأدوية المضادة للالتهابات حسب التوجيهات", "ابدأ تمارين نطاق الحركة اللطيفة بعد 48-72 ساعة", "تجنب تمارين التمدد أو التقوية في البداية"]
>     },
>     "long_term_care": {
>       "en": ["Gradually introduce stretching exercises", "Begin progressive strengthening exercises", "Return to activities slowly and carefully", "Consider physical therapy for moderate to severe tears", "Apply heat before exercise to warm up the muscle"],
>       "ar": ["أدخل تمارين التمدد تدريجيًا", "ابدأ تمارين التقوية التدريجية", "عد إلى الأنشطة ببطء وحذر", "فكر في العلاج الطبيعي للتمزقات المتوسطة إلى الشديدة", "ضع الحرارة قبل التمرين لتدفئة العضلة"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Protein",
>       "name_ar": "البروتين",
>       "dosage_en": "1.6-2.2 g per kg of body weight daily",
>       "dosage_ar": "1.6-2.2 جم لكل كجم من وزن الجسم يوميًا",
>       "benefits_en": "Essential for muscle repair and growth",
>       "benefits_ar": "أساسي لإصلاح العضلات ونموها"
>     },
>     {
>       "name_en": "BCAAs (Branched-Chain Amino Acids)",
>       "name_ar": "الأحماض الأمينية المتفرعة السلسلة",
>       "dosage_en": "5-10 g before and after workouts",
>       "dosage_ar": "5-10 جم قبل وبعد التمارين",
>       "benefits_en": "Reduces muscle breakdown and supports recovery",
>       "benefits_ar": "يقلل تكسر العضلات ويدعم التعافي"
>     },
>     {
>       "name_en": "Omega-3 Fatty Acids",
>       "name_ar": "الأحماض الدهنية أوميغا-3",
>       "dosage_en": "2-3 g daily",
>       "dosage_ar": "2-3 جم يوميًا",
>       "benefits_en": "Reduces inflammation and supports healing",
>       "benefits_ar": "يقلل الالتهاب ويدعم الشفاء"
>     },
>     {
>       "name_en": "Vitamin D",
>       "name_ar": "فيتامين د",
>       "dosage_en": "1000-2000 IU daily",
>       "dosage_ar": "1000-2000 وحدة دولية يوميًا",
>       "benefits_en": "Supports muscle function and repair",
>       "benefits_ar": "يدعم وظيفة العضلات وإصلاحها"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May cause stomach irritation. Not recommended for long-term use or for those with kidney or stomach issues.",
>       "cautions_ar": "قد يسبب تهيج المعدة. لا يوصى به للاستخدام طويل الأمد أو لمن يعانون من مشاكل في الكلى أو المعدة."
>     },
>     {
>       "name_en": "Topical NSAIDs",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية الموضعية",
>       "dosage_en": "Apply to affected area 2-4 times daily",
>       "dosage_ar": "ضع على المنطقة المصابة 2-4 مرات يوميًا",
>       "benefits_en": "Reduces pain and inflammation with fewer systemic side effects",
>       "benefits_ar": "يقلل الألم والالتهاب مع آثار جانبية جهازية أقل",
>       "cautions_en": "Avoid applying to broken skin. May cause skin irritation.",
>       "cautions_ar": "تجنب وضعها على الجلد التالف. قد يسبب تهيج الجلد."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Arnica",
>       "plant_name_ar": "الأرنيكا",
>       "recipe_en": "Apply arnica gel or cream to the injured area 2-3 times daily. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
>       "recipe_ar": "ضع جل أو كريم الأرنيكا على المنطقة المصابة 2-3 مرات يوميًا. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
>       "benefits_en": "Reduces inflammation, swelling, and bruising",
>       "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
>     },
>     {
>       "plant_name_en": "Turmeric",
>       "plant_name_ar": "الكركم",
>       "recipe_en": "Mix 1 teaspoon of turmeric powder with warm milk and honey. Drink once daily. Alternatively, make a paste with turmeric and water and apply to the injured area.",
>       "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع الحليب الدافئ والعسل. اشربه مرة واحدة يوميًا. بدلاً من ذلك، اصنع عجينة بالكركم والماء وضعها على المنطقة المصابة.",
>       "benefits_en": "Curcumin has powerful anti-inflammatory properties",
>       "benefits_ar": "الكركمين له خصائص مضادة قوية للالتهاب"
>     },
>     {
>       "plant_name_en": "Ginger",
>       "plant_name_ar": "الزنجبيل",
>       "recipe_en": "Steep 1-2 inches of fresh ginger root in hot water for 10 minutes. Drink 2-3 cups daily. Can also be applied topically as a compress.",
>       "recipe_ar": "انقع 1-2 بوصة من جذر الزنجبيل الطازج في الماء الساخن لمدة 10 دقائق. اشرب 2-3 أكواب يوميًا. يمكن أيضًا تطبيقه موضعيًا كضمادة.",
>       "benefits_en": "Contains anti-inflammatory compounds that help reduce pain and swelling",
>       "benefits_ar": "يحتوي على مركبات مضادة للالتهاب تساعد في تقليل الألم والتورم"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid any exercise that causes pain in the injured muscle", "Focus on training other muscle groups while the tear heals", "Start with very light resistance and gradually increase", "Use proper form to avoid re-injury", "Consider working with a physical therapist or trainer for guidance"],
>     "ar": ["تجنب أي تمرين يسبب ألمًا في العضلة المصابة", "ركز على تدريب مجموعات العضلات الأخرى أثناء شفاء التمزق", "ابدأ بمقاومة خفيفة جدًا وزدها تدريجيًا", "استخدم الشكل الصحيح لتجنب الإصابة مرة أخرى", "فكر في العمل مع أخصائي علاج طبيعي أو مدرب للحصول على إرشاد"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle range of motion exercises", "Isometric contractions (muscle tightening without movement)", "Low-impact cardio (swimming, cycling if no pain)", "Core stabilization exercises"],
>       "exercises_ar": ["تمارين نطاق الحركة اللطيفة", "التقلصات المتساوية القياس (شد العضلات دون حركة)", "التمارين القلبية منخفضة التأثير (السباحة، ركوب الدراجة إذا لم يكن هناك ألم)", "تمارين استقرار الجذع"],
>       "frequency_en": "3-4 times per week, 20-30 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Light resistance training for unaffected muscles", "Gentle stretching of the injured muscle", "Low-impact cardio", "Stability exercises"],
>       "exercises_ar": ["تدريب المقاومة الخفيف للعضلات غير المتأثرة", "تمارين التمدد اللطيفة للعضلة المصابة", "التمارين القلبية منخفضة التأثير", "تمارين الاستقرار"],
>       "frequency_en": "4 times per week, 30-40 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Gradual reintroduction of exercises for the injured muscle", "Moderate resistance training", "Sport-specific movements", "Functional exercises"],
>       "exercises_ar": ["إعادة تدريجية للتمارين للعضلة المصابة", "تدريب المقاومة المعتدل", "الحركات الخاصة بالرياضة", "التمارين الوظيفية"],
>       "frequency_en": "4-5 times per week, 45-60 minutes per session",
>       "frequency_ar": "4-5 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Isometric Contraction",
>       "name_ar": "التقلص المتساوي القياس",
>       "instructions_en": "Tighten the injured muscle without moving the joint. Hold for 5-10 seconds, then relax. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "شد العضلة المصابة دون تحريك المفصل. استمر لمدة 5-10 ثوانٍ، ثم استرخِ. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains muscle strength without stressing the injury",
>       "benefits_ar": "يحافظ على قوة العضلات دون إجهاد الإصابة"
>     },
>     {
>       "name_en": "Gentle Stretching",
>       "name_ar": "التمدد اللطيف",
>       "instructions_en": "After the acute phase, gently stretch the injured muscle to the point of mild tension, not pain. Hold for 15-30 seconds. Repeat 3-5 times, 2-3 times daily.",
>       "instructions_ar": "بعد المرحلة الحادة، مدد العضلة المصابة بلطف إلى نقطة التوتر الخفيف، وليس الألم. استمر لمدة 15-30 ثانية. كرر 3-5 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Improves flexibility and prevents scar tissue formation",
>       "benefits_ar": "يحسن المرونة ويمنع تكوين النسيج الندبي"
>     },
>     {
>       "name_en": "Progressive Resistance",
>       "name_ar": "المقاومة التدريجية",
>       "instructions_en": "Begin with light resistance bands or weights. Perform 10-15 repetitions of each exercise. Gradually increase resistance as pain allows. Perform 2-3 sets, 3 times weekly.",
>       "instructions_ar": "ابدأ بحزم أو أوزان مقاومة خفيفة. قم بأداء 10-15 تكرارًا لكل تمرين. زد المقاومة تدريجيًا كما يسمح الألم. قم بأداء 2-3 مجموعات، 3 مرات أسبوعيًا.",
>       "benefits_en": "Gradually rebuilds muscle strength and function",
>       "benefits_ar": "يعيد بناء قوة العضلات ووظيفتها تدريجيًا"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Follow the PRICE protocol (Protection, Rest, Ice, Compression, Elevation) for the first 48-72 hours", "Gradual progression through rehabilitation phases", "Manual therapy from a physical therapist", "Proper nutrition to support healing", "Adequate sleep and rest for recovery"],
>     "ar": ["اتبع بروتوكول PRICE (الحماية، الراحة، الثلج، الضغط، الرفع) لمدة 48-72 ساعة الأولى", "التقدم التدريجي عبر مراحل إعادة التأهيل", "العلاج اليدوي من أخصائي العلاج الطبيعي", "التغذية السليمة لدعم الشفاء", "النوم والراحة الكافيين للتعافي"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Muscle Strains and Tears",
>       "title_ar": "إدارة شد وتمزق العضلات",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Rehabilitation After Muscle Injury",
>       "title_ar": "إعادة التأهيل بعد إصابة العضلات",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Nutritional Strategies to Enhance Muscle Recovery",
>       "title_ar": "استراتيجيات التغذية لتعزيز تعافي العضلات",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Muscle Pull - الشد العضلي":
> 
> ```json
> {
>   "title_en": "Muscle Pull",
>   "title_ar": "الشد العضلي",
>   "description_en": "A muscle pull, also known as a muscle strain, occurs when muscle fibers are stretched beyond their limit or torn. It's a common injury that can happen during physical activities or sports.",
>   "description_ar": "الشد العضلي، المعروف أيضًا بإجهاد العضلات، يحدث عندما تتمدد ألياف العضلات beyond حدها أو تتمزق. إنه إصابة شائعة يمكن أن تحدث خلال الأنشطة البدنية أو الرياضية.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Stop activity immediately", "Apply ice to the affected area for 15-20 minutes every 2-3 hours", "Rest the injured muscle", "Compress the area with an elastic bandage", "Elevate the injured limb if possible"],
>       "ar": ["توقف عن النشاط فورًا", "ضع الثلج على المنطقة المصابة لمدة 15-20 دقيقة كل 2-3 ساعات", "ارح العضلة المصابة", "اضغط على المنطقة بضمادة مرنة", "ارفع الطرف المصاب إذا أمكن"]
>     },
>     "short_term_care": {
>       "en": ["Continue ice therapy for 24-48 hours", "Use over-the-counter pain relievers as needed", "Avoid activities that stress the injured muscle", "Begin gentle range of motion exercises after 48 hours", "Apply heat after 48 hours to increase blood flow"],
>       "ar": ["استمر في العلاج بالثلج لمدة 24-48 ساعة", "استخدم مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة", "تجنب الأنشطة التي تضع ضغطًا على العضلة المصابة", "ابدأ تمارين نطاق الحركة اللطيفة بعد 48 ساعة", "ضع الحرارة بعد 48 ساعة لزيادة تدفق الدم"]
>     },
>     "long_term_care": {
>       "en": ["Gradually return to normal activities", "Incorporate stretching exercises", "Begin strengthening exercises", "Maintain proper hydration and nutrition", "Consider physical therapy for severe strains"],
>       "ar": ["عد تدريجيًا إلى الأنشطة الطبيعية", "أدرج تمارين التمدد", "ابدأ تمارين التقوية", "حافظ على الترطيب والتغذية السليمة", "فكر في العلاج الطبيعي للشدود الشديدة"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Magnesium",
>       "name_ar": "المغنيسيوم",
>       "dosage_en": "400-800 mg daily",
>       "dosage_ar": "400-800 مجم يوميًا",
>       "benefits_en": "Helps relax muscles and prevent cramping",
>       "benefits_ar": "يساعد على استرخاء العضلات ومنع التقلصات"
>     },
>     {
>       "name_en": "Vitamin C",
>       "name_ar": "فيتامين سي",
>       "dosage_en": "1000 mg daily",
>       "dosage_ar": "1000 مجم يوميًا",
>       "benefits_en": "Supports collagen production for tissue repair",
>       "benefits_ar": "يدعم إنتاج الكولاجين لإصلاح الأنسجة"
>     },
>     {
>       "name_en": "Bromelain",
>       "name_ar": "بروميلين",
>       "dosage_en": "500 mg 3 times daily between meals",
>       "dosage_ar": "500 مجم 3 مرات يوميًا بين الوجبات",
>       "benefits_en": "Reduces inflammation and speeds up healing",
>       "benefits_ar": "يقلل الالتهاب ويسرع الشفاء"
>     },
>     {
>       "name_en": "Protein",
>       "name_ar": "البروتين",
>       "dosage_en": "1.2-1.6 g per kg of body weight daily",
>       "dosage_ar": "1.2-1.6 جم لكل كجم من وزن الجسم يوميًا",
>       "benefits_en": "Essential for muscle repair and recovery",
>       "benefits_ar": "أساسي لإصلاح العضلات والتعافي"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "Ibuprofen",
>       "name_ar": "إيبوبروفين",
>       "dosage_en": "200-400 mg every 4-6 hours as needed for pain",
>       "dosage_ar": "200-400 مجم كل 4-6 ساعات حسب الحاجة للألم",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "Take with food to avoid stomach upset. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "تناوله مع الطعام لتجنب اضطراب المعدة. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     },
>     {
>       "name_en": "Topical NSAIDs",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية الموضعية",
>       "dosage_en": "Apply to affected area 3-4 times daily",
>       "dosage_ar": "ضع على المنطقة المصابة 3-4 مرات يوميًا",
>       "benefits_en": "Provides localized pain relief with fewer systemic side effects",
>       "benefits_ar": "يوفر راحة من الألم موضعية مع آثار جانبية جهازية أقل",
>       "cautions_en": "Avoid applying to broken skin. May cause skin irritation.",
>       "cautions_ar": "تجنب وضعها على الجلد التالف. قد يسبب تهيج الجلد."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Arnica",
>       "plant_name_ar": "الأرنيكا",
>       "recipe_en": "Apply arnica gel or cream to the affected area 2-3 times daily. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
>       "recipe_ar": "ضع جل أو كريم الأرنيكا على المنطقة المصابة 2-3 مرات يوميًا. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
>       "benefits_en": "Reduces inflammation, swelling, and bruising",
>       "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
>     },
>     {
>       "plant_name_en": "Epsom Salt",
>       "plant_name_ar": "ملح إبسوم",
>       "recipe_en": "Add 2 cups of Epsom salt to a warm bath and soak for 20 minutes. Repeat 2-3 times weekly.",
>       "recipe_ar": "أضف كوبين من ملح إبسوم إلى حمام دافئ وانقع لمدة 20 دقيقة. كرر 2-3 مرات أسبوعيًا.",
>       "benefits_en": "Magnesium in Epsom salt helps relax muscles and reduce pain",
>       "benefits_ar": "المغنيسيوم في ملح إبسوم يساعد على استرخاء العضلات وتقليل الألم"
>     },
>     {
>       "plant_name_en": "Turmeric and Ginger Tea",
>       "plant_name_ar": "شاي الكركم والزنجبيل",
>       "recipe_en": "Boil 1 inch of fresh ginger root and 1 teaspoon of turmeric powder in 2 cups of water for 10 minutes. Strain and add honey to taste. Drink 1-2 cups daily.",
>       "recipe_ar": "اغلي 1 بوصة من جذر الزنجبيل الطازج وملعقة صغيرة من مسحوق الكركم في كوبين من الماء لمدة 10 دقائق. صفِ وأضف العسل حسب الرغبة. اشرب 1-2 كوب يوميًا.",
>       "benefits_en": "Both turmeric and ginger have anti-inflammatory properties that help reduce pain and swelling",
>       "benefits_ar": "كل من الكركم والزنجبيل لهما خصائص مضادة للالتهاب تساعد في تقليل الألم والتورم"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid exercises that cause pain in the injured muscle", "Focus on training other muscle groups", "Always warm up properly before exercising", "Use proper form and technique", "Gradually increase intensity and duration of workouts"],
>     "ar": ["تجنب التمارين التي تسبب ألمًا في العضلة المصابة", "ركز على تدريب مجموعات العضلات الأخرى", "قم دائمًا بالإحماء المناسب قبل التمرين", "استخدم الشكل والتقنية الصحيحين", "زد الشدة ومدة التمارين تدريجيًا"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle range of motion exercises", "Low-impact cardio (walking, swimming)", "Core stabilization exercises", "Upper body exercises if lower body is injured (or vice versa)"],
>       "exercises_ar": ["تمارين نطاق الحركة اللطيفة", "التمارين القلبية منخفضة التأثير (المشي، السباحة)", "تمارين استقرار الجذع", "تمارين الجزء العلوي من الجسم إذا كان الجزء السفلي مصابًا (أو العكس)"],
>       "frequency_en": "3-4 times per week, 20-30 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Light resistance training for unaffected muscles", "Gentle stretching of the injured muscle", "Low-impact cardio", "Balance exercises"],
>       "exercises_ar": ["تدريب المقاومة الخفيف للعضلات غير المتأثرة", "تمارين التمدد اللطيفة للعضلة المصابة", "التمارين القلبية منخفضة التأثير", "تمارين التوازن"],
>       "frequency_en": "4 times per week, 30-40 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Gradual reintroduction of exercises for the injured muscle", "Moderate resistance training", "Sport-specific movements", "Functional exercises"],
>       "exercises_ar": ["إعادة تدريجية للتمارين للعضلة المصابة", "تدريب المقاومة المعتدل", "الحركات الخاصة بالرياضة", "التمارين الوظيفية"],
>       "frequency_en": "4-5 times per week, 45-60 minutes per session",
>       "frequency_ar": "4-5 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Gentle Stretching",
>       "name_ar": "التمدد اللطيف",
>       "instructions_en": "After the acute phase, gently stretch the injured muscle to the point of mild tension, not pain. Hold for 15-30 seconds. Repeat 3-5 times, 2-3 times daily.",
>       "instructions_ar": "بعد المرحلة الحادة، مدد العضلة المصابة بلطف إلى نقطة التوتر الخفيف، وليس الألم. استمر لمدة 15-30 ثانية. كرر 3-5 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Improves flexibility and prevents scar tissue formation",
>       "benefits_ar": "يحسن المرونة ويمنع تكوين النسيج الندبي"
>     },
>     {
>       "name_en": "Isometric Contraction",
>       "name_ar": "التقلص المتساوي القياس",
>       "instructions_en": "Tighten the injured muscle without moving the joint. Hold for 5-10 seconds, then relax. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "شد العضلة المصابة دون تحريك المفصل. استمر لمدة 5-10 ثوانٍ، ثم استرخِ. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains muscle strength without stressing the injury",
>       "benefits_ar": "يحافظ على قوة العضلات دون إجهاد الإصابة"
>     },
>     {
>       "name_en": "Foam Rolling",
>       "name_ar": "اللف باستخدام الفوم رولر",
>       "instructions_en": "Once pain subsides, gently roll over the affected muscle with a foam roller for 30-60 seconds. Avoid rolling directly over the most painful area. Perform 1-2 times daily.",
>       "instructions_ar": "بمجرد زوال الألم، لف بلطف على العضلة المصابة باستخدام الفوم رولر لمدة 30-60 ثانية. تجنب اللف مباشرة على المنطقة الأكثر ألمًا. قم بذلك 1-2 مرات يوميًا.",
>       "benefits_en": "Releases muscle tension and improves blood flow",
>       "benefits_ar": "يطلق توتر العضلات ويحسن تدفق الدم"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Follow the RICE protocol (Rest, Ice, Compression, Elevation) for the first 48 hours", "Gradual progression through rehabilitation phases", "Proper warm-up before activities", "Maintain hydration and electrolyte balance", "Adequate rest between training sessions"],
>     "ar": ["اتبع بروتوكول RICE (الراحة، الثلج، الضغط، الرفع) لمدة 48 ساعة الأولى", "التقدم التدريجي عبر مراحل إعادة التأهيل", "الإحماء المناسب قبل الأنشطة", "الحفاظ على الترطيب وتوازن الإلكتروليت", "الراحة الكافية بين جلسات التدريب"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Muscle Strain: Management and Rehabilitation",
>       "title_ar": "شد العضلات: الإدارة وإعادة التأهيل",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Prevention and Treatment of Muscle Strains",
>       "title_ar": "الوقاية وعلاج شد العضلات",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4756162/"
>     },
>     {
>       "title_en": "Nutritional Considerations for Muscle Recovery",
>       "title_ar": "الاعتبارات التغذوية لتعافي العضلات",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Muscle Cramp/Spasm - التقلص العضلي":
> 
> ```json
> {
>   "title_en": "Muscle Cramp/Spasm",
>   "title_ar": "التقلص العضلي",
>   "description_en": "A muscle cramp is a sudden and involuntary contraction of one or more muscles. These spasms can cause intense pain and temporary immobility of the affected muscle.",
>   "description_ar": "التقلص العضلي هو انقباض مفاجئ وغير إرادي لواحدة أو أكثر من العضلات. يمكن أن تسبب هذه التشنجات ألمًا شديدًا وعدم حركة مؤقتة للعضلة المصابة.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Stop the activity that caused the cramp", "Gently stretch and massage the cramped muscle", "Apply heat to relax the muscle", "Stay hydrated", "Walk around or jiggle the leg if it's a calf cramp"],
>       "ar": ["توقف عن النشاط الذي تسبب في التقلص", "مد ودلك العضلة المتقلصة بلطف", "ضع الحرارة لاسترخاء العضلة", "حافظ على الترطيب", "امشِ أو حرك الساق إذا كان التقلص في عضلة الساق"]
>     },
>     "short_term_care": {
>       "en": ["Continue gentle stretching of the affected muscle", "Apply warm compresses to the area", "Take a warm bath with Epsom salt", "Ensure adequate electrolyte intake", "Rest the affected muscle"],
>       "ar": ["استمر في تمديد العضلة المصابة بلطف", "ضع ضمادات دافئة على المنطقة", "خذ حمامًا دافئًا بملح إبسوم", "تأكد من تناول الإلكتروليتات الكافية", "ارح العضلة المصابة"]
>     },
>     "long_term_care": {
>       "en": ["Maintain proper hydration throughout the day", "Ensure adequate intake of electrolytes (magnesium, potassium, calcium)", "Incorporate regular stretching into your routine", "Gradually increase intensity of physical activities", "Consider muscle conditioning exercises"],
>       "ar": ["حافظ على الترطيب المناسب طوال اليوم", "تأكد من تناول الإلكتروليتات الكافية (المغنيسيوم، البوتاسيوم، الكالسيوم)", "أدرج التمدد المنتظم في روتينك", "زد شدة الأنشطة البدنية تدريجيًا", "فكر في تمارين تدريب العضلات"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Magnesium",
>       "name_ar": "المغنيسيوم",
>       "dosage_en": "400-800 mg daily",
>       "dosage_ar": "400-800 مجم يوميًا",
>       "benefits_en": "Helps relax muscles and prevent cramping",
>       "benefits_ar": "يساعد على استرخاء العضلات ومنع التقلصات"
>     },
>     {
>       "name_en": "Potassium",
>       "name_ar": "البوتاسيوم",
>       "dosage_en": "99 mg daily or as directed by healthcare provider",
>       "dosage_ar": "99 مجم يوميًا أو حسب توجيهات مقدم الرعاية الصحية",
>       "benefits_en": "Essential for proper muscle function and preventing cramps",
>       "benefits_ar": "أساسي لوظيفة العضلات المناسبة ومنع التقلصات"
>     },
>     {
>       "name_en": "Calcium",
>       "name_ar": "الكالسيوم",
>       "dosage_en": "1000-1200 mg daily",
>       "dosage_ar": "1000-1200 مجم يوميًا",
>       "benefits_en": "Supports muscle contraction and relaxation",
>       "benefits_ar": "يدعم انقباض واسترخاء العضلات"
>     },
>     {
>       "name_en": "Vitamin B Complex",
>       "name_ar": "فيتامين ب المركب",
>       "dosage_en": "As directed on package",
>       "dosage_ar": "حسب التوجيهات على العبوة",
>       "benefits_en": "Supports nerve function and muscle health",
>       "benefits_ar": "يدعم وظيفة الأعصاب وصحة العضلات"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "Muscle Relaxants (Cyclobenzaprine, Methocarbamol)",
>       "name_ar": "مرخيات العضلات (سيكلوبنزابرين، ميثوكاربامول)",
>       "dosage_en": "As prescribed by physician",
>       "dosage_ar": "حسب وصفة الطبيب",
>       "benefits_en": "Relieves muscle spasms and associated pain",
>       "benefits_ar": "يخفف تشنجات العضلات والألم المصاحب لها",
>       "cautions_en": "May cause drowsiness. Avoid driving or operating heavy machinery. Not recommended for long-term use.",
>       "cautions_ar": "قد يسبب النعاس. تجنب القيادة أو تشغيل الآلات الثقيلة. لا يوصى به للاستخدام طويل الأمد."
>     },
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation associated with muscle spasms",
>       "benefits_ar": "يقلل الألم والالتهاب المرتبط بتشنجات العضلات",
>       "cautions_en": "May cause stomach irritation. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Chamomile",
>       "plant_name_ar": "البابونج",
>       "recipe_en": "Steep 2-3 teaspoons of dried chamomile flowers in hot water for 10 minutes. Drink 2-3 cups daily. Can also add chamomile essential oil to bath water.",
>       "recipe_ar": "انقع 2-3 ملاعق صغيرة من أزهار البابونج المجففة في الماء الساخن لمدة 10 دقائق. اشرب 2-3 أكواب يوميًا. يمكن أيضًا إضافة زيت البابونج الأساسي إلى ماء الاستحمام.",
>       "benefits_en": "Contains flavonoids that help relax muscles and reduce inflammation",
>       "benefits_ar": "يحتوي على الفلافونويدات التي تساعد على استرخاء العضلات وتقليل الالتهاب"
>     },
>     {
>       "plant_name_en": "Valerian Root",
>       "plant_name_ar": "جذر الفاليريان",
>       "recipe_en": "Steep 1 teaspoon of dried valerian root in hot water for 10 minutes. Drink 1 cup before bedtime. Do not use for more than 2-3 weeks at a time.",
>       "recipe_ar": "انقع ملعقة صغيرة من جذر الفاليريان المجفف في الماء الساخن لمدة 10 دقائق. اشرب كوبًا واحدًا قبل النوم. لا تستخدمه لأكثر من 2-3 أسابيع في المرة الواحدة.",
>       "benefits_en": "Has natural muscle relaxant properties",
>       "benefits_ar": "له خصائص طبيعية مرخية للعضلات"
>     },
>     {
>       "plant_name_en": "Epsom Salt Bath",
>       "plant_name_ar": "حمام ملح إبسوم",
>       "recipe_en": "Add 2 cups of Epsom salt to a warm bath and soak for 20 minutes. Repeat 2-3 times weekly.",
>       "recipe_ar": "أضف كوبين من ملح إبسوم إلى حمام دافئ وانقع لمدة 20 دقيقة. كرر 2-3 مرات أسبوعيًا.",
>       "benefits_en": "Magnesium in Epsom salt is absorbed through the skin and helps relax muscles",
>       "benefits_ar": "المغنيسيوم في ملح إبسوم يمتص عبر الجلد ويساعد على استرخاء العضلات"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Always warm up properly before exercising", "Stay hydrated during workouts", "Include stretching in your cool-down routine", "Gradually increase intensity and duration of workouts", "Consider electrolyte drinks for prolonged exercise"],
>     "ar": ["قم دائمًا بالإحماء المناسب قبل التمرين", "حافظ على الترطيب أثناء التمارين", "أدرج التمدد في روتين التهدئة", "زد شدة ومدة التمارين تدريجيًا", "فكر في مشروبات الإلكتروليت للتمارين المطولة"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle stretching exercises", "Low-impact cardio (walking, swimming)", "Core stabilization exercises", "Yoga or tai chi for flexibility and relaxation"],
>       "exercises_ar": ["تمارين التمدد اللطيفة", "التمارين القلبية منخفضة التأثير (المشي، السباحة)", "تمارين استقرار الجذع", "اليوجا أو التاي تشي للمرونة والاسترخاء"],
>       "frequency_en": "3-4 times per week, 20-30 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Moderate stretching exercises", "Low-impact cardio", "Light resistance training", "Balance exercises"],
>       "exercises_ar": ["تمارين التمدد المعتدلة", "التمارين القلبية منخفضة التأثير", "تدريب المقاومة الخفيف", "تمارين التوازن"],
>       "frequency_en": "4 times per week, 30-40 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Dynamic stretching", "Moderate-intensity cardio", "Progressive resistance training", "Sport-specific movements"],
>       "exercises_ar": ["التمدد الديناميكي", "التمارين القلبية متوسطة الشدة", "تدريب المقاومة التدريجي", "الحركات الخاصة بالرياضة"],
>       "frequency_en": "4-5 times per week, 45-60 minutes per session",
>       "frequency_ar": "4-5 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Gentle Stretching",
>       "name_ar": "التمدد اللطيف",
>       "instructions_en": "Gently stretch the cramped muscle to the point of mild tension, not pain. Hold for 15-30 seconds. Repeat 3-5 times, 2-3 times daily.",
>       "instructions_ar": "مد العضلة المتقلصة بلطف إلى نقطة التوتر الخفيف، وليس الألم. استمر لمدة 15-30 ثانية. كرر 3-5 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Relieves muscle tension and prevents future cramps",
>       "benefits_ar": "يخفف توتر العضلات ويمنع التقلصات المستقبلية"
>     },
>     {
>       "name_en": "Hydration and Electrolyte Replacement",
>       "name_ar": "الترطيب واستبدال الإلكتروليتات",
>       "instructions_en": "Drink water throughout the day, especially before, during, and after exercise. Consider electrolyte drinks for prolonged exercise or in hot weather.",
>       "instructions_ar": "اشرب الماء طوال اليوم، خاصة قبل وأثناء وبعد التمرين. فكر في مشروبات الإلكتروليت للتمارين المطولة أو في الطقس الحار.",
>       "benefits_en": "Prevents dehydration and electrolyte imbalances that can cause cramps",
>       "benefits_ar": "يمنع الجفاف واختلال توازن الإلكتروليتات التي يمكن أن تسبب التقلصات"
>     },
>     {
>       "name_en": "Foam Rolling",
>       "name_ar": "اللف باستخدام الفوم رولر",
>       "instructions_en": "Gently roll over the affected muscle with a foam roller for 30-60 seconds. Perform 1-2 times daily.",
>       "instructions_ar": "لف بلطف على العضلة المصابة باستخدام الفوم رولر لمدة 30-60 ثانية. قم بذلك 1-2 مرات يوميًا.",
>       "benefits_en": "Releases muscle tension and improves blood flow",
>       "benefits_ar": "يطلق توتر العضلات ويحسن تدفق الدم"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Maintain proper hydration", "Ensure adequate electrolyte intake", "Incorporate regular stretching into your routine", "Improve overall conditioning", "Address any underlying medical conditions that may contribute to cramping"],
>     "ar": ["حافظ على الترطيب المناسب", "تأكد من تناول الإلكتروليتات الكافية", "أدرج التمدد المنتظم في روتينك", "حسن اللياقة العامة", "عالج أي حالات طبية كامنة قد تساهم في التقلصات"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Muscle Cramps: Causes, Treatment, and Prevention",
>       "title_ar": "تقلصات العضلات: الأسباب والعلاج والوقاية",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6319304/"
>     },
>     {
>       "title_en": "Exercise-Associated Muscle Cramps",
>       "title_ar": "تقلصات العضلات المرتبطة بالتمرين",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5799609/"
>     },
>     {
>       "title_en": "Role of Electrolytes in Muscle Function",
>       "title_ar": "دور الإلكتروليتات في وظيفة العضلات",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6347736/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Myositis - التهاب العضلات":
> 
> ```json
> {
>   "title_en": "Myositis",
>   "title_ar": "التهاب العضلات",
>   "description_en": "Myositis is a term for inflammation of the muscles. It can be caused by infection, injury, autoimmune conditions, or certain medications, leading to muscle weakness, pain, and fatigue.",
>   "description_ar": "التهاب العضلات هو مصطلح لالتهاب العضلات. يمكن أن يسببه العدوى أو الإصابة أو أمراض المناعة الذاتية أو بعض الأدوية، مما يؤدي إلى ضعف العضلات والألم والتعب.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Rest the affected muscles", "Apply cold packs to reduce inflammation", "Take over-the-counter pain relievers as needed", "Avoid activities that worsen symptoms", "Stay hydrated"],
>       "ar": ["ارح العضلات المصابة", "ضع الكمادات الباردة لتقليل الالتهاب", "تناول مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة", "تجنب الأنشطة التي تزيد الأعراض سوءًا", "حافظ على الترطيب"]
>     },
>     "short_term_care": {
>       "en": ["Continue rest as needed", "Use heat therapy to relieve muscle stiffness", "Perform gentle range of motion exercises", "Take prescribed medications as directed", "Consider physical therapy if symptoms persist"],
>       "ar": ["استمر في الراحة حسب الحاجة", "استخدم العلاج بالحرارة لتخفيف تصلب العضلات", "قم بأداء تمارين نطاق الحركة اللطيفة", "تناول الأدوية الموصوفة حسب التوجيهات", "فكر في العلاج الطبيعي إذا استمرت الأعراض"]
>     },
>     "long_term_care": {
>       "en": ["Follow prescribed treatment plan", "Engage in regular, gentle exercise", "Practice stress management techniques", "Maintain a balanced diet", "Regular follow-ups with healthcare provider"],
>       "ar": ["اتبع خطة العلاج الموصوفة", "مارس التمارين اللطيفة بانتظام", "مارس تقنيات إدارة التوتر", "حافظ على نظام غذائي متوازن", "المتابعة المنتظمة مع مقدم الرعاية الصحية"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Vitamin D",
>       "name_ar": "فيتامين د",
>       "dosage_en": "1000-2000 IU daily",
>       "dosage_ar": "1000-2000 وحدة دولية يوميًا",
>       "benefits_en": "Supports muscle function and immune system regulation",
>       "benefits_ar": "يدعم وظيفة العضلات وتنظيم جهاز المناعة"
>     },
>     {
>       "name_en": "Omega-3 Fatty Acids",
>       "name_ar": "الأحماض الدهنية أوميغا-3",
>       "dosage_en": "2-3 g daily",
>       "dosage_ar": "2-3 جم يوميًا",
>       "benefits_en": "Reduces inflammation throughout the body",
>       "benefits_ar": "يقلل الالتهاب في جميع أنحاء الجسم"
>     },
>     {
>       "name_en": "Coenzyme Q10",
>       "name_ar": "إنزيم Q10",
>       "dosage_en": "100-200 mg daily",
>       "dosage_ar": "100-200 مجم يوميًا",
>       "benefits_en": "Supports cellular energy production and reduces oxidative stress",
>       "benefits_ar": "يدعم إنتاج الطاقة الخلوية ويقلل الإجهاد التأكسدي"
>     },
>     {
>       "name_en": "Magnesium",
>       "name_ar": "المغنيسيوم",
>       "dosage_en": "400-800 mg daily",
>       "dosage_ar": "400-800 مجم يوميًا",
>       "benefits_en": "Supports muscle function and helps reduce muscle pain",
>       "benefits_ar": "يدعم وظيفة العضلات ويساعد في تقليل ألم العضلات"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "Corticosteroids (Prednisone)",
>       "name_ar": "الكورتيكوستيرويدات (بريدنيزون)",
>       "dosage_en": "As prescribed by physician",
>       "dosage_ar": "حسب وصفة الطبيب",
>       "benefits_en": "Reduces inflammation and suppresses immune system activity",
>       "benefits_ar": "يقلل الالتهاب ويقمع نشاط جهاز المناعة",
>       "cautions_en": "Long-term use can cause side effects including weight gain, osteoporosis, and increased infection risk. Do not stop taking abruptly.",
>       "cautions_ar": "يمكن أن يسبب الاستخدام طويل الأمد آثارًا جانبية بما في ذلك زيادة الوزن وهشاشة العظام وزيادة خطر الإصابة بالعدوى. لا تتوقف عن تناوله فجأة."
>     },
>     {
>       "name_en": "Immunosuppressants (Methotrexate, Azathioprine)",
>       "name_ar": "مثبطات المناعة (ميثوتريكسيت، أزاثيوبرين)",
>       "dosage_en": "As prescribed by physician",
>       "dosage_ar": "حسب وصفة الطبيب",
>       "benefits_en": "Suppresses immune system to reduce inflammation",
>       "benefits_ar": "يثبط جهاز المناعة لتقليل الالتهاب",
>       "cautions_en": "Requires regular blood tests to monitor for side effects. May increase risk of infections.",
>       "cautions_ar": "يتطلب إجراء اختبارات دم منتظمة لمراقبة الآثار الجانبية. قد يزيد من خطر الإصابة بالعدوى."
>     },
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May cause stomach irritation. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Turmeric",
>       "plant_name_ar": "الكركم",
>       "recipe_en": "Mix 1 teaspoon of turmeric powder with warm milk and honey. Drink once daily. Alternatively, take turmeric supplements as directed.",
>       "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع الحليب الدافئ والعسل. اشربه مرة واحدة يوميًا. بدلاً من ذلك، تناول مكملات الكركم حسب التوجيهات.",
>       "benefits_en": "Curcumin has powerful anti-inflammatory properties",
>       "benefits_ar": "الكركمين له خصائص مضادة قوية للالتهاب"
>     },
>     {
>       "plant_name_en": "Ginger",
>       "plant_name_ar": "الزنجبيل",
>       "recipe_en": "Steep 1-2 inches of fresh ginger root in hot water for 10 minutes. Drink 2-3 cups daily. Can also be added to foods.",
>       "recipe_ar": "انقع 1-2 بوصة من جذر الزنجبيل الطازج في الماء الساخن لمدة 10 دقائق. اشرب 2-3 أكواب يوميًا. يمكن أيضًا إضافته إلى الأطعمة.",
>       "benefits_en": "Contains anti-inflammatory compounds that help reduce pain and inflammation",
>       "benefits_ar": "يحتوي على مركبات مضادة للالتهاب تساعد في تقليل الألم والالتهاب"
>     },
>     {
>       "plant_name_en": "Green Tea",
>       "plant_name_ar": "الشاي الأخضر",
>       "recipe_en": "Steep 1 green tea bag in hot water for 3-5 minutes. Drink 2-3 cups daily.",
>       "recipe_ar": "انقع كيس شاي أخضر واحد في الماء الساخن لمدة 3-5 دقائق. اشرب 2-3 أكواب يوميًا.",
>       "benefits_en": "Contains antioxidants that help reduce inflammation",
>       "benefits_ar": "يحتوي على مضادات الأكسدة التي تساعد في تقليل الالتهاب"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Start with very gentle exercises and gradually increase intensity", "Focus on low-impact activities like swimming or walking", "Listen to your body and rest when needed", "Avoid overexertion", "Work with a physical therapist or trainer experienced with myositis"],
>     "ar": ["ابدأ بتمارين لطيفة جدًا وزد الشدة تدريجيًا", "ركز على الأنشطة منخفضة التأثير مثل السباحة أو المشي", "استمع إلى جسمك وارح عند الحاجة", "تجنب الإجهاد الزائد", "اعمل مع أخصائي علاج طبيعي أو مدرب لديه خبرة مع التهاب العضلات"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle range of motion exercises", "Short walks", "Breathing exercises", "Gentle stretching"],
>       "exercises_ar": ["تمارين نطاق الحركة اللطيفة", "مشيات قصيرة", "تمارين التنفس", "تمارين التمدد اللطيفة"],
>       "frequency_en": "2-3 times per week, 10-15 minutes per session",
>       "frequency_ar": "2-3 مرات في الأسبوع، 10-15 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Gentle stretching exercises", "Low-impact cardio (walking, swimming)", "Light resistance training with bands or light weights", "Balance exercises"],
>       "exercises_ar": ["تمارين التمدد اللطيفة", "التمارين القلبية منخفضة التأثير (المشي، السباحة)", "تدريب المقاومة الخفيف بالحزام أو الأوزان الخفيفة", "تمارين التوازن"],
>       "frequency_en": "3 times per week, 20-30 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Moderate stretching exercises", "Low-impact cardio", "Progressive resistance training", "Functional exercises"],
>       "exercises_ar": ["تمارين التمدد المعتدلة", "التمارين القلبية منخفضة التأثير", "تدريب المقاومة التدريجي", "التمارين الوظيفية"],
>       "frequency_en": "3-4 times per week, 30-45 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 30-45 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Gentle Range of Motion",
>       "name_ar": "نطاق الحركة اللطيف",
>       "instructions_en": "Slowly move the affected joints through their full range of motion without causing pain. Perform 5-10 repetitions, 2-3 times daily.",
>       "instructions_ar": "حرك المفاصل المصابة ببطء عبر نطاق حركتها الكامل دون التسبب في الألم. قم بأداء 5-10 تكرارات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains joint mobility and prevents stiffness",
>       "benefits_ar": "يحافظ على حركة المفصل ويمنع التصلب"
>     },
>     {
>       "name_en": "Breathing Exercises",
>       "name_ar": "تمارين التنفس",
>       "instructions_en": "Sit or lie comfortably. Inhale deeply through your nose, allowing your abdomen to expand. Exhale slowly through your mouth. Repeat for 5-10 minutes, 2-3 times daily.",
>       "instructions_ar": "اجلس أو استلقِ بشكل مريح. استنشق بعمق من خلال أنفك، مما يسمح لبطنك بالتمدد. ازفر ببطء من خلال فمك. كرر لمدة 5-10 دقائق، 2-3 مرات يوميًا.",
>       "benefits_en": "Reduces stress and improves oxygen delivery to muscles",
>       "benefits_ar": "يقلل التوتر ويحسن توصيل الأكسجين إلى العضلات"
>     },
>     {
>       "name_en": "Aquatic Therapy",
>       "name_ar": "العلاج المائي",
>       "instructions_en": "Perform gentle exercises in a warm pool. The water provides support and resistance. Start with 10-15 minutes and gradually increase to 30 minutes, 2-3 times weekly.",
>       "instructions_ar": "قم بأداء تمارين لطيفة في حمام سباحة دافئ. يوفر الماء الدعم والمقاومة. ابدأ بـ 10-15 دقيقة وزد تدريجيًا إلى 30 دقيقة، 2-3 مرات أسبوعيًا.",
>       "benefits_en": "Water supports the body and reduces stress on joints and muscles",
>       "benefits_ar": "يدعم الماء الجسم ويقلل الضغط على المفاصل والعضلات"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Follow medical treatment plan", "Physical therapy to maintain strength and flexibility", "Pacing activities to conserve energy", "Occupational therapy to assist with daily activities", "Stress management techniques"],
>     "ar": ["اتبع خطة العلاج الطبي", "العلاج الطبيعي للحفاظ على القوة والمرونة", "تنظيم الأنشطة للحفاظ على الطاقة", "العلاج المهني للمساعدة في الأنشطة اليومية", "تقنيات إدارة التوتر"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Diagnosis and Management of Myositis",
>       "title_ar": "تشخيص وعلاج التهاب العضلات",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6319304/"
>     },
>     {
>       "title_en": "Exercise and Physical Therapy in Myositis",
>       "title_ar": "التمرين والعلاج الطبيعي في التهاب العضلات",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5799609/"
>     },
>     {
>       "title_en": "Nutritional Approaches to Managing Myositis",
>       "title_ar": "النهج التغذوية لإدارة التهاب العضلات",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6347736/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Muscle Fatigue - إجهاد العضلات":
> 
> ```json
> {
>   "title_en": "Muscle Fatigue",
>   "title_ar": "إجهاد العضلات",
>   "description_en": "Muscle fatigue is the decline in ability of a muscle to generate force. It can be caused by intense exercise, prolonged activity, or underlying health conditions, resulting in a feeling of tiredness, weakness, and reduced performance.",
>   "description_ar": "إجهاد العضلات هو تراجع قدرة العضلة على توليد القوة. يمكن أن يسببه التمرين المكثف أو النشاط المطول أو الحالات الصحية الكامنة، مما يؤدي إلى الشعور بالتعب والضعف وانخفاض الأداء.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Rest the fatigued muscles", "Stay hydrated", "Consume a balanced snack with protein and carbohydrates", "Apply cold therapy if there's inflammation", "Elevate legs if experiencing systemic fatigue"],
>       "ar": ["ارح العضلات المتعبة", "حافظ على الترطيب", "تناول وجبة خفيفة متوازنة تحتوي على البروتين والكربوهيدرات", "ضع العلاج البارد إذا كان هناك التهاب", "ارفع الساقين إذا كنت تعاني من إجهاد جهازي"]
>     },
>     "short_term_care": {
>       "en": ["Ensure adequate sleep and rest", "Continue proper hydration", "Eat a balanced diet rich in nutrients", "Perform gentle stretching exercises", "Consider massage therapy"],
>       "ar": ["تأكد من الحصول على قسط كافٍ من النوم والراحة", "استمر في الترطيب المناسب", "تناول نظامًا غذائيًا متوازنًا غنيًا بالمغذيات", "قم بأداء تمارين التمدد اللطيفة", "فكر في العلاج بالتدليك"]
>     },
>     "long_term_care": {
>       "en": ["Gradually increase exercise intensity and duration", "Incorporate rest days into your training schedule", "Maintain a balanced diet", "Ensure adequate sleep", "Address any underlying health conditions"],
>       "ar": ["زد شدة التمرين ومدته تدريجيًا", "أدرج أيام الراحة في جدول التدريب الخاص بك", "حافظ على نظام غذائي متوازن", "تأكد من الحصول على قسط كافٍ من النوم", "عالج أي حالات صحية كامنة"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Creatine",
>       "name_ar": "الكرياتين",
>       "dosage_en": "3-5 g daily",
>       "dosage_ar": "3-5 جم يوميًا",
>       "benefits_en": "Improves muscle energy production and reduces fatigue",
>       "benefits_ar": "يحسن إنتاج طاقة العضلات ويقلل التعب"
>     },
>     {
>       "name_en": "B Vitamins (B-complex)",
>       "name_ar": "فيتامينات ب (ب المركب)",
>       "dosage_en": "As directed on package",
>       "dosage_ar": "حسب التوجيهات على العبوة",
>       "benefits_en": "Supports energy metabolism and reduces fatigue",
>       "benefits_ar": "يدعم عملية التمثيل الغذائي للطاقة ويقلل التعب"
>     },
>     {
>       "name_en": "Magnesium",
>       "name_ar": "المغنيسيوم",
>       "dosage_en": "400-800 mg daily",
>       "dosage_ar": "400-800 مجم يوميًا",
>       "benefits_en": "Supports muscle function and energy production",
>       "benefits_ar": "يدعم وظيفة العضلات وإنتاج الطاقة"
>     },
>     {
>       "name_en": "Iron",
>       "name_ar": "الحديد",
>       "dosage_en": "As directed by healthcare provider (if deficient)",
>       "dosage_ar": "حسب توجيهات مقدم الرعاية الصحية (إذا كان هناك نقص)",
>       "benefits_en": "Prevents fatigue caused by iron deficiency anemia",
>       "benefits_ar": "يمنع التعب الناجم عن فقر الدم بسبب نقص الحديد"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation associated with muscle fatigue",
>       "benefits_ar": "يقلل الألم والالتهاب المرتبط بإجهاد العضلات",
>       "cautions_en": "May cause stomach irritation. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Ginseng",
>       "plant_name_ar": "الجينسنغ",
>       "recipe_en": "Steep 1 teaspoon of ginseng root powder in hot water for 10 minutes. Drink 1 cup daily. Do not use for more than 3 months at a time.",
>       "recipe_ar": "انقع ملعقة صغيرة من مسحوق جذر الجينسنغ في الماء الساخن لمدة 10 دقائق. اشرب كوبًا واحدًا يوميًا. لا تستخدمه لأكثر من 3 أشهر في المرة الواحدة.",
>       "benefits_en": "Helps reduce fatigue and improve energy levels",
>       "benefits_ar": "يساعد في تقليل التعب وتحسين مستويات الطاقة"
>     },
>     {
>       "plant_name_en": "Rhodiola Rosea",
>       "plant_name_ar": "روديولا روزيا",
>       "recipe_en": "Take 200-600 mg of standardized extract daily, preferably in the morning.",
>       "recipe_ar": "تناول 200-600 مجم من المستخلص القياسي يوميًا، ويفضل في الصباح.",
>       "benefits_en": "Helps reduce physical and mental fatigue",
>       "benefits_ar": "يساعد في تقليل التعب البدني والعقلي"
>     },
>     {
>       "plant_name_en": "Green Tea",
>       "plant_name_ar": "الشاي الأخضر",
>       "recipe_en": "Steep 1 green tea bag in hot water for 3-5 minutes. Drink 2-3 cups daily, avoiding late in the day.",
>       "recipe_ar": "انقع كيس شاي أخضر واحد في الماء الساخن لمدة 3-5 دقائق. اشرب 2-3 أكواب يوميًا، وتجنب ذلك في وقت متأخر من اليوم.",
>       "benefits_en": "Provides gentle energy boost and antioxidants",
>       "benefits_ar": "يوفر دفعة طاقة لطيفة ومضادات الأكسدة"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Ensure proper warm-up before exercise", "Stay hydrated during workouts", "Listen to your body and don't push through extreme fatigue", "Incorporate rest days into your training schedule", "Vary your workouts to prevent overuse of specific muscles"],
>     "ar": ["تأكد من الإحماء المناسب قبل التمرين", "حافظ على الترطيب أثناء التمارين", "استمع إلى جسمك ولا تدفع نفسك خلال التعب الشديد", "أدرج أيام الراحة في جدول التدريب الخاص بك", "نوّع تمارينك لمنع الإفراط في استخدام عضلات معينة"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Low-intensity cardio (walking, light cycling)", "Gentle stretching", "Bodyweight exercises with fewer repetitions", "Core stabilization exercises"],
>       "exercises_ar": ["التمارين القلبية منخفضة الشدة (المشي، ركوب الدراجة الخفيف)", "التمدد اللطيف", "تمارين وزن الجسم بتكرارات أقل", "تمارين استقرار الجذع"],
>       "frequency_en": "3 times per week, 20-30 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Moderate-intensity cardio", "Light resistance training", "Dynamic stretching", "Balance exercises"],
>       "exercises_ar": ["التمارين القلبية متوسطة الشدة", "تدريب المقاومة الخفيف", "التمدد الديناميكي", "تمارين التوازن"],
>       "frequency_en": "3-4 times per week, 30-40 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Moderate to high-intensity interval training", "Progressive resistance training", "Functional exercises", "Sport-specific movements"],
>       "exercises_ar": ["التمارين القلبية متوسطة إلى عالية الشدة على فترات", "تدريب المقاومة التدريجي", "التمارين الوظيفية", "الحركات الخاصة بالرياضة"],
>       "frequency_en": "4-5 times per week, 45-60 minutes per session",
>       "frequency_ar": "4-5 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Active Recovery",
>       "name_ar": "التعافي النشط",
>       "instructions_en": "Perform low-intensity activities such as walking, swimming, or cycling for 20-30 minutes on rest days.",
>       "instructions_ar": "قم بأداء أنشطة منخفضة الشدة مثل المشي أو السباحة أو ركوب الدراجة لمدة 20-30 دقيقة في أيام الراحة.",
>       "benefits_en": "Increases blood flow to muscles and helps remove waste products",
>       "benefits_ar": "يزيد من تدفق الدم إلى العضلات ويساعد في إزالة منتجات النفايات"
>     },
>     {
>       "name_en": "Foam Rolling",
>       "name_ar": "اللف باستخدام الفوم رولر",
>       "instructions_en": "Gently roll over fatigued muscles with a foam roller for 30-60 seconds per muscle group. Perform 1-2 times daily.",
>       "instructions_ar": "لف بلطف على العضلات المتعبة باستخدام الفوم رولر لمدة 30-60 ثانية لكل مجموعة عضلية. قم بذلك 1-2 مرات يوميًا.",
>       "benefits_en": "Releases muscle tension and improves blood flow",
>       "benefits_ar": "يطلق توتر العضلات ويحسن تدفق الدم"
>     },
>     {
>       "name_en": "Stretching",
>       "name_ar": "التمدد",
>       "instructions_en": "Perform gentle stretching exercises for major muscle groups. Hold each stretch for 15-30 seconds. Perform 2-3 times daily.",
>       "instructions_ar": "قم بأداء تمارين التمدد اللطيفة لمجموعات العضلات الرئيسية. استمر في كل تمدد لمدة 15-30 ثانية. قم بذلك 2-3 مرات يوميًا.",
>       "benefits_en": "Improves flexibility and reduces muscle tension",
>       "benefits_ar": "يحسن المرونة ويقلل توتر العضلات"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Ensure adequate rest between training sessions", "Maintain proper hydration", "Consume a balanced diet with adequate protein", "Get sufficient sleep (7-9 hours per night)", "Manage stress levels"],
>     "ar": ["تأكد من الحصول على قسط كافٍ من الراحة بين جلسات التدريب", "حافظ على الترطيب المناسب", "تناول نظامًا غذائيًا متوازنًا مع كمية كافية من البروتين", "احصل على قسط كافٍ من النوم (7-9 ساعات في الليلة)", "إدارة مستويات التوتر"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Exercise-Induced Muscle Fatigue: The Role of Nutrition",
>       "title_ar": "إجهاد العضلات الناجم عن التمرين: دور التغذية",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6319304/"
>     },
>     {
>       "title_en": "Recovery Strategies for Muscle Fatigue",
>       "title_ar": "استراتيجيات التعافي من إجهاد العضلات",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5799609/"
>     },
>     {
>       "title_en": "Supplements for Exercise Performance and Recovery",
>       "title_ar": "مكملات لأداء التمرين والتعافي",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6347736/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Sprain - الالتواء":
> 
> ```json
> {
>   "title_en": "Sprain",
>   "title_ar": "الالتواء",
>   "description_en": "A sprain is an injury to a ligament, which is the tough band of fibrous tissue that connects bones to other bones. Sprains occur when a ligament is stretched or torn, usually as a result of a fall, twist, or blow.",
>   "description_ar": "الالتواء هو إصابة للرباط، وهو النطاق القوي من النسيج الليفي الذي يربط العظام ببعضها البعض. تحدث الالتواءات عندما يتمدد الرباط أو يتمزق، عادةً نتيجة السقوط أو الالتواء أو الضربة.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Follow the RICE protocol: Rest, Ice, Compression, Elevation", "Stop activity immediately", "Apply ice to the injured area for 15-20 minutes every 2-3 hours", "Compress the area with an elastic bandage", "Elevate the injured limb above heart level"],
>       "ar": ["اتبع بروتوكول RICE: الراحة، الثلج، الضغط، الرفع", "توقف عن النشاط فورًا", "ضع الثلج على المنطقة المصابة لمدة 15-20 دقيقة كل 2-3 ساعات", "اضغط على المنطقة بضمادة مرنة", "ارفع الطرف المصاب فوق مستوى القلب"]
>     },
>     "short_term_care": {
>       "en": ["Continue RICE protocol for 48-72 hours", "Use over-the-counter pain relievers as needed", "Begin gentle range of motion exercises after 48 hours", "Avoid activities that stress the injured ligament", "Consider using a brace or support for stability"],
>       "ar": ["استمر في بروتوكول RICE لمدة 48-72 ساعة", "استخدم مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة", "ابدأ تمارين نطاق الحركة اللطيفة بعد 48 ساعة", "تجنب الأنشطة التي تضع ضغطًا على الرباط المصاب", "فكر في استخدام دعامة أو دعامة للاستقرار"]
>     },
>     "long_term_care": {
>       "en": ["Gradually return to normal activities", "Incorporate strengthening exercises", "Improve balance and proprioception", "Consider physical therapy for moderate to severe sprains", "Use supportive footwear or braces during activities"],
>       "ar": ["عد تدريجيًا إلى الأنشطة الطبيعية", "أدرج تمارين التقوية", "حسن التوازن والإحساس بالموضع", "فكر في العلاج الطبيعي للالتواءات المتوسطة إلى الشديدة", "استخدم الأحذية الداعمة أو الدعامات أثناء الأنشطة"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Vitamin C",
>       "name_ar": "فيتامين سي",
>       "dosage_en": "1000 mg daily",
>       "dosage_ar": "1000 مجم يوميًا",
>       "benefits_en": "Supports collagen production for ligament repair",
>       "benefits_ar": "يدعم إنتاج الكولاجين لإصلاح الأربطة"
>     },
>     {
>       "name_en": "Bromelain",
>       "name_ar": "بروميلين",
>       "dosage_en": "500 mg 3 times daily between meals",
>       "dosage_ar": "500 مجم 3 مرات يوميًا بين الوجبات",
>       "benefits_en": "Reduces inflammation and swelling",
>       "benefits_ar": "يقلل الالتهاب والتورم"
>     },
>     {
>       "name_en": "Calcium and Vitamin D",
>       "name_ar": "الكالسيوم وفيتامين د",
>       "dosage_en": "Calcium: 1000-1200 mg daily; Vitamin D: 1000-2000 IU daily",
>       "dosage_ar": "الكالسيوم: 1000-1200 مجم يوميًا؛ فيتامين د: 1000-2000 وحدة دولية يوميًا",
>       "benefits_en": "Supports bone health and healing",
>       "benefits_ar": "يدعم صحة العظام والشفاء"
>     },
>     {
>       "name_en": "Zinc",
>       "name_ar": "الزنك",
>       "dosage_en": "15-30 mg daily",
>       "dosage_ar": "15-30 مجم يوميًا",
>       "benefits_en": "Supports tissue repair and wound healing",
>       "benefits_ar": "يدعم إصلاح الأنسجة والشفاء من الجروح"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May cause stomach irritation. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     },
>     {
>       "name_en": "Topical NSAIDs",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية الموضعية",
>       "dosage_en": "Apply to affected area 3-4 times daily",
>       "dosage_ar": "ضع على المنطقة المصابة 3-4 مرات يوميًا",
>       "benefits_en": "Provides localized pain relief with fewer systemic side effects",
>       "benefits_ar": "يوفر راحة من الألم موضعية مع آثار جانبية جهازية أقل",
>       "cautions_en": "Avoid applying to broken skin. May cause skin irritation.",
>       "cautions_ar": "تجنب وضعها على الجلد التالف. قد يسبب تهيج الجلد."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Arnica",
>       "plant_name_ar": "الأرنيكا",
>       "recipe_en": "Apply arnica gel or cream to the injured area 2-3 times daily. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
>       "recipe_ar": "ضع جل أو كريم الأرنيكا على المنطقة المصابة 2-3 مرات يوميًا. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
>       "benefits_en": "Reduces inflammation, swelling, and bruising",
>       "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
>     },
>     {
>       "plant_name_en": "Comfrey",
>       "plant_name_ar": "القراص",
>       "recipe_en": "Make a poultice by crushing fresh comfrey leaves and applying directly to the sprain. Cover with a bandage and leave for 2-3 hours. Repeat 1-2 times daily.",
>       "recipe_ar": "اصنع ضمادة عن طريق سحق أوراق القراص الطازجة وتطبيقها مباشرة على الالتواء. غطها بضمادة واتركها لمدة 2-3 ساعات. كرر 1-2 مرات يوميًا.",
>       "benefits_en": "Contains allantoin which promotes cell growth and reduces inflammation",
>       "benefits_ar": "يحتوي على الألانتوين الذي يعزز نمو الخلايا ويقلل الالتهاب"
>     },
>     {
>       "plant_name_en": "Turmeric",
>       "plant_name_ar": "الكركم",
>       "recipe_en": "Mix 1 teaspoon of turmeric powder with enough water to make a paste. Apply to the sprain and cover with a bandage. Leave for 30 minutes before rinsing. Repeat twice daily.",
>       "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع كمية كافية من الماء لصنع عجينة. ضعها على الالتواء وغطها بضمادة. اتركها لمدة 30 دقيقة قبل الشطف. كرر مرتين يوميًا.",
>       "benefits_en": "Curcumin in turmeric has strong anti-inflammatory properties",
>       "benefits_ar": "الكركمين في الكركم له خصائص مضادة قوية للالتهاب"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid exercises that stress the injured ligament", "Focus on training other muscle groups", "Always warm up properly before exercising", "Use supportive braces or taping during activities", "Gradually return to sports and high-impact activities"],
>     "ar": ["تجنب التمارين التي تضع ضغطًا على الرباط المصاب", "ركز على تدريب مجموعات العضلات الأخرى", "قم دائمًا بالإحماء المناسب قبل التمرين", "استخدم الدعامات الداعمة أو الربط أثناء الأنشطة", "عد تدريجيًا إلى الرياضات والأنشطة عالية التأثير"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle range of motion exercises", "Isometric exercises (muscle contraction without movement)", "Low-impact cardio (swimming, cycling if no pain)", "Core stabilization exercises"],
>       "exercises_ar": ["تمارين نطاق الحركة اللطيفة", "تمارين متساوية القياس (انقباض العضلات دون حركة)", "التمارين القلبية منخفضة التأثير (السباحة، ركوب الدراجة إذا لم يكن هناك ألم)", "تمارين استقرار الجذع"],
>       "frequency_en": "3-4 times per week, 20-30 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Light resistance training for unaffected areas", "Gentle stretching of the injured area", "Low-impact cardio", "Balance exercises"],
>       "exercises_ar": ["تدريب المقاومة الخفيف للمناطق غير المتأثرة", "تمارين التمدد اللطيفة للمنطقة المصابة", "التمارين القلبية منخفضة التأثير", "تمارين التوازن"],
>       "frequency_en": "4 times per week, 30-40 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Gradual reintroduction of exercises for the injured area", "Moderate resistance training", "Sport-specific movements", "Proprioception exercises"],
>       "exercises_ar": ["إعادة تدريجية للتمارين للمنطقة المصابة", "تدريب المقاومة المعتدل", "الحركات الخاصة بالرياضة", "تمارين الإحساس بالموضع"],
>       "frequency_en": "4-5 times per week, 45-60 minutes per session",
>       "frequency_ar": "4-5 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Range of Motion Exercises",
>       "name_ar": "تمارين نطاق الحركة",
>       "instructions_en": "Gently move the injured joint through its full range of motion without causing pain. Perform 10 repetitions, 2-3 times daily.",
>       "instructions_ar": "حرك المفصل المصاب ببطء عبر نطاق حركته الكامل دون التسبب في الألم. قم بأداء 10 تكرارات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains joint mobility and prevents stiffness",
>       "benefits_ar": "يحافظ على حركة المفصل ويمنع التصلب"
>     },
>     {
>       "name_en": "Isometric Exercises",
>       "name_ar": "تمارين متساوية القياس",
>       "instructions_en": "Tighten the muscles around the injured joint without moving it. Hold for 5-10 seconds, then relax. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "شد العضلات حول المفصل المصاب دون تحريكه. استمر لمدة 5-10 ثوانٍ، ثم استرخِ. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains muscle strength without stressing the injured ligament",
>       "benefits_ar": "يحافظ على قوة العضلات دون إجهاد الرباط المصاب"
>     },
>     {
>       "name_en": "Balance and Proprioception Exercises",
>       "name_ar": "تمارين التوازن والإحساس بالموضع",
>       "instructions_en": "Stand on the injured leg (if appropriate) with support nearby. Try to maintain balance for 30 seconds. Progress to standing on an unstable surface like a pillow. Perform 2-3 times daily.",
>       "instructions_ar": "قف على الساق المصابة (إذا كان ذلك مناسبًا) مع وجود دعم قريب. حاول الحفاظ على التوازن لمدة 30 ثانية. تقدم إلى الوقوف على سطح غير مستقر مثل وسادة. قم بذلك 2-3 مرات يوميًا.",
>       "benefits_en": "Improves joint stability and prevents re-injury",
>       "benefits_ar": "يحسن استقرار المفصل ويمنع الإصابة مرة أخرى"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Follow the RICE protocol for the first 48-72 hours", "Gradual progression through rehabilitation phases", "Proper bracing or taping during activities", "Balance and proprioception training", "Gradual return to sport-specific activities"],
>     "ar": ["اتبع بروتوكول RICE لمدة 48-72 ساعة الأولى", "التقدم التدريجي عبر مراحل إعادة التأهيل", "الربط أو الربط المناسب أثناء الأنشطة", "تدريب التوازن والإحساس بالموضع", "العودة التدريجية إلى الأنشطة الخاصة بالرياضة"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Ankle Sprains",
>       "title_ar": "إدارة التواء الكاحل",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Rehabilitation After Ligament Injury",
>       "title_ar": "إعادة التأهيل بعد إصابة الرباط",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Prevention of Ankle Sprains",
>       "title_ar": "الوقاية من التواء الكاحل",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Ankle Sprain - التواء الكاحل":
> 
> ```json
> {
>   "title_en": "Ankle Sprain",
>   "title_ar": "التواء الكاحل",
>   "description_en": "An ankle sprain occurs when the ligaments that support the ankle stretch beyond their limits or tear. It's one of the most common injuries, often happening during sports or when walking on uneven surfaces.",
>   "description_ar": "يحدث التواء الكاحل عندما تتمدد الأربطة التي تدعم الكاحل beyond حدودها أو تتمزق. إنه أحد أكثر الإصابات شيوعًا، وغالبًا ما يحدث أثناء الرياضة أو عند المشي على أسطح غير مستوية.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Follow the RICE protocol: Rest, Ice, Compression, Elevation", "Stop activity immediately", "Apply ice to the ankle for 15-20 minutes every 2-3 hours", "Compress with an elastic bandage", "Elevate the ankle above heart level"],
>       "ar": ["اتبع بروتوكول RICE: الراحة، الثلج، الضغط، الرفع", "توقف عن النشاط فورًا", "ضع الثلج على الكاحل لمدة 15-20 دقيقة كل 2-3 ساعات", "اضغط بضمادة مرنة", "ارفع الكاحل فوق مستوى القلب"]
>     },
>     "short_term_care": {
>       "en": ["Continue RICE protocol for 48-72 hours", "Use over-the-counter pain relievers as needed", "Begin gentle range of motion exercises after 48 hours", "Use crutches if walking is painful", "Consider using an ankle brace for support"],
>       "ar": ["استمر في بروتوكول RICE لمدة 48-72 ساعة", "استخدم مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة", "ابدأ تمارين نطاق الحركة اللطيفة بعد 48 ساعة", "استخدم العكازات إذا كان المشي مؤلمًا", "فكر في استخدام دعامة الكاحل للدعم"]
>     },
>     "long_term_care": {
>       "en": ["Gradually return to weight-bearing activities", "Incorporate strengthening exercises", "Improve balance and proprioception", "Consider physical therapy for moderate to severe sprains", "Use supportive footwear during activities"],
>       "ar": ["عد تدريجيًا إلى الأنشطة التي تحمل الوزن", "أدرج تمارين التقوية", "حسن التوازن والإحساس بالموضع", "فكر في العلاج الطبيعي للالتواءات المتوسطة إلى الشديدة", "استخدم الأحذية الداعمة أثناء الأنشطة"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Vitamin C",
>       "name_ar": "فيتامين سي",
>       "dosage_en": "1000 mg daily",
>       "dosage_ar": "1000 مجم يوميًا",
>       "benefits_en": "Supports collagen production for ligament repair",
>       "benefits_ar": "يدعم إنتاج الكولاجين لإصلاح الأربطة"
>     },
>     {
>       "name_en": "Bromelain",
>       "name_ar": "بروميلين",
>       "dosage_en": "500 mg 3 times daily between meals",
>       "dosage_ar": "500 مجم 3 مرات يوميًا بين الوجبات",
>       "benefits_en": "Reduces inflammation and swelling",
>       "benefits_ar": "يقلل الالتهاب والتورم"
>     },
>     {
>       "name_en": "Calcium and Vitamin D",
>       "name_ar": "الكالسيوم وفيتامين د",
>       "dosage_en": "Calcium: 1000-1200 mg daily; Vitamin D: 1000-2000 IU daily",
>       "dosage_ar": "الكالسيوم: 1000-1200 مجم يوميًا؛ فيتامين د: 1000-2000 وحدة دولية يوميًا",
>       "benefits_en": "Supports bone health and healing",
>       "benefits_ar": "يدعم صحة العظام والشفاء"
>     },
>     {
>       "name_en": "Omega-3 Fatty Acids",
>       "name_ar": "الأحماض الدهنية أوميغا-3",
>       "dosage_en": "2-3 g daily",
>       "dosage_ar": "2-3 جم يوميًا",
>       "benefits_en": "Reduces inflammation and supports healing",
>       "benefits_ar": "يقلل الالتهاب ويدعم الشفاء"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May cause stomach irritation. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     },
>     {
>       "name_en": "Topical NSAIDs",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية الموضعية",
>       "dosage_en": "Apply to affected area 3-4 times daily",
>       "dosage_ar": "ضع على المنطقة المصابة 3-4 مرات يوميًا",
>       "benefits_en": "Provides localized pain relief with fewer systemic side effects",
>       "benefits_ar": "يوفر راحة من الألم موضعية مع آثار جانبية جهازية أقل",
>       "cautions_en": "Avoid applying to broken skin. May cause skin irritation.",
>       "cautions_ar": "تجنب وضعها على الجلد التالف. قد يسبب تهيج الجلد."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Arnica",
>       "plant_name_ar": "الأرنيكا",
>       "recipe_en": "Apply arnica gel or cream to the injured ankle 2-3 times daily. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
>       "recipe_ar": "ضع جل أو كريم الأرنيكا على الكاحل المصاب 2-3 مرات يوميًا. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
>       "benefits_en": "Reduces inflammation, swelling, and bruising",
>       "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
>     },
>     {
>       "plant_name_en": "Epsom Salt Soak",
>       "plant_name_ar": "نقع ملح إبسوم",
>       "recipe_en": "Add 2 cups of Epsom salt to a warm bath and soak the ankle for 20 minutes. Repeat 2-3 times weekly.",
>       "recipe_ar": "أضف كوبين من ملح إبسوم إلى حمام دافئ وانقع الكاحل لمدة 20 دقيقة. كرر 2-3 مرات أسبوعيًا.",
>       "benefits_en": "Magnesium in Epsom salt helps reduce swelling and promote healing",
>       "benefits_ar": "المغنيسيوم في ملح إبسوم يساعد في تقليل التورم وتعزيز الشفاء"
>     },
>     {
>       "plant_name_en": "Turmeric and Ginger Compress",
>       "plant_name_ar": "ضمادة الكركم والزنجبيل",
>       "recipe_en": "Mix 1 teaspoon each of turmeric powder and grated ginger with warm water to make a paste. Apply to the ankle and cover with a cloth. Leave for 20 minutes before rinsing. Repeat once daily.",
>       "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم والزنجبيل المبشور مع الماء الدافئ لصنع عجينة. ضعها على الكاحل وغطها بقطعة قماش. اتركها لمدة 20 دقيقة قبل الشطف. كرر مرة واحدة يوميًا.",
>       "benefits_en": "Both turmeric and ginger have anti-inflammatory properties that help reduce pain and swelling",
>       "benefits_ar": "كل من الكركم والزنجبيل لهما خصائص مضادة للالتهاب تساعد في تقليل الألم والتورم"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid high-impact activities until fully healed", "Focus on upper body and core exercises during recovery", "Use an ankle brace when returning to activities", "Always warm up properly before exercising", "Choose supportive footwear for all activities"],
>     "ar": ["تجنب الأنشطة عالية التأثير حتى الشفاء التام", "ركز على تمارين الجزء العلوي من الجسم والجذع أثناء التعافي", "استخدم دعامة الكاحل عند العودة إلى الأنشطة", "قم دائمًا بالإحماء المناسب قبل التمرين", "اختر الأحذية الداعمة لجميع الأنشطة"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Ankle alphabet (tracing letters with toes)", "Gentle ankle circles", "Towel stretches", "Upper body and core exercises"],
>       "exercises_ar": ["أبجدية الكاحل (تتبع الحروف بأصابع القدمين)", "دوائر الكاحل اللطيفة", "تمارين التمدد بالمنشفة", "تمارين الجزء العلوي من الجسم والجذع"],
>       "frequency_en": "3-4 times per week, 20-30 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Resistance band exercises for ankle", "Calf raises", "Balance exercises", "Low-impact cardio (swimming, cycling)"],
>       "exercises_ar": ["تمارين حزام المقاومة للكاحل", "رفع العجينة", "تمارين التوازن", "التمارين القلبية منخفضة التأثير (السباحة، ركوب الدراجة)"],
>       "frequency_en": "4 times per week, 30-40 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Progressive resistance exercises", "Sport-specific movements", "Plyometric exercises", "Agility drills"],
>       "exercises_ar": ["تمارين المقاومة التدريجية", "الحركات الخاصة بالرياضة", "تمارين البلايومتريك", "تمارين الرشاقة"],
>       "frequency_en": "4-5 times per week, 45-60 minutes per session",
>       "frequency_ar": "4-5 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Ankle Alphabet",
>       "name_ar": "أبجدية الكاحل",
>       "instructions_en": "Sit with your leg extended. Using only your foot and ankle, trace the letters of the alphabet in the air. Perform 2-3 times daily.",
>       "instructions_ar": "اجلس مع رجلك ممدودة. باستخدام قدمك وكاحلك فقط، تتبع حروف الأبجدية في الهواء. قم بذلك 2-3 مرات يوميًا.",
>       "benefits_en": "Improves range of motion in all directions",
>       "benefits_ar": "يحسن نطاق الحركة في جميع الاتجاهات"
>     },
>     {
>       "name_en": "Calf Raises",
>       "name_ar": "رفع العجينة",
>       "instructions_en": "Stand with feet shoulder-width apart. Slowly rise up on your toes, then lower back down. Perform 10-15 repetitions, 2-3 times daily. Progress to single-leg raises as pain allows.",
>       "instructions_ar": "قف مع وضع القدمين بعرض الكتفين. ارتفع ببطء على أصابع قدميك، ثم انزل لأسفل. قم بأداء 10-15 تكرارًا، 2-3 مرات يوميًا. تقدم إلى رفع الساق الواحدة كما يسمح الألم.",
>       "benefits_en": "Strengthens calf muscles and improves ankle stability",
>       "benefits_ar": "يقوي عضلات العجينة ويحسن استقرار الكاحل"
>     },
>     {
>       "name_en": "Balance Exercises",
>       "name_ar": "تمارين التوازن",
>       "instructions_en": "Stand on the injured ankle with support nearby. Try to maintain balance for 30 seconds. Progress to standing on an unstable surface like a pillow or balance pad. Perform 2-3 times daily.",
>       "instructions_ar": "قف على الكاحل المصاب مع وجود دعم قريب. حاول الحفاظ على التوازن لمدة 30 ثانية. تقدم إلى الوقوف على سطح غير مستقر مثل وسادة أو وسادة توازن. قم بذلك 2-3 مرات يوميًا.",
>       "benefits_en": "Improves proprioception and prevents re-injury",
>       "benefits_ar": "يحسن الإحساس بالموضع ويمنع الإصابة مرة أخرى"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Follow the RICE protocol for the first 48-72 hours", "Gradual progression through rehabilitation phases", "Proper bracing or taping during activities", "Balance and proprioception training", "Gradual return to sport-specific activities"],
>     "ar": ["اتبع بروتوكول RICE لمدة 48-72 ساعة الأولى", "التقدم التدريجي عبر مراحل إعادة التأهيل", "الربط أو الربط المناسب أثناء الأنشطة", "تدريب التوازن والإحساس بالموضع", "العودة التدريجية إلى الأنشطة الخاصة بالرياضة"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Ankle Sprains",
>       "title_ar": "إدارة التواء الكاحل",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Rehabilitation After Ankle Sprain",
>       "title_ar": "إعادة التأهيل بعد التواء الكاحل",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Prevention of Ankle Sprains",
>       "title_ar": "الوقاية من التواء الكاحل",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Dislocation - الخلع":
> 
> ```json
> {
>   "title_en": "Dislocation",
>   "title_ar": "الخلع",
>   "description_en": "A dislocation is an injury in which the ends of your bones are forced from their normal positions. This painful injury temporarily deforms and immobilizes your joint. Dislocations most commonly occur in shoulders, fingers, knees, and hips.",
>   "description_ar": "الخلع هو إصابة يتم فيها دفع نهايات عظامك من مواقعها الطبيعية. هذه الإصابة المؤلمة تشوه وتثبت المفصل الخاص بك مؤقتًا. تحدث الخلوع بشكل شائع في الكتفين والأصابع والركبتين والوركين.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Seek immediate medical attention", "Immobilize the injured area", "Apply ice to reduce swelling", "Do not try to move the joint back into place", "Take over-the-counter pain relievers if needed"],
>       "ar": ["اطلب العناية الطبية الفورية", "ثبّت المنطقة المصابة", "ضع الثلج لتقليل التورم", "لا تحاول تحريك المفصل مرة أخرى إلى مكانه", "تناول مسكنات الألم التي لا تستلزم وصفة طبية إذا لزم الأمر"]
>     },
>     "short_term_care": {
>       "en": ["Follow medical advice after reduction", "Immobilize the joint as directed", "Apply ice as needed for pain and swelling", "Take prescribed medications", "Begin gentle range of motion exercises when approved"],
>       "ar": ["اتبع النصيحة الطبية بعد الإرجاع", "ثبّت المفصل حسب التوجيهات", "ضع الثلج حسب الحاجة للألم والتورم", "تناول الأدوية الموصوفة", "ابدأ تمارين نطاق الحركة اللطيفة عند الموافقة"]
>     },
>     "long_term_care": {
>       "en": ["Follow rehabilitation program as directed", "Gradually increase activity level", "Strengthen muscles around the joint", "Improve flexibility and range of motion", "Use protective gear during sports if recommended"],
>       "ar": ["اتبع برنامج إعادة التأهيل حسب التوجيهات", "زد مستوى النشاط تدريجيًا", "قوّ العضلات حول المفصل", "حسن المرونة ونطاق الحركة", "استخدم معدات واقية خلال الرياضة إذا تم التوصية بذلك"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Vitamin C",
>       "name_ar": "فيتامين سي",
>       "dosage_en": "1000 mg daily",
>       "dosage_ar": "1000 مجم يوميًا",
>       "benefits_en": "Supports collagen production for tissue repair",
>       "benefits_ar": "يدعم إنتاج الكولاجين لإصلاح الأنسجة"
>     },
>     {
>       "name_en": "Calcium and Vitamin D",
>       "name_ar": "الكالسيوم وفيتامين د",
>       "dosage_en": "Calcium: 1000-1200 mg daily; Vitamin D: 1000-2000 IU daily",
>       "dosage_ar": "الكالسيوم: 1000-1200 مجم يوميًا؛ فيتامين د: 1000-2000 وحدة دولية يوميًا",
>       "benefits_en": "Supports bone health and healing",
>       "benefits_ar": "يدعم صحة العظام والشفاء"
>     },
>     {
>       "name_en": "Magnesium",
>       "name_ar": "المغنيسيوم",
>       "dosage_en": "400-800 mg daily",
>       "dosage_ar": "400-800 مجم يوميًا",
>       "benefits_en": "Supports muscle function and bone health",
>       "benefits_ar": "يدعم وظيفة العضلات وصحة العظام"
>     },
>     {
>       "name_en": "Omega-3 Fatty Acids",
>       "name_ar": "الأحماض الدهنية أوميغا-3",
>       "dosage_en": "2-3 g daily",
>       "dosage_ar": "2-3 جم يوميًا",
>       "benefits_en": "Reduces inflammation and supports healing",
>       "benefits_ar": "يقلل الالتهاب ويدعم الشفاء"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed by physician",
>       "dosage_ar": "حسب توجيهات الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May cause stomach irritation. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     },
>     {
>       "name_en": "Muscle Relaxants",
>       "name_ar": "مرخيات العضلات",
>       "dosage_en": "As prescribed by physician",
>       "dosage_ar": "حسب وصفة الطبيب",
>       "benefits_en": "Relieves muscle spasms around the dislocated joint",
>       "benefits_ar": "يخفف تشنجات العضلات حول المفصل المنخلع",
>       "cautions_en": "May cause drowsiness. Avoid driving or operating heavy machinery while taking this medication.",
>       "cautions_ar": "قد يسبب النعاس. تجنب القيادة أو تشغيل الآلات الثقيلة أثناء تناول هذا الدواء."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Arnica",
>       "plant_name_ar": "الأرنيكا",
>       "recipe_en": "Apply arnica gel or cream to the area around the dislocated joint 2-3 times daily after it has been reset. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
>       "recipe_ar": "ضع جل أو كريم الأرنيكا على المنطقة حول المفصل المنخلع 2-3 مرات يوميًا بعد إعادته إلى مكانه. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
>       "benefits_en": "Reduces inflammation, swelling, and bruising",
>       "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
>     },
>     {
>       "plant_name_en": "Turmeric",
>       "plant_name_ar": "الكركم",
>       "recipe_en": "Mix 1 teaspoon of turmeric powder with warm milk and honey. Drink once daily. Alternatively, take turmeric supplements as directed.",
>       "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع الحليب الدافئ والعسل. اشربه مرة واحدة يوميًا. بدلاً من ذلك، تناول مكملات الكركم حسب التوجيهات.",
>       "benefits_en": "Curcumin has powerful anti-inflammatory properties",
>       "benefits_ar": "الكركمين له خصائص مضادة قوية للالتهاب"
>     },
>     {
>       "plant_name_en": "Boswellia",
>       "plant_name_ar": "البوسويليا",
>       "recipe_en": "Take 300-500 mg of standardized boswellia extract 2-3 times daily.",
>       "recipe_ar": "تناول 300-500 مجم من مستخلص البوسويليا القياسي 2-3 مرات يوميًا.",
>       "benefits_en": "Has anti-inflammatory properties that help reduce pain and swelling",
>       "benefits_ar": "له خصائص مضادة للالتهاب تساعد في تقليل الألم والتورم"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid exercises that stress the injured joint until fully healed", "Focus on training other muscle groups during recovery", "Always warm up properly before exercising", "Use proper form and technique", "Consider working with a physical therapist during rehabilitation"],
>     "ar": ["تجنب التمارين التي تضع ضغطًا على المفصل المصاب حتى الشفاء التام", "ركز على تدريب مجموعات العضلات الأخرى أثناء التعافي", "قم دائمًا بالإحماء المناسب قبل التمرين", "استخدم الشكل والتقنية الصحيحين", "فكر في العمل مع أخصائي علاج طبيعي أثناء إعادة التأهيل"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle range of motion exercises as approved", "Isometric exercises for muscles around the joint", "Low-impact cardio (walking, swimming if appropriate)", "Core stabilization exercises"],
>       "exercises_ar": ["تمارين نطاق الحركة اللطيفة كما تمت الموافقة عليها", "تمارين متساوية القياس للعضلات حول المفصل", "التمارين القلبية منخفضة التأثير (المشي، السباحة إذا كان ذلك مناسبًا)", "تمارين استقرار الجذع"],
>       "frequency_en": "3 times per week, 20-30 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Light resistance training for unaffected areas", "Gentle stretching of the injured area", "Low-impact cardio", "Balance exercises"],
>       "exercises_ar": ["تدريب المقاومة الخفيف للمناطق غير المتأثرة", "تمارين التمدد اللطيفة للمنطقة المصابة", "التمارين القلبية منخفضة التأثير", "تمارين التوازن"],
>       "frequency_en": "3-4 times per week, 30-40 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Gradual reintroduction of exercises for the injured joint", "Moderate resistance training", "Sport-specific movements", "Functional exercises"],
>       "exercises_ar": ["إعادة تدريجية للتمارين للمفصل المصاب", "تدريب المقاومة المعتدل", "الحركات الخاصة بالرياضة", "التمارين الوظيفية"],
>       "frequency_en": "4 times per week, 45-60 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Gentle Range of Motion",
>       "name_ar": "نطاق الحركة اللطيف",
>       "instructions_en": "After medical clearance, gently move the injured joint through its pain-free range of motion. Perform 5-10 repetitions, 2-3 times daily.",
>       "instructions_ar": "بعد الموافقة الطبية، حرك المفصل المصاب بلطف عبر نطاق حركته الخالي من الألم. قم بأداء 5-10 تكرارات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains joint mobility and prevents stiffness",
>       "benefits_ar": "يحافظ على حركة المفصل ويمنع التصلب"
>     },
>     {
>       "name_en": "Isometric Exercises",
>       "name_ar": "تمارين متساوية القياس",
>       "instructions_en": "Tighten the muscles around the injured joint without moving it. Hold for 5-10 seconds, then relax. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "شد العضلات حول المفصل المصاب دون تحريكه. استمر لمدة 5-10 ثوانٍ، ثم استرخِ. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains muscle strength without stressing the injured joint",
>       "benefits_ar": "يحافظ على قوة العضلات دون إجهاد المفصل المصاب"
>     },
>     {
>       "name_en": "Progressive Resistance",
>       "name_ar": "المقاومة التدريجية",
>       "instructions_en": "Begin with light resistance bands or weights. Perform 10-15 repetitions of each exercise. Gradually increase resistance as pain allows. Perform 2-3 sets, 3 times weekly.",
>       "instructions_ar": "ابدأ بحزم أو أوزان مقاومة خفيفة. قم بأداء 10-15 تكرارًا لكل تمرين. زد المقاومة تدريجيًا كما يسمح الألم. قم بأداء 2-3 مجموعات، 3 مرات أسبوعيًا.",
>       "benefits_en": "Gradually rebuilds muscle strength and joint stability",
>       "benefits_ar": "يعيد بناء قوة العضلات واستقرار المفصل تدريجيًا"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Seek immediate medical attention for reduction", "Follow medical advice for immobilization", "Gradual progression through rehabilitation phases", "Strengthen muscles around the joint", "Improve proprioception and balance"],
>     "ar": ["اطلب العناية الطبية الفورية للإرجاع", "اتبع النصيحة الطبية للتثبيت", "التقدم التدريجي عبر مراحل إعادة التأهيل", "قوّ العضلات حول المفصل", "حسن الإحساس بالموضع والتوازن"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Joint Dislocations",
>       "title_ar": "إدارة خلع المفاصل",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Rehabilitation After Joint Dislocation",
>       "title_ar": "إعادة التأهيل بعد خلع المفصل",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Prevention of Recurrent Dislocations",
>       "title_ar": "الوقاية من الخلوع المتكررة",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Subluxation - الخلع الجزئي":
> 
> ```json
> {
>   "title_en": "Subluxation",
>   "title_ar": "الخلع الجزئي",
>   "description_en": "A subluxation is a partial dislocation of a joint, where the bones in a joint are misaligned but not completely separated. It can cause pain, instability, and limited range of motion in the affected joint.",
>   "description_ar": "الخلع الجزئي هو خلع جزئي للمفصل، حيث تكون العظام في المفصل غير محاذاة ولكنها غير منفصلة تمامًا. يمكن أن يسبب الألم وعدم الاستقرار ومحدودية نطاق الحركة في المفصل المصاب.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Rest the affected joint", "Apply ice to reduce swelling", "Immobilize the joint if possible", "Avoid activities that aggravate the condition", "Seek medical evaluation"],
>       "ar": ["ارح المفصل المصاب", "ضع الثلج لتقليل التورم", "ثبّت المفصل إذا أمكن", "تجنب الأنشطة التي تزيد الحالة سوءًا", "اطلب التقييم الطبي"]
>     },
>     "short_term_care": {
>       "en": ["Follow medical advice for treatment", "Continue rest and ice as needed", "Begin gentle range of motion exercises when approved", "Use supportive braces or taping if recommended", "Take over-the-counter pain relievers as needed"],
>       "ar": ["اتبع النصيحة الطبية للعلاج", "استمر في الراحة والثلج حسب الحاجة", "ابدأ تمارين نطاق الحركة اللطيفة عند الموافقة", "استخدم الدعامات الداعمة أو الربط إذا تم التوصية بذلك", "تناول مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة"]
>     },
>     "long_term_care": {
>       "en": ["Follow rehabilitation program as directed", "Strengthen muscles around the joint", "Improve flexibility and range of motion", "Address any underlying biomechanical issues", "Use proper technique during activities"],
>       "ar": ["اتبع برنامج إعادة التأهيل حسب التوجيهات", "قوّ العضلات حول المفصل", "حسن المرونة ونطاق الحركة", "عالج أي مشاكل ميكانيكية حيوية كامنة", "استخدم التقنية المناسبة أثناء الأنشطة"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Vitamin C",
>       "name_ar": "فيتامين سي",
>       "dosage_en": "1000 mg daily",
>       "dosage_ar": "1000 مجم يوميًا",
>       "benefits_en": "Supports collagen production for tissue repair",
>       "benefits_ar": "يدعم إنتاج الكولاجين لإصلاح الأنسجة"
>     },
>     {
>       "name_en": "Calcium and Vitamin D",
>       "name_ar": "الكالسيوم وفيتامين د",
>       "dosage_en": "Calcium: 1000-1200 mg daily; Vitamin D: 1000-2000 IU daily",
>       "dosage_ar": "الكالسيوم: 1000-1200 مجم يوميًا؛ فيتامين د: 1000-2000 وحدة دولية يوميًا",
>       "benefits_en": "Supports bone health and joint stability",
>       "benefits_ar": "يدعم صحة العظام واستقرار المفصل"
>     },
>     {
>       "name_en": "Magnesium",
>       "name_ar": "المغنيسيوم",
>       "dosage_en": "400-800 mg daily",
>       "dosage_ar": "400-800 مجم يوميًا",
>       "benefits_en": "Supports muscle function and relaxation",
>       "benefits_ar": "يدعم وظيفة العضلات واسترخاءها"
>     },
>     {
>       "name_en": "Glucosamine and Chondroitin",
>       "name_ar": "جلوكوزامين وكوندرويتين",
>       "dosage_en": "1500 mg glucosamine and 800-1200 mg chondroitin daily",
>       "dosage_ar": "1500 مجم جلوكوزامين و 800-1200 مجم كوندرويتين يوميًا",
>       "benefits_en": "Supports joint health and may reduce pain",
>       "benefits_ar": "يدعم صحة المفاصل وقد يقلل الألم"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May cause stomach irritation. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     },
>     {
>       "name_en": "Topical NSAIDs",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية الموضعية",
>       "dosage_en": "Apply to affected area 3-4 times daily",
>       "dosage_ar": "ضع على المنطقة المصابة 3-4 مرات يوميًا",
>       "benefits_en": "Provides localized pain relief with fewer systemic side effects",
>       "benefits_ar": "يوفر راحة من الألم موضعية مع آثار جانبية جهازية أقل",
>       "cautions_en": "Avoid applying to broken skin. May cause skin irritation.",
>       "cautions_ar": "تجنب وضعها على الجلد التالف. قد يسبب تهيج الجلد."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Arnica",
>       "plant_name_ar": "الأرنيكا",
>       "recipe_en": "Apply arnica gel or cream to the affected area 2-3 times daily. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
>       "recipe_ar": "ضع جل أو كريم الأرنيكا على المنطقة المصابة 2-3 مرات يوميًا. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
>       "benefits_en": "Reduces inflammation, swelling, and bruising",
>       "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
>     },
>     {
>       "plant_name_en": "Turmeric",
>       "plant_name_ar": "الكركم",
>       "recipe_en": "Mix 1 teaspoon of turmeric powder with warm milk and honey. Drink once daily. Alternatively, take turmeric supplements as directed.",
>       "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع الحليب الدافئ والعسل. اشربه مرة واحدة يوميًا. بدلاً من ذلك، تناول مكملات الكركم حسب التوجيهات.",
>       "benefits_en": "Curcumin has powerful anti-inflammatory properties",
>       "benefits_ar": "الكركمين له خصائص مضادة قوية للالتهاب"
>     },
>     {
>       "plant_name_en": "Devil's Claw",
>       "plant_name_ar": "مخلب الشيطان",
>       "recipe_en": "Take 500-1000 mg of standardized devil's claw extract 2-3 times daily.",
>       "recipe_ar": "تناول 500-1000 مجم من مستخلص مخلب الشيطان القياسي 2-3 مرات يوميًا.",
>       "benefits_en": "Has anti-inflammatory properties that may help reduce joint pain",
>       "benefits_ar": "له خصائص مضادة للالتهاب قد تساعد في تقليل ألم المفاصل"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid exercises that stress the unstable joint", "Focus on strengthening muscles around the joint", "Always warm up properly before exercising", "Use proper form and technique", "Consider working with a physical therapist or trainer"],
>     "ar": ["تجنب التمارين التي تضع ضغطًا على المفصل غير المستقر", "ركز على تقوية العضلات حول المفصل", "قم دائمًا بالإحماء المناسب قبل التمرين", "استخدم الشكل والتقنية الصحيحين", "فكر في العمل مع أخصائي علاج طبيعي أو مدرب"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle range of motion exercises", "Isometric exercises for muscles around the joint", "Low-impact cardio (walking, swimming)", "Core stabilization exercises"],
>       "exercises_ar": ["تمارين نطاق الحركة اللطيفة", "تمارين متساوية القياس للعضلات حول المفصل", "التمارين القلبية منخفضة التأثير (المشي، السباحة)", "تمارين استقرار الجذع"],
>       "frequency_en": "3 times per week, 20-30 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Light resistance training for muscles around the joint", "Gentle stretching", "Low-impact cardio", "Balance exercises"],
>       "exercises_ar": ["تدريب المقاومة الخفيف للعضلات حول المفصل", "التمدد اللطيف", "التمارين القلبية منخفضة التأثير", "تمارين التوازن"],
>       "frequency_en": "3-4 times per week, 30-40 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Progressive resistance training", "Sport-specific movements", "Proprioception exercises", "Functional exercises"],
>       "exercises_ar": ["تدريب المقاومة التدريجي", "الحركات الخاصة بالرياضة", "تمارين الإحساس بالموضع", "التمارين الوظيفية"],
>       "frequency_en": "4 times per week, 45-60 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Gentle Range of Motion",
>       "name_ar": "نطاق الحركة اللطيف",
>       "instructions_en": "Gently move the affected joint through its pain-free range of motion. Perform 5-10 repetitions, 2-3 times daily.",
>       "instructions_ar": "حرك المفصل المصاب بلطف عبر نطاق حركته الخالي من الألم. قم بأداء 5-10 تكرارات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains joint mobility and prevents stiffness",
>       "benefits_ar": "يحافظ على حركة المفصل ويمنع التصلب"
>     },
>     {
>       "name_en": "Isometric Exercises",
>       "name_ar": "تمارين متساوية القياس",
>       "instructions_en": "Tighten the muscles around the affected joint without moving it. Hold for 5-10 seconds, then relax. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "شد العضلات حول المفصل المصاب دون تحريكه. استمر لمدة 5-10 ثوانٍ، ثم استرخِ. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains muscle strength without stressing the unstable joint",
>       "benefits_ar": "يحافظ على قوة العضلات دون إجهاد المفصل غير المستقر"
>     },
>     {
>       "name_en": "Proprioception Training",
>       "name_ar": "تدريب الإحساس بالموضع",
>       "instructions_en": "Perform balance exercises that challenge the affected joint. Start with simple exercises and progress to more challenging ones as stability improves. Perform 2-3 times daily.",
>       "instructions_ar": "قم بأداء تمارين التوازن التي تتحدى المفصل المصاب. ابدأ بتمارين بسيطة وتقدم إلى تمارين أكثر تحديًا مع تحسن الاستقرار. قم بذلك 2-3 مرات يوميًا.",
>       "benefits_en": "Improves joint position sense and stability",
>       "benefits_ar": "يحسن إحساس الموضع واستقرار المفصل"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Seek proper medical evaluation", "Strengthen muscles around the joint", "Improve proprioception and balance", "Address any underlying biomechanical issues", "Gradual return to activities"],
>     "ar": ["اطلب التقييم الطبي المناسب", "قوّ العضلات حول المفصل", "حسن الإحساس بالموضع والتوازن", "عالج أي مشاكل ميكانيكية حيوية كامنة", "العودة التدريجية للأنشطة"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Joint Instability and Subluxation",
>       "title_ar": "إدارة عدم استقرار المفاصل والخلع الجزئي",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Rehabilitation for Joint Instability",
>       "title_ar": "إعادة التأهيل لعدم استقرار المفاصل",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Proprioception Training for Joint Stability",
>       "title_ar": "تدريب الإحساس بالموضع لاستقرار المفاصل",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Tendinitis - التهاب الأوتار":
> 
> ```json
> {
>   "title_en": "Tendinitis",
>   "title_ar": "التهاب الأوتار",
>   "description_en": "Tendinitis is inflammation or irritation of a tendon, the thick fibrous cord that attaches muscle to bone. It causes pain and tenderness just outside a joint and is most common around shoulders, elbows, wrists, knees, and heels.",
>   "description_ar": "التهاب الأوتار هو التهاب أو تهيج في الوتر، وهو الحبل الليفي السميك الذي يربط العضلة بالعظم. يسبب الألم والألم الحساس خارج المفصل مباشرة وهو الأكثر شيوعًا حول الكتفين والمرفقين والمعصمين والركبين والكعبين.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Rest the affected area", "Apply ice to reduce inflammation", "Compress the area if possible", "Elevate the affected limb", "Avoid activities that aggravate the condition"],
>       "ar": ["ارح المنطقة المصابة", "ضع الثلج لتقليل الالتهاب", "اضغط على المنطقة إذا أمكن", "ارفع الطرف المصاب", "تجنب الأنشطة التي تزيد الحالة سوءًا"]
>     },
>     "short_term_care": {
>       "en": ["Continue rest and ice therapy", "Use over-the-counter pain relievers as needed", "Consider using a brace or splint for support", "Begin gentle range of motion exercises when pain allows", "Avoid stretching initially"],
>       "ar": ["استمر في الراحة والعلاج بالثلج", "استخدم مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة", "فكر في استخدام دعامة أو جبيرة للدعم", "ابدأ تمارين نطاق الحركة اللطيفة عندما يسمح الألم", "تجنب التمدد في البداية"]
>     },
>     "long_term_care": {
>       "en": ["Gradually return to activities", "Incorporate stretching exercises", "Strengthen muscles around the tendon", "Improve technique and form during activities", "Consider physical therapy for persistent symptoms"],
>       "ar": ["عد تدريجيًا إلى الأنشطة", "أدرج تمارين التمدد", "قوّ العضلات حول الوتر", "حسن التقنية والشكل أثناء الأنشطة", "فكر في العلاج الطبيعي للأعراض المستمرة"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Vitamin C",
>       "name_ar": "فيتامين سي",
>       "dosage_en": "1000 mg daily",
>       "dosage_ar": "1000 مجم يوميًا",
>       "benefits_en": "Supports collagen production for tendon repair",
>       "benefits_ar": "يدعم إنتاج الكولاجين لإصلاح الأوتار"
>     },
>     {
>       "name_en": "Bromelain",
>       "name_ar": "بروميلين",
>       "dosage_en": "500 mg 3 times daily between meals",
>       "dosage_ar": "500 مجم 3 مرات يوميًا بين الوجبات",
>       "benefits_en": "Reduces inflammation and swelling",
>       "benefits_ar": "يقلل الالتهاب والتورم"
>     },
>     {
>       "name_en": "Omega-3 Fatty Acids",
>       "name_ar": "الأحماض الدهنية أوميغا-3",
>       "dosage_en": "2-3 g daily",
>       "dosage_ar": "2-3 جم يوميًا",
>       "benefits_en": "Reduces inflammation throughout the body",
>       "benefits_ar": "يقلل الالتهاب في جميع أنحاء الجسم"
>     },
>     {
>       "name_en": "Magnesium",
>       "name_ar": "المغنيسيوم",
>       "dosage_en": "400-800 mg daily",
>       "dosage_ar": "400-800 مجم يوميًا",
>       "benefits_en": "Supports muscle relaxation and may reduce pain",
>       "benefits_ar": "يدعم استرخاء العضلات وقد يقلل الألم"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May cause stomach irritation. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     },
>     {
>       "name_en": "Topical NSAIDs",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية الموضعية",
>       "dosage_en": "Apply to affected area 3-4 times daily",
>       "dosage_ar": "ضع على المنطقة المصابة 3-4 مرات يوميًا",
>       "benefits_en": "Provides localized pain relief with fewer systemic side effects",
>       "benefits_ar": "يوفر راحة من الألم موضعية مع آثار جانبية جهازية أقل",
>       "cautions_en": "Avoid applying to broken skin. May cause skin irritation.",
>       "cautions_ar": "تجنب وضعها على الجلد التالف. قد يسبب تهيج الجلد."
>     },
>     {
>       "name_en": "Corticosteroid Injections",
>       "name_ar": "حقن الكورتيكوستيرويد",
>       "dosage_en": "As prescribed by physician",
>       "dosage_ar": "حسب وصفة الطبيب",
>       "benefits_en": "Provides powerful anti-inflammatory effects for severe cases",
>       "benefits_ar": "يوفر تأثيرات مضادة قوية للالتهاب للحالات الشديدة",
>       "cautions_en": "May weaken tendons with repeated use. Limited to 2-3 injections per year in the same area.",
>       "cautions_ar": "قد يضعف الأوتار مع الاستخدام المتكرر. يقتصر على 2-3 حقن سنويًا في نفس المنطقة."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Arnica",
>       "plant_name_ar": "الأرنيكا",
>       "recipe_en": "Apply arnica gel or cream to the affected area 2-3 times daily. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
>       "recipe_ar": "ضع جل أو كريم الأرنيكا على المنطقة المصابة 2-3 مرات يوميًا. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
>       "benefits_en": "Reduces inflammation, swelling, and bruising",
>       "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
>     },
>     {
>       "plant_name_en": "Turmeric",
>       "plant_name_ar": "الكركم",
>       "recipe_en": "Mix 1 teaspoon of turmeric powder with warm milk and honey. Drink once daily. Alternatively, take turmeric supplements as directed.",
>       "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع الحليب الدافئ والعسل. اشربه مرة واحدة يوميًا. بدلاً من ذلك، تناول مكملات الكركم حسب التوجيهات.",
>       "benefits_en": "Curcumin has powerful anti-inflammatory properties",
>       "benefits_ar": "الكركمين له خصائص مضادة قوية للالتهاب"
>     },
>     {
>       "plant_name_en": "Ginger Compress",
>       "plant_name_ar": "ضمادة الزنجبيل",
>       "recipe_en": "Grate fresh ginger and steep in hot water for 10 minutes. Soak a cloth in the mixture and apply to the affected area for 15-20 minutes. Repeat 2-3 times daily.",
>       "recipe_ar": "ابشر الزنجبيل الطازج وانقعه في الماء الساخن لمدة 10 دقائق. انقع قطعة قماش في الخليط وضعها على المنطقة المصابة لمدة 15-20 دقيقة. كرر 2-3 مرات يوميًا.",
>       "benefits_en": "Ginger has anti-inflammatory properties that help reduce pain and swelling",
>       "benefits_ar": "الزنجبيل له خصائص مضادة للالتهاب تساعد في تقليل الألم والتورم"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid exercises that stress the affected tendon", "Focus on training other muscle groups", "Always warm up properly before exercising", "Use proper form and technique", "Gradually increase intensity and duration of workouts"],
>     "ar": ["تجنب التمارين التي تضع ضغطًا على الوتر المصاب", "ركز على تدريب مجموعات العضلات الأخرى", "قم دائمًا بالإحماء المناسب قبل التمرين", "استخدم الشكل والتقنية الصحيحين", "زد شدة ومدة التمارين تدريجيًا"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle range of motion exercises", "Isometric exercises for muscles around the tendon", "Low-impact cardio (swimming, cycling)", "Core stabilization exercises"],
>       "exercises_ar": ["تمارين نطاق الحركة اللطيفة", "تمارين متساوية القياس للعضلات حول الوتر", "التمارين القلبية منخفضة التأثير (السباحة، ركوب الدراجة)", "تمارين استقرار الجذع"],
>       "frequency_en": "3 times per week, 20-30 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Light resistance training for unaffected areas", "Gentle stretching of the affected area", "Low-impact cardio", "Balance exercises"],
>       "exercises_ar": ["تدريب المقاومة الخفيف للمناطق غير المتأثرة", "تمارين التمدد اللطيفة للمنطقة المصابة", "التمارين القلبية منخفضة التأثير", "تمارين التوازن"],
>       "frequency_en": "3-4 times per week, 30-40 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Gradual reintroduction of exercises for the affected area", "Moderate resistance training", "Sport-specific movements", "Eccentric strengthening exercises"],
>       "exercises_ar": ["إعادة تدريجية للتمارين للمنطقة المصابة", "تدريب المقاومة المعتدل", "الحركات الخاصة بالرياضة", "تمارين التقوية المركزة"],
>       "frequency_en": "4 times per week, 45-60 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Eccentric Strengthening",
>       "name_ar": "التقوية المركزة",
>       "instructions_en": "Perform exercises that emphasize the lengthening phase of muscle contraction. For example, slowly lower a weight after lifting it. Perform 3 sets of 10-15 repetitions, 3 times weekly.",
>       "instructions_ar": "قم بأداء تمارين تؤكد على مرحلة إطالة انقباض العضلة. على سبيل المثال، اخفض الوزن ببطء بعد رفعه. قم بأداء 3 مجموعات من 10-15 تكرارًا، 3 مرات أسبوعيًا.",
>       "benefits_en": "Strengthens tendons and helps remodel tendon tissue",
>       "benefits_ar": "يقوي الأوتار ويساعد في إعادة تشكيل نسيج الوتر"
>     },
>     {
>       "name_en": "Gentle Stretching",
>       "name_ar": "التمدد اللطيف",
>       "instructions_en": "After the acute phase, gently stretch the affected tendon and muscle. Hold for 15-30 seconds. Repeat 3-5 times, 2-3 times daily.",
>       "instructions_ar": "بعد المرحلة الحادة، مد الوتر والعضلة المصابة بلطف. استمر لمدة 15-30 ثانية. كرر 3-5 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Improves flexibility and reduces tension on the tendon",
>       "benefits_ar": "يحسن المرونة ويقلل التوتر على الوتر"
>     },
>     {
>       "name_en": "Progressive Loading",
>       "name_ar": "التحميل التدريجي",
>       "instructions_en": "Gradually increase the load on the tendon through specific exercises. Start with light resistance and gradually increase as pain allows. Perform 2-3 sets of 10-15 repetitions, 3 times weekly.",
>       "instructions_ar": "زد الحمل على الوتر تدريجيًا من خلال تمارين محددة. ابدأ بمقاومة خفيفة وزدها تدريجيًا كما يسمح الألم. قم بأداء 2-3 مجموعات من 10-15 تكرارًا، 3 مرات أسبوعيًا.",
>       "benefits_en": "Helps strengthen the tendon and promote healing",
>       "benefits_ar": "يساعد في تقوية الوتر وتعزيز الشفاء"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Rest and protect the affected tendon", "Gradual progression through rehabilitation phases", "Eccentric strengthening exercises", "Address any biomechanical issues", "Modify activities to reduce stress on the tendon"],
>     "ar": ["ارح واحمِ الوتر المصاب", "التقدم التدريجي عبر مراحل إعادة التأهيل", "تمارين التقوية المركزة", "عالج أي مشاكل ميكانيكية حيوية", "عدل الأنشطة لتقليل الضغط على الوتر"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Tendinopathy",
>       "title_ar": "إدارة اعتلال الأوتار",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Exercise Therapy for Tendinopathy",
>       "title_ar": "العلاج بالتمرين لاعتلال الأوتار",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Eccentric Exercise for Tendon Rehabilitation",
>       "title_ar": "التمرين المركز لإعادة تأهيل الأوتار",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Tendon Rupture - تمزق الوتر":
> 
> ```json
> {
>   "title_en": "Tendon Rupture",
>   "title_ar": "تمزق الوتر",
>   "description_en": "A tendon rupture is a complete or partial tear of a tendon, the thick fibrous cord that attaches muscle to bone. This serious injury often requires surgery and extensive rehabilitation, especially for complete ruptures.",
>   "description_ar": "تمزق الوتر هو تمزق كامل أو جزئي للوتر، وهو الحبل الليفي السميك الذي يربط العضلة بالعظم. هذه الإصابة الخطيرة تتطلب غالبًا جراحة وإعادة تأهيل مكثفة، خاصة للتمزقات الكاملة.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Seek immediate medical attention", "Immobilize the affected area", "Apply ice to reduce swelling", "Elevate the affected limb", "Do not attempt to bear weight on the injured limb"],
>       "ar": ["اطلب العناية الطبية الفورية", "ثبّت المنطقة المصابة", "ضع الثلج لتقليل التورم", "ارفع الطرف المصاب", "لا تحاول تحمل الوزن على الطرف المصاب"]
>     },
>     "short_term_care": {
>       "en": ["Follow medical advice after diagnosis", "Immobilize the area as directed", "Use crutches or other assistive devices as needed", "Take prescribed medications", "Prepare for surgery if recommended"],
>       "ar": ["اتبع النصيحة الطبية بعد التشخيص", "ثبّت المنطقة حسب التوجيهات", "استخدم العكازات أو الأجهزة المساعدة الأخرى حسب الحاجة", "تناول الأدوية الموصوفة", "استعد للجراحة إذا تم التوصية بذلك"]
>     },
>     "long_term_care": {
>       "en": ["Follow post-surgical rehabilitation protocol", "Attend physical therapy sessions regularly", "Gradually increase weight-bearing activities", "Strengthen muscles around the injured tendon", "Return to activities gradually and with caution"],
>       "ar": ["اتبع بروتوكول إعادة التأهيل بعد الجراحة", "حضر جلسات العلاج الطبيعي بانتظام", "زد الأنشطة التي تحمل الوزن تدريجيًا", "قوّ العضلات حول الوتر المصاب", "عد إلى الأنشطة تدريجيًا وبحذر"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Vitamin C",
>       "name_ar": "فيتامين سي",
>       "dosage_en": "1000-2000 mg daily",
>       "dosage_ar": "1000-2000 مجم يوميًا",
>       "benefits_en": "Supports collagen production for tendon repair and healing",
>       "benefits_ar": "يدعم إنتاج الكولاجين لإصلاح الوتر والشفاء"
>     },
>     {
>       "name_en": "Protein",
>       "name_ar": "البروتين",
>       "dosage_en": "1.6-2.2 g per kg of body weight daily",
>       "dosage_ar": "1.6-2.2 جم لكل كجم من وزن الجسم يوميًا",
>       "benefits_en": "Essential for tissue repair and muscle maintenance",
>       "benefits_ar": "أساسي لإصلاح الأنسجة وصيانة العضلات"
>     },
>     {
>       "name_en": "Zinc",
>       "name_ar": "الزنك",
>       "dosage_en": "15-30 mg daily",
>       "dosage_ar": "15-30 مجم يوميًا",
>       "benefits_en": "Supports wound healing and tissue repair",
>       "benefits_ar": "يدعم التئام الجروح وإصلاح الأنسجة"
>     },
>     {
>       "name_en": "Omega-3 Fatty Acids",
>       "name_ar": "الأحماض الدهنية أوميغا-3",
>       "dosage_en": "2-3 g daily",
>       "dosage_ar": "2-3 جم يوميًا",
>       "benefits_en": "Reduces inflammation and supports healing",
>       "benefits_ar": "يقلل الالتهاب ويدعم الشفاء"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed by physician",
>       "dosage_ar": "حسب توجيهات الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May interfere with tendon healing if used long-term. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يتداخل مع شفاء الوتر إذا تم استخدامه على المدى الطويل. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     },
>     {
>       "name_en": "Pain Medications (Acetaminophen)",
>       "name_ar": "مسكنات الألم (باراسيتامول)",
>       "dosage_en": "As directed by physician",
>       "dosage_ar": "حسب توجيهات الطبيب",
>       "benefits_en": "Relieves pain without affecting tendon healing",
>       "benefits_ar": "يخفف الألم دون التأثير على شفاء الوتر",
>       "cautions_en": "Do not exceed recommended dosage. Avoid with liver disease or alcohol consumption.",
>       "cautions_ar": "لا تتجاوز الجرعة الموصى بها. تجنبه مع أمراض الكبد أو استهلاك الكحول."
>     },
>     {
>       "name_en": "Antibiotics (if infection is present)",
>       "name_ar": "المضادات الحيوية (إذا كانت هناك عدوى)",
>       "dosage_en": "As prescribed by physician",
>       "dosage_ar": "حسب وصفة الطبيب",
>       "benefits_en": "Treats or prevents infection",
>       "benefits_ar": "يعالج أو يمنع العدوى",
>       "cautions_en": "Take full course as prescribed even if symptoms improve. May cause side effects like digestive upset.",
>       "cautions_ar": "تناول الدورة الكاملة كما هو موصوف حتى لو تحسنت الأعراض. قد يسبب آثارًا جانبية مثل اضطراب الجهاز الهضمي."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Arnica",
>       "plant_name_ar": "الأرنيكا",
>       "recipe_en": "Apply arnica gel or cream to the area around the injury (not directly on surgical wounds) 2-3 times daily. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
>       "recipe_ar": "ضع جل أو كريم الأرنيكا على المنطقة حول الإصابة (وليس مباشرة على الجروح الجراحية) 2-3 مرات يوميًا. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
>       "benefits_en": "Reduces inflammation, swelling, and bruising",
>       "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
>     },
>     {
>       "plant_name_en": "Turmeric",
>       "plant_name_ar": "الكركم",
>       "recipe_en": "Mix 1 teaspoon of turmeric powder with warm milk and honey. Drink once daily. Alternatively, take turmeric supplements as directed.",
>       "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع الحليب الدافئ والعسل. اشربه مرة واحدة يوميًا. بدلاً من ذلك، تناول مكملات الكركم حسب التوجيهات.",
>       "benefits_en": "Curcumin has powerful anti-inflammatory properties",
>       "benefits_ar": "الكركمين له خصائص مضادة قوية للالتهاب"
>     },
>     {
>       "plant_name_en": "Gotu Kola",
>       "plant_name_ar": "جوتو كولا",
>       "recipe_en": "Take 500-1000 mg of standardized gotu kola extract 2 times daily.",
>       "recipe_ar": "تناول 500-1000 مجم من مستخلص جوتو كولا القياسي مرتين يوميًا.",
>       "benefits_en": "Supports collagen production and wound healing",
>       "benefits_ar": "يدعم إنتاج الكولاجين والشفاء من الجروح"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Follow medical advice regarding exercise restrictions", "Focus on training other muscle groups during recovery", "Always warm up properly before exercising", "Use proper form and technique", "Work closely with a physical therapist during rehabilitation"],
>     "ar": ["اتبع النصيحة الطبية بشأن قيود التمرين", "ركز على تدريب مجموعات العضلات الأخرى أثناء التعافي", "قم دائمًا بالإحماء المناسب قبل التمرين", "استخدم الشكل والتقنية الصحيحين", "اعمل عن كثب مع أخصائي علاج طبيعي أثناء إعادة التأهيل"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle range of motion exercises as approved", "Isometric exercises for muscles around the injury", "Upper body and core exercises (if lower body injury)", "Breathing exercises"],
>       "exercises_ar": ["تمارين نطاق الحركة اللطيفة كما تمت الموافقة عليها", "تمارين متساوية القياس للعضلات حول الإصابة", "تمارين الجزء العلوي من الجسم والجذع (إذا كانت إصابة الجزء السفلي)", "تمارين التنفس"],
>       "frequency_en": "2-3 times per week, 15-20 minutes per session",
>       "frequency_ar": "2-3 مرات في الأسبوع، 15-20 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Light resistance training for unaffected areas", "Gentle stretching of the injured area as approved", "Low-impact cardio (swimming if appropriate)", "Balance exercises"],
>       "exercises_ar": ["تدريب المقاومة الخفيف للمناطق غير المتأثرة", "تمارين التمدد اللطيفة للمنطقة المصابة كما تمت الموافقة عليها", "التمارين القلبية منخفضة التأثير (السباحة إذا كان ذلك مناسبًا)", "تمارين التوازن"],
>       "frequency_en": "3 times per week, 20-30 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Progressive resistance training as approved", "Sport-specific movements (modified)", "Functional exercises", "Balance and proprioception exercises"],
>       "exercises_ar": ["تدريب المقاومة التدريجي كما تمت الموافقة عليه", "الحركات الخاصة بالرياضة (معدلة)", "التمارين الوظيفية", "تمارين التوازن والإحساس بالموضع"],
>       "frequency_en": "3-4 times per week, 30-45 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 30-45 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Gentle Range of Motion",
>       "name_ar": "نطاق الحركة اللطيف",
>       "instructions_en": "After medical clearance, gently move the injured joint through its pain-free range of motion. Perform 5-10 repetitions, 2-3 times daily.",
>       "instructions_ar": "بعد الموافقة الطبية، حرك المفصل المصاب بلطف عبر نطاق حركته الخالي من الألم. قم بأداء 5-10 تكرارات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains joint mobility and prevents stiffness",
>       "benefits_ar": "يحافظ على حركة المفصل ويمنع التصلب"
>     },
>     {
>       "name_en": "Isometric Exercises",
>       "name_ar": "تمارين متساوية القياس",
>       "instructions_en": "Tighten the muscles around the injured area without moving the joint. Hold for 5-10 seconds, then relax. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "شد العضلات حول المنطقة المصابة دون تحريك المفصل. استمر لمدة 5-10 ثوانٍ، ثم استرخِ. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains muscle strength without stressing the healing tendon",
>       "benefits_ar": "يحافظ على قوة العضلات دون إجهاد الوتر الذي يلتئم"
>     },
>     {
>       "name_en": "Progressive Resistance",
>       "name_ar": "المقاومة التدريجية",
>       "instructions_en": "Begin with light resistance bands or weights as approved by your physical therapist. Perform 10-15 repetitions of each exercise. Gradually increase resistance as healing allows. Perform 2-3 sets, 3 times weekly.",
>       "instructions_ar": "ابدأ بحزم أو أوزان مقاومة خفيفة كما وافق أخصائي العلاج الطبيعي. قم بأداء 10-15 تكرارًا لكل تمرين. زد المقاومة تدريجيًا كما يسمح الشفاء. قم بأداء 2-3 مجموعات، 3 مرات أسبوعيًا.",
>       "benefits_en": "Gradually rebuilds tendon strength and function",
>       "benefits_ar": "يعيد بناء قوة الوتر ووظيفته تدريجيًا"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Follow medical advice for treatment (surgical or non-surgical)", "Adhere to immobilization period as directed", "Attend all physical therapy sessions", "Gradually progress through rehabilitation phases", "Maintain overall fitness during recovery"],
>     "ar": ["اتبع النصيحة الطبية للعلاج (الجراحي أو غير الجراحي)", "التزم بفترة التثبيت حسب التوجيهات", "حضر جميع جلسات العلاج الطبيعي", "تقدم تدريجيًا عبر مراحل إعادة التأهيل", "حافظ على اللياقة العامة أثناء التعافي"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Tendon Ruptures",
>       "title_ar": "إدارة تمزقات الأوتار",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Rehabilitation After Tendon Repair",
>       "title_ar": "إعادة التأهيل بعد إصلاح الوتر",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Surgical vs. Non-surgical Treatment of Tendon Ruptures",
>       "title_ar": "العلاج الجراحي مقابل غير الجراحي لتمزقات الأوتار",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Achilles Tendinitis - التهاب وتر الكاحل أسفل الكعب":
> 
> ```json
> {
>   "title_en": "Achilles Tendinitis",
>   "title_ar": "التهاب وتر الكاحل أسفل الكعب",
>   "description_en": "Achilles tendinitis is an overuse injury of the Achilles tendon, the band of tissue that connects calf muscles at the back of the lower leg to your heel bone. It causes pain along the back of the leg near the heel.",
>   "description_ar": "التهاب وتر الكاحل أسفل الكعب هو إصابة ناتجة عن الإفراط في استخدام وتر الكعب، وهو نسيج يربط عضلات الساق في الجزء الخلفي من الساق السفلية بعظم الكعب. يسبب الألم على طول الجزء الخلفي من الساق بالقرب من الكعب.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Rest and avoid activities that cause pain", "Apply ice to the affected area for 15-20 minutes several times daily", "Elevate your leg above heart level when possible", "Use heel lifts in shoes to reduce tension on the tendon", "Take over-the-counter pain relievers as needed"],
>       "ar": ["ارح وتجنب الأنشطة التي تسبب الألم", "ضع الثلج على المنطقة المصابة لمدة 15-20 دقيقة عدة مرات يوميًا", "ارفع ساقك فوق مستوى القلب عندما يكون ذلك ممكنًا", "استخدم رافعات الكعب في الأحذية لتقليل التوتر على الوتر", "تناول مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة"]
>     },
>     "short_term_care": {
>       "en": ["Continue rest and ice therapy", "Use a brace or walking boot if recommended", "Perform gentle stretching exercises", "Avoid high-impact activities", "Consider physical therapy if symptoms persist"],
>       "ar": ["استمر في الراحة والعلاج بالثلج", "استخدم دعامة أو حذاء مشي إذا تم التوصية بذلك", "قم بأداء تمارين التمدد اللطيفة", "تجنب الأنشطة عالية التأثير", "فكر في العلاج الطبيعي إذا استمرت الأعراض"]
>     },
>     "long_term_care": {
>       "en": ["Gradually return to activities", "Incorporate specific stretching and strengthening exercises", "Wear proper footwear with adequate support", "Modify training techniques to prevent recurrence", "Consider orthotic inserts if recommended"],
>       "ar": ["عد تدريجيًا إلى الأنشطة", "أدرج تمارين التمدد والتقوية المحددة", "ارتدِ أحذية مناسبة بدعم كافٍ", "عدل تقنيات التدريب لمنع التكرار", "فكر في أقواس الحذو إذا تم التوصية بذلك"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Vitamin C",
>       "name_ar": "فيتامين سي",
>       "dosage_en": "1000 mg daily",
>       "dosage_ar": "1000 مجم يوميًا",
>       "benefits_en": "Supports collagen production for tendon repair",
>       "benefits_ar": "يدعم إنتاج الكولاجين لإصلاح الأوتار"
>     },
>     {
>       "name_en": "Magnesium",
>       "name_ar": "المغنيسيوم",
>       "dosage_en": "400-800 mg daily",
>       "dosage_ar": "400-800 مجم يوميًا",
>       "benefits_en": "Supports muscle relaxation and may reduce muscle tension on the tendon",
>       "benefits_ar": "يدعم استرخاء العضلات وقد يقلل توتر العضلات على الوتر"
>     },
>     {
>       "name_en": "Omega-3 Fatty Acids",
>       "name_ar": "الأحماض الدهنية أوميغا-3",
>       "dosage_en": "2-3 g daily",
>       "dosage_ar": "2-3 جم يوميًا",
>       "benefits_en": "Reduces inflammation throughout the body",
>       "benefits_ar": "يقلل الالتهاب في جميع أنحاء الجسم"
>     },
>     {
>       "name_en": "Bromelain",
>       "name_ar": "بروميلين",
>       "dosage_en": "500 mg 3 times daily between meals",
>       "dosage_ar": "500 مجم 3 مرات يوميًا بين الوجبات",
>       "benefits_en": "Reduces inflammation and swelling",
>       "benefits_ar": "يقلل الالتهاب والتورم"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May cause stomach irritation. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     },
>     {
>       "name_en": "Topical NSAIDs",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية الموضعية",
>       "dosage_en": "Apply to affected area 3-4 times daily",
>       "dosage_ar": "ضع على المنطقة المصابة 3-4 مرات يوميًا",
>       "benefits_en": "Provides localized pain relief with fewer systemic side effects",
>       "benefits_ar": "يوفر راحة من الألم موضعية مع آثار جانبية جهازية أقل",
>       "cautions_en": "Avoid applying to broken skin. May cause skin irritation.",
>       "cautions_ar": "تجنب وضعها على الجلد التالف. قد يسبب تهيج الجلد."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Arnica",
>       "plant_name_ar": "الأرنيكا",
>       "recipe_en": "Apply arnica gel or cream to the affected area 2-3 times daily. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
>       "recipe_ar": "ضع جل أو كريم الأرنيكا على المنطقة المصابة 2-3 مرات يوميًا. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
>       "benefits_en": "Reduces inflammation, swelling, and bruising",
>       "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
>     },
>     {
>       "plant_name_en": "Turmeric",
>       "plant_name_ar": "الكركم",
>       "recipe_en": "Mix 1 teaspoon of turmeric powder with warm milk and honey. Drink once daily. Alternatively, take turmeric supplements as directed.",
>       "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع الحليب الدافئ والعسل. اشربه مرة واحدة يوميًا. بدلاً من ذلك، تناول مكملات الكركم حسب التوجيهات.",
>       "benefits_en": "Curcumin has powerful anti-inflammatory properties",
>       "benefits_ar": "الكركمين له خصائص مضادة قوية للالتهاب"
>     },
>     {
>       "plant_name_en": "Ginger Compress",
>       "plant_name_ar": "ضمادة الزنجبيل",
>       "recipe_en": "Grate fresh ginger and steep in hot water for 10 minutes. Soak a cloth in the mixture and apply to the affected area for 15-20 minutes. Repeat 2-3 times daily.",
>       "recipe_ar": "ابشر الزنجبيل الطازج وانقعه في الماء الساخن لمدة 10 دقائق. انقع قطعة قماش في الخليط وضعها على المنطقة المصابة لمدة 15-20 دقيقة. كرر 2-3 مرات يوميًا.",
>       "benefits_en": "Ginger has anti-inflammatory properties that help reduce pain and swelling",
>       "benefits_ar": "الزنجبيل له خصائص مضادة للالتهاب تساعد في تقليل الألم والتورم"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid high-impact activities like running and jumping", "Focus on low-impact exercises like swimming or cycling", "Always warm up properly before exercising", "Stretch your calves regularly", "Choose supportive footwear for all activities"],
>     "ar": ["تجنب الأنشطة عالية التأثير مثل الجري والقفز", "ركز على التمارين منخفضة التأثير مثل السباحة أو ركوب الدراجة", "قم دائمًا بالإحماء المناسب قبل التمرين", "مدّ عضلات الساق بانتظام", "اختر الأحذية الداعمة لجميع الأنشطة"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle calf stretches", "Ankle alphabet", "Towel stretches", "Low-impact cardio (swimming, cycling)"],
>       "exercises_ar": ["تمديدات العجينة اللطيفة", "أبجدية الكاحل", "تمديدات المنشفة", "التمارين القلبية منخفضة التأثير (السباحة، ركوب الدراجة)"],
>       "frequency_en": "3 times per week, 20-30 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Gentle calf strengthening exercises", "Balance exercises", "Low-impact cardio", "Upper body and core exercises"],
>       "exercises_ar": ["تمارين تقوية العجينة اللطيفة", "تمارين التوازن", "التمارين القلبية منخفضة التأثير", "تمارين الجزء العلوي من الجسم والجذع"],
>       "frequency_en": "3-4 times per week, 30-40 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Progressive calf strengthening", "Eccentric heel drops", "Low-impact running if pain-free", "Sport-specific movements"],
>       "exercises_ar": ["تقوية العجينة التدريجية", "خفض الكعب المركز", "الجري منخفض التأثير إذا كان خاليًا من الألم", "الحركات الخاصة بالرياضة"],
>       "frequency_en": "4 times per week, 45-60 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Calf Stretch",
>       "name_ar": "تمديد العجينة",
>       "instructions_en": "Stand facing a wall with one foot in front of the other. Keep your back leg straight and heel on the ground. Lean forward until you feel a stretch in your calf. Hold for 30 seconds. Repeat 3 times, 2-3 times daily.",
>       "instructions_ar": "قف مواجهًا للحائط مع وضع قدم واحدة أمام الأخرى. احتفظ بساقك الخلفية مستقيمة والكعب على الأرض. انحنِ إلى الأمام حتى تشعر بتمدد في عجينتك. استمر لمدة 30 ثانية. كرر 3 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Improves flexibility of the calf muscles and Achilles tendon",
>       "benefits_ar": "يحسن مرونة عضلات الساق ووتر الكعب"
>     },
>     {
>       "name_en": "Eccentric Heel Drops",
>       "name_ar": "خفض الكعب المركز",
>       "instructions_en": "Stand on a step with your heels hanging off the edge. Rise up on your toes, then slowly lower your heels below the step level. Perform 3 sets of 15 repetitions, 2 times daily.",
>       "instructions_ar": "قف على درجة مع تعليق كعبيك على الحافة. ارتفع على أصابع قدميك، ثم اخفض كعبيك ببطء تحت مستوى الدرجة. قم بأداء 3 مجموعات من 15 تكرارًا، مرتين يوميًا.",
>       "benefits_en": "Strengthens the Achilles tendon and helps remodel tendon tissue",
>       "benefits_ar": "يقوي وتر الكعب ويساعد في إعادة تشكيل نسيج الوتر"
>     },
>     {
>       "name_en": "Towel Stretch",
>       "name_ar": "تمديد المنشفة",
>       "instructions_en": "Sit with your legs extended. Loop a towel around the ball of your foot and gently pull back until you feel a stretch in your calf. Hold for 30 seconds. Repeat 3 times, 2-3 times daily.",
>       "instructions_ar": "اجلس مع رجليك ممدودتين. لف منشفة حول كرة قدمك واسحب بلطف إلى الخلف حتى تشعر بتمدد في عجينتك. استمر لمدة 30 ثانية. كرر 3 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Gently stretches the calf muscles and Achilles tendon",
>       "benefits_ar": "يمد عضلات الساق ووتر الكعب بلطف"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Rest and reduce activities that aggravate the condition", "Ice therapy to reduce inflammation", "Stretching and strengthening exercises", "Proper footwear and orthotics if needed", "Gradual return to activities"],
>     "ar": ["ارح وقلل الأنشطة التي تزيد الحالة سوءًا", "العلاج بالثلج لتقليل الالتهاب", "تمارين التمدد والتقوية", "الأحذية المناسبة والأقواس إذا لزم الأمر", "العودة التدريجية للأنشطة"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Achilles Tendinopathy",
>       "title_ar": "إدارة اعتلال وتر الكعب",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Exercise Therapy for Achilles Tendinopathy",
>       "title_ar": "العلاج بالتمرين لاعتلال وتر الكعب",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Eccentric Exercise for Achilles Tendon Rehabilitation",
>       "title_ar": "التمرين المركز لإعادة تأهيل وتر الكعب",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Lumbar Injury - إصابة القطنية":
> 
> ```json
> {
>   "title_en": "Lumbar Injury",
>   "title_ar": "إصابة القطنية",
>   "description_en": "Lumbar injury refers to damage or strain to the lower back area, specifically the five lumbar vertebrae (L1-L5) and surrounding muscles, ligaments, and nerves. Common causes include improper lifting, poor posture, sports injuries, and degenerative conditions.",
>   "description_ar": "تشير إصابة القطنية إلى التلف أو الإجهاد في منطقة أسفل الظهر، على وجه التحديد الفقرات القطنية الخمس (L1-L5) والعضلات والأربطة والأعصاب المحيطة. تشمل الأسباب الشائعة الرفع غير الصحيح ووضعية الجسم السيئة وإصابات الرياضات والحالات التنكسية.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Rest and avoid activities that worsen the pain", "Apply ice or heat to the affected area", "Maintain a comfortable position (often lying on your back with knees bent)", "Take over-the-counter pain relievers as needed", "Avoid prolonged sitting or standing"],
>       "ar": ["ارح وتجنب الأنشطة التي تزيد الألم سوءًا", "ضع الثلج أو الحرارة على المنطقة المصابة", "حافظ على وضع مريح (غالبًا الاستلقاء على الظهر مع ثني الركبتين)", "تناول مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة", "تجنب الجلوس أو الوقوف لفترات طويلة"]
>     },
>     "short_term_care": {
>       "en": ["Continue rest and pain management", "Begin gentle movement as tolerated", "Consider physical therapy if pain persists", "Practice good posture", "Use proper body mechanics for daily activities"],
>       "ar": ["استمر في الراحة وإدارة الألم", "ابدأ الحركة اللطيفة كما يمكن تحملها", "فكر في العلاج الطبيعي إذا استمر الألم", "مارس وضعية الجسم الجيدة", "استخدم ميكانيكا الجسم المناسبة للأنشطة اليومية"]
>     },
>     "long_term_care": {
>       "en": ["Incorporate regular core strengthening exercises", "Maintain good posture during all activities", "Use proper lifting techniques", "Continue with recommended exercises", "Consider ergonomic adjustments to your workspace"],
>       "ar": ["أدرج تمارين تقوية الجذع بانتظام", "حافظ على وضعية الجسم الجيدة خلال جميع الأنشطة", "استخدم تقنيات الرفع المناسبة", "استمر في التمارين الموصى بها", "فكر في التعديلات المريكية لمساحة عملك"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Magnesium",
>       "name_ar": "المغنيسيوم",
>       "dosage_en": "400-800 mg daily",
>       "dosage_ar": "400-800 مجم يوميًا",
>       "benefits_en": "Helps relax muscles and may reduce muscle spasms",
>       "benefits_ar": "يساعد على استرخاء العضلات وقد يقلل تقلصات العضلات"
>     },
>     {
>       "name_en": "Vitamin D",
>       "name_ar": "فيتامين د",
>       "dosage_en": "1000-2000 IU daily",
>       "dosage_ar": "1000-2000 وحدة دولية يوميًا",
>       "benefits_en": "Supports bone health and muscle function",
>       "benefits_ar": "يدعم صحة العظام ووظيفة العضلات"
>     },
>     {
>       "name_en": "Omega-3 Fatty Acids",
>       "name_ar": "الأحماض الدهنية أوميغا-3",
>       "dosage_en": "2-3 g daily",
>       "dosage_ar": "2-3 جم يوميًا",
>       "benefits_en": "Reduces inflammation throughout the body",
>       "benefits_ar": "يقلل الالتهاب في جميع أنحاء الجسم"
>     },
>     {
>       "name_en": "Turmeric (Curcumin)",
>       "name_ar": "الكركم (الكركمين)",
>       "dosage_en": "500-1000 mg 2-3 times daily",
>       "dosage_ar": "500-1000 مجم 2-3 مرات يوميًا",
>       "benefits_en": "Has anti-inflammatory properties that may help reduce pain",
>       "benefits_ar": "له خصائص مضادة للالتهاب قد تساعد في تقليل الألم"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May cause stomach irritation. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     },
>     {
>       "name_en": "Muscle Relaxants (Cyclobenzaprine, Methocarbamol)",
>       "name_ar": "مرخيات العضلات (سيكلوبنزابرين، ميثوكاربامول)",
>       "dosage_en": "As prescribed by physician",
>       "dosage_ar": "حسب وصفة الطبيب",
>       "benefits_en": "Relieves muscle spasms and associated pain",
>       "benefits_ar": "يخفف تشنجات العضلات والألم المصاحب لها",
>       "cautions_en": "May cause drowsiness. Avoid driving or operating heavy machinery while taking this medication.",
>       "cautions_ar": "قد يسبب النعاس. تجنب القيادة أو تشغيل الآلات الثقيلة أثناء تناول هذا الدواء."
>     },
>     {
>       "name_en": "Topical Pain Relievers",
>       "name_ar": "مسكنات الألم الموضعية",
>       "dosage_en": "Apply to affected area as directed",
>       "dosage_ar": "ضع على المنطقة المصابة حسب التوجيهات",
>       "benefits_en": "Provides localized pain relief with fewer systemic side effects",
>       "benefits_ar": "يوفر راحة من الألم موضعية مع آثار جانبية جهازية أقل",
>       "cautions_en": "Avoid applying to broken skin. May cause skin irritation.",
>       "cautions_ar": "تجنب وضعها على الجلد التالف. قد يسبب تهيج الجلد."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Devil's Claw",
>       "plant_name_ar": "مخلب الشيطان",
>       "recipe_en": "Take 500-1000 mg of standardized devil's claw extract 2-3 times daily.",
>       "recipe_ar": "تناول 500-1000 مجم من مستخلص مخلب الشيطان القياسي 2-3 مرات يوميًا.",
>       "benefits_en": "Has anti-inflammatory properties that may help reduce back pain",
>       "benefits_ar": "له خصائص مضادة للالتهاب قد تساعد في تقليل آلام الظهر"
>     },
>     {
>       "plant_name_en": "White Willow Bark",
>       "plant_name_ar": "لحاء الصفصاف الأبيض",
>       "recipe_en": "Steep 1-2 teaspoons of dried white willow bark in hot water for 10 minutes. Drink 1-2 cups daily.",
>       "recipe_ar": "انقع 1-2 ملاعق صغيرة من لحاء الصفصاف الأبيض المجفف في الماء الساخن لمدة 10 دقائق. اشرب 1-2 كوب يوميًا.",
>       "benefits_en": "Contains salicin, which has pain-relieving properties similar to aspirin",
>       "benefits_ar": "يحتوي على ساليسين، الذي له خصائص مسكنة للألم تشبه الأسبرين"
>     },
>     {
>       "plant_name_en": "Turmeric and Ginger Tea",
>       "plant_name_ar": "شاي الكركم والزنجبيل",
>       "recipe_en": "Boil 1 inch of fresh ginger root and 1 teaspoon of turmeric powder in 2 cups of water for 10 minutes. Strain and add honey to taste. Drink 1-2 cups daily.",
>       "recipe_ar": "اغلي 1 بوصة من جذر الزنجبيل الطازج وملعقة صغيرة من مسحوق الكركم في كوبين من الماء لمدة 10 دقائق. صفِ وأضف العسل حسب الرغبة. اشرب 1-2 كوب يوميًا.",
>       "benefits_en": "Both turmeric and ginger have anti-inflammatory properties that help reduce pain",
>       "benefits_ar": "كل من الكركم والزنجبيل لهما خصائص مضادة للالتهاب تساعد في تقليل الألم"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid exercises that cause pain or strain on the lower back", "Focus on core strengthening exercises", "Always warm up properly before exercising", "Use proper form and technique", "Consider working with a trainer experienced in back injuries"],
>     "ar": ["تجنب التمارين التي تسبب الألم أو الإجهاد على أسفل الظهر", "ركز على تمارين تقوية الجذع", "قم دائمًا بالإحماء المناسب قبل التمرين", "استخدم الشكل والتقنية الصحيحين", "فكر في العمل مع مدرب لديه خبرة في إصابات الظهر"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle pelvic tilts", "Cat-cow stretches", "Partial crunches", "Walking"],
>       "exercises_ar": ["إمالات الحوض اللطيفة", "تمارين القط والبقرة", "الكرنش الجزئي", "المشي"],
>       "frequency_en": "3 times per week, 20-30 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Bird-dog exercise", "Glute bridges", "Wall sits", "Low-impact cardio (swimming, cycling)"],
>       "exercises_ar": ["تمرين الطائر والكلب", "جسور الأليتين", "الجلوس على الحائط", "التمارين القلبية منخفضة التأثير (السباحة، ركوب الدراجة)"],
>       "frequency_en": "3-4 times per week, 30-40 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Plank variations", "Side planks", "Modified squats and lunges", "Resistance band exercises"],
>       "exercises_ar": ["مختلفات اللوح", "الألواح الجانبية", "القرفصاء والاندفاعات المعدلة", "تمارين حزام المقاومة"],
>       "frequency_en": "4 times per week, 45-60 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Pelvic Tilts",
>       "name_ar": "إمالات الحوض",
>       "instructions_en": "Lie on your back with knees bent and feet flat on the floor. Tighten your abdominal muscles and flatten your back against the floor. Hold for 5-10 seconds, then relax. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "استلقِ على ظهرك مع ثني الركبتين والقدمين مسطحة على الأرض. شد عضلات بطنك واجعل ظهرك مسطحًا على الأرض. استمر لمدة 5-10 ثوانٍ، ثم استرخِ. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Gently mobilizes the lumbar spine and strengthens core muscles",
>       "benefits_ar": "يحرك العمود الفقري القطني بلطف ويقوي عضلات الجذع"
>     },
>     {
>       "name_en": "Cat-Cow Stretch",
>       "name_ar": "تمرين القط والبقرة",
>       "instructions_en": "Start on your hands and knees. As you inhale, drop your belly and look up (cow position). As you exhale, round your spine and tuck your chin (cat position). Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "ابدأ على يديك وركبتيك. أثناء الشهيق، أخفض بطنك وانظر لأعلى (وضع البقرة). أثناء الزفير، استدير ظهرك وادخل ذقنك (وضع القط). كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Improves flexibility and mobility of the spine",
>       "benefits_ar": "يحسن مرونة وحركة العمود الفقري"
>     },
>     {
>       "name_en": "Bird-Dog Exercise",
>       "name_ar": "تمرين الطائر والكلب",
>       "instructions_en": "Start on your hands and knees. Extend your right arm forward and left leg back, keeping your back flat. Hold for 5-10 seconds, then return to start. Repeat with opposite arm and leg. Perform 10 repetitions on each side, 2-3 times daily.",
>       "instructions_ar": "ابدأ على يديك وركبتيك. مد ذراعك اليمنى للأمام وساقك اليسرى للخلف، مع الحفاظ على ظهرك مسطحًا. استمر لمدة 5-10 ثوانٍ، ثم عد إلى البداية. كرر مع الذراع والساق المعاكسين. قم بأداء 10 تكرارات على كل جانب، 2-3 مرات يوميًا.",
>       "benefits_en": "Strengthens core muscles and improves stability",
>       "benefits_ar": "يقوي عضلات الجذع ويحسن الاستقرار"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Rest and avoid aggravating activities initially", "Gradual progression of exercises as pain allows", "Focus on core strengthening and proper posture", "Ergonomic adjustments to daily activities", "Maintenance exercises to prevent recurrence"],
>     "ar": ["ارح وتجنب الأنشطة المزعجة في البداية", "التقدم التدريجي للتمارين كما يسمح الألم", "التركيز على تقوية الجذع ووضعية الجسم المناسبة", "التعديلات المريكية للأنشطة اليومية", "تمارين الصيانة لمنع التكرار"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Low Back Pain",
>       "title_ar": "إدارة آلام أسفل الظهر",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Exercise Therapy for Low Back Pain",
>       "title_ar": "العلاج بالتمرين لآلام أسفل الظهر",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Core Strengthening for Low Back Pain",
>       "title_ar": "تقوية الجذع لآلام أسفل الظهر",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Injury Neck Pain - آلام الرقبة":
> 
> ```json
> {
>   "title_en": "Neck Pain",
>   "title_ar": "آلام الرقبة",
>   "description_en": "Neck pain is a common complaint that can result from poor posture, muscle strain, injury, or underlying health conditions. It can cause stiffness, limited range of motion, and headaches.",
>   "description_ar": "آلام الرقبة هي شكوى شائعة يمكن أن تنجم عن وضعية الجسم السيئة وإجهاد العضلات والإصابة أو الحالات الصحية الكامنة. يمكن أن تسبب التصلب ومحدودية نطاق الحركة والصداع.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Rest and avoid activities that worsen the pain", "Apply ice or heat to the affected area", "Maintain good posture", "Use a supportive pillow when sleeping", "Take over-the-counter pain relievers as needed"],
>       "ar": ["ارح وتجنب الأنشطة التي تزيد الألم سوءًا", "ضع الثلج أو الحرارة على المنطقة المصابة", "حافظ على وضعية الجسم الجيدة", "استخدم وسادة داعمة عند النوم", "تناول مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة"]
>     },
>     "short_term_care": {
>       "en": ["Continue rest and pain management", "Begin gentle neck stretches as pain allows", "Consider physical therapy if pain persists", "Practice good ergonomics at work", "Avoid prolonged positions that strain the neck"],
>       "ar": ["استمر في الراحة وإدارة الألم", "ابدأ تمديدات الرقبة اللطيفة كما يسمح الألم", "فكر في العلاج الطبيعي إذا استمر الألم", "مارس علم المسكنات الجيد في العمل", "تجنب الوضعيات المطولة التي تجهد الرقبة"]
>     },
>     "long_term_care": {
>       "en": ["Incorporate regular neck and shoulder strengthening exercises", "Maintain good posture during all activities", "Use proper ergonomics at work and home", "Continue with recommended exercises", "Consider stress management techniques"],
>       "ar": ["أدرج تمارين تقوية الرقبة والكتف بانتظام", "حافظ على وضعية الجسم الجيدة خلال جميع الأنشطة", "استخدم علم المسكنات المناسب في العمل والمنزل", "استمر في التمارين الموصى بها", "فكر في تقنيات إدارة التوتر"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Magnesium",
>       "name_ar": "المغنيسيوم",
>       "dosage_en": "400-800 mg daily",
>       "dosage_ar": "400-800 مجم يوميًا",
>       "benefits_en": "Helps relax muscles and may reduce muscle tension",
>       "benefits_ar": "يساعد على استرخاء العضلات وقد يقلل توتر العضلات"
>     },
>     {
>       "name_en": "Omega-3 Fatty Acids",
>       "name_ar": "الأحماض الدهنية أوميغا-3",
>       "dosage_en": "2-3 g daily",
>       "dosage_ar": "2-3 جم يوميًا",
>       "benefits_en": "Reduces inflammation throughout the body",
>       "benefits_ar": "يقلل الالتهاب في جميع أنحاء الجسم"
>     },
>     {
>       "name_en": "Turmeric (Curcumin)",
>       "name_ar": "الكركم (الكركمين)",
>       "dosage_en": "500-1000 mg 2-3 times daily",
>       "dosage_ar": "500-1000 مجم 2-3 مرات يوميًا",
>       "benefits_en": "Has anti-inflammatory properties that may help reduce pain",
>       "benefits_ar": "له خصائص مضادة للالتهاب قد تساعد في تقليل الألم"
>     },
>     {
>       "name_en": "Vitamin D",
>       "name_ar": "فيتامين د",
>       "dosage_en": "1000-2000 IU daily",
>       "dosage_ar": "1000-2000 وحدة دولية يوميًا",
>       "benefits_en": "Supports muscle function and bone health",
>       "benefits_ar": "يدعم وظيفة العضلات وصحة العظام"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May cause stomach irritation. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     },
>     {
>       "name_en": "Muscle Relaxants (Cyclobenzaprine)",
>       "name_ar": "مرخيات العضلات (سيكلوبنزابرين)",
>       "dosage_en": "As prescribed by physician",
>       "dosage_ar": "حسب وصفة الطبيب",
>       "benefits_en": "Relieves muscle spasms and associated pain",
>       "benefits_ar": "يخفف تشنجات العضلات والألم المصاحب لها",
>       "cautions_en": "May cause drowsiness. Avoid driving or operating heavy machinery while taking this medication.",
>       "cautions_ar": "قد يسبب النعاس. تجنب القيادة أو تشغيل الآلات الثقيلة أثناء تناول هذا الدواء."
>     },
>     {
>       "name_en": "Topical Pain Relievers",
>       "name_ar": "مسكنات الألم الموضعية",
>       "dosage_en": "Apply to affected area as directed",
>       "dosage_ar": "ضع على المنطقة المصابة حسب التوجيهات",
>       "benefits_en": "Provides localized pain relief with fewer systemic side effects",
>       "benefits_ar": "يوفر راحة من الألم موضعية مع آثار جانبية جهازية أقل",
>       "cautions_en": "Avoid applying to broken skin. May cause skin irritation.",
>       "cautions_ar": "تجنب وضعها على الجلد التالف. قد يسبب تهيج الجلد."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Peppermint Oil",
>       "plant_name_ar": "زيت النعناع",
>       "recipe_en": "Dilute 2-3 drops of peppermint oil with a carrier oil (like coconut oil) and apply to the neck and shoulders. Alternatively, add a few drops to a warm bath.",
>       "recipe_ar": "خفف 2-3 قطرات من زيت النعناع مع زيت ناقل (مثل زيت جوز الهند) وضعه على الرقبة والكتفين. بدلاً من ذلك، أضف بضع قطرات إلى حمام دافئ.",
>       "benefits_en": "Has natural analgesic and muscle relaxant properties",
>       "benefits_ar": "له خصائص مسكنة طبيعية ومرخية للعضلات"
>     },
>     {
>       "plant_name_en": "Lavender Oil",
>       "plant_name_ar": "زيت اللافاندر",
>       "recipe_en": "Dilute 2-3 drops of lavender oil with a carrier oil and gently massage into the neck and shoulders. Alternatively, add a few drops to a warm bath or diffuser.",
>       "recipe_ar": "خفف 2-3 قطرات من زيت اللافاندر مع زيت ناقل ودلك بلطف في الرقبة والكتفين. بدلاً من ذلك، أضف بضع قطرات إلى حمام دافئ أو موزع.",
>       "benefits_en": "Has calming and pain-relieving properties",
>       "benefits_ar": "له خصائص مهدئة ومسكنة للألم"
>     },
>     {
>       "plant_name_en": "Ginger and Turmeric Tea",
>       "plant_name_ar": "شاي الزنجبيل والكركم",
>       "recipe_en": "Boil 1 inch of fresh ginger root and 1 teaspoon of turmeric powder in 2 cups of water for 10 minutes. Strain and add honey to taste. Drink 1-2 cups daily.",
>       "recipe_ar": "اغلي 1 بوصة من جذر الزنجبيل الطازج وملعقة صغيرة من مسحوق الكركم في كوبين من الماء لمدة 10 دقائق. صفِ وأضف العسل حسب الرغبة. اشرب 1-2 كوب يوميًا.",
>       "benefits_en": "Both ginger and turmeric have anti-inflammatory properties that help reduce pain",
>       "benefits_ar": "كل من الزنجبيل والكركم لهما خصائص مضادة للالتهاب تساعد في تقليل الألم"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid exercises that strain the neck", "Focus on exercises that strengthen the neck and upper back", "Always warm up properly before exercising", "Use proper form and technique", "Consider working with a trainer experienced in neck issues"],
>     "ar": ["تجنب التمارين التي تجهد الرقبة", "ركز على التمارين التي تقوي الرقبة والجزء العلوي من الظهر", "قم دائمًا بالإحماء المناسب قبل التمرين", "استخدم الشكل والتقنية الصحيحين", "فكر في العمل مع مدرب لديه خبرة في مشاكل الرقبة"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle neck stretches", "Shoulder rolls", "Chin tucks", "Upper back stretches"],
>       "exercises_ar": ["تمديدات الرقبة اللطيفة", "لفات الكتف", "سحب الذقن", "تمديدات الجزء العلوي من الظهر"],
>       "frequency_en": "3 times per week, 15-20 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 15-20 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Isometric neck exercises", "Shoulder blade squeezes", "Wall push-ups", "Resistance band exercises for upper back"],
>       "exercises_ar": ["تمارين الرقبة متساوية القياس", "ضغطات شفرة الكتف", "دفعات الحائط", "تمارين حزام المقاومة للجزء العلوي من الظهر"],
>       "frequency_en": "3-4 times per week, 20-30 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Progressive neck strengthening", "Upper body resistance training", "Core strengthening exercises", "Postural awareness exercises"],
>       "exercises_ar": ["تقوية الرقبة التدريجية", "تدريب المقاومة للجزء العلوي من الجسم", "تمارين تقوية الجذع", "تمارين الوعي الوضعي"],
>       "frequency_en": "4 times per week, 30-45 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 30-45 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Chin Tucks",
>       "name_ar": "سحب الذقن",
>       "instructions_en": "Sit or stand tall. Gently retract your chin, creating a double chin. Hold for 5-10 seconds, then relax. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "اجلس أو قف منتصبًا. اسحب ذقنك بلطف، مما يخلق ذقنًا مزدوجًا. استمر لمدة 5-10 ثوانٍ، ثم استرخِ. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Strengthens deep neck flexors and improves posture",
>       "benefits_ar": "يقوي مثنيات الرقبة العميقة ويحسن الوضعية"
>     },
>     {
>       "name_en": "Shoulder Rolls",
>       "name_ar": "لفات الكتف",
>       "instructions_en": "Sit or stand tall. Roll your shoulders up, back, and down in a smooth motion. Repeat 10 times forward and 10 times backward. Perform 2-3 times daily.",
>       "instructions_ar": "اجلس أو قف منتصبًا. لف كتفيك لأعلى وللخلف ولأسفل في حركة سلسة. كرر 10 مرات إلى الأمام و 10 مرات للخلف. قم بذلك 2-3 مرات يوميًا.",
>       "benefits_en": "Relieves tension in the neck and shoulders",
>       "benefits_ar": "يخفف التوتر في الرقبة والكتفين"
>     },
>     {
>       "name_en": "Neck Stretches",
>       "name_ar": "تمديدات الرقبة",
>       "instructions_en": "Sit or stand tall. Gently tilt your head to one side, bringing your ear toward your shoulder. Hold for 15-30 seconds, then return to center. Repeat on the other side. Also perform forward and backward gentle stretches. Perform 2-3 times daily.",
>       "instructions_ar": "اجلس أو قف منتصبًا. أمل رأسك بلطف إلى جانب واحد، مما يجلب أذنك نحو كتفك. استمر لمدة 15-30 ثانية، ثم عد إلى المركز. كرر على الجانب الآخر. أيضًا قم بأداء تمديدات لطيفة للأمام والخلف. قم بذلك 2-3 مرات يوميًا.",
>       "benefits_en": "Improves flexibility and reduces muscle tension",
>       "benefits_ar": "يحسن المرونة ويقلل توتر العضلات"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Rest and avoid aggravating activities initially", "Gradual progression of exercises as pain allows", "Focus on posture correction and ergonomics", "Stress management techniques", "Maintenance exercises to prevent recurrence"],
>     "ar": ["ارح وتجنب الأنشطة المزعجة في البداية", "التقدم التدريجي للتمارين كما يسمح الألم", "التركيز على تصحيح الوضعية وعلم المسكنات", "تقنيات إدارة التوتر", "تمارين الصيانة لمنع التكرار"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Neck Pain",
>       "title_ar": "إدارة آلام الرقبة",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Exercise Therapy for Neck Pain",
>       "title_ar": "العلاج بالتمرين لآلام الرقبة",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Ergonomics and Neck Pain",
>       "title_ar": "علم المسكنات وآلام الرقبة",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Shoulder Injuries - إصابات الكتف":
> 
> ```json
> {
>   "title_en": "Shoulder Injuries",
>   "title_ar": "إصابات الكتف",
>   "description_en": "Shoulder injuries encompass a range of conditions affecting the shoulder joint, including rotator cuff tears, impingement, dislocations, and separations. These injuries can cause pain, limited range of motion, and weakness.",
>   "description_ar": "تشمل إصابات الكتف مجموعة من الحالات التي تؤثر على مفصل الكتف، بما في ذلك تمزقات الكفة المدورة والاحتكاك والخلوع والانفصالات. يمكن أن تسبب هذه الإصابات الألم ومحدودية نطاق الحركة والضعف.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Rest the affected shoulder", "Apply ice to reduce swelling", "Immobilize the shoulder if necessary", "Use a sling for support if recommended", "Take over-the-counter pain relievers as needed"],
>       "ar": ["ارح الكتف المصاب", "ضع الثلج لتقليل التورم", "ثبّت الكتف إذا لزم الأمر", "استخدم حمالة للدعم إذا تم التوصية بذلك", "تناول مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة"]
>     },
>     "short_term_care": {
>       "en": ["Continue rest and ice therapy", "Begin gentle range of motion exercises when pain allows", "Use heat therapy to relax muscles", "Avoid activities that aggravate the condition", "Consider physical therapy if symptoms persist"],
>       "ar": ["استمر في الراحة والعلاج بالثلج", "ابدأ تمارين نطاق الحركة اللطيفة عندما يسمح الألم", "استخدم العلاج بالحرارة لاسترخاء العضلات", "تجنب الأنشطة التي تزيد الحالة سوءًا", "فكر في العلاج الطبيعي إذا استمرت الأعراض"]
>     },
>     "long_term_care": {
>       "en": ["Gradually return to activities", "Incorporate shoulder strengthening exercises", "Improve posture and body mechanics", "Modify activities to prevent re-injury", "Continue with maintenance exercises"],
>       "ar": ["عد تدريجيًا إلى الأنشطة", "أدرج تمارين تقوية الكتف", "حسن وضعية الجسم وميكانيكا الجسم", "عدل الأنشطة لمنع الإصابة مرة أخرى", "استمر في تمارين الصيانة"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Vitamin C",
>       "name_ar": "فيتامين سي",
>       "dosage_en": "1000 mg daily",
>       "dosage_ar": "1000 مجم يوميًا",
>       "benefits_en": "Supports collagen production for tissue repair",
>       "benefits_ar": "يدعم إنتاج الكولاجين لإصلاح الأنسجة"
>     },
>     {
>       "name_en": "Omega-3 Fatty Acids",
>       "name_ar": "الأحماض الدهنية أوميغا-3",
>       "dosage_en": "2-3 g daily",
>       "dosage_ar": "2-3 جم يوميًا",
>       "benefits_en": "Reduces inflammation throughout the body",
>       "benefits_ar": "يقلل الالتهاب في جميع أنحاء الجسم"
>     },
>     {
>       "name_en": "Glucosamine and Chondroitin",
>       "name_ar": "جلوكوزامين وكوندرويتين",
>       "dosage_en": "1500 mg glucosamine and 800-1200 mg chondroitin daily",
>       "dosage_ar": "1500 مجم جلوكوزامين و 800-1200 مجم كوندرويتين يوميًا",
>       "benefits_en": "Supports joint health and may reduce pain",
>       "benefits_ar": "يدعم صحة المفاصل وقد يقلل الألم"
>     },
>     {
>       "name_en": "Turmeric (Curcumin)",
>       "name_ar": "الكركم (الكركمين)",
>       "dosage_en": "500-1000 mg 2-3 times daily",
>       "dosage_ar": "500-1000 مجم 2-3 مرات يوميًا",
>       "benefits_en": "Has anti-inflammatory properties that may help reduce pain",
>       "benefits_ar": "له خصائص مضادة للالتهاب قد تساعد في تقليل الألم"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May cause stomach irritation. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     },
>     {
>       "name_en": "Topical NSAIDs",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية الموضعية",
>       "dosage_en": "Apply to affected area 3-4 times daily",
>       "dosage_ar": "ضع على المنطقة المصابة 3-4 مرات يوميًا",
>       "benefits_en": "Provides localized pain relief with fewer systemic side effects",
>       "benefits_ar": "يوفر راحة من الألم موضعية مع آثار جانبية جهازية أقل",
>       "cautions_en": "Avoid applying to broken skin. May cause skin irritation.",
>       "cautions_ar": "تجنب وضعها على الجلد التالف. قد يسبب تهيج الجلد."
>     },
>     {
>       "name_en": "Corticosteroid Injections",
>       "name_ar": "حقن الكورتيكوستيرويد",
>       "dosage_en": "As prescribed by physician",
>       "dosage_ar": "حسب وصفة الطبيب",
>       "benefits_en": "Provides powerful anti-inflammatory effects for severe cases",
>       "benefits_ar": "يوفر تأثيرات مضادة قوية للالتهاب للحالات الشديدة",
>       "cautions_en": "May weaken tendons with repeated use. Limited to 2-3 injections per year in the same area.",
>       "cautions_ar": "قد يضعف الأوتار مع الاستخدام المتكرر. يقتصر على 2-3 حقن سنويًا في نفس المنطقة."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Arnica",
>       "plant_name_ar": "الأرنيكا",
>       "recipe_en": "Apply arnica gel or cream to the affected area 2-3 times daily. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
>       "recipe_ar": "ضع جل أو كريم الأرنيكا على المنطقة المصابة 2-3 مرات يوميًا. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
>       "benefits_en": "Reduces inflammation, swelling, and bruising",
>       "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
>     },
>     {
>       "plant_name_en": "Comfrey",
>       "plant_name_ar": "القراص",
>       "recipe_en": "Make a poultice by crushing fresh comfrey leaves and applying directly to the affected area. Cover with a bandage and leave for 2-3 hours. Repeat 1-2 times daily.",
>       "recipe_ar": "اصنع ضمادة عن طريق سحق أوراق القراص الطازجة وتطبيقها مباشرة على المنطقة المصابة. غطها بضمادة واتركها لمدة 2-3 ساعات. كرر 1-2 مرات يوميًا.",
>       "benefits_en": "Contains allantoin which promotes cell growth and reduces inflammation",
>       "benefits_ar": "يحتوي على الألانتوين الذي يعزز نمو الخلايا ويقلل الالتهاب"
>     },
>     {
>       "plant_name_en": "Turmeric Paste",
>       "plant_name_ar": "عجينة الكركم",
>       "recipe_en": "Mix 1 teaspoon of turmeric powder with enough water to make a paste. Apply to the affected area and cover with a cloth. Leave for 30 minutes before rinsing. Repeat twice daily.",
>       "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع كمية كافية من الماء لصنع عجينة. ضعها على المنطقة المصابة وغطها بقطعة قماش. اتركها لمدة 30 دقيقة قبل الشطف. كرر مرتين يوميًا.",
>       "benefits_en": "Curcumin in turmeric has strong anti-inflammatory properties",
>       "benefits_ar": "الكركمين في الكركم له خصائص مضادة قوية للالتهاب"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid exercises that cause shoulder pain", "Focus on exercises that strengthen the rotator cuff and scapular muscles", "Always warm up properly before exercising", "Use proper form and technique", "Consider working with a physical therapist or trainer"],
>     "ar": ["تجنب التمارين التي تسبب ألم الكتف", "ركز على التمارين التي تقوي الكفة المدورة وعضلات الكتف", "قم دائمًا بالإحماء المناسب قبل التمرين", "استخدم الشكل والتقنية الصحيحين", "فكر في العمل مع أخصائي علاج طبيعي أو مدرب"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Pendulum exercises", "Gentle shoulder rolls", "Wall slides", "Isometric shoulder exercises"],
>       "exercises_ar": ["تمارين البندول", "لفات الكتف اللطيفة", "انزلاقات الحائط", "تمارين الكتف متساوية القياس"],
>       "frequency_en": "3 times per week, 20-30 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Resistance band exercises", "Scapular squeezes", "External rotation exercises", "Wall push-ups"],
>       "exercises_ar": ["تمارين حزام المقاومة", "ضغطات الكتف", "تمارين الدوران الخارجي", "دفعات الحائط"],
>       "frequency_en": "3-4 times per week, 30-40 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Progressive resistance training", "Shoulder press with light weights", "Modified rows", "Functional movements"],
>       "exercises_ar": ["تدريب المقاومة التدريجي", "ضغط الكتف بأوزان خفيفة", "الصفوف المعدلة", "الحركات الوظيفية"],
>       "frequency_en": "4 times per week, 45-60 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Pendulum Exercise",
>       "name_ar": "تمرين البندول",
>       "instructions_en": "Lean forward and let your affected arm hang down. Gently swing your arm in small circles, both clockwise and counterclockwise. Perform for 1-2 minutes, 2-3 times daily.",
>       "instructions_ar": "انحنِ إلى الأمام واترك ذراعك المصابة تتدلى لأسفل. اهز ذراعك بلطف في دوائر صغيرة، في اتجاه عقارب الساعة وعكس اتجاه عقارب الساعة. قم بذلك لمدة 1-2 دقيقة، 2-3 مرات يوميًا.",
>       "benefits_en": "Gently mobilizes the shoulder joint without strain",
>       "benefits_ar": "يحرك مفصل الكتف بلطف دون إجهاد"
>     },
>     {
>       "name_en": "Wall Slides",
>       "name_ar": "انزلاقات الحائط",
>       "instructions_en": "Stand with your back against a wall and arms at your sides. Slowly slide your arms up the wall as high as you can without pain. Hold for 5 seconds, then slowly lower. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "قف مع ظهرك مقابل الحائط وذراعيك على جانبيك. انزلق ببطء بذراعيك على الحائط لأعلى قدر الإمكان دون ألم. استمر لمدة 5 ثوانٍ، ثم اخفض ببطء. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Improves shoulder range of motion",
>       "benefits_ar": "يحسن نطاق حركة الكتف"
>     },
>     {
>       "name_en": "External Rotation",
>       "name_ar": "الدوران الخارجي",
>       "instructions_en": "Stand with your elbow bent at 90 degrees and close to your side. Hold a light resistance band in your hand. Rotate your forearm outward, keeping your elbow tucked in. Return slowly to starting position. Perform 3 sets of 10-15 repetitions, 2-3 times daily.",
>       "instructions_ar": "قف مع ثني مرفقك بزاوية 90 درجة وقريب من جانبك. امسك حزام مقاومة خفيف في يدك. لورم ساعدك للخارج، مع الحفاظ على مرفقك مثبتًا. عد ببطء إلى وضع البداية. قم بأداء 3 مجموعات من 10-15 تكرارًا، 2-3 مرات يوميًا.",
>       "benefits_en": "Strengthens the rotator cuff muscles",
>       "benefits_ar": "يقوي عضلات الكفة المدورة"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Rest and protect the injured shoulder initially", "Gradual progression through rehabilitation phases", "Focus on rotator cuff and scapular strengthening", "Improve posture and body mechanics", "Gradual return to activities and sports"],
>     "ar": ["ارح واحمِ الكتف المصاب في البداية", "التقدم التدريجي عبر مراحل إعادة التأهيل", "التركيز على تقوية الكفة المدورة والكتف", "حسن وضعية الجسم وميكانيكا الجسم", "العودة التدريجية للأنشطة والرياضات"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Shoulder Injuries",
>       "title_ar": "إدارة إصابات الكتف",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Rehabilitation for Shoulder Injuries",
>       "title_ar": "إعادة التأهيل لإصابات الكتف",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Exercise Therapy for Rotator Cuff Injuries",
>       "title_ar": "العلاج بالتمرين لإصابات الكفة المدورة",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Multiple fractures - الكسور المتعددة":
> 
> ```json
> {
>   "title_en": "Multiple Fractures",
>   "title_ar": "الكسور المتعددة",
>   "description_en": "Multiple fractures refer to two or more broken bones in the body, occurring either from a single traumatic event or from multiple injuries. This serious condition requires immediate medical attention and extensive rehabilitation.",
>   "description_ar": "تشير الكسور المتعددة إلى عظمين مكسورين أو أكثر في الجسم، تحدث إما من حدث صادم واحد أو من إصابات متعددة. تتطلب هذه الحالة الخطيرة عناية طبية فورية وإعادة تأهيل مكثفة.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Seek immediate emergency medical attention", "Immobilize the injured areas if possible", "Apply pressure to any bleeding wounds", "Keep the person warm and comfortable", "Do not attempt to move the person unless absolutely necessary"],
>       "ar": ["اطلب العناية الطبية الطارئة الفورية", "ثبّت المناطق المصابة إذا أمكن", "ضع الضغط على أي جروح نازفة", "حافظ على دفء وراحة الشخص", "لا تحاول تحريك الشخص إلا إذا كان ذلك ضروريًا تمامًا"]
>     },
>     "short_term_care": {
>       "en": ["Follow all medical advice and treatment plans", "Take prescribed medications as directed", "Attend all follow-up appointments", "Rest and allow bones to heal", "Begin physical therapy when recommended"],
>       "ar": ["اتبع جميع النصائح الطبية وخطط العلاج", "تناول الأدوية الموصوفة حسب التوجيهات", "حضر جميع مواعيد المتابعة", "ارح واسمح للعظام بالشفاء", "ابدأ العلاج الطبيعي عند التوصية"]
>     },
>     "long_term_care": {
>       "en": ["Continue with rehabilitation program", "Gradually increase activity levels", "Focus on strengthening exercises", "Maintain proper nutrition for bone health", "Follow up with healthcare providers regularly"],
>       "ar": ["استمر في برنامج إعادة التأهيل", "زد مستويات النشاط تدريجيًا", "ركز على تمارين التقوية", "حافظ على التغذية السليمة لصحة العظام", "تابع بانتظام مع مقدمي الرعاية الصحية"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Calcium",
>       "name_ar": "الكالسيوم",
>       "dosage_en": "1200-1500 mg daily",
>       "dosage_ar": "1200-1500 مجم يوميًا",
>       "benefits_en": "Essential for bone formation and healing",
>       "benefits_ar": "أساسي لتكوين العظام والشفاء"
>     },
>     {
>       "name_en": "Vitamin D",
>       "name_ar": "فيتامين د",
>       "dosage_en": "2000-4000 IU daily",
>       "dosage_ar": "2000-4000 وحدة دولية يوميًا",
>       "benefits_en": "Enhances calcium absorption and bone health",
>       "benefits_ar": "يعزز امتصاص الكالسيوم وصحة العظام"
>     },
>     {
>       "name_en": "Vitamin C",
>       "name_ar": "فيتامين سي",
>       "dosage_en": "1000-2000 mg daily",
>       "dosage_ar": "1000-2000 مجم يوميًا",
>       "benefits_en": "Supports collagen production for bone and tissue repair",
>       "benefits_ar": "يدعم إنتاج الكولاجين لإصلاح العظام والأنسجة"
>     },
>     {
>       "name_en": "Magnesium",
>       "name_ar": "المغنيسيوم",
>       "dosage_en": "400-800 mg daily",
>       "dosage_ar": "400-800 مجم يوميًا",
>       "benefits_en": "Supports bone mineralization and muscle function",
>       "benefits_ar": "يدعم تمعدن العظام ووظيفة العضلات"
>     },
>     {
>       "name_en": "Protein",
>       "name_ar": "البروتين",
>       "dosage_en": "1.5-2.0 g per kg of body weight daily",
>       "dosage_ar": "1.5-2.0 جم لكل كجم من وزن الجسم يوميًا",
>       "benefits_en": "Essential for tissue repair and bone healing",
>       "benefits_ar": "أساسي لإصلاح الأنسجة والشفاء من العظام"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "Pain Medications (Acetaminophen)",
>       "name_ar": "مسكنات الألم (باراسيتامول)",
>       "dosage_en": "As directed by physician",
>       "dosage_ar": "حسب توجيهات الطبيب",
>       "benefits_en": "Relieves pain without affecting bone healing",
>       "benefits_ar": "يخفف الألم دون التأثير على شفاء العظام",
>       "cautions_en": "Do not exceed recommended dosage. Avoid with liver disease or alcohol consumption.",
>       "cautions_ar": "لا تتجاوز الجرعة الموصى بها. تجنبه مع أمراض الكبد أو استهلاك الكحول."
>     },
>     {
>       "name_en": "Opioids (for severe pain)",
>       "name_ar": "الأفيونيات (للألم الشديد)",
>       "dosage_en": "As prescribed by physician",
>       "dosage_ar": "حسب وصفة الطبيب",
>       "benefits_en": "Provides strong pain relief for severe fractures",
>       "benefits_ar": "يوفر راحة قوية من الألم للكسور الشديدة",
>       "cautions_en": "Can cause drowsiness and constipation. Risk of dependence with long-term use. Take exactly as prescribed.",
>       "cautions_ar": "يمكن أن يسبب النعاس والإمساك. خطر الاعتماد مع الاستخدام طويل الأمد. تناول بالضبط كما هو موصوف."
>     },
>     {
>       "name_en": "Antibiotics (if infection is present or risk is high)",
>       "name_ar": "المضادات الحيوية (إذا كانت هناك عدوى أو كان الخطر مرتفعًا)",
>       "dosage_en": "As prescribed by physician",
>       "dosage_ar": "حسب وصفة الطبيب",
>       "benefits_en": "Treats or prevents infection",
>       "benefits_ar": "يعالج أو يمنع العدوى",
>       "cautions_en": "Take full course as prescribed even if symptoms improve. May cause side effects like digestive upset.",
>       "cautions_ar": "تناول الدورة الكاملة كما هو موصوف حتى لو تحسنت الأعراض. قد يسبب آثارًا جانبية مثل اضطراب الجهاز الهضمي."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Arnica",
>       "plant_name_ar": "الأرنيكا",
>       "recipe_en": "Apply arnica gel or cream to the area around fractures (not directly on open wounds) 2-3 times daily. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
>       "recipe_ar": "ضع جل أو كريم الأرنيكا على المنطقة حول الكسور (وليس مباشرة على الجروح المفتوحة) 2-3 مرات يوميًا. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
>       "benefits_en": "Reduces inflammation, swelling, and bruising",
>       "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
>     },
>     {
>       "plant_name_en": "Comfrey",
>       "plant_name_ar": "القراص",
>       "recipe_en": "Make a poultice by crushing fresh comfrey leaves and applying to the area around fractures (not on open wounds). Cover with a bandage and leave for 2-3 hours. Repeat 1-2 times daily.",
>       "recipe_ar": "اصنع ضمادة عن طريق سحق أوراق القراص الطازجة وتطبيقها على المنطقة حول الكسور (وليس على الجروح المفتوحة). غطها بضمادة واتركها لمدة 2-3 ساعات. كرر 1-2 مرات يوميًا.",
>       "benefits_en": "Contains allantoin which promotes bone healing",
>       "benefits_ar": "يحتوي على الألانتوين الذي يعزز شفاء العظام"
>     },
>     {
>       "plant_name_en": "Horsetail",
>       "plant_name_ar": "ذيل الحصان",
>       "recipe_en": "Steep 1-2 teaspoons of dried horsetail in hot water for 10 minutes. Drink 1 cup 2-3 times daily. Do not use for more than 6 weeks at a time.",
>       "recipe_ar": "انقع 1-2 ملاعق صغيرة من ذيل الحصان المجفف في الماء الساخن لمدة 10 دقائق. اشرب كوبًا واحدًا 2-3 مرات يوميًا. لا تستخدمه لأكثر من 6 أسابيع في المرة الواحدة.",
>       "benefits_en": "Contains silica which may support bone health",
>       "benefits_ar": "يحتوي على السيليكا الذي قد يدعم صحة العظام"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Follow medical advice regarding exercise restrictions", "Focus on exercises for non-injured areas during recovery", "Always warm up properly before exercising", "Use proper form and technique", "Work closely with a physical therapist during rehabilitation"],
>     "ar": ["اتبع النصيحة الطبية بشأن قيود التمرين", "ركز على تمارين المناطق غير المصابة أثناء التعافي", "قم دائمًا بالإحماء المناسب قبل التمرين", "استخدم الشكل والتقنية الصحيحين", "اعمل عن كثب مع أخصائي علاج طبيعي أثناء إعادة التأهيل"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Breathing exercises", "Isometric exercises for non-injured muscles", "Gentle range of motion for uninjured joints", "Mental visualization exercises"],
>       "exercises_ar": ["تمارين التنفس", "تمارين متساوية القياس للعضلات غير المصابة", "تمارين نطاق الحركة اللطيفة للمفاصل غير المصابة", "تمارين التصور الذهني"],
>       "frequency_en": "2-3 times per week, 10-15 minutes per session",
>       "frequency_ar": "2-3 مرات في الأسبوع، 10-15 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Light resistance training for non-injured areas", "Gentle stretching", "Balance exercises (if safe)", "Core stabilization exercises"],
>       "exercises_ar": ["تدريب المقاومة الخفيف للمناطق غير المصابة", "التمدد اللطيف", "تمارين التوازن (إذا كان آمنًا)", "تمارين استقرار الجذع"],
>       "frequency_en": "3 times per week, 20-30 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Progressive exercises for healing fractures as approved", "Low-impact cardio", "Functional movements", "Sport-specific movements (modified)"],
>       "exercises_ar": ["تمارين تدريجية للكسور التي تلتئم كما تمت الموافقة عليها", "التمارين القلبية منخفضة التأثير", "الحركات الوظيفية", "الحركات الخاصة بالرياضة (معدلة)"],
>       "frequency_en": "3-4 times per week, 30-45 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 30-45 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Gentle Range of Motion",
>       "name_ar": "نطاق الحركة اللطيف",
>       "instructions_en": "After medical clearance, gently move joints near the healing fractures as approved. Perform 5-10 repetitions, 2-3 times daily.",
>       "instructions_ar": "بعد الموافقة الطبية، حرك المفاصل بالقرب من الكسور التي تلتئم بلطف كما تمت الموافقة عليها. قم بأداء 5-10 تكرارات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains joint mobility and prevents stiffness",
>       "benefits_ar": "يحافظ على حركة المفصل ويمنع التصلب"
>     },
>     {
>       "name_en": "Isometric Exercises",
>       "name_ar": "تمارين متساوية القياس",
>       "instructions_en": "Tighten muscles around the healing area without moving the joints. Hold for 5-10 seconds, then relax. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "شد العضلات حول منطقة الشفاء دون تحريك المفاصل. استمر لمدة 5-10 ثوانٍ، ثم استرخِ. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains muscle strength without stressing healing bones",
>       "benefits_ar": "يحافظ على قوة العضلات دون إجهاد العظام التي تلتئم"
>     },
>     {
>       "name_en": "Weight-Bearing Progression",
>       "name_ar": "التقدم في تحمل الوزن",
>       "instructions_en": "Gradually increase weight on healing bones as approved by your healthcare provider. Start with partial weight-bearing and progress to full weight-bearing as healing allows. Follow specific guidelines provided by your medical team.",
>       "instructions_ar": "زد الوزن على العظام التي تلتئم تدريجيًا كما وافق مقدم الرعاية الصحية. ابدأ بتحمل الوزن الجزئي وتقدم إلى تحمل الوزن الكامل كما يسمح الشفاء. اتبع الإرشادات المحددة التي قدمها فريقك الطبي.",
>       "benefits_en": "Stimulates bone healing and rebuilds strength",
>       "benefits_ar": "يحفز شفاء العظام ويعيد بناء القوة"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Follow all medical advice and treatment plans", "Attend all physical therapy sessions", "Gradually progress through rehabilitation phases", "Focus on nutrition for bone healing", "Psychological support for coping with multiple injuries"],
>     "ar": ["اتبع جميع النصائح الطبية وخطط العلاج", "حضر جميع جلسات العلاج الطبيعي", "تقدم تدريجيًا عبر مراحل إعادة التأهيل", "التركيز على التغذية لشفاء العظام", "الدعم النفسي للتعامل مع إصابات متعددة"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Multiple Fractures",
>       "title_ar": "إدارة الكسور المتعددة",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Rehabilitation After Multiple Fractures",
>       "title_ar": "إعادة التأهيل بعد الكسور المتعددة",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Nutrition for Bone Healing",
>       "title_ar": "التغذية لشفاء العظام",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Stress Fractures - كسور الإجهاد":
> 
> ```json
> {
>   "title_en": "Stress Fractures",
>   "title_ar": "كسور الإجهاد",
>   "description_en": "Stress fractures are tiny cracks in a bone, often caused by repetitive force or overuse. Common in athletes and military recruits, they typically occur in weight-bearing bones of the lower leg and foot.",
>   "description_ar": "كسور الإجهاد هي شقوق صغيرة في العظام، غالبًا ما تسببها القوة المتكررة أو الإفراط في الاستخدام. شائعة في الرياضيين والمجندين العسكريين، تحدث عادة في عظام تحمل الوزن في الساق السفلية والقدم.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Rest and avoid activities that cause pain", "Apply ice to reduce swelling", "Elevate the affected limb", "Use over-the-counter pain relievers as needed", "Seek medical evaluation for proper diagnosis"],
>       "ar": ["ارح وتجنب الأنشطة التي تسبب الألم", "ضع الثلج لتقليل التورم", "ارفع الطرف المصاب", "تناول مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة", "اطلب التقييم الطبي للتشخيص الصحيح"]
>     },
>     "short_term_care": {
>       "en": ["Follow medical advice for activity modification", "Use crutches or walking boot if recommended", "Continue rest and ice therapy", "Consider bone-stimulating treatments if prescribed", "Maintain nutrition for bone health"],
>       "ar": ["اتبع النصيحة الطبية لتعديل النشاط", "استخدم العكازات أو حذاء المشي إذا تم التوصية بذلك", "استمر في الراحة والعلاج بالثلج", "فكر في علاجات تحفيز العظام إذا تم وصفها", "حافظ على التغذية لصحة العظام"]
>     },
>     "long_term_care": {
>       "en": ["Gradually return to activities as healing allows", "Modify training techniques to prevent recurrence", "Ensure proper footwear and equipment", "Address any biomechanical issues", "Continue with strengthening exercises"],
>       "ar": ["عد تدريجيًا إلى الأنشطة كما يسمح الشفاء", "عدل تقنيات التدريب لمنع التكرار", "تأكد من الأحذية والمعدات المناسبة", "عالج أي مشاكل ميكانيكية حيوية", "استمر في تمارين التقوية"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Calcium",
>       "name_ar": "الكالسيوم",
>       "dosage_en": "1200-1500 mg daily",
>       "dosage_ar": "1200-1500 مجم يوميًا",
>       "benefits_en": "Essential for bone formation and healing",
>       "benefits_ar": "أساسي لتكوين العظام والشفاء"
>     },
>     {
>       "name_en": "Vitamin D",
>       "name_ar": "فيتامين د",
>       "dosage_en": "2000-4000 IU daily",
>       "dosage_ar": "2000-4000 وحدة دولية يوميًا",
>       "benefits_en": "Enhances calcium absorption and bone health",
>       "benefits_ar": "يعزز امتصاص الكالسيوم وصحة العظام"
>     },
>     {
>       "name_en": "Vitamin K",
>       "name_ar": "فيتامين ك",
>       "dosage_en": "90-120 mcg daily",
>       "dosage_ar": "90-120 ميكروغرام يوميًا",
>       "benefits_en": "Supports bone mineralization and calcium binding",
>       "benefits_ar": "يدعم تمعدن العظام وارتباط الكالسيوم"
>     },
>     {
>       "name_en": "Magnesium",
>       "name_ar": "المغنيسيوم",
>       "dosage_en": "400-800 mg daily",
>       "dosage_ar": "400-800 مجم يوميًا",
>       "benefits_en": "Supports bone mineralization and muscle function",
>       "benefits_ar": "يدعم تمعدن العظام ووظيفة العضلات"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May interfere with bone healing if used long-term. Use sparingly and only as needed for pain relief.",
>       "cautions_ar": "قد يتداخل مع شفاء العظام إذا تم استخدامه على المدى الطويل. استخدمه باعتدال وفقط حسب الحاجة لتخفيف الألم."
>     },
>     {
>       "name_en": "Acetaminophen",
>       "name_ar": "باراسيتامول",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Relieves pain without affecting bone healing",
>       "benefits_ar": "يخفف الألم دون التأثير على شفاء العظام",
>       "cautions_en": "Do not exceed recommended dosage. Avoid with liver disease or alcohol consumption.",
>       "cautions_ar": "لا تتجاوز الجرعة الموصى بها. تجنبه مع أمراض الكبد أو استهلاك الكحول."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Comfrey",
>       "plant_name_ar": "القراص",
>       "recipe_en": "Make a poultice by crushing fresh comfrey leaves and applying to the area around the stress fracture. Cover with a bandage and leave for 2-3 hours. Repeat 1-2 times daily.",
>       "recipe_ar": "اصنع ضمادة عن طريق سحق أوراق القراص الطازجة وتطبيقها على المنطقة حول كسر الإجهاد. غطها بضمادة واتركها لمدة 2-3 ساعات. كرر 1-2 مرات يوميًا.",
>       "benefits_en": "Contains allantoin which promotes bone healing",
>       "benefits_ar": "يحتوي على الألانتوين الذي يعزز شفاء العظام"
>     },
>     {
>       "plant_name_en": "Horsetail",
>       "plant_name_ar": "ذيل الحصان",
>       "recipe_en": "Steep 1-2 teaspoons of dried horsetail in hot water for 10 minutes. Drink 1 cup 2-3 times daily. Do not use for more than 6 weeks at a time.",
>       "recipe_ar": "انقع 1-2 ملاعق صغيرة من ذيل الحصان المجفف في الماء الساخن لمدة 10 دقائق. اشرب كوبًا واحدًا 2-3 مرات يوميًا. لا تستخدمه لأكثر من 6 أسابيع في المرة الواحدة.",
>       "benefits_en": "Contains silica which may support bone health",
>       "benefits_ar": "يحتوي على السيليكا الذي قد يدعم صحة العظام"
>     },
>     {
>       "plant_name_en": "Calcium-Rich Smoothie",
>       "plant_name_ar": "سموذي غني بالكالسيوم",
>       "recipe_en": "Blend 1 cup of fortified almond milk, 1/2 cup Greek yogurt, 1 cup kale, 1/2 banana, and 1 tablespoon chia seeds. Drink once daily.",
>       "recipe_ar": "اخلط كوبًا واحدًا من حليب اللوز المدعم، ونصف كوب من الزبادي اليوناني، وكوبًا واحدًا من الكرنب، ونصف موزة، وملعقة كبيرة من بذور الشيا. اشربه مرة واحدة يوميًا.",
>       "benefits_en": "Provides calcium and other nutrients essential for bone healing",
>       "benefits_ar": "يوفر الكالسيوم والمغذيات الأخرى الأساسية لشفاء العظام"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid high-impact activities until fully healed", "Focus on low-impact cross-training activities", "Always warm up properly before exercising", "Use proper footwear for your activity", "Gradually increase training intensity and duration"],
>     "ar": ["تجنب الأنشطة عالية التأثير حتى الشفاء التام", "ركز على أنشطة التدريب المتقاطع منخفضة التأثير", "قم دائمًا بالإحماء المناسب قبل التمرين", "استخدم الأحذية المناسبة لنشاطك", "زد شدة التدريب ومدته تدريجيًا"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Non-weight bearing cardio (swimming, upper body ergometer)", "Upper body strength training", "Core exercises", "Flexibility exercises for uninjured areas"],
>       "exercises_ar": ["التمارين القلبية غير حاملة الوزن (السباحة، جهاز الجزء العلوي من الجسم)", "تدريب القوة للجزء العلوي من الجسم", "تمارين الجذع", "تمارين المرونة للمناطق غير المصابة"],
>       "frequency_en": "3 times per week, 20-30 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Low-impact weight-bearing activities as approved", "Resistance training for uninjured areas", "Balance exercises", "Gentle stretching of the injured area"],
>       "exercises_ar": ["أنشطة تحمل الوزن منخفضة التأثير كما تمت الموافقة عليها", "تدريب المقاومة للمناطق غير المصابة", "تمارين التوازن", "تمديدات لطيفة للمنطقة المصابة"],
>       "frequency_en": "3-4 times per week, 30-40 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Gradual return to sport-specific activities", "Progressive resistance training", "Functional exercises", "Plyometric exercises (if appropriate)"],
>       "exercises_ar": ["العودة التدريجية إلى الأنشطة الخاصة بالرياضة", "تدريب المقاومة التدريجي", "التمارين الوظيفية", "تمارين البلايومتريك (إذا كان ذلك مناسبًا)"],
>       "frequency_en": "4 times per week, 45-60 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Gradual Weight-Bearing",
>       "name_ar": "تحمل الوزن التدريجي",
>       "instructions_en": "As approved by your healthcare provider, gradually increase weight on the injured limb. Start with partial weight-bearing using crutches for support, then progress to full weight-bearing as healing allows. Follow specific guidelines provided by your medical team.",
>       "instructions_ar": "كما وافق مقدم الرعاية الصحية، زد الوزن على الطرف المصاب تدريجيًا. ابدأ بتحمل الوزن الجزئي باستخدام العكازات للدعم، ثم تقدم إلى تحمل الوزن الكامل كما يسمح الشفاء. اتبع الإرشادات المحددة التي قدمها فريقك الطبي.",
>       "benefits_en": "Stimulates bone healing and rebuilds strength",
>       "benefits_ar": "يحفز شفاء العظام ويعيد بناء القوة"
>     },
>     {
>       "name_en": "Pool Therapy",
>       "name_ar": "العلاج في حمام السباحة",
>       "instructions_en": "Perform gentle exercises in a pool. The water provides support and resistance while reducing stress on the healing bone. Start with 10-15 minutes and gradually increase to 30 minutes, 2-3 times weekly.",
>       "instructions_ar": "قم بأداء تمارين لطيفة في حمام سباحة. يوفر الماء الدعم والمقاومة مع تقليل الضغط على العظام التي تلتئم. ابدأ بـ 10-15 دقيقة وزد تدريجيًا إلى 30 دقيقة، 2-3 مرات أسبوعيًا.",
>       "benefits_en": "Allows movement with minimal stress on the healing bone",
>       "benefits_ar": "يسمح بالحركة بأقل قدر من الإجهاد على العظام التي تلتئم"
>     },
>     {
>       "name_en": "Isometric Exercises",
>       "name_ar": "تمارين متساوية القياس",
>       "instructions_en": "Tighten muscles around the injured area without moving the joints. Hold for 5-10 seconds, then relax. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "شد العضلات حول المنطقة المصابة دون تحريك المفاصل. استمر لمدة 5-10 ثوانٍ، ثم استرخِ. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains muscle strength without stressing the healing bone",
>       "benefits_ar": "يحافظ على قوة العضلات دون إجهاد العظام التي تلتئم"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Rest and avoid aggravating activities initially", "Gradual progression of weight-bearing as healing allows", "Address any biomechanical issues that may have contributed to the injury", "Proper footwear and equipment", "Gradual return to sports and activities"],
>     "ar": ["ارح وتجنب الأنشطة المزعجة في البداية", "التقدم التدريجي لتحمل الوزن كما يسمح الشفاء", "عالج أي مشاكل ميكانيكية حيوية قد تكون ساهمت في الإصابة", "الأحذية والمعدات المناسبة", "العودة التدريجية للرياضات والأنشطة"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Stress Fractures",
>       "title_ar": "إدارة كسور الإجهاد",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Rehabilitation After Stress Fractures",
>       "title_ar": "إعادة التأهيل بعد كسور الإجهاد",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Prevention of Stress Fractures in Athletes",
>       "title_ar": "الوقاية من كسور الإجهاد في الرياضيين",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Bone Contusion - كدمة العظام":
> 
> ```json
> {
>   "title_en": "Bone Contusion",
>   "title_ar": "كدمة العظام",
>   "description_en": "A bone contusion, or bone bruise, is a traumatic injury to a bone that is less severe than a fracture. It causes bleeding and swelling inside the bone, resulting in pain and tenderness.",
>   "description_ar": "كدمة العظام، أو الكدمة العظمية، هي إصابة صادمة للعظام أقل شدة من الكسر. تسبب نزيفًا وتورمًا داخل العظم، مما يؤدي إلى الألم والألم الحساس.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Rest the affected area", "Apply ice to reduce swelling", "Elevate the injured limb if possible", "Use over-the-counter pain relievers as needed", "Avoid activities that cause pain"],
>       "ar": ["ارح المنطقة المصابة", "ضع الثلج لتقليل التورم", "ارفع الطرف المصاب إذا أمكن", "تناول مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة", "تجنب الأنشطة التي تسبب الألم"]
>     },
>     "short_term_care": {
>       "en": ["Continue rest and ice therapy", "Use compression if appropriate", "Limit weight-bearing activities if lower extremity is affected", "Consider using crutches if recommended", "Follow up with healthcare provider if pain persists"],
>       "ar": ["استمر في الراحة والعلاج بالثلج", "استخدم الضغط إذا كان ذلك مناسبًا", "قلل أنشطة تحمل الوزن إذا تأثر الطرف السفلي", "فكر في استخدام العكازات إذا تم التوصية بذلك", "تابع مع مقدم الرعاية الصحية إذا استمر الألم"]
>     },
>     "long_term_care": {
>       "en": ["Gradually return to activities as pain allows", "Continue with recommended exercises", "Use protective gear during sports if needed", "Maintain proper nutrition for bone health", "Follow up with healthcare provider for monitoring"],
>       "ar": ["عد تدريجيًا إلى الأنشطة كما يسمح الألم", "استمر في التمارين الموصى بها", "استخدم المعدات الواقية خلال الرياضة إذا لزم الأمر", "حافظ على التغذية السليمة لصحة العظام", "تابع مع مقدم الرعاية الصحية للمراقبة"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Vitamin C",
>       "name_ar": "فيتامين سي",
>       "dosage_en": "1000 mg daily",
>       "dosage_ar": "1000 مجم يوميًا",
>       "benefits_en": "Supports collagen production for tissue repair",
>       "benefits_ar": "يدعم إنتاج الكولاجين لإصلاح الأنسجة"
>     },
>     {
>       "name_en": "Calcium and Vitamin D",
>       "name_ar": "الكالسيوم وفيتامين د",
>       "dosage_en": "Calcium: 1000-1200 mg daily; Vitamin D: 1000-2000 IU daily",
>       "dosage_ar": "الكالسيوم: 1000-1200 مجم يوميًا؛ فيتامين د: 1000-2000 وحدة دولية يوميًا",
>       "benefits_en": "Supports bone health and healing",
>       "benefits_ar": "يدعم صحة العظام والشفاء"
>     },
>     {
>       "name_en": "Magnesium",
>       "name_ar": "المغنيسيوم",
>       "dosage_en": "400-800 mg daily",
>       "dosage_ar": "400-800 مجم يوميًا",
>       "benefits_en": "Supports bone mineralization and muscle function",
>       "benefits_ar": "يدعم تمعدن العظام ووظيفة العضلات"
>     },
>     {
>       "name_en": "Vitamin K",
>       "name_ar": "فيتامين ك",
>       "dosage_en": "90-120 mcg daily",
>       "dosage_ar": "90-120 ميكروغرام يوميًا",
>       "benefits_en": "Supports bone mineralization and calcium binding",
>       "benefits_ar": "يدعم تمعدن العظام وارتباط الكالسيوم"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May cause stomach irritation. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     },
>     {
>       "name_en": "Acetaminophen",
>       "name_ar": "باراسيتامول",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Relieves pain without affecting bone healing",
>       "benefits_ar": "يخفف الألم دون التأثير على شفاء العظام",
>       "cautions_en": "Do not exceed recommended dosage. Avoid with liver disease or alcohol consumption.",
>       "cautions_ar": "لا تتجاوز الجرعة الموصى بها. تجنبه مع أمراض الكبد أو استهلاك الكحول."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Arnica",
>       "plant_name_ar": "الأرنيكا",
>       "recipe_en": "Apply arnica gel or cream to the affected area 2-3 times daily. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
>       "recipe_ar": "ضع جل أو كريم الأرنيكا على المنطقة المصابة 2-3 مرات يوميًا. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
>       "benefits_en": "Reduces inflammation, swelling, and bruising",
>       "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
>     },
>     {
>       "plant_name_en": "Comfrey",
>       "plant_name_ar": "القراص",
>       "recipe_en": "Make a poultice by crushing fresh comfrey leaves and applying directly to the bruised area. Cover with a bandage and leave for 2-3 hours. Repeat 1-2 times daily.",
>       "recipe_ar": "اصنع ضمادة عن طريق سحق أوراق القراص الطازجة وتطبيقها مباشرة على المنطقة المكتومة. غطها بضمادة واتركها لمدة 2-3 ساعات. كرر 1-2 مرات يوميًا.",
>       "benefits_en": "Contains allantoin which promotes cell growth and reduces inflammation",
>       "benefits_ar": "يحتوي على الألانتوين الذي يعزز نمو الخلايا ويقلل الالتهاب"
>     },
>     {
>       "plant_name_en": "Turmeric",
>       "plant_name_ar": "الكركم",
>       "recipe_en": "Mix 1 teaspoon of turmeric powder with enough water to make a paste. Apply to the bruised area and cover with a bandage. Leave for 30 minutes before rinsing. Repeat twice daily.",
>       "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع كمية كافية من الماء لصنع عجينة. ضعها على المنطقة المكتومة وغطها بضمادة. اتركها لمدة 30 دقيقة قبل الشطف. كرر مرتين يوميًا.",
>       "benefits_en": "Curcumin in turmeric has strong anti-inflammatory properties",
>       "benefits_ar": "الكركمين في الكركم له خصائص مضادة قوية للالتهاب"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid activities that cause pain to the affected area", "Focus on exercises for other body parts", "Always warm up properly before exercising", "Use proper form and technique", "Consider working with a trainer to modify your workout routine"],
>     "ar": ["تجنب الأنشطة التي تسبب الألم للمنطقة المصابة", "ركز على تمارين أجزاء الجسم الأخرى", "قم دائمًا بالإحماء المناسب قبل التمرين", "استخدم الشكل والتقنية الصحيحين", "فكر في العمل مع مدرب لتعديل روتين التمرين الخاص بك"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle range of motion exercises", "Low-impact cardio (swimming, cycling if no pain)", "Core stabilization exercises", "Upper body exercises if lower body is injured (or vice versa)"],
>       "exercises_ar": ["تمارين نطاق الحركة اللطيفة", "التمارين القلبية منخفضة التأثير (السباحة، ركوب الدراجة إذا لم يكن هناك ألم)", "تمارين استقرار الجذع", "تمارين الجزء العلوي من الجسم إذا كان الجزء السفلي مصابًا (أو العكس)"],
>       "frequency_en": "3 times per week, 20-30 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Light resistance training for unaffected areas", "Gentle stretching of the injured area", "Low-impact cardio", "Balance exercises"],
>       "exercises_ar": ["تدريب المقاومة الخفيف للمناطق غير المتأثرة", "تمارين التمدد اللطيفة للمنطقة المصابة", "التمارين القلبية منخفضة التأثير", "تمارين التوازن"],
>       "frequency_en": "3-4 times per week, 30-40 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Gradual reintroduction of exercises for the injured area", "Moderate resistance training", "Sport-specific movements", "Functional exercises"],
>       "exercises_ar": ["إعادة تدريجية للتمارين للمنطقة المصابة", "تدريب المقاومة المعتدل", "الحركات الخاصة بالرياضة", "التمارين الوظيفية"],
>       "frequency_en": "4 times per week, 45-60 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Gentle Range of Motion",
>       "name_ar": "نطاق الحركة اللطيف",
>       "instructions_en": "Slowly move the injured joint through its pain-free range of motion. Perform 10 repetitions, 2-3 times daily.",
>       "instructions_ar": "حرك المفصل المصاب ببطء عبر نطاق حركته الخالي من الألم. قم بأداء 10 تكرارات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains joint mobility and prevents stiffness",
>       "benefits_ar": "يحافظ على حركة المفصل ويمنع التصلب"
>     },
>     {
>       "name_en": "Isometric Exercises",
>       "name_ar": "تمارين متساوية القياس",
>       "instructions_en": "Tighten the muscles around the injured area without moving the joint. Hold for 5-10 seconds, then relax. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "شد العضلات حول المنطقة المصابة دون تحريك المفصل. استمر لمدة 5-10 ثوانٍ، ثم استرخِ. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Maintains muscle strength without stressing the injury",
>       "benefits_ar": "يحافظ على قوة العضلات دون إجهاد الإصابة"
>     },
>     {
>       "name_en": "Gradual Weight-Bearing",
>       "name_ar": "تحمل الوزن التدريجي",
>       "instructions_en": "As healing progresses, gradually increase weight on the injured limb. Start with partial weight-bearing and progress to full weight-bearing as pain allows. Follow specific guidelines provided by your healthcare provider.",
>       "instructions_ar": "مع تقدم الشفاء، زد الوزن على الطرف المصاب تدريجيًا. ابدأ بتحمل الوزن الجزئي وتقدم إلى تحمل الوزن الكامل كما يسمح الألم. اتبع الإرشادات المحددة التي قدمها مقدم الرعاية الصحية.",
>       "benefits_en": "Promotes healing and rebuilds strength",
>       "benefits_ar": "يعزز الشفاء ويعيد بناء القوة"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Rest and protect the injured area initially", "Gradual progression of activities as healing allows", "Focus on maintaining overall fitness", "Proper nutrition for bone health", "Gradual return to sports and activities"],
>     "ar": ["ارح واحمِ المنطقة المصابة في البداية", "التقدم التدريجي للأنشطة كما يسمح الشفاء", "التركيز على الحفاظ على اللياقة العامة", "التغذية السليمة لصحة العظام", "العودة التدريجية للرياضات والأنشطة"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Bone Contusions",
>       "title_ar": "إدارة كدمات العظام",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Rehabilitation After Bone Contusion",
>       "title_ar": "إعادة التأهيل بعد كدمة العظام",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Nutrition for Bone Health",
>       "title_ar": "التغذية لصحة العظام",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Broken Collarbone - الترقوة المكسورة":
> 
> ```json
> {
>   "title_en": "Broken Collarbone",
>   "title_ar": "الترقوة المكسورة",
>   "description_en": "A broken collarbone (clavicle fracture) is a common injury, especially in children and athletes. It occurs when there's a break in the clavicle bone, which connects the shoulder to the sternum.",
>   "description_ar": "الترقوة المكسورة (كسر الترقوة) هي إصابة شائعة، خاصة في الأطفال والرياضيين. تحدث عندما يكون هناك كسر في عظم الترقوة، الذي يربط الكتف بعظم القص.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Immobilize the arm and shoulder", "Apply ice to reduce swelling", "Support the arm with a sling", "Seek immediate medical attention", "Take over-the-counter pain relievers as needed"],
>       "ar": ["ثبّت الذراع والكتف", "ضع الثلج لتقليل التورم", "ادعم الذراع بحمالة", "اطلب العناية الطبية الفورية", "تناول مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة"]
>     },
>     "short_term_care": {
>       "en": ["Follow medical advice for treatment (sling, figure-eight brace, or surgery)", "Continue rest and ice therapy", "Take prescribed medications", "Avoid lifting or pushing with the injured arm", "Attend follow-up appointments"],
>       "ar": ["اتبع النصيحة الطبية للعلاج (حمالة، دعامة على شكل ثمانية، أو جراحة)", "استمر في الراحة والعلاج بالثلج", "تناول الأدوية الموصوفة", "تجنب الرفع أو الدفع بالذراع المصابة", "حضر مواعيد المتابعة"]
>     },
>     "long_term_care": {
>       "en": ["Begin gentle range of motion exercises when approved", "Gradually increase activity levels", "Follow physical therapy recommendations", "Avoid high-impact activities until fully healed", "Continue with strengthening exercises"],
>       "ar": ["ابدأ تمارين نطاق الحركة اللطيفة عند الموافقة", "زد مستويات النشاط تدريجيًا", "اتبع توصيات العلاج الطبيعي", "تجنب الأنشطة عالية التأثير حتى الشفاء التام", "استمر في تمارين التقوية"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Calcium",
>       "name_ar": "الكالسيوم",
>       "dosage_en": "1200-1500 mg daily",
>       "dosage_ar": "1200-1500 مجم يوميًا",
>       "benefits_en": "Essential for bone formation and healing",
>       "benefits_ar": "أساسي لتكوين العظام والشفاء"
>     },
>     {
>       "name_en": "Vitamin D",
>       "name_ar": "فيتامين د",
>       "dosage_en": "2000-4000 IU daily",
>       "dosage_ar": "2000-4000 وحدة دولية يوميًا",
>       "benefits_en": "Enhances calcium absorption and bone health",
>       "benefits_ar": "يعزز امتصاص الكالسيوم وصحة العظام"
>     },
>     {
>       "name_en": "Vitamin C",
>       "name_ar": "فيتامين سي",
>       "dosage_en": "1000-2000 mg daily",
>       "dosage_ar": "1000-2000 مجم يوميًا",
>       "benefits_en": "Supports collagen production for bone and tissue repair",
>       "benefits_ar": "يدعم إنتاج الكولاجين لإصلاح العظام والأنسجة"
>     },
>     {
>       "name_en": "Magnesium",
>       "name_ar": "المغنيسيوم",
>       "dosage_en": "400-800 mg daily",
>       "dosage_ar": "400-800 مجم يوميًا",
>       "benefits_en": "Supports bone mineralization and muscle function",
>       "benefits_ar": "يدعم تمعدن العظام ووظيفة العضلات"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed by physician",
>       "dosage_ar": "حسب توجيهات الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May interfere with bone healing if used long-term. Use sparingly and only as needed for pain relief.",
>       "cautions_ar": "قد يتداخل مع شفاء العظام إذا تم استخدامه على المدى الطويل. استخدمه باعتدال وفقط حسب الحاجة لتخفيف الألم."
>     },
>     {
>       "name_en": "Acetaminophen",
>       "name_ar": "باراسيتامول",
>       "dosage_en": "As directed by physician",
>       "dosage_ar": "حسب توجيهات الطبيب",
>       "benefits_en": "Relieves pain without affecting bone healing",
>       "benefits_ar": "يخفف الألم دون التأثير على شفاء العظام",
>       "cautions_en": "Do not exceed recommended dosage. Avoid with liver disease or alcohol consumption.",
>       "cautions_ar": "لا تتجاوز الجرعة الموصى بها. تجنبه مع أمراض الكبد أو استهلاك الكحول."
>     },
>     {
>       "name_en": "Opioids (for severe pain)",
>       "name_ar": "الأفيونيات (للألم الشديد)",
>       "dosage_en": "As prescribed by physician",
>       "dosage_ar": "حسب وصفة الطبيب",
>       "benefits_en": "Provides strong pain relief for severe fractures",
>       "benefits_ar": "يوفر راحة قوية من الألم للكسور الشديدة",
>       "cautions_en": "Can cause drowsiness and constipation. Risk of dependence with long-term use. Take exactly as prescribed.",
>       "cautions_ar": "يمكن أن يسبب النعاس والإمساك. خطر الاعتماد مع الاستخدام طويل الأمد. تناول بالضبط كما هو موصوف."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Arnica",
>       "plant_name_ar": "الأرنيكا",
>       "recipe_en": "Apply arnica gel or cream to the area around the fracture (not directly on surgical wounds) 2-3 times daily. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
>       "recipe_ar": "ضع جل أو كريم الأرنيكا على المنطقة حول الكسر (وليس مباشرة على الجروح الجراحية) 2-3 مرات يوميًا. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
>       "benefits_en": "Reduces inflammation, swelling, and bruising",
>       "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
>     },
>     {
>       "plant_name_en": "Comfrey",
>       "plant_name_ar": "القراص",
>       "recipe_en": "Make a poultice by crushing fresh comfrey leaves and applying to the area around the fracture (not on open wounds). Cover with a bandage and leave for 2-3 hours. Repeat 1-2 times daily.",
>       "recipe_ar": "اصنع ضمادة عن طريق سحق أوراق القراص الطازجة وتطبيقها على المنطقة حول الكسر (وليس على الجروح المفتوحة). غطها بضمادة واتركها لمدة 2-3 ساعات. كرر 1-2 مرات يوميًا.",
>       "benefits_en": "Contains allantoin which promotes bone healing",
>       "benefits_ar": "يحتوي على الألانتوين الذي يعزز شفاء العظام"
>     },
>     {
>       "plant_name_en": "Calcium-Rich Smoothie",
>       "name_ar": "سموذي غني بالكالسيوم",
>       "recipe_en": "Blend 1 cup of fortified almond milk, 1/2 cup Greek yogurt, 1 cup kale, 1/2 banana, and 1 tablespoon chia seeds. Drink once daily.",
>       "recipe_ar": "اخلط كوبًا واحدًا من حليب اللوز المدعم، ونصف كوب من الزبادي اليوناني، وكوبًا واحدًا من الكرنب، ونصف موزة، وملعقة كبيرة من بذور الشيا. اشربه مرة واحدة يوميًا.",
>       "benefits_en": "Provides calcium and other nutrients essential for bone healing",
>       "benefits_ar": "يوفر الكالسيوم والمغذيات الأخرى الأساسية لشفاء العظام"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid all upper body exercises until medically cleared", "Focus on lower body and core exercises during recovery", "Always follow medical advice regarding activity restrictions", "Use proper form and technique when returning to exercises", "Consider working with a physical therapist during rehabilitation"],
>     "ar": ["تجنب جميع تمارين الجزء العلوي من الجسم حتى يتم المسح الطبي", "ركز على تمارين الجزء السفلي من الجسم والجذع أثناء التعافي", "اتبع دائمًا النصيحة الطبية بشأن قيود النشاط", "استخدم الشكل والتقنية الصحيحين عند العودة إلى التمارين", "فكر في العمل مع أخصائي علاج طبيعي أثناء إعادة التأهيل"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Lower body exercises (seated if necessary)", "Core exercises (avoiding shoulder strain)", "Gentle wrist and hand movements", "Breathing exercises"],
>       "exercises_ar": ["تمارين الجزء السفلي من الجسم (جالسًا إذا لزم الأمر)", "تمارين الجذع (تجنب إجهاد الكتف)", "حركات معصيد وأصابع لطيفة", "تمارين التنفس"],
>       "frequency_en": "2-3 times per week, 15-20 minutes per session",
>       "frequency_ar": "2-3 مرات في الأسبوع، 15-20 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Lower body strength training", "Core stabilization exercises", "Gentle range of motion for shoulder as approved", "Low-impact cardio (walking, cycling)"],
>       "exercises_ar": ["تدريب القوة للجزء السفلي من الجسم", "تمارين استقرار الجذع", "تمارين نطاق الحركة اللطيفة للكتف كما تمت الموافقة عليها", "التمارين القلبية منخفضة التأثير (المشي، ركوب الدراجة)"],
>       "frequency_en": "3 times per week, 20-30 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Progressive shoulder exercises as approved", "Light upper body resistance training", "Sport-specific movements (modified)", "Functional exercises"],
>       "exercises_ar": ["تمارين الكتف التدريجية كما تمت الموافقة عليها", "تدريب المقاومة الخفيف للجزء العلوي من الجسم", "الحركات الخاصة بالرياضة (معدلة)", "التمارين الوظيفية"],
>       "frequency_en": "3-4 times per week, 30-45 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 30-45 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Pendulum Exercises",
>       "name_ar": "تمارين البندول",
>       "instructions_en": "Lean forward and let your injured arm hang down. Gently swing your arm in small circles, both clockwise and counterclockwise. Perform for 1-2 minutes, 2-3 times daily.",
>       "instructions_ar": "انحنِ إلى الأمام واترك ذراعك المصابة تتدلى لأسفل. اهز ذراعك بلطف في دوائر صغيرة، في اتجاه عقارب الساعة وعكس اتجاه عقارب الساعة. قم بذلك لمدة 1-2 دقيقة، 2-3 مرات يوميًا.",
>       "benefits_en": "Gently mobilizes the shoulder joint without strain",
>       "benefits_ar": "يحرك مفصل الكتف بلطف دون إجهاد"
>     },
>     {
>       "name_en": "Shoulder Shrugs",
>       "name_ar": "رفع الكتف",
>       "instructions_en": "Sit or stand tall. Gently lift your shoulders up toward your ears, then relax and lower them. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "اجلس أو قف منتصبًا. ارفع كتفيك بلطف نحو أذنيك، ثم استرخِ واخفضهما. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Strengthens trapezius muscles without stressing the collarbone",
>       "benefits_ar": "يقوي عضلات شبه المنحرف دون إجهاد الترقوة"
>     },
>     {
>       "name_en": "Wall Walks",
>       "name_ar": "المشي على الحائط",
>       "instructions_en": "Stand facing a wall. Place your fingers on the wall and slowly walk them up as high as you can without pain. Hold for 5 seconds, then slowly walk them down. Repeat 5 times, 2-3 times daily.",
>       "instructions_ar": "قف مواجهًا للحائط. ضع أصابعك على الحائط وامشِ بها ببطء لأعلى قدر الإمكان دون ألم. استمر لمدة 5 ثوانٍ، ثم امشِ بها ببطء لأسفل. كرر 5 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Improves shoulder range of motion",
>       "benefits_ar": "يحسن نطاق حركة الكتف"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Follow medical advice for immobilization period", "Gradual progression of exercises as healing allows", "Focus on restoring shoulder mobility and strength", "Proper posture and body mechanics", "Gradual return to sports and activities"],
>     "ar": ["اتبع النصيحة الطبية لفترة التثبيت", "التقدم التدريجي للتمارين كما يسمح الشفاء", "التركيز على استعادة حركة الكتف وقوته", "وضعية الجسم وميكانيكا الجسم المناسبة", "العودة التدريجية للرياضات والأنشطة"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Clavicle Fractures",
>       "title_ar": "إدارة كسور الترقوة",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Rehabilitation After Clavicle Fracture",
>       "title_ar": "إعادة التأهيل بعد كسر الترقوة",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Surgical vs. Non-surgical Treatment of Clavicle Fractures",
>       "title_ar": "العلاج الجراحي مقابل غير الجراحي لكسور الترقوة",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 
> I'll continue with the next injury, "Knee Injuries - إصابات الركبة":
> 
> ```json
> {
>   "title_en": "Knee Injuries",
>   "title_ar": "إصابات الركبة",
>   "description_en": "Knee injuries encompass a range of conditions affecting the knee joint, including ligament tears, meniscus tears, patellar dislocations, and tendon injuries. These injuries can cause pain, swelling, instability, and limited range of motion.",
>   "description_ar": "تشمل إصابات الركبة مجموعة من الحالات التي تؤثر على مفصل الركبة، بما في ذلك تمزقات الأربطة وتمزقات الغضروف المفصلي وخلوع الرضفة وإصابات الأوتار. يمكن أن تسبب هذه الإصابات الألم والتورم وعدم الاستقرار ومحدودية نطاق الحركة.",
>   "management_plan": {
>     "immediate_care": {
>       "en": ["Follow the RICE protocol: Rest, Ice, Compression, Elevation", "Avoid weight-bearing activities", "Use crutches if necessary", "Take over-the-counter pain relievers as needed", "Seek medical evaluation for proper diagnosis"],
>       "ar": ["اتبع بروتوكول RICE: الراحة، الثلج، الضغط، الرفع", "تجنب الأنشطة التي تحمل الوزن", "استخدم العكازات إذا لزم الأمر", "تناول مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة", "اطلب التقييم الطبي للتشخيص الصحيح"]
>     },
>     "short_term_care": {
>       "en": ["Continue RICE protocol for 48-72 hours", "Use a knee brace for support if recommended", "Begin gentle range of motion exercises when pain allows", "Take prescribed medications as directed", "Attend follow-up appointments"],
>       "ar": ["استمر في بروتوكول RICE لمدة 48-72 ساعة", "استخدم دعامة الركبة للدعم إذا تم التوصية بذلك", "ابدأ تمارين نطاق الحركة اللطيفة عندما يسمح الألم", "تناول الأدوية الموصوفة حسب التوجيهات", "حضر مواعيد المتابعة"]
>     },
>     "long_term_care": {
>       "en": ["Follow rehabilitation program as directed", "Gradually return to activities", "Incorporate strengthening exercises", "Improve flexibility and range of motion", "Use proper technique during sports and activities"],
>       "ar": ["اتبع برنامج إعادة التأهيل حسب التوجيهات", "عد تدريجيًا إلى الأنشطة", "أدرج تمارين التقوية", "حسن المرونة ونطاق الحركة", "استخدم التقنية المناسبة خلال الرياضات والأنشطة"]
>     }
>   },
>   "supplements": [
>     {
>       "name_en": "Glucosamine and Chondroitin",
>       "name_ar": "جلوكوزامين وكوندرويتين",
>       "dosage_en": "1500 mg glucosamine and 800-1200 mg chondroitin daily",
>       "dosage_ar": "1500 مجم جلوكوزامين و 800-1200 مجم كوندرويتين يوميًا",
>       "benefits_en": "Supports joint health and may reduce pain",
>       "benefits_ar": "يدعم صحة المفاصل وقد يقلل الألم"
>     },
>     {
>       "name_en": "Omega-3 Fatty Acids",
>       "name_ar": "الأحماض الدهنية أوميغا-3",
>       "dosage_en": "2-3 g daily",
>       "dosage_ar": "2-3 جم يوميًا",
>       "benefits_en": "Reduces inflammation throughout the body",
>       "benefits_ar": "يقلل الالتهاب في جميع أنحاء الجسم"
>     },
>     {
>       "name_en": "Vitamin C",
>       "name_ar": "فيتامين سي",
>       "dosage_en": "1000 mg daily",
>       "dosage_ar": "1000 مجم يوميًا",
>       "benefits_en": "Supports collagen production for tissue repair",
>       "benefits_ar": "يدعم إنتاج الكولاجين لإصلاح الأنسجة"
>     },
>     {
>       "name_en": "Turmeric (Curcumin)",
>       "name_ar": "الكركم (الكركمين)",
>       "dosage_en": "500-1000 mg 2-3 times daily",
>       "dosage_ar": "500-1000 مجم 2-3 مرات يوميًا",
>       "benefits_en": "Has anti-inflammatory properties that may help reduce pain",
>       "benefits_ar": "له خصائص مضادة للالتهاب قد تساعد في تقليل الألم"
>     }
>   ],
>   "medications": [
>     {
>       "name_en": "NSAIDs (Ibuprofen, Naproxen)",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
>       "dosage_en": "As directed on package or by physician",
>       "dosage_ar": "حسب التوجيهات على العبوة أو من قبل الطبيب",
>       "benefits_en": "Reduces pain and inflammation",
>       "benefits_ar": "يقلل الألم والالتهاب",
>       "cautions_en": "May cause stomach irritation. Take with food. Not recommended for those with stomach ulcers or kidney problems.",
>       "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به لمن يعانون من قرحة المعدة أو مشاكل الكلى."
>     },
>     {
>       "name_en": "Topical NSAIDs",
>       "name_ar": "مضادات الالتهاب غير الستيرويدية الموضعية",
>       "dosage_en": "Apply to affected area 3-4 times daily",
>       "dosage_ar": "ضع على المنطقة المصابة 3-4 مرات يوميًا",
>       "benefits_en": "Provides localized pain relief with fewer systemic side effects",
>       "benefits_ar": "يوفر راحة من الألم موضعية مع آثار جانبية جهازية أقل",
>       "cautions_en": "Avoid applying to broken skin. May cause skin irritation.",
>       "cautions_ar": "تجنب وضعها على الجلد التالف. قد يسبب تهيج الجلد."
>     },
>     {
>       "name_en": "Corticosteroid Injections",
>       "name_ar": "حقن الكورتيكوستيرويد",
>       "dosage_en": "As prescribed by physician",
>       "dosage_ar": "حسب وصفة الطبيب",
>       "benefits_en": "Provides powerful anti-inflammatory effects for severe cases",
>       "benefits_ar": "يوفر تأثيرات مضادة قوية للالتهاب للحالات الشديدة",
>       "cautions_en": "May weaken tendons and cartilage with repeated use. Limited to 2-3 injections per year in the same area.",
>       "cautions_ar": "قد يضعف الأوتار والغضاريف مع الاستخدام المتكرر. يقتصر على 2-3 حقن سنويًا في نفس المنطقة."
>     }
>   ],
>   "plants_and_recipes": [
>     {
>       "plant_name_en": "Arnica",
>       "plant_name_ar": "الأرنيكا",
>       "recipe_en": "Apply arnica gel or cream to the affected area 2-3 times daily. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
>       "recipe_ar": "ضع جل أو كريم الأرنيكا على المنطقة المصابة 2-3 مرات يوميًا. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
>       "benefits_en": "Reduces inflammation, swelling, and bruising",
>       "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
>     },
>     {
>       "plant_name_en": "Ginger Compress",
>       "name_ar": "ضمادة الزنجبيل",
>       "recipe_en": "Grate fresh ginger and steep in hot water for 10 minutes. Soak a cloth in the mixture and apply to the affected area for 15-20 minutes. Repeat 2-3 times daily.",
>       "recipe_ar": "ابشر الزنجبيل الطازج وانقعه في الماء الساخن لمدة 10 دقائق. انقع قطعة قماش في الخليط وضعها على المنطقة المصابة لمدة 15-20 دقيقة. كرر 2-3 مرات يوميًا.",
>       "benefits_en": "Ginger has anti-inflammatory properties that help reduce pain and swelling",
>       "benefits_ar": "الزنجبيل له خصائص مضادة للالتهاب تساعد في تقليل الألم والتورم"
>     },
>     {
>       "plant_name_en": "Turmeric Paste",
>       "name_ar": "عجينة الكركم",
>       "recipe_en": "Mix 1 teaspoon of turmeric powder with enough water to make a paste. Apply to the affected area and cover with a cloth. Leave for 30 minutes before rinsing. Repeat twice daily.",
>       "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع كمية كافية من الماء لصنع عجينة. ضعها على المنطقة المصابة وغطها بقطعة قماش. اتركها لمدة 30 دقيقة قبل الشطف. كرر مرتين يوميًا.",
>       "benefits_en": "Curcumin in turmeric has strong anti-inflammatory properties",
>       "benefits_ar": "الكركمين في الكركم له خصائص مضادة قوية للالتهاب"
>     }
>   ],
>   "gym_tips": {
>     "en": ["Avoid exercises that cause knee pain", "Focus on low-impact activities during recovery", "Always warm up properly before exercising", "Use proper form and technique", "Consider working with a physical therapist"],
>     "ar": ["تجنب التمارين التي تسبب ألم الركبة", "ركز على الأنشطة منخفضة التأثير أثناء التعافي", "قم دائمًا بالإحماء المناسب قبل التمرين", "استخدم الشكل والتقنية الصحيحين", "فكر في العمل مع أخصائي علاج طبيعي"]
>   },
>   "workout_plan": {
>     "month_1": {
>       "exercises_en": ["Gentle range of motion exercises", "Isometric quadriceps and hamstring exercises", "Upper body and core exercises", "Low-impact cardio (swimming, cycling if no pain)"],
>       "exercises_ar": ["تمارين نطاق الحركة اللطيفة", "تمارين الرباعية والعضلة الخلفية متساوية القياس", "تمارين الجزء العلوي من الجسم والجذع", "التمارين القلبية منخفضة التأثير (السباحة، ركوب الدراجة إذا لم يكن هناك ألم)"],
>       "frequency_en": "3 times per week, 20-30 minutes per session",
>       "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
>     },
>     "month_2": {
>       "exercises_en": ["Light resistance training for unaffected areas", "Gentle stretching of the injured knee", "Low-impact cardio", "Balance exercises"],
>       "exercises_ar": ["تدريب المقاومة الخفيف للمناطق غير المتأثرة", "تمارين التمدد اللطيفة للركبة المصابة", "التمارين القلبية منخفضة التأثير", "تمارين التوازن"],
>       "frequency_en": "3-4 times per week, 30-40 minutes per session",
>       "frequency_ar": "3-4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
>     },
>     "month_3": {
>       "exercises_en": ["Progressive resistance training for knee muscles", "Low-impact sport-specific movements", "Functional exercises", "Plyometric exercises (if appropriate)"],
>       "exercises_ar": ["تدريب المقاومة التدريجي لعضلات الركبة", "الحركات الخاصة بالرياضة منخفضة التأثير", "التمارين الوظيفية", "تمارين البلايومتريك (إذا كان ذلك مناسبًا)"],
>       "frequency_en": "4 times per week, 45-60 minutes per session",
>       "frequency_ar": "4 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
>     }
>   },
>   "recovery_exercises": [
>     {
>       "name_en": "Straight Leg Raises",
>       "name_ar": "رفع الساق المستقيمة",
>       "instructions_en": "Lie on your back with one leg bent and the other straight. Tighten your thigh muscles and lift the straight leg about 6 inches off the floor. Hold for 5 seconds, then lower slowly. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "استلقِ على ظهرك مع ثني ساق واحدة والأخرى مستقيمة. شد عضلات الفخذ وارفع الساق المستقيمة حوالي 6 بوصات عن الأرض. استمر لمدة 5 ثوانٍ، ثم اخفض ببطء. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Strengthens quadriceps without stressing the knee joint",
>       "benefits_ar": "يقوي العضلات الرباعية دون إجهاد مفصل الركبة"
>     },
>     {
>       "name_en": "Hamstring Curls",
>       "name_ar": "ثني العضلة الخلفية",
>       "instructions_en": "Stand holding onto a chair for support. Bend your knee and bring your heel toward your buttock. Hold for 5 seconds, then lower slowly. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "قف ممسكًا بكرسي للدعم. اثنِ ركبتك واجلب كعبك نحو أليتك. استمر لمدة 5 ثوانٍ، ثم اخفض ببطء. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Strengthens hamstring muscles",
>       "benefits_ar": "يقوي العضلة الخلفية"
>     },
>     {
>       "name_en": "Wall Slides",
>       "name_ar": "انزلاقات الحائط",
>       "instructions_en": "Stand with your back against a wall and feet shoulder-width apart. Slowly slide down the wall into a partial squat, keeping your knees behind your toes. Hold for 5 seconds, then slowly slide back up. Repeat 10 times, 2-3 times daily.",
>       "instructions_ar": "قف مع ظهرك مقابل الحائط والقدمين بعرض الكتفين. انزلق ببطء على الحائط إلى وضع القرفصاء الجزئي، مع الحفاظ على ركبتيك خلف أصابع قدميك. استمر لمدة 5 ثوانٍ، ثم انزلق ببطء مرة أخرى لأعلى. كرر 10 مرات، 2-3 مرات يوميًا.",
>       "benefits_en": "Improves knee strength and stability",
>       "benefits_ar": "يحسن قوة الركبة واستقرارها"
>     }
>   ],
>   "rehabilitation_strategies": {
>     "en": ["Follow the RICE protocol for the first 48-72 hours", "Gradual progression through rehabilitation phases", "Focus on strengthening muscles around the knee", "Improve flexibility and range of motion", "Proper technique during activities"],
>     "ar": ["اتبع بروتوكول RICE لمدة 48-72 ساعة الأولى", "التقدم التدريجي عبر مراحل إعادة التأهيل", "التركيز على تقوية العضلات حول الركبة", "حسن المرونة ونطاق الحركة", "التقنية المناسبة خلال الأنشطة"]
>   },
>   "evidence_based_links": [
>     {
>       "title_en": "Management of Knee Injuries",
>       "title_ar": "إدارة إصابات الركبة",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
>     },
>     {
>       "title_en": "Rehabilitation After Knee Injury",
>       "title_ar": "إعادة التأهيل بعد إصابة الركبة",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
>     },
>     {
>       "title_en": "Exercise Therapy for Knee Injuries",
>       "title_ar": "العلاج بالتمرين لإصابات الركبة",
>       "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
>     }
>   ],
>   "disclaimer": {
>     "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
>     "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
>   }
> }
> ```
> 

```json
{
  "title_en": "ACL Tear",
  "title_ar": "تمزق الرباط الصليبي الأمامي",
  "description_en": "An ACL tear is a common knee injury that occurs when the anterior cruciate ligament (ACL), one of the major ligaments in the knee, is stretched or torn. It often happens during sports that involve sudden stops or changes in direction.",
  "description_ar": "تمزق الرباط الصليبي الأمامي هو إصابة شائعة في الركبة تحدث عندما يتمدد أو يتمزق الرباط الصليبي الأمامي (ACL)، أحد الأربطة الرئيسية في الركبة. يحدث غالبًا أثناء الرياضات التي تتضمن توقفات مفاجئة أو تغييرات في الاتجاه.",
  "management_plan": {
    "immediate_care": {
      "en": ["Follow the RICE protocol: Rest, Ice, Compression, Elevation", "Avoid weight-bearing activities", "Use crutches for support", "Take over-the-counter pain relievers as needed", "Seek immediate medical evaluation"],
      "ar": ["اتبع بروتوكول RICE: الراحة، الثلج، الضغط، الرفع", "تجنب الأنشطة التي تحمل الوزن", "استخدم العكازات للدعم", "تناول مسكنات الألم التي لا تستلزم وصفة طبية حسب الحاجة", "اطلب التقييم الطبي الفوري"]
    },
    "short_term_care": {
      "en": ["Follow medical advice for treatment (surgical or non-surgical)", "Use a knee brace for stability", "Continue physical therapy exercises", "Avoid activities that stress the knee", "Attend follow-up appointments"],
      "ar": ["اتبع النصيحة الطبية للعلاج (الجراحي أو غير الجراحي)", "استخدم دعامة الركبة للاستقرار", "استمر في تمارين العلاج الطبيعي", "تجنب الأنشطة التي تضع ضغطًا على الركبة", "حضر مواعيد المتابعة"]
    },
    "long_term_care": {
      "en": ["Complete rehabilitation program", "Gradually return to sports and activities", "Maintain knee strength and flexibility", "Use proper technique during physical activities", "Continue with maintenance exercises"],
      "ar": ["أكمل برنامج إعادة التأهيل", "عد تدريجيًا إلى الرياضات والأنشطة", "حافظ على قوة ومرونة الركبة", "استخدم التقنية المناسبة أثناء الأنشطة البدنية", "استمر في تمارين الصيانة"]
    }
  },
  "supplements": [
    {
      "name_en": "Vitamin C",
      "name_ar": "فيتامين سي",
      "dosage_en": "1000 mg daily",
      "dosage_ar": "1000 مجم يوميًا",
      "benefits_en": "Supports collagen production for ligament healing",
      "benefits_ar": "يدعم إنتاج الكولاجين لشفاء الأربطة"
    },
    {
      "name_en": "Glucosamine and Chondroitin",
      "name_ar": "جلوكوزامين وكوندرويتين",
      "dosage_en": "1500 mg glucosamine and 800-1200 mg chondroitin daily",
      "dosage_ar": "1500 مجم جلوكوزامين و 800-1200 مجم كوندرويتين يوميًا",
      "benefits_en": "Supports joint health and may reduce pain",
      "benefits_ar": "يدعم صحة المفاصل وقد يقلل الألم"
    },
    {
      "name_en": "Omega-3 Fatty Acids",
      "name_ar": "الأحماض الدهنية أوميغا-3",
      "dosage_en": "2-3 g daily",
      "dosage_ar": "2-3 جم يوميًا",
      "benefits_en": "Reduces inflammation throughout the body",
      "benefits_ar": "يقلل الالتهاب في جميع أنحاء الجسم"
    },
    {
      "name_en": "Protein",
      "name_ar": "البروتين",
      "dosage_en": "1.6-2.0 g per kg of body weight daily",
      "dosage_ar": "1.6-2.0 جم لكل كجم من وزن الجسم يوميًا",
      "benefits_en": "Essential for tissue repair and muscle maintenance",
      "benefits_ar": "أساسي لإصلاح الأنسجة وصيانة العضلات"
    }
  ],
  "medications": [
    {
      "name_en": "NSAIDs (Ibuprofen, Naproxen)",
      "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
      "dosage_en": "As directed by physician",
      "dosage_ar": "حسب توجيهات الطبيب",
      "benefits_en": "Reduces pain and inflammation",
      "benefits_ar": "يقلل الألم والالتهاب",
      "cautions_en": "May interfere with ligament healing if used long-term. Use sparingly and only as needed.",
      "cautions_ar": "قد يتداخل مع شفاء الأربطة إذا تم استخدامه على المدى الطويل. استخدمه باعتدال وفقط حسب الحاجة."
    },
    {
      "name_en": "Acetaminophen",
      "name_ar": "باراسيتامول",
      "dosage_en": "As directed by physician",
      "dosage_ar": "حسب توجيهات الطبيب",
      "benefits_en": "Relieves pain without affecting ligament healing",
      "benefits_ar": "يخفف الألم دون التأثير على شفاء الأربطة",
      "cautions_en": "Do not exceed recommended dosage. Avoid with liver disease or alcohol consumption.",
      "cautions_ar": "لا تتجاوز الجرعة الموصى بها. تجنبه مع أمراض الكبد أو استهلاك الكحول."
    }
  ],
  "plants_and_recipes": [
    {
      "plant_name_en": "Arnica",
      "plant_name_ar": "الأرنيكا",
      "recipe_en": "Apply arnica gel or cream to the affected area 2-3 times daily. For oral use, take 5 pellets of arnica 30C dissolved under the tongue 3 times daily.",
      "recipe_ar": "ضع جل أو كريم الأرنيكا على المنطقة المصابة 2-3 مرات يوميًا. للاستخدام الفموي، تناول 5 حبيبات من الأرنيكا 30C تذوب تحت اللسان 3 مرات يوميًا.",
      "benefits_en": "Reduces inflammation, swelling, and bruising",
      "benefits_ar": "يقلل الالتهاب والتورم والكدمات"
    },
    {
      "plant_name_en": "Turmeric",
      "plant_name_ar": "الكركم",
      "recipe_en": "Mix 1 teaspoon of turmeric powder with warm milk and honey. Drink once daily. Alternatively, take turmeric supplements as directed.",
      "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع الحليب الدافئ والعسل. اشربه مرة واحدة يوميًا. بدلاً من ذلك، تناول مكملات الكركم حسب التوجيهات.",
      "benefits_en": "Curcumin has powerful anti-inflammatory properties",
      "benefits_ar": "الكركمين له خصائص مضادة قوية للالتهاب"
    },
    {
      "plant_name_en": "Ginger",
      "plant_name_ar": "الزنجبيل",
      "recipe_en": "Steep 1-2 inches of fresh ginger root in hot water for 10 minutes. Drink 2-3 cups daily.",
      "recipe_ar": "انقع 1-2 بوصة من جذر الزنجبيل الطازج في الماء الساخن لمدة 10 دقائق. اشرب 2-3 أكواب يوميًا.",
      "benefits_en": "Contains anti-inflammatory compounds that help reduce pain and swelling",
      "benefits_ar": "يحتوي على مركبات مضادة للالتهاب تساعد في تقليل الألم والتورم"
    }
  ],
  "gym_tips": {
    "en": ["Avoid high-impact activities until fully healed", "Focus on low-impact exercises during recovery", "Always warm up properly before exercising", "Use proper form and technique", "Work closely with a physical therapist during rehabilitation"],
    "ar": ["تجنب الأنشطة عالية التأثير حتى الشفاء التام", "ركز على التمارين منخفضة التأثير أثناء التعافي", "قم دائمًا بالإحماء المناسب قبل التمرين", "استخدم الشكل والتقنية الصحيحين", "اعمل عن كثب مع أخصائي علاج طبيعي أثناء إعادة التأهيل"]
  },
  "workout_plan": {
    "month_1": {
      "exercises_en": ["Gentle range of motion exercises", "Quadriceps sets", "Straight leg raises", "Hamstring curls"],
      "exercises_ar": ["تمارين نطاق الحركة اللطيفة", "مجموعات العضلات الرباعية", "رفع الساق المستقيمة", "ثني العضلة الخلفية"],
      "frequency_en": "3 times per week, 20-30 minutes per session",
      "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
    },
    "month_2": {
      "exercises_en": ["Partial squats", "Leg press", "Step-ups", "Balance exercises"],
      "exercises_ar": ["القرفصاء الجزئي", "ضغط الساق", "صعود الدرج", "تمارين التوازن"],
      "frequency_en": "3-4 times per week, 30-40 minutes per session",
      "frequency_ar": "3-4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
    },
    "month_3": {
      "exercises_en": ["Full squats with proper form", "Lunges", "Leg extensions", "Sport-specific movements"],
      "exercises_ar": ["القرفصاء الكامل بالشكل الصحيح", "الاندفاعات", "تمديدات الساق", "الحركات الخاصة بالرياضة"],
      "frequency_en": "4 times per week, 45-60 minutes per session",
      "frequency_ar": "4 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
    }
  },
  "recovery_exercises": [
    {
      "name_en": "Heel Slides",
      "name_ar": "انزلاقات الكعب",
      "instructions_en": "Lie on your back with knees bent. Slowly slide your heel away from your body, then slide it back. Repeat 10 times, 2-3 times daily.",
      "instructions_ar": "استلقِ على ظهرك مع ثني الركبتين. انزلق ببطء بكعبك بعيدًا عن جسمك، ثم انزلق به مرة أخرى. كرر 10 مرات، 2-3 مرات يوميًا.",
      "benefits_en": "Improves knee flexion and range of motion",
      "benefits_ar": "يحسن ثني الركبة ونطاق الحركة"
    },
    {
      "name_en": "Quad Sets",
      "name_ar": "مجموعات العضلات الرباعية",
      "instructions_en": "Sit with your leg straight and tightened thigh muscle. Hold for 5-10 seconds, then relax. Repeat 10 times, 2-3 times daily.",
      "instructions_ar": "اجلس مع ساقك مستقيمة وعضلة الفخذ مشدودة. استمر لمدة 5-10 ثوانٍ، ثم استرخِ. كرر 10 مرات، 2-3 مرات يوميًا.",
      "benefits_en": "Strengthens quadriceps without knee movement",
      "benefits_ar": "يقوي العضلات الرباعية دون حركة الركبة"
    },
    {
      "name_en": "Hamstring Curls",
      "name_ar": "ثني العضلة الخلفية",
      "instructions_en": "Stand holding onto a chair for support. Bend your knee and bring your heel toward your buttock. Hold for 5 seconds, then lower slowly. Repeat 10 times, 2-3 times daily.",
      "instructions_ar": "قف ممسكًا بكرسي للدعم. اثنِ ركبتك واجلب كعبك نحو أليتك. استمر لمدة 5 ثوانٍ، ثم اخفض ببطء. كرر 10 مرات، 2-3 مرات يوميًا.",
      "benefits_en": "Strengthens hamstring muscles",
      "benefits_ar": "يقوي العضلة الخلفية"
    }
  ],
  "rehabilitation_strategies": {
    "en": ["Follow medical advice for treatment (surgical or non-surgical)", "Complete full rehabilitation program", "Focus on strengthening muscles around the knee", "Improve balance and proprioception", "Gradual return to sports and activities"],
    "ar": ["اتبع النصيحة الطبية للعلاج (الجراحي أو غير الجراحي)", "أكمل برنامج إعادة التأهيل الكامل", "التركيز على تقوية العضلات حول الركبة", "حسن التوازن والإحساس بالموضع", "العودة التدريجية للرياضات والأنشطة"]
  },
  "evidence_based_links": [
    {
      "title_en": "ACL Injury Management and Rehabilitation",
      "title_ar": "إدارة إصابة الرباط الصليبي الأمامي وإعادة التأهيل",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
    },
    {
      "title_en": "Surgical vs Non-surgical Treatment for ACL Tears",
      "title_ar": "العلاج الجراحي مقابل غير الجراحي لتمزقات الرباط الصليبي الأمامي",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
    },
    {
      "title_en": "Return to Sports After ACL Reconstruction",
      "title_ar": "العودة إلى الرياضات بعد إعادة بناء الرباط الصليبي الأمامي",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6722990/"
    }
  ],
  "disclaimer": {
    "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
    "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
  }
}
```

Now, I'll create the additional fitness plan files you requested:

```json
{
  "title_en": "LumbarDisc Care",
  "title_ar": "رعاية القرص القطني",
  "description_en": "A comprehensive care plan for maintaining and improving the health of lumbar discs through targeted exercises, proper posture, and lifestyle adjustments.",
  "description_ar": "خطة رعاية شاملة للحفاظ على صحة الأقراص القطنية وتحسينها من خلال تمارين مستهدفة ووضعية جسم مناسبة وتعديلات في نمط الحياة.",
  "management_plan": {
    "immediate_care": {
      "en": ["Rest in a comfortable position", "Apply ice or heat to the affected area", "Avoid activities that worsen the pain", "Maintain good posture", "Use over-the-counter pain relievers if needed"],
      "ar": ["ارح في وضع مريح", "ضع الثلج أو الحرارة على المنطقة المصابة", "تجنب الأنشطة التي تزيد الألم سوءًا", "حافظ على وضعية الجسم الجيدة", "استخدم مسكنات الألم التي لا تستلزم وصفة طبية إذا لزم الأمر"]
    },
    "short_term_care": {
      "en": ["Continue with gentle exercises", "Practice proper body mechanics", "Use ergonomic furniture", "Avoid prolonged sitting or standing", "Consider physical therapy if pain persists"],
      "ar": ["استمر في التمارين اللطيفة", "مارس ميكانيكا الجسم المناسبة", "استخدم الأثاث المريكي", "تجنب الجلوس أو الوقوف لفترات طويلة", "فكر في العلاج الطبيعي إذا استمر الألم"]
    },
    "long_term_care": {
      "en": ["Maintain regular exercise routine", "Practice good posture habits", "Use proper lifting techniques", "Maintain healthy weight", "Continue with core strengthening exercises"],
      "ar": ["حافظ على روتين تمارين منتظم", "مارس عادات وضعية الجسم الجيدة", "استخدم تقنيات الرفع المناسبة", "حافظ على وزن صحي", "استمر في تمارين تقوية الجذع"]
    }
  },
  "supplements": [
    {
      "name_en": "Magnesium",
      "name_ar": "المغنيسيوم",
      "dosage_en": "400-800 mg daily",
      "dosage_ar": "400-800 مجم يوميًا",
      "benefits_en": "Helps relax muscles and may reduce muscle spasms",
      "benefits_ar": "يساعد على استرخاء العضلات وقد يقلل تقلصات العضلات"
    },
    {
      "name_en": "Omega-3 Fatty Acids",
      "name_ar": "الأحماض الدهنية أوميغا-3",
      "dosage_en": "2-3 g daily",
      "dosage_ar": "2-3 جم يوميًا",
      "benefits_en": "Reduces inflammation throughout the body",
      "benefits_ar": "يقلل الالتهاب في جميع أنحاء الجسم"
    },
    {
      "name_en": "Vitamin D",
      "name_ar": "فيتامين د",
      "dosage_en": "1000-2000 IU daily",
      "dosage_ar": "1000-2000 وحدة دولية يوميًا",
      "benefits_en": "Supports bone health and muscle function",
      "benefits_ar": "يدعم صحة العظام ووظيفة العضلات"
    }
  ],
  "medications": [
    {
      "name_en": "NSAIDs (Ibuprofen, Naproxen)",
      "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
      "dosage_en": "As directed by physician",
      "dosage_ar": "حسب توجيهات الطبيب",
      "benefits_en": "Reduces pain and inflammation",
      "benefits_ar": "يقلل الألم والالتهاب",
      "cautions_en": "May cause stomach irritation. Take with food. Not recommended for long-term use.",
      "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به للاستخدام طويل الأمد."
    },
    {
      "name_en": "Muscle Relaxants",
      "name_ar": "مرخيات العضلات",
      "dosage_en": "As prescribed by physician",
      "dosage_ar": "حسب وصفة الطبيب",
      "benefits_en": "Relieves muscle spasms and associated pain",
      "benefits_ar": "يخفف تشنجات العضلات والألم المصاحب لها",
      "cautions_en": "May cause drowsiness. Avoid driving or operating heavy machinery while taking this medication.",
      "cautions_ar": "قد يسبب النعاس. تجنب القيادة أو تشغيل الآلات الثقيلة أثناء تناول هذا الدواء."
    }
  ],
  "plants_and_recipes": [
    {
      "plant_name_en": "Turmeric",
      "plant_name_ar": "الكركم",
      "recipe_en": "Mix 1 teaspoon of turmeric powder with warm milk and honey. Drink once daily.",
      "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع الحليب الدافئ والعسل. اشربه مرة واحدة يوميًا.",
      "benefits_en": "Curcumin has anti-inflammatory properties that may help reduce back pain",
      "benefits_ar": "الكركمين له خصائص مضادة للالتهاب قد تساعد في تقليل آلام الظهر"
    },
    {
      "plant_name_en": "Ginger",
      "plant_name_ar": "الزنجبيل",
      "recipe_en": "Steep 1-2 inches of fresh ginger root in hot water for 10 minutes. Drink 2-3 cups daily.",
      "recipe_ar": "انقع 1-2 بوصة من جذر الزنجبيل الطازج في الماء الساخن لمدة 10 دقائق. اشرب 2-3 أكواب يوميًا.",
      "benefits_en": "Has anti-inflammatory properties that may help reduce pain",
      "benefits_ar": "له خصائص مضادة للالتهاب قد تساعد في تقليل الألم"
    }
  ],
  "gym_tips": {
    "en": ["Focus on core strengthening exercises", "Always warm up before exercising", "Use proper form and technique", "Avoid exercises that cause back pain", "Consider working with a physical therapist"],
    "ar": ["ركز على تمارين تقوية الجذع", "قم دائمًا بالإحماء قبل التمرين", "استخدم الشكل والتقنية الصحيحين", "تجنب التمارين التي تسبب ألم الظهر", "فكر في العمل مع أخصائي علاج طبيعي"]
  },
  "workout_plan": {
    "month_1": {
      "exercises_en": ["Pelvic tilts", "Cat-cow stretches", "Partial crunches", "Bird-dog exercise"],
      "exercises_ar": ["إمالات الحوض", "تمارين القط والبقرة", "الكرنش الجزئي", "تمرين الطائر والكلب"],
      "frequency_en": "3 times per week, 20-30 minutes per session",
      "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
    },
    "month_2": {
      "exercises_en": ["Glute bridges", "Plank variations", "Side planks", "Wall sits"],
      "exercises_ar": ["جسور الأليتين", "مختلفات اللوح", "الألواح الجانبية", "الجلوس على الحائط"],
      "frequency_en": "3-4 times per week, 30-40 minutes per session",
      "frequency_ar": "3-4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
    },
    "month_3": {
      "exercises_en": ["Full planks", "Modified squats", "Lunges with proper form", "Resistance band exercises"],
      "exercises_ar": ["الألواح الكاملة", "القرفصاء المعدلة", "الاندفاعات بالشكل الصحيح", "تمارين حزام المقاومة"],
      "frequency_en": "4 times per week, 45-60 minutes per session",
      "frequency_ar": "4 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
    }
  },
  "recovery_exercises": [
    {
      "name_en": "Pelvic Tilts",
      "name_ar": "إمالات الحوض",
      "instructions_en": "Lie on your back with knees bent. Tighten your abdominal muscles and flatten your back against the floor. Hold for 5-10 seconds, then relax. Repeat 10 times, 2-3 times daily.",
      "instructions_ar": "استلقِ على ظهرك مع ثني الركبتين. شد عضلات بطنك واجعل ظهرك مسطحًا على الأرض. استمر لمدة 5-10 ثوانٍ، ثم استرخِ. كرر 10 مرات، 2-3 مرات يوميًا.",
      "benefits_en": "Strengthens core muscles and improves spinal mobility",
      "benefits_ar": "يقوي عضلات الجذع ويحسن حركة العمود الفقري"
    },
    {
      "name_en": "Cat-Cow Stretch",
      "name_ar": "تمرين القط والبقرة",
      "instructions_en": "Start on your hands and knees. As you inhale, drop your belly and look up (cow position). As you exhale, round your spine and tuck your chin (cat position). Repeat 10 times, 2-3 times daily.",
      "instructions_ar": "ابدأ على يديك وركبتيك. أثناء الشهيق، أخفض بطنك وانظر لأعلى (وضع البقرة). أثناء الزفير، استدير ظهرك وادخل ذقنك (وضع القط). كرر 10 مرات، 2-3 مرات يوميًا.",
      "benefits_en": "Improves spinal flexibility and reduces tension",
      "benefits_ar": "يحسن مرونة العمود الفقري ويقلل التوتر"
    }
  ],
  "rehabilitation_strategies": {
    "en": ["Focus on core strengthening", "Practice good posture", "Use proper body mechanics", "Maintain healthy weight", "Avoid prolonged sitting"],
    "ar": ["التركيز على تقوية الجذع", "مارس وضعية الجسم الجيدة", "استخدم ميكانيكا الجسم المناسبة", "حافظ على وزن صحي", "تجنب الجلوس لفترات طويلة"]
  },
  "evidence_based_links": [
    {
      "title_en": "Exercise for Low Back Pain",
      "title_ar": "التمرين لآلام أسفل الظهر",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
    },
    {
      "title_en": "Core Strengthening for Back Health",
      "title_ar": "تقوية الجذع لصحة الظهر",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
    }
  ],
  "disclaimer": {
    "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read here.",
    "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. ابحث دائمًا عن نصيحة طبيبك أو مقدم الرعاية الصحية المؤهل الآخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية. لا تتجاهل النصيحة الطبية المهنية أو تؤجل طلبها بسبب شيء قرأته هنا."
  }
}
```

```json
{
  "title_en": "LeanLegs Lady",
  "title_ar": "ساقان نحيفتان للسيدة",
  "description_en": "A specialized fitness program designed to help women achieve lean, toned legs without adding bulk, focusing on endurance, flexibility, and muscle definition.",
  "description_ar": "برنامج لياقة بدنية متخصص مصمم لمساعدة النساء على تحقيق ساقين نحيفتان ومشدودة دون إضافة حجم، مع التركيز على التحمل والمرونة وتعريف العضلات.",
  "management_plan": {
    "immediate_care": {
      "en": ["Start with light workouts to assess fitness level", "Focus on proper form over intensity", "Stay hydrated during workouts", "Wear appropriate footwear", "Listen to your body and avoid overexertion"],
      "ar": ["ابدأ بتمارين خفيفة لتقييم مستوى اللياقة", "ركز على الشكل الصحيح على الشدة", "حافظ على الترطيب أثناء التمارين", "ارتدِ الأحذية المناسبة", "استمع إلى جسمك وتجنب الإجهاد الزائد"]
    },
    "short_term_care": {
      "en": ["Gradually increase workout duration", "Incorporate more variety in exercises", "Focus on muscle endurance", "Ensure adequate recovery between sessions", "Track progress with measurements and photos"],
      "ar": ["زد مدة التمرين تدريجيًا", "أدرج المزيد من التنوع في التمارين", "ركز على تحمل العضلات", "تأكد من التعافي الكافي بين الجلسات", "تتبع التقدم بالقياسات والصور"]
    },
    "long_term_care": {
      "en": ["Maintain consistent workout schedule", "Continue to challenge muscles with new exercises", "Balance cardio and strength training", "Focus on nutrition to support lean muscle", "Adjust program as goals evolve"],
      "ar": ["حافظ على جدول تمارين ثابت", "استمر في تحدي العضلات بتمارين جديدة", "وازن بين التمارين القلبية وتدريب القوة", "ركز على التغذية لدعم العضلات النحيفة", "عدل البرنامج مع تطور الأهداف"]
    }
  },
  "supplements": [
    {
      "name_en": "BCAAs (Branched-Chain Amino Acids)",
      "name_ar": "الأحماض الأمينية المتفرعة السلسلة",
      "dosage_en": "5-10 g before or after workouts",
      "dosage_ar": "5-10 جم قبل أو بعد التمارين",
      "benefits_en": "Supports muscle recovery and reduces soreness",
      "benefits_ar": "يدعم تعافي العضلات ويقلل التهيج"
    },
    {
      "name_en": "L-Carnitine",
      "name_ar": "إل-كارنيتين",
      "dosage_en": "500-2000 mg daily",
      "dosage_ar": "500-2000 مجم يوميًا",
      "benefits_en": "May help with fat metabolism and energy production",
      "benefits_ar": "قد يساعد في عملية الأيض الدهني وإنتاج الطاقة"
    },
    {
      "name_en": "Vitamin C",
      "name_ar": "فيتامين سي",
      "dosage_en": "1000 mg daily",
      "dosage_ar": "1000 مجم يوميًا",
      "benefits_en": "Supports collagen production for skin elasticity",
      "benefits_ar": "يدعم إنتاج الكولاجين لمرونة الجلد"
    }
  ],
  "medications": [],
  "plants_and_recipes": [
    {
      "plant_name_en": "Green Tea",
      "plant_name_ar": "الشاي الأخضر",
      "recipe_en": "Steep 1 green tea bag in hot water for 3-5 minutes. Drink 2-3 cups daily.",
      "recipe_ar": "انقع كيس شاي أخضر واحد في الماء الساخن لمدة 3-5 دقائق. اشرب 2-3 أكواب يوميًا.",
      "benefits_en": "Contains antioxidants that may support metabolism",
      "benefits_ar": "يحتوي على مضادات الأكسدة التي قد تدعم عملية الأيض"
    },
    {
      "plant_name_en": "Dandelion Tea",
      "name_ar": "شاي الهندباء",
      "recipe_en": "Steep 1 teaspoon of dried dandelion root in hot water for 10 minutes. Drink 1 cup daily.",
      "recipe_ar": "انقع ملعقة صغيرة من جذر الهندباء المجفف في الماء الساخن لمدة 10 دقائق. اشرب كوبًا واحدًا يوميًا.",
      "benefits_en": "May help reduce water retention",
      "benefits_ar": "قد يساعد في تقليل احتباس الماء"
    }
  ],
  "gym_tips": {
    "en": ["Focus on high reps with light to moderate weights", "Incorporate both cardio and strength training", "Use proper form to target the right muscles", "Include exercises that work all leg muscles", "Allow adequate recovery between workouts"],
    "ar": ["ركز على التكرارات العالية مع أوزان خفيفة إلى معتدلة", "أدرج كل من التمارين القلبية وتدريب القوة", "استخدم الشكل الصحيح لاستهداف العضلات المناسبة", "أدرج تمارين تعمل جميع عضلات الساق", "اسمح بالتعافي الكافي بين التمارين"]
  },
  "workout_plan": {
    "month_1": {
      "exercises_en": ["Bodyweight squats (high reps)", "Walking lunges", "Calf raises", "Leg lifts"],
      "exercises_ar": ["القرفصاء بوزن الجسم (تكرارات عالية)", "المشي بالاندفاعات", "رفع العجينة", "رفع الساق"],
      "frequency_en": "4 times per week, 30-40 minutes per session",
      "frequency_ar": "4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
    },
    "month_2": {
      "exercises_en": ["Resistance band leg exercises", "Step-ups", "Side lunges", "Pilates leg series"],
      "exercises_ar": ["تمارين الساق بحزام المقاومة", "صعود الدرج", "الاندفاعات الجانبية", "سلسلة تمارين الساق في البيلاس"],
      "frequency_en": "4-5 times per week, 40-50 minutes per session",
      "frequency_ar": "4-5 مرات في الأسبوع، 40-50 دقيقة لكل جلسة"
    },
    "month_3": {
      "exercises_en": ["Barre-style leg exercises", "Dance cardio", "Plyometric variations (low impact)", "Yoga for legs and flexibility"],
      "exercises_ar": ["تمارين الساق على طراز البار", "الرقص القلبي", "مختلفات البلايومتريك (منخفضة التأثير)", "اليوجا للساقين والمرونة"],
      "frequency_en": "5 times per week, 50-60 minutes per session",
      "frequency_ar": "5 مرات في الأسبوع، 50-60 دقيقة لكل جلسة"
    }
  },
  "recovery_exercises": [
    {
      "name_en": "Foam Rolling",
      "name_ar": "اللف باستخدام الفوم رولر",
      "instructions_en": "Roll your legs on a foam roller for 30-60 seconds per muscle group. Focus on quads, hamstrings, and calves. Perform 1-2 times daily.",
      "instructions_ar": "لف ساقيك على الفوم رولر لمدة 30-60 ثانية لكل مجموعة عضلية. ركز على العضلات الرباعية والعضلة الخلفية والعجينة. قم بذلك 1-2 مرات يوميًا.",
      "benefits_en": "Releases muscle tension and improves flexibility",
      "benefits_ar": "يطلق توتر العضلات ويحسن المرونة"
    },
    {
      "name_en": "Leg Stretches",
      "name_ar": "تمديدات الساق",
      "instructions_en": "Perform gentle stretches for all leg muscles. Hold each stretch for 30 seconds. Perform 2-3 times daily.",
      "instructions_ar": "قم بأداء تمديدات لطيفة لجميع عضلات الساق. استمر في كل تمدد لمدة 30 ثانية. قم بذلك 2-3 مرات يوميًا.",
      "benefits_en": "Improves flexibility and reduces muscle tightness",
      "benefits_ar": "يحسن المرونة ويقلل شدة العضلات"
    }
  ],
  "rehabilitation_strategies": {
    "en": ["Focus on muscle endurance over strength", "Incorporate variety to prevent plateaus", "Balance strength training with flexibility work", "Ensure adequate nutrition and hydration", "Listen to your body and adjust as needed"],
    "ar": ["ركز على تحمل العضلات على القوة", "أدرج التنوع لمنع الهضبات", "وازن تدريب القوة مع عمل المرونة", "تأكد من التغذية والترطيب الكافيين", "استمع إلى جسمك وعدل حسب الحاجة"]
  },
  "evidence_based_links": [
    {
      "title_en": "Resistance Training for Muscle Tone",
      "title_ar": "تدريب المقاومة لتعريف العضلات",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
    },
    {
      "title_en": "Endurance Training for Lean Muscle",
      "title_ar": "تدريب التحمل للعضلات النحيفة",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
    }
  ],
  "disclaimer": {
    "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a healthcare professional before starting any new fitness program.",
    "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. استشر دائمًا مع أخصائي الرعاية الصحية قبل بدء أي برنامج لياقة جديد."
  }
}
```

```json
{
  "title_en": "GluteGrow Girl",
  "title_ar": "نمو الأرداف للفتاة",
  "description_en": "A specialized fitness program designed to help women build and strengthen their glute muscles, focusing on targeted exercises, proper form, and progressive overload.",
  "description_ar": "برنامج لياقة بدنية متخصص مصمم لمساعدة النساء على بناء وتقوية عضلات الأرداف، مع التركيز على تمارين مستهدفة وشكل صحيح والحمل التدريجي.",
  "management_plan": {
    "immediate_care": {
      "en": ["Start with bodyweight exercises to master form", "Focus on mind-muscle connection", "Warm up properly before each workout", "Begin with lighter weights", "Allow adequate recovery between sessions"],
      "ar": ["ابدأ بتمارين وزن الجسم لإتقان الشكل", "ركز على الاتصال بين العقل والعضلة", "قم بالإحماء المناسب قبل كل تمرين", "ابدأ بأوزان أخف", "اسمح بالتعافي الكافي بين الجلسات"]
    },
    "short_term_care": {
      "en": ["Gradually increase weight and intensity", "Focus on progressive overload", "Ensure proper protein intake", "Track progress with measurements and photos", "Adjust exercises based on feedback"],
      "ar": ["زد الوزن والشدة تدريجيًا", "ركز على الحمل التدريجي", "تأكد من تناول البروتين الكافي", "تتبع التقدم بالقياسات والصور", "عدل التمارين بناءً على التغذية الراجعة"]
    },
    "long_term_care": {
      "en": ["Continue with progressive overload", "Incorporate advanced exercises", "Maintain consistency in training", "Focus on nutrition to support muscle growth", "Periodize training to prevent plateaus"],
      "ar": ["استمر في الحمل التدريجي", "أدرج تمارين متقدمة", "حافظ على الاتساق في التدريب", "ركز على التغذية لدعم نمو العضلات", "قسّم التدريب لمنع الهضبات"]
    }
  },
  "supplements": [
    {
      "name_en": "Protein Powder",
      "name_ar": "مسحوق البروتين",
      "dosage_en": "20-30 g within 30 minutes after workout",
      "dosage_ar": "20-30 جم في غضون 30 دقيقة بعد التمرين",
      "benefits_en": "Supports muscle repair and growth",
      "benefits_ar": "يدعم إصلاح العضلات ونموها"
    },
    {
      "name_en": "Creatine",
      "name_ar": "الكرياتين",
      "dosage_en": "3-5 g daily",
      "dosage_ar": "3-5 جم يوميًا",
      "benefits_en": "Improves strength and power output",
      "benefits_ar": "يحسن القوة وإنتاج الطاقة"
    },
    {
      "name_en": "BCAAs",
      "name_ar": "الأحماض الأمينية المتفرعة السلسلة",
      "dosage_en": "5-10 g during workout",
      "dosage_ar": "5-10 جم أثناء التمرين",
      "benefits_en": "Reduces muscle breakdown and supports recovery",
      "benefits_ar": "يقلل تكسر العضلات ويدعم التعافي"
    }
  ],
  "medications": [],
  "plants_and_recipes": [
    {
      "plant_name_en": "Protein Smoothie",
      "name_ar": "سموذي البروتين",
      "recipe_en": "Blend 1 scoop of protein powder, 1 banana, 1 cup almond milk, and 1 tablespoon almond butter. Drink within 30 minutes after workout.",
      "recipe_ar": "اخلط مغرفة واحدة من مسحوق البروتين، وموزة واحدة، وكوب من حليب اللوز، وملعقة كبيرة من زبدة اللوز. اشربه في غضون 30 دقيقة بعد التمرين.",
      "benefits_en": "Provides protein and nutrients for muscle recovery",
      "benefits_ar": "يوفر البروتين والمغذيات لتعافي العضلات"
    },
    {
      "plant_name_en": "Sweet Potato",
      "name_ar": "البطاطا الحلوة",
      "recipe_en": "Bake or steam sweet potatoes and consume as part of post-workout meal. Add a sprinkle of cinnamon for flavor.",
      "recipe_ar": "اخبز أو اطبخ البطاطا الحلوة على البخار وتناولها كجزء من وجبة ما بعد التمرين. أضف رشة قرفة للنكهة.",
      "benefits_en": "Provides complex carbohydrates for energy replenishment",
      "benefits_ar": "توفر الكربوهيدرات المعقدة لإعادة تعبئة الطاقة"
    }
  ],
  "gym_tips": {
    "en": ["Focus on proper form over heavy weight", "Squeeze glutes at the top of each movement", "Include a variety of glute exercises", "Progressively increase weight or reps", "Allow adequate recovery between glute workouts"],
    "ar": ["ركز على الشكل الصحيح على الوزن الثقيل", "اضغط على الأرداف في قمة كل حركة", "أدرج مجموعة متنوعة من تمارين الأرداف", "زد الوزن أو التكرارات تدريجيًا", "اسمح بالتعافي الكافي بين تمارين الأرداف"]
  },
  "workout_plan": {
    "month_1": {
      "exercises_en": ["Bodyweight glute bridges", "Clamshells", "Fire hydrants", "Bodyweight squats"],
      "exercises_ar": ["جسور الأرداف بوزن الجسم", "الصدفيات", "مرشحات الحريق", "القرفصاء بوزن الجسم"],
      "frequency_en": "3 times per week, 30-40 minutes per session",
      "frequency_ar": "3 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
    },
    "month_2": {
      "exercises_en": ["Weighted glute bridges", "Bulgarian split squats", "Hip thrusts", "Cable kickbacks"],
      "exercises_ar": ["جسور الأرداف الموزونة", "القرفصاء البلغارية المنقسمة", "دفعات الورك", "الركلات الخلفية بالكابل"],
      "frequency_en": "3-4 times per week, 40-50 minutes per session",
      "frequency_ar": "3-4 مرات في الأسبوع، 40-50 دقيقة لكل جلسة"
    },
    "month_3": {
      "exercises_en": ["Barbell hip thrusts", "Sumo deadlifts", "Single-leg deadlifts", "Banded lateral walks"],
      "exercises_ar": ["دفعات الورك بالبار", "الدفعة السومو", "الدفعة بساق واحدة", "المشي الجانبي بالحزام"],
      "frequency_en": "4 times per week, 50-60 minutes per session",
      "frequency_ar": "4 مرات في الأسبوع، 50-60 دقيقة لكل جلسة"
    }
  },
  "recovery_exercises": [
    {
      "name_en": "Foam Rolling",
      "name_ar": "اللف باستخدام الفوم رولر",
      "instructions_en": "Roll your glutes and hamstrings on a foam roller for 30-60 seconds per area. Perform 1-2 times daily.",
      "instructions_ar": "لف أردافك وعضلاتك الخلفية على الفوم رولر لمدة 30-60 ثانية لكل منطقة. قم بذلك 1-2 مرات يوميًا.",
      "benefits_en": "Releases muscle tension and improves flexibility",
      "benefits_ar": "يطلق توتر العضلات ويحسن المرونة"
    },
    {
      "name_en": "Glute Stretches",
      "name_ar": "تمديدات الأرداف",
      "instructions_en": "Perform pigeon pose and figure-four stretch. Hold each stretch for 30 seconds. Perform 2-3 times daily.",
      "instructions_ar": "قم بأداء وضع الحمامة وتمديد الرقم أربعة. استمر في كل تمدد لمدة 30 ثانية. قم بذلك 2-3 مرات يوميًا.",
      "benefits_en": "Improves flexibility and reduces muscle tightness",
      "benefits_ar": "يحسن المرونة ويقلل شدة العضلات"
    }
  ],
  "rehabilitation_strategies": {
    "en": ["Focus on progressive overload", "Ensure proper form to prevent injury", "Balance strength training with flexibility work", "Allow adequate recovery between sessions", "Adjust program based on progress"],
    "ar": ["ركز على الحمل التدريجي", "تأكد من الشكل الصحيح لمنع الإصابة", "وازن تدريب القوة مع عمل المرونة", "اسمح بالتعافي الكافي بين الجلسات", "عدل البرنامج بناءً على التقدم"]
  },
  "evidence_based_links": [
    {
      "title_en": "Glute Training for Strength and Hypertrophy",
      "title_ar": "تدريب الأرداف للقوة وتضخم العضلات",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
    },
    {
      "title_en": "Progressive Overload for Muscle Growth",
      "title_ar": "الحمل التدريجي لنمو العضلات",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
    }
  ],
  "disclaimer": {
    "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a healthcare professional before starting any new fitness program.",
    "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. استشر دائمًا مع أخصائي الرعاية الصحية قبل بدء أي برنامج لياقة جديد."
  }
}
```

```json
{
  "title_en": "TotalReshape Plan",
  "title_ar": "خطة إعادة الشكل الكامل",
  "description_en": "A comprehensive body transformation program that combines strength training, cardio, and nutrition to help individuals achieve their fitness goals and reshape their physique.",
  "description_ar": "برنامج تحويل شامل للجسم يجمع بين تدريب القوة والتمارين القلبية والتغذية لمساعدة الأفراد على تحقيق أهداف اللياقة البدنية وإعادة تشكيل أجسامهم.",
  "management_plan": {
    "immediate_care": {
      "en": ["Assess current fitness level and set realistic goals", "Start with moderate intensity workouts", "Focus on proper form and technique", "Establish a consistent workout schedule", "Begin tracking nutrition and progress"],
      "ar": ["قيم مستوى اللياقة الحالي وحدد أهدافًا واقعية", "ابدأ بتمارين شدة معتدلة", "ركز على الشكل والتقنية الصحيحين", "أنشئ جدول تمارين ثابت", "ابدأ في تتبع التغذية والتقدم"]
    },
    "short_term_care": {
      "en": ["Gradually increase workout intensity", "Incorporate more variety in exercises", "Focus on balanced nutrition", "Ensure adequate rest and recovery", "Adjust plan based on progress and feedback"],
      "ar": ["زد شدة التمرين تدريجيًا", "أدرج المزيد من التنوع في التمارين", "ركز على التغذية المتوازنة", "تأكد من الراحة والتعافي الكافيين", "عدل الخطة بناءً على التقدم والتغذية الراجعة"]
    },
    "long_term_care": {
      "en": ["Maintain consistent workout routine", "Continue to challenge yourself with new exercises", "Focus on sustainable nutrition habits", "Periodize training to prevent plateaus", "Adjust goals as you progress"],
      "ar": ["حافظ على روتين تمارين ثابت", "استمر في تحدي نفسك بتمارين جديدة", "ركز على عادات التغذية المستدامة", "قسّم التدريب لمنع الهضبات", "عدل الأهداف مع تقدمك"]
    }
  },
  "supplements": [
    {
      "name_en": "Protein Powder",
      "name_ar": "مسحوق البروتين",
      "dosage_en": "20-30 g within 30 minutes after workout",
      "dosage_ar": "20-30 جم في غضون 30 دقيقة بعد التمرين",
      "benefits_en": "Supports muscle repair and growth",
      "benefits_ar": "يدعم إصلاح العضلات ونموها"
    },
    {
      "name_en": "Multivitamin",
      "name_ar": "الفيتامينات المتعددة",
      "dosage_en": "1 serving daily",
      "dosage_ar": "حصة واحدة يوميًا",
      "benefits_en": "Fills nutritional gaps in diet",
      "benefits_ar": "يسد الفجوات الغذائية في النظام الغذائي"
    },
    {
      "name_en": "Omega-3 Fatty Acids",
      "name_ar": "الأحماض الدهنية أوميغا-3",
      "dosage_en": "2-3 g daily",
      "dosage_ar": "2-3 جم يوميًا",
      "benefits_en": "Supports overall health and reduces inflammation",
      "benefits_ar": "يدعم الصحة العامة ويقلل الالتهاب"
    }
  ],
  "medications": [],
  "plants_and_recipes": [
    {
      "plant_name_en": "Green Smoothie",
      "name_ar": "العصير الأخضر",
      "recipe_en": "Blend 1 cup spinach, 1/2 banana, 1/2 cup berries, 1 tbsp chia seeds, and 1 cup almond milk. Drink for breakfast or as a snack.",
      "recipe_ar": "اخلط كوبًا من السبانخ، ونصف موزة، ونصف كوب من التوت، وملعقة كبيرة من بذور الشيا، وكوبًا من حليب اللوز. اشربه للإفطار أو كوجبة خفيفة.",
      "benefits_en": "Provides vitamins, minerals, and antioxidants",
      "benefits_ar": "يوفر الفيتامينات والمعادن ومضادات الأكسدة"
    },
    {
      "plant_name_en": "Protein Bowl",
      "name_ar": "وعاء البروتين",
      "recipe_en": "Combine 1 cup quinoa, 4 oz grilled chicken, 1 cup mixed vegetables, and 1 tbsp olive oil. Consume as a balanced meal.",
      "recipe_ar": "ادمج كوبًا من الكينوا، و4 أوقيات من الدجاج المشوي، وكوبًا من الخضار المختلطة، وملعقة كبيرة من زيت الزيتون. تناوله كوجبة متوازنة.",
      "benefits_en": "Provides balanced macronutrients for muscle recovery",
      "benefits_ar": "يوفر مغذيات كبرى متوازنة لتعافي العضلات"
    }
  ],
  "gym_tips": {
    "en": ["Balance strength training with cardio", "Focus on compound movements for efficiency", "Ensure proper form to prevent injury", "Progressively increase weight or intensity", "Allow adequate rest between training sessions"],
    "ar": ["وازن بين تدريب القوة والتمارين القلبية", "ركز على الحركات المركبة للكفاءة", "تأكد من الشكل الصحيح لمنع الإصابة", "زد الوزن أو الشدة تدريجيًا", "اسمح بالراحة الكافية بين جلسات التدريب"]
  },
  "workout_plan": {
    "month_1": {
      "exercises_en": ["Full body strength training (3x/week)", "Moderate cardio (2x/week)", "Core exercises (3x/week)", "Flexibility work (daily)"],
      "exercises_ar": ["تدريب القوة للجسم بالكامل (3 مرات/أسبوع)", "تمارين قلبية معتدلة (مرتين/أسبوع)", "تمارين الجذع (3 مرات/أسبوع)", "عمل المرونة (يوميًا)"],
      "frequency_en": "5 times per week, 45-60 minutes per session",
      "frequency_ar": "5 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
    },
    "month_2": {
      "exercises_en": ["Upper/lower body split (4x/week)", "HIIT cardio (2x/week)", "Core and stability work (3x/week)", "Active recovery (1x/week)"],
      "exercises_ar": ["تقسيم الجزء العلوي/السفلي من الجسم (4 مرات/أسبوع)", "تمارين القلبية HIIT (مرتين/أسبوع)", "عمل الجذع والاستقرار (3 مرات/أسبوع)", "التعافي النشط (مرة/أسبوع)"],
      "frequency_en": "5-6 times per week, 50-60 minutes per session",
      "frequency_ar": "5-6 مرات في الأسبوع، 50-60 دقيقة لكل جلسة"
    },
    "month_3": {
      "exercises_en": ["Push/pull/legs split (4-5x/week)", "Mixed cardio (2-3x/week)", "Advanced core work (3x/week)", "Yoga or stretching (1-2x/week)"],
      "exercises_ar": ["تقسيم الدفع/السحب/الساقين (4-5 مرات/أسبوع)", "تمارين قلبية مختلطة (2-3 مرات/أسبوع)", "عمل الجذع المتقدم (3 مرات/أسبوع)", "اليوجا أو التمدد (1-2 مرات/أسبوع)"],
      "frequency_en": "6 times per week, 60 minutes per session",
      "frequency_ar": "6 مرات في الأسبوع، 60 دقيقة لكل جلسة"
    }
  },
  "recovery_exercises": [
    {
      "name_en": "Foam Rolling",
      "name_ar": "اللف باستخدام الفوم رولر",
      "instructions_en": "Roll major muscle groups on a foam roller for 30-60 seconds per area. Perform 1-2 times daily.",
      "instructions_ar": "لف مجموعات العضلات الرئيسية على الفوم رولر لمدة 30-60 ثانية لكل منطقة. قم بذلك 1-2 مرات يوميًا.",
      "benefits_en": "Releases muscle tension and improves flexibility",
      "benefits_ar": "يطلق توتر العضلات ويحسن المرونة"
    },
    {
      "name_en": "Active Recovery",
      "name_ar": "التعافي النشط",
      "instructions_en": "Perform low-intensity activities such as walking, swimming, or cycling for 20-30 minutes on rest days.",
      "instructions_ar": "قم بأداء أنشطة منخفضة الشدة مثل المشي أو السباحة أو ركوب الدراجة لمدة 20-30 دقيقة في أيام الراحة.",
      "benefits_en": "Promotes blood flow and aids recovery",
      "benefits_ar": "يعزز تدفق الدم ويساعد في التعافي"
    }
  ],
  "rehabilitation_strategies": {
    "en": ["Balance strength training with cardio", "Focus on progressive overload", "Ensure adequate nutrition and hydration", "Prioritize sleep and recovery", "Adjust program based on progress"],
    "ar": ["وازن بين تدريب القوة والتمارين القلبية", "ركز على الحمل التدريجي", "تأكد من التغذية والترطيب الكافيين", "أعطي الأولوية للنوم والتعافي", "عدل البرنامج بناءً على التقدم"]
  },
  "evidence_based_links": [
    {
      "title_en": "Combined Strength and Cardio Training",
      "title_ar": "التدريب المركب للقوة والقلب",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
    },
    {
      "title_en": "Nutrition for Body Transformation",
      "title_ar": "التغذية لتحويل الجسم",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
    }
  ],
  "disclaimer": {
    "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a healthcare professional before starting any new fitness program.",
    "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. استشر دائمًا مع أخصائي الرعاية الصحية قبل بدء أي برنامج لياقة جديد."
  }
}
```

```json
{
  "title_en": "BulkBlast 5×5",
  "title_ar": "انفجار كتلة 5×5",
  "description_en": "A strength training program focused on building muscle mass and increasing strength using the classic 5×5 training method with compound movements.",
  "description_ar": "برنامج تدريب قوة يركز على بناء كتلة العضلات وزيادة القوة باستخدام طريقة التدريب الكلاسيكية 5×5 مع الحركات المركبة.",
  "management_plan": {
    "immediate_care": {
      "en": ["Start with lighter weights to master form", "Focus on compound movements", "Ensure adequate rest between sets", "Track your lifts and progress", "Prioritize proper form over heavy weight"],
      "ar": ["ابدأ بأوزان أخف لإتقان الشكل", "ركز على الحركات المركبة", "تأكد من الراحة الكافية بين المجموعات", "تتبع رفعاتك وتقدمك", "أعطِ الأولوية للشكل الصحيح على الوزن الثقيل"]
    },
    "short_term_care": {
      "en": ["Gradually increase weight as you progress", "Focus on progressive overload", "Ensure adequate protein intake", "Allow sufficient recovery between workouts", "Adjust program based on recovery and progress"],
      "ar": ["زد الوزن تدريجيًا مع تقدمك", "ركز على الحمل التدريجي", "تأكد من تناول البروتين الكافي", "اسمح بالتعافي الكافي بين التمارين", "عدل البرنامج بناءً على التعافي والتقدم"]
    },
    "long_term_care": {
      "en": ["Continue with progressive overload", "Periodize training to prevent plateaus", "Focus on nutrition to support muscle growth", "Ensure adequate sleep for recovery", "Consider deload weeks as needed"],
      "ar": ["استمر في الحمل التدريجي", "قسّم التدريب لمنع الهضبات", "ركز على التغذية لدعم نمو العضلات", "تأكد من النوم الكافي للتعافي", "فكر في أسابيع تخفيف الحمل عند الحاجة"]
    }
  },
  "supplements": [
    {
      "name_en": "Protein Powder",
      "name_ar": "مسحوق البروتين",
      "dosage_en": "20-30 g within 30 minutes after workout",
      "dosage_ar": "20-30 جم في غضون 30 دقيقة بعد التمرين",
      "benefits_en": "Supports muscle repair and growth",
      "benefits_ar": "يدعم إصلاح العضلات ونموها"
    },
    {
      "name_en": "Creatine",
      "name_ar": "الكرياتين",
      "dosage_en": "3-5 g daily",
      "dosage_ar": "3-5 جم يوميًا",
      "benefits_en": "Improves strength and power output",
      "benefits_ar": "يحسن القوة وإنتاج الطاقة"
    },
    {
      "name_en": "Beta-Alanine",
      "name_ar": "بيتا-ألانين",
      "dosage_en": "2-5 g daily",
      "dosage_ar": "2-5 جم يوميًا",
      "benefits_en": "May improve muscular endurance",
      "benefits_ar": "قد يحسن تحمل العضلات"
    }
  ],
  "medications": [],
  "plants_and_recipes": [
    {
      "plant_name_en": "Protein Shake",
      "name_ar": "مشروب البروتين",
      "recipe_en": "Mix 1 scoop of protein powder with water or milk. Consume within 30 minutes after workout.",
      "recipe_ar": "اخلط مغرفة واحدة من مسحوق البروتين مع الماء أو الحليب. تناوله في غضون 30 دقيقة بعد التمرين.",
      "benefits_en": "Provides quick protein for muscle recovery",
      "benefits_ar": "يوفر بروتين سريع لتعافي العضلات"
    },
    {
      "plant_name_en": "High-Calorie Smoothie",
      "name_ar": "سموذي عالي السعرات",
      "recipe_en": "Blend 1 banana, 1 cup oats, 2 tbsp peanut butter, 1 cup milk, and 1 scoop protein powder. Drink as a meal or snack.",
      "recipe_ar": "اخلط موزة واحدة، وكوبًا من الشوفان، وملعقتين كبيرتين من زبدة الفول السوداني، وكوبًا من الحليب، ومغرفة واحدة من مسحوق البروتين. اشربه كوجبة أو وجبة خفيفة.",
      "benefits_en": "Provides calories and nutrients for muscle growth",
      "benefits_ar": "يوفر السعرات الحرارية والمغذيات لنمو العضلات"
    }
  ],
  "gym_tips": {
    "en": ["Focus on progressive overload", "Prioritize compound movements", "Ensure proper form before adding weight", "Allow adequate rest between sets", "Track your progress consistently"],
    "ar": ["ركز على الحمل التدريجي", "أعطِ الأولوية للحركات المركبة", "تأكد من الشكل الصحيح قبل إضافة الوزن", "اسمح بالراحة الكافية بين المجموعات", "تتبع تقدمك باستمرار"]
  },
  "workout_plan": {
    "month_1": {
      "exercises_en": ["Squat: 5×5", "Bench Press: 5×5", "Barbell Row: 5×5", "Overhead Press: 5×5", "Deadlift: 1×5"],
      "exercises_ar": ["القرفصاء: 5×5", "ضغط البنش: 5×5", "صف البار: 5×5", "الضغط فوق الرأس: 5×5", "الدفعة المميتة: 1×5"],
      "frequency_en": "3 times per week, 45-60 minutes per session",
      "frequency_ar": "3 مرات في الأسبوع، 45-60 دقيقة لكل جلسة"
    },
    "month_2": {
      "exercises_en": ["Squat: 5×5", "Bench Press: 5×5", "Barbell Row: 5×5", "Overhead Press: 5×5", "Deadlift: 5×3"],
      "exercises_ar": ["القرفصاء: 5×5", "ضغط البنش: 5×5", "صف البار: 5×5", "الضغط فوق الرأس: 5×5", "الدفعة المميتة: 5×3"],
      "frequency_en": "3 times per week, 60 minutes per session",
      "frequency_ar": "3 مرات في الأسبوع، 60 دقيقة لكل جلسة"
    },
    "month_3": {
      "exercises_en": ["Squat: 5×5", "Bench Press: 5×5", "Barbell Row: 5×5", "Overhead Press: 5×5", "Deadlift: 5×5"],
      "exercises_ar": ["القرفصاء: 5×5", "ضغط البنش: 5×5", "صف البار: 5×5", "الضغط فوق الرأس: 5×5", "الدفعة المميتة: 5×5"],
      "frequency_en": "3 times per week, 60-75 minutes per session",
      "frequency_ar": "3 مرات في الأسبوع، 60-75 دقيقة لكل جلسة"
    }
  },
  "recovery_exercises": [
    {
      "name_en": "Foam Rolling",
      "name_ar": "اللف باستخدام الفوم رولر",
      "instructions_en": "Roll major muscle groups on a foam roller for 30-60 seconds per area. Perform 1-2 times daily.",
      "instructions_ar": "لف مجموعات العضلات الرئيسية على الفوم رولر لمدة 30-60 ثانية لكل منطقة. قم بذلك 1-2 مرات يوميًا.",
      "benefits_en": "Releases muscle tension and improves flexibility",
      "benefits_ar": "يطلق توتر العضلات ويحسن المرونة"
    },
    {
      "name_en": "Dynamic Stretching",
      "name_ar": "التمدد الديناميكي",
      "instructions_en": "Perform dynamic stretches such as leg swings, arm circles, and torso twists before workouts. Perform 1-2 times daily.",
      "instructions_ar": "قم بأداء تمديدات ديناميكية مثل تمايل الساق ودوائر الذراع والتواءات الجذع قبل التمارين. قم بذلك 1-2 مرات يوميًا.",
      "benefits_en": "Improves flexibility and prepares muscles for activity",
      "benefits_ar": "يحسن المرونة ويحضر العضلات للنشاط"
    }
  ],
  "rehabilitation_strategies": {
    "en": ["Focus on progressive overload", "Ensure adequate recovery between workouts", "Prioritize proper form over heavy weight", "Consider deload weeks as needed", "Adjust program based on progress"],
    "ar": ["ركز على الحمل التدريجي", "تأكد من التعافي الكافي بين التمارين", "أعطِ الأولوية للشكل الصحيح على الوزن الثقيل", "فكر في أسابيع تخفيف الحمل عند الحاجة", "عدل البرنامج بناءً على التقدم"]
  },
  "evidence_based_links": [
    {
      "title_en": "Strength Training for Muscle Growth",
      "title_ar": "تدريب القوة لنمو العضلات",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
    },
    {
      "title_en": "Progressive Overload Principles",
      "title_ar": "مبادئ الحمل التدريجي",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
    }
  ],
  "disclaimer": {
    "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a healthcare professional before starting any new fitness program.",
    "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. استشر دائمًا مع أخصائي الرعاية الصحية قبل بدء أي برنامج لياقة جديد."
  }
}
```

```json
{
  "title_en": "LifterShoulder Rx",
  "title_ar": "علاج كتف الرافع",
  "description_en": "A specialized program designed to prevent and rehabilitate shoulder injuries common in weightlifters, focusing on mobility, stability, and strengthening exercises.",
  "description_ar": "برنامج متخصص مصمم للوقاية من إصابات الكتف وإعادة تأهيلها الشائعة بين رافعي الأثقال، مع التركيز على تمارين الحركة والاستقرار والتقوية.",
  "management_plan": {
    "immediate_care": {
      "en": ["Rest the affected shoulder", "Apply ice to reduce inflammation", "Avoid exercises that cause pain", "Use over-the-counter pain relievers if needed", "Seek medical evaluation if pain persists"],
      "ar": ["ارح الكتف المصاب", "ضع الثلج لتقليل الالتهاب", "تجنب التمارين التي تسبب الألم", "استخدم مسكنات الألم التي لا تستلزم وصفة طبية إذا لزم الأمر", "اطلب التقييم الطبي إذا استمر الألم"]
    },
    "short_term_care": {
      "en": ["Focus on mobility exercises", "Begin gentle strengthening exercises", "Use proper form during all movements", "Avoid heavy overhead lifting", "Consider physical therapy if needed"],
      "ar": ["ركز على تمارين الحركة", "ابدأ تمارين التقوية اللطيفة", "استخدم الشكل الصحيح خلال جميع الحركات", "تجنب الرفع الثقيل فوق الرأس", "فكر في العلاج الطبيعي إذا لزم الأمر"]
    },
    "long_term_care": {
      "en": ["Continue with shoulder strengthening exercises", "Focus on proper lifting technique", "Include shoulder mobility work in warm-ups", "Balance pushing and pulling exercises", "Listen to your body and adjust as needed"],
      "ar": ["استمر في تمارين تقوية الكتف", "ركز على تقنية الرفع المناسبة", "أدرج عمل حركة الكتف في الإحماء", "وازن بين تمارين الدفع والسحب", "استمع إلى جسمك وعدل حسب الحاجة"]
    }
  },
  "supplements": [
    {
      "name_en": "Omega-3 Fatty Acids",
      "name_ar": "الأحماض الدهنية أوميغا-3",
      "dosage_en": "2-3 g daily",
      "dosage_ar": "2-3 جم يوميًا",
      "benefits_en": "Reduces inflammation throughout the body",
      "benefits_ar": "يقلل الالتهاب في جميع أنحاء الجسم"
    },
    {
      "name_en": "Vitamin D",
      "name_ar": "فيتامين د",
      "dosage_en": "1000-2000 IU daily",
      "dosage_ar": "1000-2000 وحدة دولية يوميًا",
      "benefits_en": "Supports bone and muscle health",
      "benefits_ar": "يدعم صحة العظام والعضلات"
    },
    {
      "name_en": "Glucosamine and Chondroitin",
      "name_ar": "جلوكوزامين وكوندرويتين",
      "dosage_en": "1500 mg glucosamine and 800-1200 mg chondroitin daily",
      "dosage_ar": "1500 مجم جلوكوزامين و 800-1200 مجم كوندرويتين يوميًا",
      "benefits_en": "Supports joint health and may reduce pain",
      "benefits_ar": "يدعم صحة المفاصل وقد يقلل الألم"
    }
  ],
  "medications": [
    {
      "name_en": "NSAIDs (Ibuprofen, Naproxen)",
      "name_ar": "مضادات الالتهاب غير الستيرويدية (إيبوبروفين، نابروكسين)",
      "dosage_en": "As directed by physician",
      "dosage_ar": "حسب توجيهات الطبيب",
      "benefits_en": "Reduces pain and inflammation",
      "benefits_ar": "يقلل الألم والالتهاب",
      "cautions_en": "May cause stomach irritation. Take with food. Not recommended for long-term use.",
      "cautions_ar": "قد يسبب تهيج المعدة. تناوله مع الطعام. لا يوصى به للاستخدام طويل الأمد."
    }
  ],
  "plants_and_recipes": [
    {
      "plant_name_en": "Turmeric",
      "name_ar": "الكركم",
      "recipe_en": "Mix 1 teaspoon of turmeric powder with warm milk and honey. Drink once daily.",
      "recipe_ar": "اخلط ملعقة صغيرة من مسحوق الكركم مع الحليب الدافئ والعسل. اشربه مرة واحدة يوميًا.",
      "benefits_en": "Curcumin has anti-inflammatory properties that may help reduce joint pain",
      "benefits_ar": "الكركمين له خصائص مضادة للالتهاب قد تساعد في تقليل ألم المفاصل"
    },
    {
      "plant_name_en": "Ginger",
      "name_ar": "الزنجبيل",
      "recipe_en": "Steep 1-2 inches of fresh ginger root in hot water for 10 minutes. Drink 2-3 cups daily.",
      "recipe_ar": "انقع 1-2 بوصة من جذر الزنجبيل الطازج في الماء الساخن لمدة 10 دقائق. اشرب 2-3 أكواب يوميًا.",
      "benefits_en": "Has anti-inflammatory properties that may help reduce pain",
      "benefits_ar": "له خصائص مضادة للالتهاب قد تساعد في تقليل الألم"
    }
  ],
  "gym_tips": {
    "en": ["Always warm up properly before lifting", "Focus on proper form over heavy weight", "Balance pushing and pulling exercises", "Include shoulder mobility work in warm-ups", "Avoid exercises that cause shoulder pain"],
    "ar": ["قم دائمًا بالإحماء المناسب قبل الرفع", "ركز على الشكل الصحيح على الوزن الثقيل", "وازن بين تمارين الدفع والسحب", "أدرج عمل حركة الكتف في الإحماء", "تجنب التمارين التي تسبب ألم الكتف"]
  },
  "workout_plan": {
    "month_1": {
      "exercises_en": ["Shoulder dislocations with band", "Face pulls", "External rotations", "Scapular retractions"],
      "exercises_ar": ["خلع الكتف بالحزام", "سحب الوجه", "الدوران الخارجي", "سحب الكتف"],
      "frequency_en": "3 times per week, 20-30 minutes per session",
      "frequency_ar": "3 مرات في الأسبوع، 20-30 دقيقة لكل جلسة"
    },
    "month_2": {
      "exercises_en": ["Band pull-aparts", "Wall slides", "I-Y-T raises", "Scapular push-ups"],
      "exercises_ar": ["فصل الحزام", "انزلاقات الحائط", "رفع I-Y-T", "دفعات الكتف"],
      "frequency_en": "3-4 times per week, 30-40 minutes per session",
      "frequency_ar": "3-4 مرات في الأسبوع، 30-40 دقيقة لكل جلسة"
    },
    "month_3": {
      "exercises_en": ["Landmine presses", "Single-arm dumbbell rows", "Farmers walks", "Overhead carries"],
      "exercises_ar": ["ضغط الألغام", "صف الدمبل بذراع واحدة", "مشية المزارع", "الحمل فوق الرأس"],
      "frequency_en": "4 times per week, 40-50 minutes per session",
      "frequency_ar": "4 مرات في الأسبوع، 40-50 دقيقة لكل جلسة"
    }
  },
  "recovery_exercises": {
    "name_en": "Shoulder Dislocations",
    "name_ar": "خلع الكتف",
    "instructions_en": "Hold a resistance band with both hands in front of you. Slowly raise your arms overhead and behind you, keeping your arms straight. Return to starting position. Repeat 10 times, 2-3 times daily.",
    "instructions_ar": "امسك حزام المقاومة بكلتا يديك أمامك. ارفع ذراعيك ببطء فوق رأسك وخلفك، مع الحفاظ على ذراعيك مستقيمة. عد إلى وضع البداية. كرر 10 مرات، 2-3 مرات يوميًا.",
    "benefits_en": "Improves shoulder mobility and flexibility",
    "benefits_ar": "يحسن حركة الكتف ومرونته"
  },
  {
    "name_en": "Face Pulls",
    "name_ar": "سحب الوجه",
    "instructions_en": "Attach a rope to a cable machine at head height. Grab the rope with both hands and pull toward your face, keeping your elbows high. Slowly return to starting position. Perform 3 sets of 10-15 repetitions, 2-3 times daily.",
    "instructions_ar": "ثبت حبلاً في جهاز الكابل على ارتفاع الرأس. امسك الحبل بكلتا يديك واسحبه نحو وجهك، مع الحفاظ على مرفقيك مرتفعين. عد ببطء إلى وضع البداية. قم بأداء 3 مجموعات من 10-15 تكرارًا، 2-3 مرات يوميًا.",
    "benefits_en": "Strengthens rear delts and upper back muscles",
    "benefits_ar": "يقوي الأ deltoids الخلفية وعضلات الجزء العلوي من الظهر"
  }
  ],
  "rehabilitation_strategies": {
    "en": ["Focus on shoulder mobility and stability", "Balance pushing and pulling exercises", "Use proper form during all movements", "Gradually increase weight and intensity", "Listen to your body and avoid painful movements"],
    "ar": ["ركز على حركة الكتف واستقراره", "وازن بين تمارين الدفع والسحب", "استخدم الشكل الصحيح خلال جميع الحركات", "زد الوزن والشدة تدريجيًا", "استمع إلى جسمك وتجنب الحركات المؤلمة"]
  },
  "evidence_based_links": [
    {
      "title_en": "Shoulder Injury Prevention in Weightlifters",
      "title_ar": "الوقاية من إصابات الكتف في رافعي الأثقال",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353176/"
    },
    {
      "title_en": "Rehabilitation Exercises for Shoulder Injuries",
      "title_ar": "تمارين إعادة التأهيل لإصابات الكتف",
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6127970/"
    }
  ],
  "disclaimer": {
    "en": "This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a healthcare professional before starting any new fitness program.",
    "ar": "هذه المعلومات هي لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية المهنية أو التشخيص أو العلاج. استشر دائمًا مع أخصائي الرعاية الصحية قبل بدء أي برنامج لياقة جديد."
  }
}
```


