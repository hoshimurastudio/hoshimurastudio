const copy={
en:{skip:'Skip to content',navServices:'Services',navAbout:'About us',heroMeta:'Moving stories. Thoughtful websites.',headline:'A new way<br>to <span class="accent">express.</span>',lead:'From a single frame to a digital experience.<br>We give your ideas a form that connects.',explore:'Explore services',discover:'Meet the studio',scroll:'Scroll to explore',servicesLabel:'WHAT WE DO',servicesTitle:'Your ideas.<br>Two ways to connect.',servicesIntro:'The power of video. The possibilities of the web.<br>Thoughtful creative work, shaped around your ideas.',videoTitle:'Video editing',videoSub:'STORIES IN MOTION',videoDesc:'Turn raw footage into a story that stays with people. Thoughtful cuts, captions, and sound bring clarity and rhythm to your message.',videoTag1:'YouTube videos',videoTag2:'Short-form content',videoTag3:'Promotional videos',webTitle:'Web design',webSub:'EXPERIENCES THAT CONNECT',webDesc:'Bring your brand’s character and usability together. We design clear, considered websites that feel as good as they look.',webTag1:'Landing pages',webTag2:'Portfolios',webTag3:'Responsive design',samples:'The visuals above are illustrative service concepts.',aboutLabel:'ABOUT THE STUDIO',aboutTitle:'A little intention.<br>In every detail.',aboutDesc:'Hoshimura Studio is a creative studio focused on video editing and web design. We care about the heart of your message and give it a simple, memorable expression.',profileName:'Studio',profileFocus:'Focus',profileFields:'Video editing / Web design',youtubeTitle:'Another window into the studio.',coming:'Coming soon',channelTitle:'Creativity.<br>Beyond the frame.',channelDesc:'A space for the Hoshimura Studio YouTube channel. Our channel link will be available here soon. Stay tuned.',channelPending:'Channel link coming soon',contactLabel:'LET’S SHAPE WHAT’S NEXT.',contactTitle:'Every creation starts with an idea.',contactStatus:'Our contact channel is being prepared.',contactSoon:'Contact details will be available soon.',backTop:'Back to top'},
ja:{}};
Object.assign(copy.en, {
  navPortfolio:'Portfolio', home:'Home', viewPortfolio:'Explore the portfolio',
  portfolioLabel:'PORTFOLIO', portfolioTeaserTitle:'A space for what comes next.',
  portfolioTeaserDesc:'Our video editing and web design projects will be collected here. The portfolio is being prepared.',
  portfolioTitle:'Work, with<br><span class="accent">intention.</span>',
  portfolioIntro:'A collection of video editing and web design work.<br>Projects will be added here as they are ready.',
  portfolioVideo:'Video editing', portfolioWeb:'Web design',
  videoEmptyTitle:'Video projects are on their way.', videoEmptyDesc:'There are no published video projects yet.',
  webEmptyTitle:'Web projects are on their way.', webEmptyDesc:'There are no published web projects yet.',
  emptyStatus:'Coming soon', backHome:'Back to the studio',
  channelDesc:'Visit the official Hoshimura Studio YouTube channel to explore the studio on screen.',
  channelVisit:'Visit our YouTube channel', newTab:'Opens in a new tab',
  navContact:'Contact', contactCta:'Discuss your project', requestLabel:'LET’S WORK TOGETHER', requestTitle:'Tell us what<br>you have in mind.',
  requestIntro:'Looking for video editing or web design? Share your idea with us, even if you are still exploring the possibilities.',
  requestStep1:'Send us your project details', requestStep2:'We review your request and reply by email', requestStep3:'Discuss the scope and an estimate',
  requestNote:'Submitting this form does not create a contract or require payment. Pricing and timing will be discussed after reviewing your request.',
  requestFormTitle:'About your project', requiredNote:'* Required fields',
  fieldService:'Service',serviceChoose:'Select a service',serviceVideo:'Video editing',serviceWeb:'Web design',serviceBoth:'Video editing & web design',serviceConsultation:'I’d like to discuss an idea',
  fieldName:'Your name',fieldEmail:'Your email address',emailHint:'We will use this address to reply to your request.',
  fieldCompany:'Company / creator name (optional)',fieldBudget:'Estimated budget (optional)',budgetHint:'Include the currency. It is fine if your budget is not decided yet.',
  fieldTimeline:'Preferred timeline (optional)',timelineHint:'Share a target date, or let us know you would like to discuss it.',
  fieldMessage:'Project details',messageHint:'Tell us about your goal, video length or website scope, and the help you need (20–5,000 characters).',
  fieldReferences:'Reference URLs / shared files (optional)',referencesHint:'Links to reference sites, videos, or shared folders. Direct file uploads are not supported.',
  fieldConsent:'I agree that my details will be sent through Formspree and used by Hoshimura Studio to review and reply to this request.'
});
const page=document.body?.dataset.page||'home';
const metadata={
  home:{ja:['Hoshimura Studio | 映像編集・Webデザイン','Hoshimura Studio — 映像編集とWebデザインで、アイデアをかたちに。'],en:['Hoshimura Studio | Video Editing & Web Design','Hoshimura Studio — thoughtful video editing and web design to bring your ideas to life.']},
  portfolio:{ja:['ポートフォリオ | Hoshimura Studio','Hoshimura Studioの映像編集・ウェブデザインのポートフォリオ。制作事例は準備中です。'],en:['Portfolio | Hoshimura Studio','Video editing and web design portfolio by Hoshimura Studio. Projects are coming soon.']}
};
document.querySelectorAll('[data-i18n]').forEach(el=>copy.ja[el.dataset.i18n]=el.innerHTML);
let language='ja';
function save(key,value){try{localStorage.setItem(key,value)}catch{}}
function read(key){try{return localStorage.getItem(key)}catch{return null}}
function themeLabel(){const light=document.documentElement.dataset.theme==='light';document.getElementById('theme').setAttribute('aria-label',language==='ja'?(light?'ダークモードに切り替える':'ライトモードに切り替える'):(light?'Switch to dark mode':'Switch to light mode'));document.querySelector('meta[name="theme-color"]').content=light?'#f6f4f0':'#141414'}
function setLanguage(lang){language=lang==='en'?'en':'ja';document.documentElement.lang=language;document.querySelectorAll('[data-i18n]').forEach(el=>{el.innerHTML=copy[language][el.dataset.i18n]});document.querySelectorAll('[data-lang]').forEach(el=>{const active=el.dataset.lang===language;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active))});document.querySelector('nav').setAttribute('aria-label',language==='ja'?'メインナビゲーション':'Main navigation');const brandImage=document.querySelector('.about-brand img');if(brandImage)brandImage.alt=language==='ja'?'Hoshimura Studio ブランドロゴ':'Hoshimura Studio brand logo';const [title,description]=(metadata[page]||metadata.home)[language];document.title=title;document.querySelector('meta[name="description"]').content=description;themeLabel();save('hoshimura-language',language)}
document.querySelectorAll('[data-lang]').forEach(el=>el.addEventListener('click',()=>setLanguage(el.dataset.lang)));
document.getElementById('theme').addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;save('hoshimura-theme',theme);themeLabel()});
setLanguage(read('hoshimura-language')||'ja');

document.getElementById('year').textContent=new Date().getFullYear();
