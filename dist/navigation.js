(() => {
  const header = document.querySelector('.header');
  const links = [...header.querySelectorAll('nav a')];
  const portfolio = document.body.dataset.page === 'portfolio';
  const sections = links.map(link => {
    const url = new URL(link.href);
    const id = url.hash.slice(1);
    return { link, section: id ? document.getElementById(id) : null };
  }).filter(item => item.section);

  function select(active, kind = 'location') {
    links.forEach(link => {
      const selected = link === active;
      link.classList.toggle('is-selected', selected);
      if (selected) link.setAttribute('aria-current', kind);
      else link.removeAttribute('aria-current');
    });
  }

  if (portfolio) {
    select(links.find(link => new URL(link.href).pathname.endsWith('/portfolio.html')), 'page');
    return;
  }

  let pending = null, releaseTimer = null, frame = null;
  function update() {
    frame = null;
    if (pending) return;
    const boundary = header.getBoundingClientRect().height + 40;
    let active = null;
    sections.forEach(item => { if (item.section.getBoundingClientRect().top <= boundary) active = item.link; });
    select(active);
  }
  function release() {
    clearTimeout(releaseTimer);
    pending = null;
    update();
  }
  function selectHash() {
    const target = sections.find(item => new URL(item.link.href).hash === location.hash);
    if (!target) { release(); return; }
    pending = target.link;
    select(target.link);
    clearTimeout(releaseTimer);
    // Preserve the clicked highlight throughout native smooth scrolling.
    releaseTimer = setTimeout(release, 1800);
  }
  sections.forEach(({link}) => link.addEventListener('click', () => {
    pending = link;
    select(link);
    clearTimeout(releaseTimer);
    releaseTimer = setTimeout(release, 1800);
  }));
  window.addEventListener('hashchange', selectHash);
  window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(update); }, { passive: true });
  window.addEventListener('scrollend', release);
  window.addEventListener('resize', () => { if (!frame) frame = requestAnimationFrame(update); });
  if (location.hash) selectHash();
  else update();
})();
