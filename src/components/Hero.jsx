function RetroGrid() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', perspective: '200px', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, animation: 'grid 12s linear infinite' }}>
        <div style={{
          position: 'absolute', inset: '-100% -50%',
          backgroundImage: 'linear-gradient(to right, rgba(224,122,88,0.12) 1px, transparent 0), linear-gradient(to bottom, rgba(224,122,88,0.12) 1px, transparent 0)',
          backgroundSize: '60px 60px',
        }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--color-bg) 0%, transparent 25%, transparent 70%, var(--color-bg) 100%)' }} />
    </div>
  )
}

export default function Hero() {
  return (
    <header id="hero" style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--nav-h-mobile)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>

      <RetroGrid />

      {/* Top radial glow */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse at top, rgba(224,122,88,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div className="container-shell" style={{ paddingBlock: 'clamp(2.5rem,6vw,5rem)', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.375rem', maxWidth: '740px', margin: '0 auto' }}>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-pill)', padding: '0.4rem 0.875rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0 }} aria-hidden="true" />
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>B2B Email · AI · Web Specialist</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: 'var(--text-hero)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.03em', color: 'var(--color-text)', margin: 0 }}>
            Email campaigns that don't stop at the{' '}
            <span style={{ background: 'linear-gradient(135deg, #E07A58 0%, #F5A882 50%, #E07A58 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>send.</span>
          </h1>

          {/* Subtext */}
          <p style={{ fontSize: 'clamp(0.9375rem,2.2vw,1.125rem)', color: 'var(--color-muted)', lineHeight: 1.65, margin: 0, maxWidth: '520px' }}>
            Mailchimp copy + design. Custom landing pages. Live analytics dashboards. Branded reports that prove ROI.
          </p>

          {/* Meta */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '0.35rem 0.75rem', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-faint)' }}>
            <span>B2B specialist</span>
            <span aria-hidden="true" style={{ color: 'var(--color-border)' }}>·</span>
            <span>Abu Dhabi-based</span>
            <span aria-hidden="true" style={{ color: 'var(--color-border)' }}>·</span>
            <span>Global clients</span>
          </div>

          {/* Availability */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-accent)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6DAA45', flexShrink: 0 }} aria-hidden="true" />
            Available now — May 2026 start
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.875rem', paddingTop: '0.25rem' }}>
            <a href="#work" className="btn-primary">
              See My Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#contact" className="btn-ghost">Let's Talk</a>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', paddingTop: '0.125rem' }}>
            <span className="tag">Mailchimp</span>
            <span className="tag">Analytics</span>
            <span className="tag">Landing Pages</span>
            <span className="tag">AI Workflows</span>
            <span className="tag">Reports</span>
          </div>

        </div>
      </div>
    </header>
  )
}
