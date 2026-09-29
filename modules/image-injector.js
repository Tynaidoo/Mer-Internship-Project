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
  style.textContent = `.course-image{margin:26px auto 12px;max-width:920px}.course-image img{display:block;width:100%;height:auto;max-height:680px;object-fit:contain;border-radius:18px;border:1px solid #e7e0d4;background:#fff;box-shadow:0 12px 30px rgba(0,0,0,.07)}@media(max-width:700px){.course-image{margin:20px 0 10px}.course-image img{border-radius:12px}}`;
  document.head.appendChild(style);

  const candidates = [...document.querySelectorAll('h2,h3,h4,p,div,blockquote')];
  const norm = s => (s || '').replace(/\s+/g,' ').trim().toLowerCase();
  const findAnchor = needle => {
    const n = norm(needle);
    return candidates.find(el => norm(el.textContent).includes(n));
  };

  entries.forEach(([file, anchorText]) => {
    if (document.querySelector(`img[data-course-image="${file}"]`)) return;
    const anchor = findAnchor(anchorText);
    if (!anchor) return;
    const figure = document.createElement('figure');
    figure.className = 'course-image';
    const img = document.createElement('img');
    img.src = `../${file}`;
    img.alt = '';
    img.loading = 'lazy';
    img.dataset.courseImage = file;
    figure.appendChild(img);

    const placeholder = anchor.closest('.purpose');
    if (placeholder && /placeholder|image can be inserted|infographic/i.test(placeholder.textContent)) {
      placeholder.replaceWith(figure);
    } else {
      anchor.insertAdjacentElement('afterend', figure);
    }
  });
})();