/*
  menu-data.js
  ------------
  SINGLE SOURCE OF TRUTH for the Grill House menu.

  Edit ONLY this file to:
    (a) change a price       -> find the item, edit its "price" number
    (b) add a new item       -> add an { name, price, desc } object to a category's "items" array
    (c) add a whole category -> add a new { id, category, nameEn, layout, items } object below

  index.html and script.js never hardcode menu content — they read this
  array and render the category chips + item cards automatically. New
  categories added here appear in the nav and on the page with no other
  changes needed.

  Category record shape:
    id        - unique id (kebab-case, "cat-xxx"), used for the section
                anchor and the chip that scrolls to it. Keep unique.
    category  - Arabic category name shown in the UI
    nameEn    - small English sub-label shown under the Arabic name
    image     - path to the category's header banner image
                (files live in assets/categories/, logo watermark is
                added automatically by script.js — no per-item work needed)
                Optional: if omitted, no banner is rendered for that category.
    layout    - "cards" (default) for full description cards, or "row"
                for a compact horizontal-scroll pill list with no
                description (used for Drinks)
    items     - array of { name, price, desc }
                "desc" is optional (Drinks items omit it)
*/

const menuData = [

  // ---------------------------------------------------------------
  // برجر — Burgers
  // ---------------------------------------------------------------
  {
    id: "cat-burger",
    category: "برجر",
    nameEn: "Burgers",
    image: "assets/categories/burger.jpg",
    layout: "cards",
    items: [
      { name: "كرسبي برجر", price: 18, desc: "قطعة دجاج مقرمشة مع خس طازج وصوص خاص في خبز طري." },
      { name: "برجر لحمة", price: 25, desc: "قرص لحم مشوي طازج مع جبنة ذائبة وصوص البيت." },
      { name: "برجر ستيك جاج مشوي", price: 18, desc: "شرائح صدر دجاج مشوية على الفحم مع خس وصوص خاص في خبز طري." },
      { name: "كرنشي برجر", price: 20, desc: "قطعة دجاج كرنشي بطبقة مضاعفة مقرمشة مع صوص خاص في خبز طري." }
    ]
  },

  // ---------------------------------------------------------------
  // ساندويشات — Sandwiches (baguette)
  // ---------------------------------------------------------------
  {
    id: "cat-sandwiches",
    category: "ساندويشات",
    nameEn: "Sandwiches",
    image: "assets/categories/sandwiches.jpg",
    layout: "cards",
    items: [
      { name: "باجيت شنيتسل عادي", price: 17, desc: "شنيتسل دجاج مقرمش كلاسيكي داخل خبز باجيت طازج." },
      { name: "باجيت شنيتسل بزعتر", price: 17, desc: "شنيتسل مقرمش بنكهة الزعتر البلدي داخل باجيت." },
      { name: "باجيت شنيتسل حار", price: 17, desc: "شنيتسل مقرمش مع صوص حار مميز داخل باجيت." },
      { name: "باجيت برجيت", price: 17, desc: "شاورما دجاج بالتتبيلة الخاصة داخل خبز باجيت طازج." },
      { name: "باجيت مسحب", price: 17, desc: "دجاج مسحب متبل مع صوص الثوم والخضار داخل باجيت." },
      { name: "باجيت ستيك جاج", price: 17, desc: "شرائح صدر دجاج مشوية على الفحم مع خضار طازجة." },
      { name: "معراف", price: 17, desc: "لحم مفروم متبل مشوي مع خضار وصوص داخل خبز باجيت طازج." },
      { name: "ماركيز (سجق)", price: 25, desc: "سجق مشوي متبل بالبهارات الخاصة داخل خبز باجيت طازج." }
    ]
  },

  // ---------------------------------------------------------------
  // السلطات — Salads
  // ---------------------------------------------------------------
  {
    id: "cat-salads",
    category: "السلطات",
    nameEn: "Salads",
    image: "assets/categories/salads.jpg",
    layout: "cards",
    items: [
      { name: "سلطة السيزر مع جاج", price: 25, desc: "خس روماني ودجاج مشوي وجبنة بارميزان مع صوص سيزر." },
      { name: "صحن سلطات مشكل", price: 10, desc: "تشكيلة سلطات طازجة متنوعة من اختيار الشيف." },
      { name: "تبولة كينوا", price: 20, desc: "تبولة صحية بحبوب الكينوا والخضار الطازجة وعصير الليمون." },
      { name: "يونانية", price: 20, desc: "سلطة يونانية بالخضار الطازجة وجبنة الفيتا وزيتون كالاماتا." },
      { name: "جرين فريش", price: 25, desc: "مزيج من الخضار الورقية الطازجة مع صوص خفيف منعش." }
    ]
  },

  // ---------------------------------------------------------------
  // المقبلات — Appetizers
  // ---------------------------------------------------------------
  {
    id: "cat-appetizers",
    category: "المقبلات",
    nameEn: "Appetizers",
    image: "assets/categories/appetizers.jpg",
    layout: "cards",
    items: [
      { name: "الأجنحة", price: 25, desc: "أجنحة دجاج متبلة ومقلية بنكهة مميزة." },
      { name: "صحن مشكل كرسبي (حلقات بصل + أصابع موزاريلا + كورات بطاطا)", price: 25, desc: "تشكيلة مقرمشة من حلقات البصل وأصابع الموزاريلا وكورات البطاطا." }
    ]
  },

  // ---------------------------------------------------------------
  // البطاطا — Potatoes
  // ---------------------------------------------------------------
  {
    id: "cat-potatoes",
    category: "البطاطا",
    nameEn: "Potatoes",
    image: "assets/categories/potatoes.jpg",
    layout: "cards",
    items: [
      { name: "بطاطا عادي صغير", price: 5, desc: "بطاطا ذهبية مقرمشة، مقلية طازة." },
      { name: "بطاطا عادي كبير", price: 10, desc: "بطاطا ذهبية مقرمشة، مقلية طازة، حجم كبير." },
      { name: "بطاطا كرلي صغير", price: 10, desc: "بطاطا كرلي مقرمشة بتتبيلة مميزة." },
      { name: "بطاطا كرلي كبير", price: 18, desc: "بطاطا كرلي مقرمشة بتتبيلة مميزة، حجم كبير." },
      { name: "بطاطا ميكس", price: 18, desc: "مزيج من البطاطا العادية والكرلي المقرمشة، تشكيلة متكاملة." }
    ]
  },

  // ---------------------------------------------------------------
  // الماجاش — Majash Wraps
  // ---------------------------------------------------------------
  {
    id: "cat-majash",
    category: "الماجاش",
    nameEn: "Majash Wraps",
    image: "assets/categories/majash.jpg",
    layout: "cards",
    items: [
      { name: "ماجاش كبير شنيتسل", price: 40, desc: "شنيتسل مقرمش ملفوف مع خضار وصوصات داخل خبز ماجاش كبير." },
      { name: "ماجاش كبير مسحب", price: 40, desc: "دجاج مسحب متبل ملفوف مع خضار وصوصات داخل خبز ماجاش كبير." },
      { name: "ماجناش برجيت", price: 40, desc: "شاورما برجيت ملفوفة مع خضار وصوصات داخل خبز كبير." }
    ]
  },

  // ---------------------------------------------------------------
  // وجبات صحية — Healthy Meals
  // ---------------------------------------------------------------
  {
    id: "cat-healthy",
    category: "وجبات صحية",
    nameEn: "Healthy Meals",
    image: "assets/categories/healthy-meals.jpg",
    layout: "cards",
    items: [
      { name: "وجبة برجيت شاورما", price: 25, desc: "شاورما برجيت الدجاج بالتتبيلة الخاصة تقدم مع أرز وسلطة." },
      { name: "وجبة مسحب دجاج", price: 25, desc: "دجاج مسحب متبل يقدم مع أرز وسلطة جانبية." },
      { name: "وجبة سجق", price: 30, desc: "سجق مشوي متبل يقدم مع أرز وسلطة جانبية." },
      { name: "شنيتسل بكل الأنواع", price: 25, desc: "شنيتسل دجاج مقرمش بنكهتك المفضلة يقدم مع أرز وسلطة." },
      { name: "وجبة ستيك دجاج", price: 25, desc: "شرائح صدر دجاج مشوية على الفحم تقدم مع أرز وسلطة." }
    ]
  },

  // ---------------------------------------------------------------
  // المشروبات — Drinks (last section on the page)
  // ---------------------------------------------------------------
  {
    id: "cat-drinks",
    category: "المشروبات",
    nameEn: "Drinks",
    image: "assets/categories/drinks.jpg",
    layout: "row",
    items: [
      { name: "XL (مشروب طاقة)", price: 5 },
      { name: "بلو", price: 4 },
      { name: "سبرايت", price: 3 },
      { name: "كولا", price: 3 },
      { name: "فانتا", price: 3 },
      { name: "عصير", price: 4 },
      { name: "مي", price: 2 }
    ]
  }

];

// Allow reuse under Node (e.g. for testing) without affecting the browser.
if (typeof module !== "undefined" && module.exports) {
  module.exports = menuData;
}
