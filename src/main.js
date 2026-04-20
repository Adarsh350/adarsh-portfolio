import './style.css'
import { initPlaceholders, initVideoPoster } from './components/placeholder.js'

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

  const bp = getBreakpoint()
  currentBucket = bp

  if (bp === 'phone') {
    // No autoplay on mobile — overlay handles play
    video.removeAttribute('autoplay')
    video.pause()
  } else {
    const src = bp === 'lap'
      ? '/assets/video/dashboard-desktop.mp4'
      : '/assets/video/dashboard-tablet.mp4'
    video.src = src
    video.muted = true
    video.loop = true
    video.setAttribute('playsinline', '')
    video.load()
    video.play().catch(() => {/* autoplay blocked gracefully */})
  }
}

window.addEventListener('resize', () => {
  const newBucket = getBreakpoint()
  if (newBucket !== currentBucket) {
    currentBucket = newBucket
    initVideo()
  }
}, { passive: true })

// ─── Mobile video play overlay ────────────────────────────────────────────────
function initMobileVideoPlay() {
  const overlay = document.getElementById('video-play-overlay')
  const video = document.getElementById('dashboard-video')
  if (!overlay || !video) return

  overlay.addEventListener('click', () => {
    video.src = '/assets/video/dashboard-tablet.mp4'
    video.muted = true
    video.setAttribute('playsinline', '')
    video.load()
    video.play().then(() => {
      overlay.style.display = 'none'
    }).catch(() => {/* video missing — overlay stays */})
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

// ─── Smooth anchor (supplement CSS scroll-padding-top) ───────────────────────
document.addEventListener('click', e => {
  const anchor = e.target.closest('a[href^="#"]')
  if (!anchor) return
  const target = document.querySelector(anchor.getAttribute('href'))
  if (target) {
    e.preventDefault()
    target.scrollIntoView({ behavior: 'smooth' })
  }
})

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initPlaceholders()
  initVideoPoster()
  initVideo()
  initMobileVideoPlay()
  initReveal()
  initScrollSpy()
})
