import './style.css'
import { initPlaceholders, initVideoPoster } from './components/placeholder.js'
import { caseStudies } from './data/caseStudies.js'
import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'

inject()
injectSpeedInsights()

// ─── Video source switching ───────────────────────────────────────────────────
function getBreakpoint() {
  const w = window.innerWidth
  if (w >= 1080) return 'lap'
  if (w >= 700) return 'tab'
  return 'phone'
}

let currentBucket = null

function initVideo() {
  const video = document.getElementById('dashboard-video')
  if (!video) return

  currentBucket = getBreakpoint()

  video.src = '/assets/video/dashboard.mp4'
  video.muted = true
  video.loop = true
  video.setAttribute('playsinline', '')
  video.load()
  video.play().catch(() => {/* autoplay blocked gracefully */})
}

window.addEventListener('resize', () => {
  const newBucket = getBreakpoint()
  if (newBucket !== currentBucket) {
    currentBucket = newBucket
    initVideo()
  }
}, { passive: true })

// ─── Work case studies ───────────────────────────────────────────────────────
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function renderList(items, className = '') {
  return `<ul class="${className}">${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
}

function renderStats(stats, className = '') {
  return `
    <div class="work-stats ${className}">
      ${stats.map((stat, index) => `
        <div class="work-stat" data-stat-index="${index}">
          <strong>${escapeHtml(stat.value)}</strong>
          <span>${escapeHtml(stat.label)}</span>
        </div>
      `).join('')}
    </div>
  `
}

function renderGallery(gallery, title) {
  return `
    <div class="work-gallery" aria-label="${escapeHtml(title)} campaign gallery">
      ${gallery.map(item => `
        <figure class="work-gallery-item">
          <div class="work-gallery-media">
            <img
              src="${escapeHtml(item.path)}"
              alt="${escapeHtml(item.alt)}"
              width="1448"
              height="1086"
              loading="lazy"
              decoding="async"
            />
            <span class="work-gallery-fallback" aria-hidden="true">${escapeHtml(item.type)}</span>
          </div>
          <figcaption>
            <span>${escapeHtml(item.eyebrow)}</span>
            <strong>${escapeHtml(item.type)}</strong>
            <p>${escapeHtml(item.caption)}</p>
          </figcaption>
        </figure>
      `).join('')}
    </div>
  `
}

function renderCaseStudy(caseStudy) {
  const detailsId = `${caseStudy.id}-details`
  const titleId = `${caseStudy.id}-title`
  const cover = caseStudy.gallery[0]

  return `
    <article
      class="work-case reveal"
      data-work-theme="${escapeHtml(caseStudy.industryTheme)}"
      data-case-study="${escapeHtml(caseStudy.id)}"
      id="${escapeHtml(caseStudy.id)}"
      aria-labelledby="${titleId}"
    >
      <div class="work-case-cover" aria-hidden="true">
        <img
          src="${escapeHtml(cover.path)}"
          alt=""
          width="1448"
          height="1086"
          decoding="async"
        />
        <span class="work-case-cover-fallback">${escapeHtml(cover.type)}</span>
      </div>

      <div class="work-case-summary">
        <div class="work-case-meta">
          <span>0${caseStudy.sequence}</span>
          <span>${escapeHtml(caseStudy.contextLabel)}</span>
        </div>

        <div class="work-case-heading">
          <div>
            <p class="work-client">${escapeHtml(caseStudy.client)}</p>
            <h3 id="${titleId}">${escapeHtml(caseStudy.title)}</h3>
          </div>
          <div class="work-primary-result">
            <strong>${escapeHtml(caseStudy.primaryMetric.value)}</strong>
            <span>${escapeHtml(caseStudy.primaryMetric.label)}</span>
          </div>
        </div>

        <p class="work-case-description">${escapeHtml(caseStudy.summary)}</p>
        ${renderStats(caseStudy.stats, 'work-stats-summary')}

        <button
          class="work-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="${detailsId}"
          data-work-toggle="${escapeHtml(caseStudy.id)}"
        >
          <span>View case study</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 6l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="work-case-details" id="${detailsId}" hidden>
        <section class="work-engagement" aria-label="Engagement context">
          <div>
            <p class="work-detail-label">Engagement</p>
            <h4>${escapeHtml(caseStudy.engagement.timeline)}</h4>
          </div>
          <dl>
            <div>
              <dt>Audience</dt>
              <dd>${escapeHtml(caseStudy.engagement.audience)}</dd>
            </div>
            <div>
              <dt>Stakeholders</dt>
              <dd>${escapeHtml(caseStudy.engagement.stakeholders)}</dd>
            </div>
            <div>
              <dt>Systems</dt>
              <dd>${escapeHtml(caseStudy.engagement.systems)}</dd>
            </div>
            <div>
              <dt>Baseline</dt>
              <dd>${escapeHtml(caseStudy.engagement.measurement)}</dd>
            </div>
          </dl>
        </section>

        <div class="work-detail-intro">
          <section>
            <p class="work-detail-label">The problem</p>
            <h4>${escapeHtml(caseStudy.headings.problem)}</h4>
            <p>${escapeHtml(caseStudy.problem)}</p>
          </section>
          <section>
            <p class="work-detail-label">What I built</p>
            ${renderList(caseStudy.built, 'work-deliverables')}
          </section>
        </div>

        <section class="work-decisions">
          <div>
            <p class="work-detail-label">Key decisions</p>
            <h4>${escapeHtml(caseStudy.headings.decisions)}</h4>
          </div>
          ${renderList(caseStudy.keyDecisions, 'work-decision-list')}
        </section>

        <section class="work-proof-module">
          <div>
            <p class="work-detail-label">${escapeHtml(caseStudy.proofModule.label)}</p>
            <h4>${escapeHtml(caseStudy.proofModule.title)}</h4>
            <p>${escapeHtml(caseStudy.proofModule.body)}</p>
          </div>
          ${renderList(caseStudy.proofModule.points, 'work-proof-points')}
        </section>

        <section class="work-results">
          <div class="work-section-heading">
            <div>
              <p class="work-detail-label">Performance</p>
              <h4>${escapeHtml(caseStudy.headings.results)}</h4>
            </div>
            <p>${escapeHtml(caseStudy.engagement.measurement)}</p>
          </div>
          ${renderStats(caseStudy.stats)}
        </section>

        <section>
          <div class="work-section-heading">
            <div>
              <p class="work-detail-label">Campaign system</p>
              <h4>${escapeHtml(caseStudy.headings.gallery)}</h4>
            </div>
          </div>
          ${renderGallery(caseStudy.gallery, caseStudy.title)}
        </section>

        <section class="work-learning">
          <div>
            <p class="work-detail-label">What I learned</p>
            <h4>${escapeHtml(caseStudy.learning)}</h4>
          </div>
          <div>
            <p class="work-detail-label">What I would improve</p>
            <p>${escapeHtml(caseStudy.nextIteration)}</p>
          </div>
        </section>
      </div>
    </article>
  `
}

function initWork() {
  const root = document.getElementById('work')
  if (!root) return

  root.className = 'work-section'
  root.removeAttribute('style')
  root.innerHTML = `
    <div class="container-shell section-pad">
      <header class="work-header reveal">
        <div>
          <p class="section-label">Selected work</p>
          <h2>Campaign systems built to move pipeline.</h2>
        </div>
        <p>I shape the strategy, write the emails, build the conversion path, and make the results easy to act on.</p>
      </header>

      <div class="work-capabilities reveal" aria-label="Campaign capabilities">
        ${['Strategy', 'Email systems', 'Landing pages', 'Analytics'].map((item, index) => `
          <span><b>0${index + 1}</b>${item}</span>
        `).join('')}
      </div>

      <div class="work-case-list">
        ${caseStudies.map(renderCaseStudy).join('')}
      </div>
    </div>
  `

  let openCaseId = null

  const closeCase = caseId => {
    const article = root.querySelector(`[data-case-study="${caseId}"]`)
    const button = root.querySelector(`[data-work-toggle="${caseId}"]`)
    const panel = document.getElementById(`${caseId}-details`)
    if (!article || !button || !panel) return

    article.classList.remove('is-open')
    button.setAttribute('aria-expanded', 'false')
    button.querySelector('span').textContent = 'View case study'
    panel.hidden = true
  }

  const openCase = caseId => {
    const article = root.querySelector(`[data-case-study="${caseId}"]`)
    const button = root.querySelector(`[data-work-toggle="${caseId}"]`)
    const panel = document.getElementById(`${caseId}-details`)
    if (!article || !button || !panel) return

    article.classList.add('is-open')
    button.setAttribute('aria-expanded', 'true')
    button.querySelector('span').textContent = 'Close case study'
    panel.hidden = false
    panel.querySelectorAll('img').forEach(image => {
      image.loading = 'eager'
    })
  }

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-work-toggle]')
    if (!button) return

    const nextCaseId = button.dataset.workToggle
    if (openCaseId === nextCaseId) {
      closeCase(nextCaseId)
      openCaseId = null
      history.replaceState(null, '', '#work')
      return
    }

    if (openCaseId) closeCase(openCaseId)
    openCase(nextCaseId)
    openCaseId = nextCaseId
    history.replaceState(null, '', `#${nextCaseId}`)
  })

  root.querySelectorAll('.work-gallery img, .work-case-cover img').forEach(image => {
    const markMissing = () => image.parentElement.classList.add('is-missing')
    image.addEventListener('error', markMissing)
    if (image.complete && image.naturalWidth === 0) markMissing()
  })

  const caseIds = new Set(caseStudies.map(caseStudy => caseStudy.id))
  const hashCaseId = window.location.hash.slice(1)
  if (caseIds.has(hashCaseId)) {
    openCase(hashCaseId)
    openCaseId = hashCaseId
  }

  window.addEventListener('hashchange', () => {
    const nextCaseId = window.location.hash.slice(1)
    if (!caseIds.has(nextCaseId)) return
    if (openCaseId && openCaseId !== nextCaseId) closeCase(openCaseId)
    openCase(nextCaseId)
    openCaseId = nextCaseId
  })
}


