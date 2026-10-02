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

  const style = document.createElement('style');
  style.textContent = `
    .course-image{margin:28px 0 32px;max-width:100%}.course-image-frame{background:#fff;border:1px solid #e7e0d4;border-radius:22px;padding:14px;box-shadow:0 14px 34px rgba(0,0,0,.075);overflow:hidden}.course-image img{display:block;width:100%;height:auto;max-height:620px;object-fit:contain;border-radius:13px;background:#fff}.course-image.compact{max-width:760px;margin-left:auto;margin-right:auto}.course-image + h3,.course-image + h4{margin-top:38px}
    .interactive-link-card{background:#f7f5ef;border:1px solid #e7e0d4;border-radius:22px;padding:26px 28px;margin-top:22px;box-shadow:0 10px 28px rgba(0,0,0,.045)}.interactive-link-card .ia-kicker{display:inline-block;background:#c99a3b;color:#111;font-size:.72rem;font-weight:800;padding:7px 11px;border-radius:999px;margin-bottom:10px}.interactive-link-card h2,.interactive-link-card h3{margin:4px 0 8px}.interactive-link-card p{margin:0 0 18px;color:#5b5b5b}.interactive-link-card a{display:inline-block;background:#111;color:#fff!important;font-weight:800;padding:12px 18px;border-radius:999px;text-decoration:none!important;transition:.2s}.interactive-link-card a:hover{background:#c99a3b;color:#111!important;transform:translateY(-1px)}
    @media(max-width:700px){.course-image{margin:22px 0 26px}.course-image-frame{padding:8px;border-radius:16px}.course-image img{border-radius:10px;max-height:none}.interactive-link-card{padding:22px 20px}}
  `;
  document.head.appendChild(style);

  // Course images: retain all existing image placement behaviour.
  const entries = maps[page];
  if (entries) {
    const norm=s=>(s||'').replace(/\s+/g,' ').trim().toLowerCase();
    const candidates=[...document.querySelectorAll('h2,h3,h4,p,li,blockquote,.purpose,.activity-title,.concept,.quote,.prompt')];
    const findAnchor=needle=>{const n=norm(needle),m=candidates.filter(el=>norm(el.textContent).includes(n));if(!m.length)return null;return m.find(el=>norm(el.textContent)===n)||m.sort((a,b)=>norm(a.textContent).length-norm(b.textContent).length)[0]};
    const makeFigure=file=>{const figure=document.createElement('figure');figure.className='course-image';const frame=document.createElement('div');frame.className='course-image-frame';const img=document.createElement('img');img.src=`../${file}`;img.alt='';img.loading='lazy';img.dataset.courseImage=file;img.addEventListener('load',()=>{if(img.naturalWidth&&img.naturalHeight&&img.naturalWidth/img.naturalHeight<1.15)figure.classList.add('compact')});frame.appendChild(img);figure.appendChild(frame);return figure};
    entries.forEach(([file,text])=>{if(document.querySelector(`img[data-course-image="${file}"]`))return;const anchor=findAnchor(text);if(!anchor)return;const figure=makeFigure(file),placeholder=anchor.closest('.purpose');if(placeholder&&/placeholder|image can be inserted|infographic/i.test(placeholder.textContent)){placeholder.replaceWith(figure);return}if(/^H[2-4]$/.test(anchor.tagName)){let target=anchor.nextElementSibling;while(target&&/^H[2-4]$/.test(target.tagName))target=target.nextElementSibling;(target||anchor).insertAdjacentElement('afterend',figure)}else anchor.insertAdjacentElement('afterend',figure)});
  }

  // Replace static activity blocks with links to a separate interactive activity experience,
  // matching the link-based pattern already used in Module 7 Sessions 1 and 2.
  // Existing purpose-built chatgpt.site activities are deliberately preserved.
  const activities=[...document.querySelectorAll('.activity')];
  let localIndex=0;
  activities.forEach(activity=>{
    if(activity.querySelector('a[href*="gautengpestcontrol.chatgpt.site"]')) return;
    const index=localIndex++;
    const heading=activity.querySelector('h2,h3');
    const badge=activity.querySelector('.badge');
    const title=(heading&&heading.textContent.trim())||(badge&&badge.textContent.trim())||`Activity ${index+1}`;
    const card=document.createElement('div');
    card.className='interactive-link-card';
    card.innerHTML=`<span class="ia-kicker">Interactive activity</span><h3>${escapeHtml(title)}</h3><p>Complete this activity in the interactive learning experience.</p><a href="activity-player.html?session=${encodeURIComponent(page)}&activity=${index}">Open Interactive Activity →</a>`;
    activity.replaceWith(card);
  });

  function escapeHtml(value){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
})();