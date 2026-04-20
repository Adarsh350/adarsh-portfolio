export function initPlaceholders() {
  document.querySelectorAll('img[data-placeholder]').forEach(img => {
    const placeholder = document.getElementById(img.dataset.placeholder)
    if (!placeholder) return
    img.addEventListener('error', () => {
      img.style.display = 'none'
      placeholder.style.display = 'flex'
    })
    if (!img.src || img.complete && img.naturalWidth === 0) {
      img.style.display = 'none'
      placeholder.style.display = 'flex'
    }
  })
}

export function initVideoPoster() {
  const video = document.getElementById('dashboard-video')
  const posterEl = document.getElementById('dashboard-poster')
  if (!video || !posterEl) return
  video.addEventListener('error', () => {
    video.style.display = 'none'
    posterEl.style.display = 'block'
  })
}