// ─── Reveal on scroll ─────────────────────────────────────────────────────────
function initReveal() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const els = document.querySelectorAll('.reveal')

  if (reduceMotion) {
    els.forEach(el => el.classList.add('visible'))
    return
  }

  els.forEach(el => {
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add('visible')
  })

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

  els.forEach(el => observer.observe(el))
}

// ─── Scroll spy ───────────────────────────────────────────────────────────────
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]')
  const links = document.querySelectorAll('.nav-link[data-spy]')

  if (!sections.length || !links.length) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`)
        })
      }
    })
  }, { threshold: 0.35 })

  sections.forEach(s => observer.observe(s))
}

// ─── Nav scroll state ────────────────────────────────────────────────────────
function initNavState() {
  const nav = document.getElementById('main-nav')
  if (!nav) return

  const sync = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 16)
  }

  sync()
  window.addEventListener('scroll', sync, { passive: true })
}

// ─── Smooth anchor (supplement CSS scroll-padding-top) ───────────────────────
document.addEventListener('click', e => {
  const anchor = e.target.closest('a[href^="#"]')
  if (!anchor) return
  const target = document.querySelector(anchor.getAttribute('href'))
  if (target) {
    e.preventDefault()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }
})

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initWork()
  initPlaceholders()
  initVideoPoster()
  initVideo()
  initReveal()
  initNavState()
  initScrollSpy()
})
