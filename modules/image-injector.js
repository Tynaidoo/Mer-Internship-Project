(() => {
  const page = location.pathname.split('/').pop();
  const maps = {
    'module-1.html': [['1.png','The visual below explores what an internship can help you do']],
    'module-1-session-3.html': [['2.png','Onboarding can include']],
    'module-1-session-4.html': [['3.png','Why Does Company Culture Matter to Interns']],
    'module-2-session-1.html': [['4.png','At its core, professionalism means']],
    'module-2-session-2.html': [['5.png','Skills']],
    'module-2-session-3.html': [['6.png','The Trust Equation']],
    'module-2-session-5.html': [['7.png','four core domains of EQ'],['8.png','PAUSE']],
    'module-3-session-1.html': [['9.png','CLEAR framework']],
    'module-3-session-2.html': [['10.png','guide to verifying AI output']],
    'module-3-session-3.html': [['11.png','risks of AI']],
    'module-3-session-4.html': [['12.png','Anatomy of a Phishing Email']],
    'module-4-session-1.html': [['13.png','My Learning Fear Map']],
    'module-4-session-2.html': [['14.png','Know Your Time-Management Style']],
    'module-4-session-3.html': [['15.png','Project Management Triangle']],
    'module-5-session-1.html': [['16.png','Skills of an Effective Remote Worker']],
    'module-5-session-2.html': [['17.png','A supervisor sends an instruction']],
    'module-5-session-3.html': [['18.png','positive effect of feedback'],['19.png','Responding to Feedback Effectively']],
    'module-6-session-1.html': [['20.png','EXPERIENCE'],['21.png','What Can You Include in Your ePortfolio'],['22.png','What evidence demonstrates this'],['23.png','Think Before You Upload']],
    'module-6-session-2.html': [['24.png','Your LinkedIn profile is different'],['25.png','Why Does Your LinkedIn Profile Matter'],['26.png','Your LinkedIn Profile'],['27.png','Developing Your Professional Headline']],
    'module-6-session-3.html': [['28.png','What skill did I use or develop'],['29.png','What Goes Into a CV']],
    'module-7-session-1.html': [['30.png','What Is an Effective Presentation'],['31.png','Start With Your Audience'],['32.png','Begin With the Message'],['33.png','Structuring Your Presentation']],
    'module-7-session-2.html': [['34.png','What Is Presentation Anxiety'],['35.png','Rehearse']],
    'module-7-session-3.html': [['36.png','Part 1: Hosting a Workshop'],['37.png','A Simple Workshop Structure'],['38.png','Part 2: Hosting a Journal Club']]
  };
  const entries = maps[page];
  if (!entries) return;

  const style = document.createElement('style');
  style.textContent = `
    .course-image{margin:28px 0 32px;max-width:100%;}
    .course-image-frame{background:#fff;border:1px solid #e7e0d4;border-radius:22px;padding:14px;box-shadow:0 14px 34px rgba(0,0,0,.075);overflow:hidden;}
    .course-image img{display:block;width:100%;height:auto;max-height:620px;object-fit:contain;border-radius:13px;background:#fff;}
    .course-image.compact{max-width:760px;margin-left:auto;margin-right:auto;}
    .course-image + h3,.course-image + h4{margin-top:38px;}
    @media(max-width:700px){.course-image{margin:22px 0 26px}.course-image-frame{padding:8px;border-radius:16px}.course-image img{border-radius:10px;max-height:none}}
  `;
  document.head.appendChild(style);

  const norm = s => (s || '').replace(/\s+/g,' ').trim().toLowerCase();
  const selector = 'h2,h3,h4,p,li,blockquote,.purpose,.activity-title,.concept,.quote,.prompt';
  const candidates = [...document.querySelectorAll(selector)];

  // Prefer the smallest, most specific matching element. This prevents a large
  // parent div/article from matching first and pushing the image to page bottom.
  const findAnchor = needle => {
    const n = norm(needle);
    const matches = candidates.filter(el => norm(el.textContent).includes(n));
    if (!matches.length) return null;
    const exact = matches.find(el => norm(el.textContent) === n);
    if (exact) return exact;
    return matches.sort((a,b) => norm(a.textContent).length - norm(b.textContent).length)[0];
  };

  const makeFigure = file => {
    const figure = document.createElement('figure');
    figure.className = 'course-image';
    const frame = document.createElement('div');
    frame.className = 'course-image-frame';
    const img = document.createElement('img');
    img.src = `../${file}`;
    img.alt = '';
    img.loading = 'lazy';
    img.dataset.courseImage = file;
    img.addEventListener('load', () => {
      if (img.naturalWidth && img.naturalHeight && img.naturalWidth / img.naturalHeight < 1.15) figure.classList.add('compact');
    });
    frame.appendChild(img);
    figure.appendChild(frame);
    return figure;
  };

  entries.forEach(([file, anchorText]) => {
    if (document.querySelector(`img[data-course-image="${file}"]`)) return;
    const anchor = findAnchor(anchorText);
    if (!anchor) return;
    const figure = makeFigure(file);

    const placeholder = anchor.closest('.purpose');
    if (placeholder && /placeholder|image can be inserted|infographic/i.test(placeholder.textContent)) {
      placeholder.replaceWith(figure);
      return;
    }

    // Headings introduce the content the visual explains, so place the visual
    // after the first explanatory paragraph/list/block rather than directly under
    // the heading. Text anchors get the visual immediately after that text.
    if (/^H[2-4]$/.test(anchor.tagName)) {
      let target = anchor.nextElementSibling;
      while (target && /^H[2-4]$/.test(target.tagName)) target = target.nextElementSibling;
      (target || anchor).insertAdjacentElement('afterend', figure);
    } else {
      anchor.insertAdjacentElement('afterend', figure);
    }
  });
})();