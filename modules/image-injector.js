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
  const activityLinks={
    "module-1.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/my-internship-expectations-73",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/expectation-or-misconception-94"
    ],
    "module-1-session-2.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/organisational-roles-core-responsibilities-173",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/build-your-introduction-198"
    ],
    "module-1-session-3.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/the-company-handbook-270"
    ],
    "module-1-session-4.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/values-in-action-334",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/smart-goal-scenario-challenge-374"
    ],
    "module-2-session-1.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/what-does-professionalism-look-like-454",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/same-behaviour-different-workplace-485"
    ],
    "module-2-session-2.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/understanding-technical-and-human-skills-540",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/the-ai-gap-bridge-challenge-625"
    ],
    "module-2-session-3.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/working-styles-682",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/whats-your-conflict-style-696"
    ],
    "module-2-session-4.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/self-directed-mindset-reframing-audit-758",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/turning-setbacks-into-growth-774"
    ],
    "module-2-session-5.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/emotional-intelligence-in-the-workplace-849",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/managing-emotions-charged-message-challenge-910"
    ],
    "module-2-session-6.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/strategic-questioning-ask-for-help-professionally-955",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/information-literacy-kolbs-learning-cycle-975"
    ],
    "module-2-session-7.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/own-your-career-build-your-personal-brand-1030",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/informational-interview-outreach-workshop-1070"
    ],
    "module-3-session-1.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/ai-in-the-workplace-1119",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/prompt-engineering-optimisation-challenge-1132"
    ],
    "module-3-session-2.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/can-you-trust-the-information-1180",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/the-ai-hallucination-fact-check-challenge-1199"
    ],
    "module-3-session-3.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/can-you-trust-the-ai-output-1247",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/human-skills-in-an-ai-enabled-workplace-1275"
    ],
    "module-3-session-4.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/what-data-is-this-1359",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/spot-the-phish-1376"
    ],
    "module-4-session-1.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/my-learning-fear-map-1475",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/from-learning-fear-to-action-1480"
    ],
    "module-4-session-2.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/know-your-time-management-style-1570",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/importance-of-work-study-life-balance-1586"
    ],
    "module-4-session-3.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/break-the-project-down-1664",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/scenario-activity-the-project-is-falling-behind-1695"
    ],
    "module-5-session-1.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/build-your-remote-worker-toolkit-1769",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/the-virtual-internship-team-1826"
    ],
    "module-5-session-2.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/microsoft-365-workplace-challenge-1910",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/complete-the-digital-workplace-task-1930"
    ],
    "module-5-session-3.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/feedback-detective-2038",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/scenario-activity-the-feedback-conversation-2077"
    ],
    "module-6-session-1.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/what-would-you-include-2178",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/evidence-or-just-a-claim-2222",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/create-your-internship-eportfolio-2249",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/develop-your-professional-introduction-2275"
    ],
    "module-6-session-2.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/what-does-your-profile-communicate-2367",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/develop-your-professional-headline-2386",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/develop-your-about-section-2413",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/build-and-review-your-linkedin-profile-2471"
    ],
    "module-6-session-3.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/what-does-your-cv-say-about-you-2586",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/from-experience-to-skills-2606",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/writing-effective-experience-statements-2662",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/develop-and-review-your-cv-2720"
    ],
    "module-7-session-3.html": [
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/workshop-or-journal-club-3468",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/design-a-mini-workshop-3523",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/breaking-down-an-academic-article-3566",
      "https://internship-learning-activities.gautengpestcontrol.chatgpt.site/activity/plan-your-workshop-or-journal-club-contribution-3650"
    ]
  };
  // These sessions contain new, document-based reflection activities; preserve them as written.
  const preserveWorksheetActivities=['module-7-session-3.html','module-7-session-4.html','module-8-session-1.html','module-8-session-2.html','module-6-session-4.html'].includes(page);
  const activities=[...document.querySelectorAll('.activity')];
  let localIndex=0;
  activities.forEach(activity=>{
    if(preserveWorksheetActivities)return;
    if(activity.querySelector('a[href*="gautengpestcontrol.chatgpt.site"]')) return;
    const index=localIndex++;
    const externalUrl=(activityLinks[page]||[])[index];
    const heading=activity.querySelector('h2,h3');
    const badge=activity.querySelector('.badge');
    const title=(heading&&heading.textContent.trim())||(badge&&badge.textContent.trim())||`Activity ${index+1}`;
    const card=document.createElement('div');
    card.className='interactive-link-card';
    card.innerHTML=`<span class="ia-kicker">Interactive activity</span><h3>${escapeHtml(title)}</h3><p>Complete this activity in the interactive learning experience.</p><a href="${externalUrl||`activity-player.html?session=${encodeURIComponent(page)}&activity=${index}`}"${externalUrl?' target="_blank" rel="noopener noreferrer"':""}>Open Interactive Activity →</a>`;
    activity.replaceWith(card);
  });

  // Embed the existing published interactive activities directly below their lesson cards.
  // Keep the original activity URLs intact; users can open them separately if embedding is blocked.
  const embeddedStyle=document.createElement('style');
  embeddedStyle.textContent=`
    .inline-activity-panel[hidden]{display:none!important}
    .inline-activity-panel{margin-top:18px;border:1px solid #e7e0d4;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 10px 28px rgba(0,0,0,.06)}
    .inline-activity-toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;background:#111;color:#fff;padding:12px 16px}
    .inline-activity-toolbar span{font-weight:700}
    .inline-activity-toolbar a,.inline-activity-toolbar button{border:1px solid #c99a3b;border-radius:999px;padding:8px 12px;font:700 .82rem Inter,system-ui,sans-serif;text-decoration:none;cursor:pointer}
    .inline-activity-toolbar a{color:#fff!important}
    .inline-activity-toolbar button{background:#c99a3b;color:#111}
    .inline-activity-frame{width:100%;height:min(78vh,850px);min-height:520px;border:0;display:block;background:#fff}
    @media(max-width:700px){.inline-activity-frame{height:75vh;min-height:460px}}
  `;
  document.head.appendChild(embeddedStyle);
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href]');
    if(!link||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    const card=link.closest('.interactive-link-card,.activity,.spark,#reflection');
    if(!card||link.closest('.inline-activity-panel'))return;
    const url=new URL(link.href,location.href);
    const isActivity=url.hostname.endsWith('.gautengpestcontrol.chatgpt.site')||url.pathname.endsWith('/activity-player.html');
    if(!isActivity)return;
    event.preventDefault();
    let panel=card.querySelector('.inline-activity-panel');
    if(!panel){
      panel=document.createElement('div');
      panel.className='inline-activity-panel';
      panel.innerHTML='<div class="inline-activity-toolbar"><span>Interactive activity</span><div><a target="_blank" rel="noopener noreferrer">Open separately ↗</a> <button type="button">Close activity ✕</button></div></div><iframe class="inline-activity-frame" title="Interactive activity" allow="fullscreen" referrerpolicy="strict-origin-when-cross-origin"></iframe>';
      panel.querySelector('a').href=url.href;
      panel.querySelector('button').addEventListener('click',()=>{
        panel.hidden=true;
        panel.querySelector('iframe').removeAttribute('src');
        link.focus();
      });
      card.appendChild(panel);
    }
    if(!panel.hidden&&panel.querySelector('iframe').getAttribute('src')) {
      panel.scrollIntoView({behavior:'smooth',block:'start'});
      return;
    }
    panel.hidden=false;
    panel.querySelector('iframe').src=url.href;
    link.setAttribute('aria-expanded','true');
    panel.scrollIntoView({behavior:'smooth',block:'start'});
  });

  // Convert lesson YouTube links to compact, in-page players without altering activity links.
  const videoCss=document.createElement('style');
  videoCss.textContent=`
    .lesson-video{background:#f7f5ef;border:1px solid #e7e0d4;border-radius:22px;padding:26px 28px;margin:22px 0;box-shadow:0 10px 28px rgba(0,0,0,.045)}
    .lesson-video-kicker{display:inline-block;background:#c99a3b;color:#111;font-size:.72rem;font-weight:800;padding:7px 11px;border-radius:999px;margin-bottom:12px}
    .lesson-video h3{margin:4px 0 8px;color:#181818}
    .lesson-video-description{margin:0 0 18px;color:#5b5b5b}
    .lesson-video-trigger{display:inline-block;background:#111;color:#fff!important;font:800 .94rem Inter,system-ui,sans-serif;border:0;border-radius:999px;padding:12px 18px;cursor:pointer;transition:.2s}
    .lesson-video-trigger:hover,.lesson-video-trigger:focus-visible{background:#c99a3b;color:#111!important;transform:translateY(-1px)}
    .lesson-video-player{margin-top:18px;position:relative;aspect-ratio:16/9;max-width:700px;overflow:hidden;border-radius:12px;background:#111;box-shadow:0 6px 20px #0002}
    .lesson-video-player[hidden]{display:none}
    .lesson-video-player iframe{display:block;width:100%;height:100%;border:0}
    .lesson-video-fallback{font-size:.84rem;margin:12px 0 0;color:#5b5b5b}
    .lesson-video-fallback a{color:#087a70;text-decoration:underline}
    @media(max-width:700px){.lesson-video{padding:20px 18px}}
  `;
  document.head.appendChild(videoCss);
  function youtubeId(raw){
    try{
      const url=new URL(raw,location.href);
      if(url.hostname==='youtu.be'||url.hostname==='www.youtu.be')return url.pathname.split('/')[1]||null;
      if(['youtube.com','www.youtube.com','m.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com'].includes(url.hostname)){
        return url.searchParams.get('v')||(url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)||[])[1]||null;
      }
    }catch(error){}
    return null;
  }
  document.querySelectorAll('main a[href]').forEach(link=>{
    const id=youtubeId(link.href);
    if(!id||!(/^[a-zA-Z0-9_-]{11}$/.test(id)))return;
    // Keep duplicate references to the same video from showing two separate players in one lesson.
    if(document.querySelector('.lesson-video[data-video-id="'+id+'"]')){
      link.textContent='Watch video above ↑';
      link.removeAttribute('target');
      link.href='#'+document.querySelector('.lesson-video[data-video-id="'+id+'"]').id;
      return;
    }
    const holder=document.createElement('div');
    holder.className='lesson-video';
    holder.dataset.videoId=id;
    holder.id='lesson-video-'+id;
    const kicker=document.createElement('span');
    kicker.className='lesson-video-kicker';
    kicker.textContent='Video';
    const heading=document.createElement('h3');
    heading.textContent=(link.closest('.resource')?.querySelector('strong')?.textContent||'Watch the video').replace(/^Video:\s*/i,'').trim()||'Watch the video';
    const description=document.createElement('p');
    description.className='lesson-video-description';
    const videoGuidance={
      'P-ZEybBjaCY':'Watch this video to learn how to write clearer AI prompts. Connect the techniques to the prompt structure and examples discussed in this session.',
      'mqYbcMmSPDo':'Watch this video to explore when AI-generated information can be trusted and why checking evidence, sources and accuracy matters.',
      'b0joTPfH4Bs':'Watch this video to understand how an ePortfolio can document your skills, learning experiences and achievements throughout your internship.',
      'uz-8jabkkw4':'Watch this video to learn more about POPIA and connect its privacy principles to how you handle personal information in the workplace.',
      'xyANahuhGs0':'Watch this video to reinforce your understanding of occupational health and safety, including workplace hazards, responsibilities and safer working practices.'
    };
    description.textContent=videoGuidance[id]||('Watch this video to learn more about '+heading.textContent.toLowerCase()+' and connect the ideas to the examples and activities in this session.');
    const button=document.createElement('button');
    button.type='button';
    button.className='lesson-video-trigger';
    button.setAttribute('aria-expanded','true');
    button.textContent='✕ Hide video';
    const player=document.createElement('div');
    player.className='lesson-video-player';
    const iframe=document.createElement('iframe');
    iframe.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id);
    iframe.title='Course video';
    iframe.loading='lazy';
    iframe.referrerPolicy='strict-origin-when-cross-origin';
    iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen=true;
    player.appendChild(iframe);
    const fallback=document.createElement('p');
    fallback.className='lesson-video-fallback';
    const direct=document.createElement('a');
    direct.href='https://www.youtube.com/watch?v='+encodeURIComponent(id);
    direct.target='_blank';
    direct.rel='noopener noreferrer';
    direct.textContent='Open video on YouTube ↗';
    fallback.appendChild(direct);
    button.addEventListener('click',()=>{
      player.hidden=!player.hidden;
      button.setAttribute('aria-expanded',String(!player.hidden));
      button.textContent=player.hidden?'▶ Show video':'✕ Hide video';
      if(player.hidden)iframe.src=iframe.src;
    });
    link.dataset.videoLabel=link.textContent.trim().replace(/[↗→]/g,'').trim()||'Watch video';
    const parent=link.closest('.resource')||link.closest('p')||link;
    parent.replaceWith(holder);
    holder.append(kicker,heading,description,button,player,fallback);
  });

  // Add accessible visual cues to standard lesson headings.
  if (page.startsWith('module-') && page.endsWith('.html')) {
    const cues = [
      ['checklist','☑️'],['time','🕒'],['duration','🕒'],
      ['learning outcome','🎯'],['learning objective','🎯'],
      ['purpose','🧭'],['spark','✨'],['reflection','💭'],
      ['activity','✏️'],['video','▶️'],['resources','📚'],
      ['reading','📚'],['reference','📚'],['summary','💡']
    ];
    document.querySelectorAll('.lesson h2, .lesson h3, .lesson h4, main h2, main h3, main h4, main strong').forEach(el => {
      if (el.querySelector('.course-heading-icon')) return;
      const label=el.textContent.trim().toLowerCase();
      const cue=cues.find(([word])=>label.includes(word));
      if (!cue) return;
      if (el.tagName==='STRONG' && label.length>24) return;
      const span=document.createElement('span');
      span.className='course-heading-icon';
      span.setAttribute('aria-hidden','true');
      span.textContent=cue[1]+' ';
      el.prepend(span);
    });
  }
  function escapeHtml(value){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
})();