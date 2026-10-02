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
    .course-image{margin:28px 0 32px;max-width:100%;}.course-image-frame{background:#fff;border:1px solid #e7e0d4;border-radius:22px;padding:14px;box-shadow:0 14px 34px rgba(0,0,0,.075);overflow:hidden}.course-image img{display:block;width:100%;height:auto;max-height:620px;object-fit:contain;border-radius:13px;background:#fff}.course-image.compact{max-width:760px;margin-left:auto;margin-right:auto}.course-image + h3,.course-image + h4{margin-top:38px}
    .activity.interactive-ready{position:relative;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,.055);transition:box-shadow .2s ease,transform .2s ease}.activity.interactive-ready:hover{box-shadow:0 16px 38px rgba(0,0,0,.08)}
    .ia-top{display:flex;align-items:center;justify-content:space-between;gap:14px;margin:-4px 0 18px;padding-bottom:14px;border-bottom:1px solid #e7e0d4}.ia-label{display:flex;align-items:center;gap:9px;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;font-weight:800;color:#8a6425}.ia-dot{width:9px;height:9px;border-radius:50%;background:#c99a3b;box-shadow:0 0 0 5px rgba(201,154,59,.13)}.ia-progress{font-size:.75rem;font-weight:800;color:#6d6d6d}.ia-progress-track{height:5px;background:#ece5d8;border-radius:99px;overflow:hidden;margin:-9px 0 20px}.ia-progress-fill{height:100%;width:0;background:#c99a3b;transition:width .25s ease}
    .activity.interactive-ready input[type=radio],.activity.interactive-ready input[type=checkbox]{accent-color:#c99a3b;transform:scale(1.12);margin-right:7px}.activity.interactive-ready label{cursor:pointer}.activity.interactive-ready label:has(input:checked){color:#1b1b1b;font-weight:700}.activity.interactive-ready textarea,.activity.interactive-ready input[type=text]{transition:border-color .2s,box-shadow .2s}.activity.interactive-ready textarea:focus,.activity.interactive-ready input[type=text]:focus{outline:none;border-color:#c99a3b;box-shadow:0 0 0 3px rgba(201,154,59,.14)}
    .ia-editable{min-height:54px;background:#fff!important;outline:none;cursor:text;position:relative}.ia-editable:empty:before{content:'Type your response…';color:#aaa;font-style:italic}.ia-editable:focus{box-shadow:inset 0 0 0 2px #c99a3b}.ia-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px}.ia-btn{border:0;border-radius:999px;padding:11px 16px;font:700 .82rem Inter,sans-serif;cursor:pointer}.ia-btn.primary{background:#111;color:#fff}.ia-btn.primary:hover{background:#c99a3b;color:#111}.ia-btn.secondary{background:#eee7dc;color:#4f4432}.ia-feedback{display:none;margin-top:14px;padding:13px 15px;border-radius:12px;background:#fff;border-left:4px solid #c99a3b;color:#514b42;font-size:.88rem}.ia-feedback.show{display:block}.ia-complete{border-color:#c99a3b!important}.ia-external{display:none}
    @media(max-width:700px){.course-image{margin:22px 0 26px}.course-image-frame{padding:8px;border-radius:16px}.course-image img{border-radius:10px;max-height:none}.ia-top{align-items:flex-start}.ia-actions{flex-direction:column}.ia-btn{width:100%}}
  `;
  document.head.appendChild(style);

  // ----- Course images -----
  const entries = maps[page];
  if (entries) {
    const norm = s => (s || '').replace(/\s+/g,' ').trim().toLowerCase();
    const selector = 'h2,h3,h4,p,li,blockquote,.purpose,.activity-title,.concept,.quote,.prompt';
    const candidates = [...document.querySelectorAll(selector)];
    const findAnchor = needle => {
      const n = norm(needle); const matches = candidates.filter(el => norm(el.textContent).includes(n));
      if (!matches.length) return null; const exact = matches.find(el => norm(el.textContent) === n); if (exact) return exact;
      return matches.sort((a,b) => norm(a.textContent).length - norm(b.textContent).length)[0];
    };
    const makeFigure = file => {
      const figure=document.createElement('figure'); figure.className='course-image'; const frame=document.createElement('div'); frame.className='course-image-frame'; const img=document.createElement('img'); img.src=`../${file}`; img.alt=''; img.loading='lazy'; img.dataset.courseImage=file;
      img.addEventListener('load',()=>{if(img.naturalWidth&&img.naturalHeight&&img.naturalWidth/img.naturalHeight<1.15)figure.classList.add('compact')}); frame.appendChild(img); figure.appendChild(frame); return figure;
    };
    entries.forEach(([file,anchorText])=>{if(document.querySelector(`img[data-course-image="${file}"]`))return;const anchor=findAnchor(anchorText);if(!anchor)return;const figure=makeFigure(file);const placeholder=anchor.closest('.purpose');if(placeholder&&/placeholder|image can be inserted|infographic/i.test(placeholder.textContent)){placeholder.replaceWith(figure);return}if(/^H[2-4]$/.test(anchor.tagName)){let target=anchor.nextElementSibling;while(target&&/^H[2-4]$/.test(target.tagName))target=target.nextElementSibling;(target||anchor).insertAdjacentElement('afterend',figure)}else anchor.insertAdjacentElement('afterend',figure)});
  }

  // ----- Interactive activity enhancement -----
  // Existing Module 7 activities that already open purpose-built interactive sites are left unchanged.
  const activities=[...document.querySelectorAll('.activity')];
  const storagePrefix=`mer-internship:${page}:`;
  const isExternalInteractive = el => !!el.querySelector('a[href*="gautengpestcontrol.chatgpt.site"]');

  activities.forEach((activity,index)=>{
    if(isExternalInteractive(activity)) return;
    activity.classList.add('interactive-ready');
    const key=storagePrefix+index;
    const top=document.createElement('div'); top.className='ia-top'; top.innerHTML='<span class="ia-label"><span class="ia-dot"></span>Interactive activity</span><span class="ia-progress">0% complete</span>';
    const track=document.createElement('div'); track.className='ia-progress-track'; track.innerHTML='<div class="ia-progress-fill"></div>';
    activity.prepend(track); activity.prepend(top);

    // Blank table cells become response fields, while existing content is preserved.
    [...activity.querySelectorAll('td')].forEach(td=>{const txt=td.textContent.replace(/\s+/g,' ').trim();if(!txt&&!td.querySelector('input,textarea,select,button,a,img')){td.contentEditable='true';td.classList.add('ia-editable');td.setAttribute('role','textbox');td.setAttribute('aria-label','Activity response')}});

    // Underscore-only paragraphs/divs become editable response areas without changing surrounding instructional copy.
    [...activity.querySelectorAll('p,div')].forEach(el=>{if(el.children.length===0&&/^\s*[_–—.]{4,}\s*$/.test(el.textContent)){el.textContent='';el.contentEditable='true';el.classList.add('ia-editable');el.setAttribute('role','textbox')}});

    // In category tables, one choice per row is normally intended. Preserve checkboxes visually but make them behave as a single choice within that row.
    [...activity.querySelectorAll('tbody tr')].forEach(row=>{const checks=[...row.querySelectorAll('input[type=checkbox]')];if(checks.length>1)checks.forEach(c=>c.addEventListener('change',()=>{if(c.checked)checks.forEach(other=>{if(other!==c)other.checked=false});save();updateProgress()}))});

    const controls=()=>[...activity.querySelectorAll('input:not([type=button]):not([type=submit]),textarea,select,.ia-editable')];
    const valueOf=c=>c.classList.contains('ia-editable')?c.innerHTML:(c.type==='checkbox'||c.type==='radio'?c.checked:c.value);
    const setValue=(c,v)=>{if(c.classList.contains('ia-editable'))c.innerHTML=v||'';else if(c.type==='checkbox'||c.type==='radio')c.checked=!!v;else c.value=v||''};
    const save=()=>{try{localStorage.setItem(key,JSON.stringify(controls().map(valueOf)))}catch(e){}};
    const restore=()=>{try{const vals=JSON.parse(localStorage.getItem(key)||'null');if(Array.isArray(vals))controls().forEach((c,i)=>setValue(c,vals[i]))}catch(e){}};
    const answered=c=>c.classList.contains('ia-editable')?c.textContent.trim().length>0:(c.type==='checkbox'||c.type==='radio'?c.checked:String(c.value||'').trim().length>0);
    const updateProgress=()=>{
      const cs=controls(); let pct=0;
      if(cs.length){const radioNames=[...new Set(cs.filter(c=>c.type==='radio').map(c=>c.name).filter(Boolean))];const nonRadios=cs.filter(c=>c.type!=='radio');let total=nonRadios.length+radioNames.length;let done=nonRadios.filter(answered).length+radioNames.filter(n=>activity.querySelector(`input[type="radio"][name="${CSS.escape(n)}"]:checked`)).length;pct=total?Math.round(done/total*100):0}else pct=0;
      top.querySelector('.ia-progress').textContent=`${pct}% complete`;track.querySelector('.ia-progress-fill').style.width=pct+'%';activity.classList.toggle('ia-complete',pct===100);return pct;
    };
    restore(); updateProgress();
    activity.addEventListener('input',()=>{save();updateProgress()}); activity.addEventListener('change',()=>{save();updateProgress()});

    const actions=document.createElement('div');actions.className='ia-actions';
    const primary=document.createElement('button');primary.type='button';primary.className='ia-btn primary';primary.textContent='Save my response';
    const reset=document.createElement('button');reset.type='button';reset.className='ia-btn secondary';reset.textContent='Reset activity';
    const feedback=document.createElement('div');feedback.className='ia-feedback';feedback.setAttribute('role','status');
    primary.addEventListener('click',()=>{save();const pct=updateProgress();feedback.textContent=pct===100?'Response saved — activity complete. Review your choices and reasoning before moving on.':pct>0?`Response saved — ${pct}% complete. Finish the remaining responses when you are ready.`:'Start by making a selection or entering a response, then save your activity.';feedback.classList.add('show')});
    reset.addEventListener('click',()=>{controls().forEach(c=>{if(c.classList.contains('ia-editable'))c.innerHTML='';else if(c.type==='checkbox'||c.type==='radio')c.checked=false;else c.value=''});try{localStorage.removeItem(key)}catch(e){};feedback.textContent='Activity reset. You can start again.';feedback.classList.add('show');updateProgress()});
    actions.append(primary,reset);activity.append(actions,feedback);
  });
})();