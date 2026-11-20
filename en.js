/* English interface: switch equation writing (direction + digits) with the interface, and translate the remaining Arabic labels. */
(function(){
  var M={"+ أكمل": "+ Continue", "+ نص": "+ Text", "أجب باختصار": "Short answer", "أكمل الجدول": "Complete the table", "أكمل الفراغ": "Fill in the blank", "اختيار من متعدد مثل الكتاب": "Multiple choice (textbook style)", "اختيار من متعدد: ٣ بدائل": "Multiple choice: 3 options", "اختيار من متعدد: ٤ بدائل": "Multiple choice: 4 options", "المصطلح المناسب": "Matching term", "توصيل بدوائر": "Matching with circles", "توصيل": "Matching", "صح أو خطأ مثل الكتاب: أ ب في مربع": "True or false (textbook style, boxed)", "صح أو خطأ مع تصحيح الخطأ": "True or false with correction", "صح أو خطأ: (أ) و(ب)": "True or false: (a) and (b)", "صح أو خطأ: (ص) و(خ)": "True or false: (T) and (F)", "صح أو خطأ: ✓ و✗": "True or false: ✓ and ✗", "صنّف في جدول": "Classify in a table", "علّل": "Give a reason", "اكتب اسم الأداة: مدرج، جذر تكعيبي، فن، أسطوانة…": "Type a tool name: histogram, cube root, Venn, cylinder…", "التاريخ:      /      /\nالزمن: ...": "Date:      /      /\nTime: ...", "وزارة التربية\nالمنطقة التعليمية\nمدرسة ...": "Ministry of Education\nEducational District\nSchool ...", "المعادلة": "Equation", "النوع": "Type", "إغلاق": "Close", "مساحة الكتابة بالقلم": "Pen writing area", "رتّب أجزاء الورقة وعدد الأسئلة، فتُنشأ ورقة فارغة جاهزة للتعبئة": "Arrange the sheet parts and number of questions to create a blank sheet ready to fill", "أدرج ما في المحرر في ورقة العمل": "Insert the editor content into the worksheet", "أميري": "Amiri", "الاشتقاق والتكامل": "Derivatives and integrals", "الحساب العمودي": "Column arithmetic", "القسمة المتكررة والجذور…": "Repeated division and roots…", "المتتابعات والمجموعات": "Sequences and sets", "المكتبة فارغة. احفظ معادلة أو رسمًا أو ورقة عمل من الأزرار أعلاه.": "The library is empty. Save an equation, drawing or worksheet using the buttons above.", "المكتبة محفوظة في هذا المتصفح على هذا الجهاز. احفظ «نسخة احتياطية» من وقت لآخر في جهازك أو في Google Drive، وافتحها بـ «استعادة» على أي جهاز آخر.": "The library is saved in this browser on this device. Save a “Backup” from time to time to your device or Google Drive, and open it with “Restore” on any other device.", "الهامش الأيسر (cm)": "Left margin (cm)", "الهامش الأيمن (cm)": "Right margin (cm)", "الهامش السفلي (cm)": "Bottom margin (cm)", "الهامش العلوي (cm)": "Top margin (cm)", "حساب المثلثات": "Trigonometry", "رموز الهندسة": "Geometry symbols", "مساحة كتابة أكبر (تشغيل/إيقاف)": "More writing room (on/off)", "▭ مربع نص حر": "▭ Free text box", "✎ معادلة من المحرر": "✎ Equation from the editor", "🔍 ابحث عن أداة…  (Ctrl+K)": "🔍 Find a tool…  (Ctrl+K)", "📑 نماذج متعددة (أ، ب، ج)": "📑 Multiple versions (A, B, C)", "◉ ورقة إجابة للأسئلة الموضوعية": "◉ Answer sheet for objective questions", "🔍 نسخة بخط كبير": "🔍 Large-print copy", "✔ افحص الورقة": "✔ Check the sheet", "⭐ احفظ البند المحدد في بنك الأسئلة": "⭐ Save the selected item to the question bank", "✓ أدرج في السؤال": "✓ Insert into the question", "وضع المزيري مفعّل: إعدادات الخطوط أدناه متوقفة حتى تلغيه.": "Al-Mazeery mode is on: the font settings below are paused until you turn it off.", "↳ أدرج في ورقة العمل": "↳ Insert into worksheet", "يضيف ما في المحرر إلى آخر ورقة العمل": "Adds the editor content to the end of the worksheet"};
  var SKIP='#canvas,svg,#paper,script,style,textarea,input,[contenteditable],.no-tr,#tab-let,[data-keep-ar]';
  var origT=new WeakMap(), origA=new WeakMap(), ATTR=['title','placeholder','aria-label'];
  function tr(v){ if(!v) return null; var k=v.trim(); if(M[k]) return v.replace(k,M[k]);
    var c=k.indexOf(': Inserted'); if(c>0&&M[k.slice(0,c)]) return M[k.slice(0,c)]+k.slice(c); return null; }
  function isEn(){ return document.documentElement.lang==='en'; }
  function apply(root){
    if(!isEn()||!root) return;
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n,list=[];
    while(n=w.nextNode()) list.push(n);
    list.forEach(function(n){ var p=n.parentElement; if(!p||p.closest(SKIP)) return; var t=tr(n.nodeValue); if(t!==null&&t!==n.nodeValue){ if(!origT.has(n)) origT.set(n,n.nodeValue); n.nodeValue=t; } });
    var els=root.querySelectorAll?Array.prototype.slice.call(root.querySelectorAll('[title],[placeholder],[aria-label]')):[];
    if(root.getAttribute) els.push(root);
    els.forEach(function(e){ if(e.closest('.no-tr,#canvas,svg,#paper')) return;
      ATTR.forEach(function(a){ var v=e.getAttribute(a), t=tr(v); if(t!==null&&t!==v){ var o=origA.get(e)||{}; if(!(a in o)) o[a]=v; origA.set(e,o); e.setAttribute(a,t);} }); });
  }
  function restore(){
    var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;
    while(n=w.nextNode()){ if(origT.has(n)){ var o=origT.get(n), t=tr(o); if(n.nodeValue===t) n.nodeValue=o; origT.delete(n);} }
    document.querySelectorAll('[title],[placeholder],[aria-label]').forEach(function(e){ var o=origA.get(e); if(!o) return; for(var a in o){ if(e.getAttribute(a)===tr(o[a])) e.setAttribute(a,o[a]); } origA.delete(e); });
  }
  function syncWriting(){
    var en=isEn();
    var d=document.getElementById(en?'dirLtr':'dirRtl'), n=document.getElementById(en?'numEn':'numAr');
    if(d) d.click(); if(n) n.click();
  }
  var busy=false;
  var mo=new MutationObserver(function(ms){ if(busy||!isEn()) return; busy=true;
    try{ ms.forEach(function(m){ if(m.type==='childList') m.addedNodes.forEach(function(x){ if(x.nodeType===1) apply(x); else if(x.nodeType===3&&x.parentElement) apply(x.parentElement); });
      else if(m.type==='characterData'&&m.target.parentElement) apply(m.target.parentElement); else if(m.type==='attributes') apply(m.target.parentElement||m.target); }); }
    finally{ busy=false; } });
  document.addEventListener('DOMContentLoaded',function(){
    var b=document.getElementById('btnLang'); if(!b) return;
    b.addEventListener('click',function(){ setTimeout(function(){ syncWriting(); if(isEn()) apply(document.body); else restore(); },60); });
    setTimeout(function(){ if(isEn()) apply(document.body); },400);
    mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTR});
  });
})();
