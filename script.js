const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const toTop = document.querySelector('#toTop');
const progress = document.querySelector('#scrollProgress');

const updateScrollState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
  toTop?.classList.toggle('is-visible', window.scrollY > 500);
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0}%`;
};

updateScrollState();
window.addEventListener('scroll', updateScrollState, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = primaryNav.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.primary-nav a').forEach((link) => link.addEventListener('click', () => {
  primaryNav?.classList.remove('is-open');
  menuToggle?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add('is-visible'));
}

const heroVideo = document.querySelector('#heroVideo');
const videoToggle = document.querySelector('#videoToggle');
const soundToggle = document.querySelector('#soundToggle');
const controlText = videoToggle?.querySelector('.control-text');
const controlSymbol = videoToggle?.querySelector('.control-symbol');

videoToggle?.addEventListener('click', () => {
  if (!heroVideo) return;
  if (heroVideo.paused) {
    heroVideo.play();
    controlText.textContent = 'Pause film';
    controlSymbol.textContent = 'Ⅱ';
    videoToggle.setAttribute('aria-label', 'Pause background video');
  } else {
    heroVideo.pause();
    controlText.textContent = 'Play film';
    controlSymbol.textContent = '▶';
    videoToggle.setAttribute('aria-label', 'Play background video');
  }
});

soundToggle?.addEventListener('click', () => {
  if (!heroVideo) return;
  heroVideo.muted = !heroVideo.muted;
  const soundOn = !heroVideo.muted;
  soundToggle.setAttribute('aria-pressed', String(soundOn));
  soundToggle.setAttribute('aria-label', soundOn ? 'Turn video sound off' : 'Turn video sound on');
  soundToggle.querySelector('.control-text').textContent = soundOn ? 'Sound on' : 'Sound off';
});

const serviceData = {
  living: { label: '01 / Private living', title: 'A home that feels<br><em>like your best self.</em>', description: 'We shape residential interiors around the routines, objects, and light that make a house feel unmistakably yours.', points: ['Spatial planning & concept design', 'Material, colour & lighting direction', 'End-to-end design coordination'], tag: 'HOME / 01', word: 'LIVING' },
  work: { label: '02 / Work & hospitality', title: 'Places that help people<br><em>stay a little longer.</em>', description: 'We design workplaces, studios, and stays that balance performance with pause — spaces people want to return to.', points: ['Experience-led space planning', 'Brand, material & furniture direction', 'Vendor and execution coordination'], tag: 'WORK / 02', word: 'GATHER' },
  refresh: { label: '03 / Refresh & styling', title: 'A new rhythm for<br><em>the familiar.</em>', description: 'When the bones are right but the feeling is not, we bring a focused layer of colour, light, objects, and detail.', points: ['Room-by-room refresh plans', 'Palette, art & object curation', 'Styling for the final atmosphere'], tag: 'EDIT / 03', word: 'REFRESH' }
};

const serviceTabs = document.querySelectorAll('.service-tab');
const serviceLabel = document.querySelector('#serviceLabel');
const serviceTitle = document.querySelector('#serviceTitle');
const serviceDescription = document.querySelector('#serviceDescription');
const servicePoints = document.querySelector('#servicePoints');
const serviceVisualTag = document.querySelector('#serviceVisualTag');
const serviceVisualWord = document.querySelector('#serviceVisualWord');

serviceTabs.forEach((tab) => tab.addEventListener('click', () => {
  const data = serviceData[tab.dataset.service];
  if (!data) return;
  serviceTabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
  });
  serviceLabel.textContent = data.label;
  serviceTitle.innerHTML = data.title;
  serviceDescription.textContent = data.description;
  servicePoints.innerHTML = data.points.map((point) => `<span>${point}</span>`).join('');
  serviceVisualTag.textContent = data.tag;
  serviceVisualWord.textContent = data.word;
}));

const paletteData = {
  earth: { name: 'Quiet earth', code: 'PALETTE / 01', background: '#cdb7a5', swatches: ['#82695d', '#c77658', '#d8c3ae', '#263b42'], title: 'Quiet earth', description: 'Warm stone, soft shadow, considered light.' },
  coastal: { name: 'Soft coastal', code: 'PALETTE / 02', background: '#a7c4c0', swatches: ['#527a7d', '#d9c9ac', '#a7c4c0', '#f5f1e9'], title: 'Soft coastal', description: 'Mineral blue, pale timber, open horizons.' },
  nocturne: { name: 'Deep nocturne', code: 'PALETTE / 03', background: '#4a5368', swatches: ['#242b43', '#c77658', '#8f9ba7', '#f0d8ba'], title: 'Deep nocturne', description: 'Ink, brass, late light, and quiet contrast.' }
};

const palettePreview = document.querySelector('#palettePreview');
const paletteButtons = document.querySelectorAll('.palette-button');
const paletteName = document.querySelector('#paletteName');
const paletteCode = document.querySelector('#paletteCode');
const paletteTitle = document.querySelector('#paletteTitle');
const paletteDescription = document.querySelector('#paletteDescription');
const swatches = document.querySelectorAll('.preview-swatch');

paletteButtons.forEach((button) => button.addEventListener('click', () => {
  const data = paletteData[button.dataset.palette];
  if (!data) return;
  paletteButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
  });
  palettePreview.style.background = data.background;
  paletteName.textContent = data.name;
  paletteCode.textContent = data.code;
  paletteTitle.textContent = data.title;
  paletteDescription.textContent = data.description;
  swatches.forEach((swatch, index) => { swatch.style.setProperty('--swatch', data.swatches[index]); });
}));

const projectFilters = document.querySelectorAll('.project-filter');
const projectCards = document.querySelectorAll('.project-card');
projectFilters.forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.projectFilter;
  projectFilters.forEach((item) => {
    const active = item === button;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  projectCards.forEach((card) => card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.projectType !== filter));
}));

const projectModal = document.querySelector('#projectModal');
const modalTitle = document.querySelector('#modalTitle');
const modalDescription = document.querySelector('#modalDescription');
const closeModal = () => {
  projectModal?.classList.remove('is-open');
  projectModal?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

document.querySelectorAll('.view-project').forEach((button) => button.addEventListener('click', () => {
  const card = button.closest('.project-card');
  if (!card || !projectModal) return;
  modalTitle.textContent = card.dataset.projectTitle || 'Project direction';
  modalDescription.textContent = card.dataset.projectDescription || '';
  projectModal.classList.add('is-open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}));
document.querySelectorAll('[data-close-modal]').forEach((item) => item.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

document.querySelector('#contactForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector('#formStatus');
  const submit = form.querySelector('button[type="submit"]');
  if (!form.checkValidity()) { form.reportValidity(); return; }
  submit.disabled = true;
  submit.innerHTML = 'Preparing your note <span>✦</span>';
  window.setTimeout(() => {
    form.reset();
    submit.disabled = false;
    submit.innerHTML = 'Send enquiry <span>↗</span>';
    status.textContent = 'Thank you — your enquiry is ready for a personal reply.';
  }, 650);
});

toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.querySelector('#year').textContent = new Date().getFullYear();
