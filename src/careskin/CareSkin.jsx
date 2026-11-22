import React, { useState, useEffect, useRef } from 'react';
import './careskin.css';

/* ===========================
   SVG Icons (inline, no deps)
   =========================== */
const Icons = {
  menu: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  close: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  chevronDown: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  arrowRight: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  camera: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  scan: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
      <line x1="3" y1="12" x2="21" y2="12" strokeDasharray="3 2"/>
    </svg>
  ),
  insights: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  mail: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  phone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  android: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C7.08 3.04 6 4.6 6 6.39V7h12v-.61c0-1.79-1.08-3.35-2.47-4.23zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
    </svg>
  ),
  apple: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.19 1.28-2.17 3.83.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.65M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  ),
  clinic: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
};

/* ===========================
   Navbar Component
   =========================== */
const CSNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: 'How it works', id: 'how-it-works' },
    { label: 'Skin insights', id: 'skin-insights' },
    { label: 'For clinics', id: 'for-clinics' },
    { label: 'About', id: 'about' },
    { label: 'FAQs', id: 'faqs' },
  ];

  return (
    <>
      <nav className={`cs-navbar ${scrolled ? 'cs-navbar-scrolled' : 'cs-navbar-transparent'}`} role="navigation" aria-label="Main navigation">
        <div className="cs-navbar-inner">
          <a href="#hero" className="cs-nav-logo" onClick={e => { e.preventDefault(); scrollTo('hero'); }} aria-label="CareSkin home">
            Care<span>Skin</span>
          </a>
          <ul className="cs-nav-links" role="list">
            {navLinks.map(l => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="cs-nav-link" onClick={e => { e.preventDefault(); scrollTo(l.id); }}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href="#contact"
              className="cs-btn cs-btn-primary cs-btn-sm cs-desktop-cta"
              onClick={e => { e.preventDefault(); scrollTo('contact'); }}
            >
              Get the app
            </a>
            <button
              className="cs-mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? Icons.close : Icons.menu}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`cs-mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="cs-mobile-nav-links" role="list">
          {navLinks.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="cs-mobile-nav-link" onClick={e => { e.preventDefault(); scrollTo(l.id); }}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="cs-btn cs-btn-primary"
              style={{ marginTop: 16, display: 'inline-flex' }}
              onClick={e => { e.preventDefault(); scrollTo('contact'); setMenuOpen(false); }}
            >
              Get the app
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

/* ===========================
   Hero Section
   =========================== */
const CSHero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="cs-hero">
      <div className="cs-hero-bg" aria-hidden="true" />

      {/* Animated star particles */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 3 === 0 ? '3px' : '2px',
            height: i % 3 === 0 ? '3px' : '2px',
            borderRadius: '50%',
            background: i % 2 === 0 ? '#c4acff' : '#ff5c47',
            opacity: Math.random() * 0.5 + 0.1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }} />
        ))}
      </div>

      <div className="cs-container cs-hero-content">
        <div className="cs-hero-text">
          <div className="cs-hero-eyebrow">
            <div className="cs-hero-eyebrow-line" aria-hidden="true" />
            <span className="cs-label cs-text-coral">AI Skin Analysis</span>
          </div>

          <h1 className="cs-hero-headline">
            Your skin has<br />
            a story. Start<br />
            with{' '}
            <span className="cs-gradient-text">one image.</span>
          </h1>

          <p className="cs-hero-sub">
            CareSkin uses AI to turn a single face image into clear, readable insights about skin type and visible skin concerns.
          </p>

          <div className="cs-hero-ctas">
            <a
              href="#how-it-works"
              className="cs-btn cs-btn-primary cs-btn-lg"
              onClick={e => { e.preventDefault(); scrollTo('how-it-works'); }}
              id="hero-primary-cta"
            >
              Explore CareSkin {Icons.arrowRight}
            </a>
            <a
              href="#for-clinics"
              className="cs-btn cs-btn-secondary cs-btn-lg"
              onClick={e => { e.preventDefault(); scrollTo('for-clinics'); }}
              id="hero-clinics-cta"
            >
              For clinics &amp; practices
            </a>
          </div>

          <div className="cs-hero-trust">
            <span className="cs-hero-trust-dot" aria-hidden="true" />
            <span>Informational skin insights. Not a medical diagnosis.</span>
          </div>
        </div>

        <div className="cs-hero-visual" aria-hidden="true">
          <div className="cs-hero-img-wrap">
            <img
              src="/skin_signal_hero.png"
              alt="CareSkin AI skin signal artwork — an abstract face outline with scan markers and data points"
              style={{ borderRadius: '24px' }}
            />

            {/* Floating scan markers */}
            <div className="cs-scan-marker" style={{ top: '20%', right: '-40px', animation: 'float 3.5s ease-in-out infinite' }}>
              <div className="cs-scan-marker-dot" />
              <div className="cs-scan-marker-line" />
              <span className="cs-scan-marker-label">Skin Type</span>
            </div>
            <div className="cs-scan-marker" style={{ top: '50%', right: '-50px', animation: 'float 4.2s ease-in-out infinite', animationDelay: '0.5s' }}>
              <div className="cs-scan-marker-dot" style={{ borderColor: '#c4acff' }} />
              <div className="cs-scan-marker-line" style={{ background: '#c4acff' }} />
              <span className="cs-scan-marker-label" style={{ color: '#c4acff' }}>Pigmentation</span>
            </div>
            <div className="cs-scan-marker" style={{ bottom: '25%', right: '-35px', animation: 'float 3.8s ease-in-out infinite', animationDelay: '1s' }}>
              <div className="cs-scan-marker-dot" style={{ borderColor: '#c8f04e' }} />
              <div className="cs-scan-marker-line" style={{ background: '#c8f04e' }} />
              <span className="cs-scan-marker-label" style={{ color: '#c8f04e' }}>Wrinkles</span>
            </div>

            {/* Tagline overlay */}
            <div style={{
              position: 'absolute',
              bottom: '-18px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(13, 10, 26, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(157, 127, 232, 0.3)',
              borderRadius: '50px',
              padding: '8px 20px',
              whiteSpace: 'nowrap',
            }}>
              <span style={{ fontSize: '0.78rem', fontStyle: 'italic', color: 'rgba(247, 243, 236, 0.6)' }}>
                "One image. A clearer view of your skin."
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===========================
   How It Works
   =========================== */
const CSHowItWorks = () => {
  const steps = [
    {
      num: '01',
      icon: Icons.camera,
      iconClass: 'cs-step-icon-coral',
      title: 'Take or choose a clear face image',
      desc: 'Open CareSkin and use your camera or select an existing photo. Good lighting and a clear view of your face gives the best results.',
    },
    {
      num: '02',
      icon: Icons.scan,
      iconClass: 'cs-step-icon-lavender',
      title: 'CareSkin analyzes visible skin features',
      desc: 'Our AI examines visible features across your face — from skin tone and texture to areas that may show signs of acne, pigmentation, or other concerns.',
    },
    {
      num: '03',
      icon: Icons.insights,
      iconClass: 'cs-step-icon-lime',
      title: 'Explore readable insights over time',
      desc: 'Review clear, plain-language cards covering each skin area. Return regularly to track how your skin looks across check-ins.',
    },
  ];

  return (
    <section id="how-it-works" className="cs-section cs-bg-ivory">
      <div className="cs-container">
        <div className="cs-section-intro">
          <span className="cs-label cs-text-coral">Simple process</span>
          <h2 className="cs-headline-lg" style={{ marginTop: 12, marginBottom: 16, color: 'var(--cs-midnight)' }}>
            How CareSkin works
          </h2>
          <p className="cs-body" style={{ color: 'var(--cs-text-muted)' }}>
            From a single image to a full set of skin insights — here's what happens when you use CareSkin.
          </p>
        </div>

        <div className="cs-steps-grid" role="list">
          {steps.map((step, i) => (
            <div key={i} className="cs-step-card" role="listitem" style={{ position: 'relative' }}>
              <div className="cs-step-number" aria-hidden="true">{step.num}</div>
              <div className={`cs-step-icon ${step.iconClass}`} aria-hidden="true">
                {step.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--cs-midnight)', marginBottom: 10 }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--cs-text-muted)' }}>{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="cs-step-connector" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===========================
   Skin Insights Grid
   =========================== */
const CSSkinInsights = () => {
  const insights = [
    { icon: '🌊', title: 'Skin Type', desc: 'Highlights visible features related to oily, dry, combination, or normal skin appearance.' },
    { icon: '🔴', title: 'Acne', desc: 'Offers informational insights about visible breakouts, spots, and blemish-prone areas.' },
    { icon: '🌑', title: 'Melasma', desc: 'Identifies areas of visible patchy pigmentation that may be associated with melasma-like patterns.' },
    { icon: '✨', title: 'Pigmentation', desc: 'Notes visible uneven tone, dark spots, or discoloration across different skin zones.' },
    { icon: '〰️', title: 'Wrinkles', desc: 'Highlights visible fine lines and deeper creases in key facial areas.' },
    { icon: '🌸', title: 'Freckles', desc: 'Identifies visible freckle clusters and areas of light sun-related marking.' },
    { icon: '👁️', title: 'Dark Circles', desc: 'Notes visible darkness and discoloration in the under-eye area.' },
    { icon: '🌿', title: 'Eyebrow-area concerns', desc: 'Highlights visible features in the brow zone, including skin texture and discoloration.' },
    { icon: '📊', title: 'More insights', desc: 'CareSkin continues to expand the range of visible skin features it can identify over time.' },
  ];

  return (
    <section id="skin-insights" className="cs-section cs-bg-plum" style={{ background: 'var(--cs-plum)' }}>
      <div className="cs-container">
        <div className="cs-section-intro-center">
          <span className="cs-label" style={{ color: 'var(--cs-coral)' }}>What we look for</span>
          <h2 className="cs-headline-lg" style={{ marginTop: 12, marginBottom: 16, color: 'var(--cs-ivory)' }}>
            What CareSkin<br />
            <span className="cs-gradient-text">can identify</span>
          </h2>
          <p className="cs-body" style={{ color: 'rgba(247, 243, 236, 0.6)' }}>
            CareSkin analyzes a single face image and provides informational insights on a range of visible skin features. This is not a medical diagnosis.
          </p>
        </div>

        <div className="cs-insights-grid" role="list">
          {insights.map((item, i) => (
            <div key={i} className="cs-insight-card" role="listitem">
              <div className="cs-insight-icon" aria-hidden="true" style={{ fontSize: '1.5rem' }}>
                {item.icon}
              </div>
              <h3 className="cs-insight-title">{item.title}</h3>
              <p className="cs-insight-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, padding: '20px 24px', borderRadius: 16, background: 'rgba(255, 92, 71, 0.08)', border: '1px solid rgba(255, 92, 71, 0.2)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ color: 'var(--cs-coral)', flexShrink: 0 }}>{Icons.shield}</span>
          <p style={{ fontSize: '0.875rem', color: 'rgba(247, 243, 236, 0.7)', margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--cs-ivory)' }}>Informational screening only.</strong> CareSkin identifies visible skin features and provides general informational insights. It does not diagnose skin conditions and is not a replacement for professional medical or dermatological advice.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ===========================
   App Preview Section
   =========================== */
const CSAppPreview = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="app-preview" className="cs-section" style={{ background: 'var(--cs-midnight)', overflow: 'hidden' }}>
      <div className="cs-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="cs-two-col">
          <div>
            <span className="cs-label" style={{ color: 'var(--cs-lavender-light)' }}>Product preview</span>
            <h2 className="cs-headline-lg" style={{ marginTop: 12, marginBottom: 20, color: 'var(--cs-ivory)' }}>
              See CareSkin<br />in action
            </h2>
            <p className="cs-body-lg" style={{ color: 'rgba(247, 243, 236, 0.65)', marginBottom: 32 }}>
              CareSkin presents your skin insights as clear, readable cards — easy to review and revisit over time.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
              {[
                { label: 'Image capture guidance', desc: 'Simple prompts help you get a well-lit, clear shot for best results.' },
                { label: 'Scan in progress', desc: 'The AI analyzes visible features across your face in moments.' },
                { label: 'Readable insight cards', desc: 'Each insight is presented in plain language — no jargon, no intimidating data.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255, 92, 71, 0.15)', border: '1px solid rgba(255, 92, 71, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: 'var(--cs-coral)', scale: '0.9' }}>{Icons.check}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--cs-ivory)', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(247, 243, 236, 0.5)', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#install"
              className="cs-btn cs-btn-primary"
              onClick={e => { e.preventDefault(); scrollTo('install'); }}
            >
              Get CareSkin {Icons.arrowRight}
            </a>
          </div>

          <div className="cs-preview-wrap">
            <div className="cs-preview-phone">
              <img
                src="/app_mockup_preview.png"
                alt="CareSkin app sample results screen showing skin insight cards — fictional demo data, sample preview only"
                style={{ borderRadius: '28px', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(157, 127, 232, 0.1)' }}
              />
              <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
                <span className="cs-badge cs-badge-lavender" style={{ fontSize: '0.65rem' }}>
                  Sample preview — fictional demo data
                </span>
              </div>
            </div>

            {/* Decorative glow */}
            <div aria-hidden="true" style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(157, 127, 232, 0.12) 0%, transparent 70%)',
              zIndex: 0,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===========================
   Tracking / Check-ins Section
   =========================== */
const CSTracking = () => {
  const timelineItems = [
    { title: 'Start your first check-in', desc: 'Take a clear face image and get your first set of skin insights. No sign-up required to explore.' },
    { title: 'Review your insights', desc: 'See which skin features are visible and explore what each means in plain language.' },
    { title: 'Return and compare', desc: 'Come back regularly to do a new check-in and see how your skin looks over time.' },
    { title: 'Stay curious', desc: 'Your skin changes with season, lifestyle, and care routines. CareSkin helps you stay aware.' },
  ];

  return (
    <section id="tracking" className="cs-section cs-bg-ivory">
      <div className="cs-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="cs-two-col">
          {/* Visual */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 320,
              height: 320,
              borderRadius: '50%',
              border: '1px solid rgba(26, 13, 46, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{
                width: 220,
                height: 220,
                borderRadius: '50%',
                border: '1px solid rgba(255, 92, 71, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 8,
              }}>
                <span style={{ fontSize: '3rem' }}>🌙</span>
                <span style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--cs-midnight)', textAlign: 'center', lineHeight: 1.3 }}>
                  Know<br />your skin
                </span>
              </div>

              {/* Orbit dots */}
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: i % 2 === 0 ? 'var(--cs-coral)' : 'var(--cs-lavender)',
                  opacity: 0.6,
                  top: `${50 - 50 * Math.cos(deg * Math.PI / 180)}%`,
                  left: `${50 + 50 * Math.sin(deg * Math.PI / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                }} />
              ))}
            </div>

            {/* Radial glow */}
            <div aria-hidden="true" style={{
              position: 'absolute',
              width: 350,
              height: 350,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(157, 127, 232, 0.08) 0%, transparent 70%)',
              zIndex: 0,
              pointerEvents: 'none',
            }} />
          </div>

          {/* Text */}
          <div>
            <span className="cs-label cs-text-coral">Track over time</span>
            <h2 className="cs-headline-lg" style={{ marginTop: 12, marginBottom: 16, color: 'var(--cs-midnight)' }}>
              Get to know your skin,<br />
              one check-in at a time.
            </h2>
            <p className="cs-body" style={{ color: 'var(--cs-text-muted)', marginBottom: 36 }}>
              CareSkin lets you save your insight history so you can revisit past check-ins and notice visible changes over time. It's informational awareness — not a clinical tracker.
            </p>

            <div className="cs-timeline" role="list">
              {timelineItems.map((item, i) => (
                <div key={i} className="cs-timeline-item" role="listitem">
                  <div className="cs-timeline-node" aria-hidden="true">
                    <div className="cs-timeline-node-inner" />
                  </div>
                  <div className="cs-timeline-content">
                    <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--cs-midnight)', marginBottom: 6 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--cs-text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===========================
   For Clinics Section
   =========================== */
const CSForClinics = () => {
  const packages = [
    { scans: '600', price: '₹19,500', note: 'Starter' },
    { scans: '900', price: '₹25,000', note: 'Popular', featured: true },
    { scans: '1,200', price: '₹30,000', note: 'Standard' },
    { scans: '2,500', price: '₹50,000', note: 'High-volume' },
  ];

  return (
    <section id="for-clinics" className="cs-section" style={{ background: 'var(--cs-midnight)' }}>
      <div className="cs-container">
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start', marginBottom: 60 }} className="cs-two-col">
          <div>
            <span className="cs-label" style={{ color: 'var(--cs-lime)' }}>For professionals</span>
            <h2 className="cs-headline-lg" style={{ marginTop: 12, marginBottom: 20, color: 'var(--cs-ivory)' }}>
              Skin check-ups,<br />
              <span className="cs-gradient-text-warm">ready for your<br />practice.</span>
            </h2>
            <p className="cs-body" style={{ color: 'rgba(247, 243, 236, 0.6)' }}>
              CareSkin offers scan packages for clinics and practices who want to offer informational skin insights as part of a check-up experience. No complex integration — your team gets access to a set number of scans to use with clients.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { icon: '⚡', title: 'Simple to use', desc: 'No medical expertise required. CareSkin provides informational output your team can share with clients.' },
              { icon: '📦', title: 'Flexible packages', desc: 'Choose a scan volume that fits your practice size. Packages start at 600 scans.' },
              { icon: '💬', title: 'Direct enquiry', desc: 'Ask about packages via email. We\'ll help you find the right option.' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(200, 240, 78, 0.08)', border: '1px solid rgba(200, 240, 78, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--cs-ivory)', marginBottom: 4 }}>{f.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(247, 243, 236, 0.5)', lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--cs-ivory)', marginBottom: 8 }}>
            Scan packages
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'rgba(247, 243, 236, 0.4)', marginBottom: 32 }}>
            All prices in Indian Rupees (INR). Contact us for custom packages.
          </p>

          <div className="cs-pricing-grid" role="list">
            {packages.map((pkg, i) => (
              <div key={i} className={`cs-pricing-card ${pkg.featured ? 'featured' : ''}`} role="listitem">
                {pkg.featured && (
                  <div style={{ position: 'absolute', top: 16, right: 16 }}>
                    <span className="cs-badge cs-badge-coral">Popular</span>
                  </div>
                )}
                <div className="cs-pricing-scans">{pkg.scans}</div>
                <div className="cs-pricing-scans-label">scans</div>
                <div className="cs-pricing-price">{pkg.price}</div>
                <a
                  href="mailto:careskinapp@gmail.com?subject=Package Enquiry"
                  className="cs-btn cs-btn-outline-coral"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Ask about this package
                </a>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, padding: '20px 24px', borderRadius: 16, background: 'rgba(200, 240, 78, 0.05)', border: '1px solid rgba(200, 240, 78, 0.15)', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>📧</span>
            <p style={{ fontSize: '0.875rem', color: 'rgba(247, 243, 236, 0.6)', margin: 0, lineHeight: 1.6 }}>
              To enquire about scan packages, email us at{' '}
              <a href="mailto:careskinapp@gmail.com?subject=Clinic Package Enquiry" style={{ color: 'var(--cs-lime)', textDecoration: 'none', fontWeight: 600 }}>careskinapp@gmail.com</a>
              {' '}with your practice details and preferred package. Our team will get back to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===========================
   App Install / Availability
   =========================== */
const CSInstall = () => (
  <section id="install" className="cs-section cs-bg-ivory">
    <div className="cs-container">
      <div className="cs-section-intro-center">
        <span className="cs-label cs-text-coral">Get CareSkin</span>
        <h2 className="cs-headline-lg" style={{ marginTop: 12, marginBottom: 16, color: 'var(--cs-midnight)' }}>
          Add CareSkin<br />to your device
        </h2>
        <p className="cs-body" style={{ color: 'var(--cs-text-muted)' }}>
          CareSkin is a web app — no traditional app store download required. Here's how to install it on your device.
        </p>
      </div>

      <div className="cs-install-cards">
        {/* Android */}
        <div className="cs-install-card" style={{ background: 'rgba(45, 27, 78, 0.5)', border: '1px solid var(--cs-border)' }}>
          <div className="cs-install-platform">
            <div className="cs-install-icon" style={{ color: '#a4c639', background: 'rgba(164, 198, 57, 0.1)' }}>{Icons.android}</div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--cs-ivory)' }}>Android</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(247, 243, 236, 0.4)' }}>Chrome or any browser</div>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <span className="cs-badge cs-badge-lime" style={{ marginBottom: 12 }}>Available now</span>
            <p style={{ fontSize: '0.875rem', color: 'rgba(247, 243, 236, 0.6)', lineHeight: 1.65 }}>
              The native Android app is not yet available on the Play Store. You can install the app-like experience directly to your Android home screen from your browser.
            </p>
          </div>
          <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Open CareSkin in Chrome on your Android device', 'Tap the three-dot menu (⋮) in the top right', 'Tap "Add to Home screen"', 'Confirm and find CareSkin on your home screen'].map((s, i) => (
              <li key={i} style={{ fontSize: '0.85rem', color: 'rgba(247, 243, 236, 0.6)', lineHeight: 1.5 }}>{s}</li>
            ))}
          </ol>
        </div>

        {/* iPhone */}
        <div className="cs-install-card" style={{ background: 'rgba(45, 27, 78, 0.5)', border: '1px solid var(--cs-border)' }}>
          <div className="cs-install-platform">
            <div className="cs-install-icon" style={{ color: '#c4acff', background: 'rgba(196, 172, 255, 0.1)' }}>{Icons.apple}</div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--cs-ivory)' }}>iPhone / iPad</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(247, 243, 236, 0.4)' }}>Safari browser required</div>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <span className="cs-badge cs-badge-lavender" style={{ marginBottom: 12 }}>Available via Safari</span>
            <p style={{ fontSize: '0.875rem', color: 'rgba(247, 243, 236, 0.6)', lineHeight: 1.65 }}>
              Open CareSkin in Safari and add it to your iPhone Home Screen for an app-like experience. This works on all modern iPhones and iPads.
            </p>
          </div>
          <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Open CareSkin in Safari on your iPhone', 'Tap the Share button (□↑) at the bottom of the screen', 'Scroll down and tap "Add to Home Screen"', 'Tap "Add" — CareSkin will appear on your home screen'].map((s, i) => (
              <li key={i} style={{ fontSize: '0.85rem', color: 'rgba(247, 243, 246, 0.6)', lineHeight: 1.5 }}>{s}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </section>
);

/* ===========================
   About Section
   =========================== */
const CSAbout = () => (
  <section id="about" className="cs-section" style={{ background: 'var(--cs-midnight)' }}>
    <div className="cs-container">
      <div className="cs-about-grid">
        <div className="cs-about-visual" aria-hidden="true">
          <div className="cs-about-bg-shape" />
          <div className="cs-about-orbit">
            <div className="cs-about-orbit-inner">🌟</div>
            <div className="cs-about-orbit-dot" />
            <div className="cs-about-orbit-dot" style={{ top: 'auto', bottom: 0, transform: 'translateX(-50%) translateY(50%)' }} />
            <div className="cs-about-orbit-dot" style={{ left: 0, top: '50%', transform: 'translateX(-50%) translateY(-50%)', background: 'var(--cs-lavender)' }} />
            <div className="cs-about-orbit-dot" style={{ left: 'auto', right: 0, top: '50%', transform: 'translateX(50%) translateY(-50%)', background: 'var(--cs-lime)', opacity: 0.6 }} />
          </div>
        </div>

        <div>
          <span className="cs-label" style={{ color: 'var(--cs-lavender-light)' }}>Our mission</span>
          <h2 className="cs-headline-lg" style={{ marginTop: 12, marginBottom: 24, color: 'var(--cs-ivory)' }}>
            About<br />
            <span className="cs-gradient-text">CareSkin</span>
          </h2>
          <p className="cs-body-lg" style={{ color: 'rgba(247, 243, 236, 0.65)', marginBottom: 20, lineHeight: 1.75 }}>
            CareSkin was built on a simple belief: understanding your skin shouldn't require a specialist appointment or complex jargon. With a single face image, CareSkin's AI gives you a clear, readable picture of what's visible on your skin — right now.
          </p>
          <p className="cs-body" style={{ color: 'rgba(247, 243, 236, 0.5)', marginBottom: 32, lineHeight: 1.75 }}>
            We designed CareSkin to be accessible, respectful, and honest. Our insights are informational — a starting point for curiosity, not a clinical conclusion. We believe people of all skin tones, ages, and backgrounds deserve tools that help them feel more aware and in control.
          </p>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { value: 'Inclusive', label: 'Across all skin tones & types' },
              { value: 'Honest', label: 'Informational, not diagnostic' },
              { value: 'Private', label: 'Your data, your control' },
            ].map((stat, i) => (
              <div key={i} style={{ flex: '1 1 100px' }}>
                <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--cs-coral)', marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(247, 243, 236, 0.4)', letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ===========================
   FAQ Section
   =========================== */
const CSFAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is CareSkin?',
      a: 'CareSkin is an AI-powered skin analysis tool that lets you take a single face image and receive clear, readable insights about your skin type and visible skin concerns — including acne, pigmentation, wrinkles, dark circles, and more.',
    },
    {
      q: 'How does the skin analysis work?',
      a: 'You take or upload a clear face image. CareSkin\'s AI then analyzes visible features across different areas of your face and generates a set of insight cards in plain language. The process takes just a few moments.',
    },
    {
      q: 'What can CareSkin identify?',
      a: 'CareSkin provides informational insights on skin type, acne, melasma, pigmentation, wrinkles, freckles, dark circles, eyebrow-area concerns, and other visible skin features. The range of insights continues to expand over time.',
    },
    {
      q: 'Is CareSkin a medical diagnosis?',
      a: 'No. CareSkin provides informational screening insights only. It identifies visible skin features based on a photo and presents that information in plain language. It is not a medical diagnosis, does not assess skin health, and is not a replacement for a qualified dermatologist or healthcare professional. If you have concerns about your skin, please consult a medical professional.',
    },
    {
      q: 'How do I install CareSkin on Android?',
      a: 'Open CareSkin in Chrome on your Android device. Tap the three-dot menu (⋮) in the top right, then tap "Add to Home screen." Confirm and CareSkin will appear as an app on your home screen. The native Android app is not yet available on the Play Store.',
    },
    {
      q: 'How do I add CareSkin to my iPhone Home Screen?',
      a: 'Open CareSkin in Safari on your iPhone or iPad. Tap the Share button (the box with an arrow) at the bottom of the screen, scroll down, and tap "Add to Home Screen." Tap "Add" to confirm. CareSkin will appear on your home screen and work like an app.',
    },
    {
      q: 'How can a clinic or practice ask about scan packages?',
      a: 'Email us at careskinapp@gmail.com with your practice details and the package you\'re interested in. We offer packages of 600, 900, 1,200, or 2,500 scans. Our team will respond with next steps.',
    },
    {
      q: 'How can I contact CareSkin?',
      a: 'You can reach us by email at careskinapp@gmail.com. For clinic and package enquiries, please include your practice name and preferred scan volume.',
    },
  ];

  return (
    <section id="faqs" className="cs-section cs-bg-ivory">
      <div className="cs-container">
        <div className="cs-section-intro-center">
          <span className="cs-label cs-text-coral">Common questions</span>
          <h2 className="cs-headline-lg" style={{ marginTop: 12, marginBottom: 16, color: 'var(--cs-midnight)' }}>
            Frequently asked<br />questions
          </h2>
        </div>

        <div className="cs-faq-list" role="list" style={{ maxWidth: 760, margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`cs-faq-item ${openIndex === i ? 'open' : ''}`}
              role="listitem"
            >
              <button
                className="cs-faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                id={`faq-btn-${i}`}
                aria-controls={`faq-answer-${i}`}
              >
                {faq.q}
                <span className="cs-faq-chevron" aria-hidden="true">{Icons.chevronDown}</span>
              </button>
              <div
                className="cs-faq-answer"
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===========================
   Contact Section
   =========================== */
const CSContact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:careskinapp@gmail.com?subject=${encodeURIComponent(`[${subject}] Message from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="cs-section" style={{ background: 'var(--cs-plum)' }}>
      <div className="cs-container">
        <div className="cs-section-intro-center">
          <span className="cs-label" style={{ color: 'var(--cs-coral)' }}>Get in touch</span>
          <h2 className="cs-headline-lg" style={{ marginTop: 12, marginBottom: 16, color: 'var(--cs-ivory)' }}>
            Contact CareSkin
          </h2>
          <p className="cs-body" style={{ color: 'rgba(247, 243, 236, 0.6)' }}>
            Questions about the app, clinic packages, or anything else? We'd love to hear from you.
          </p>
        </div>

        <div className="cs-contact-grid">
          {/* Form */}
          <form className="cs-contact-form" onSubmit={handleSubmit} noValidate>
            <div className="cs-form-group">
              <label className="cs-form-label" htmlFor="contact-name">Full name</label>
              <input
                type="text"
                id="contact-name"
                className="cs-form-input"
                placeholder="Your name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="cs-form-group">
              <label className="cs-form-label" htmlFor="contact-email">Email address</label>
              <input
                type="email"
                id="contact-email"
                className="cs-form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="cs-form-group">
              <label className="cs-form-label" htmlFor="contact-subject">Subject</label>
              <select
                id="contact-subject"
                className="cs-form-select"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
              >
                <option>General enquiry</option>
                <option>Clinic package enquiry</option>
                <option>Technical issue</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
            </div>
            <div className="cs-form-group">
              <label className="cs-form-label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                className="cs-form-textarea"
                placeholder="Tell us how we can help..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="cs-btn cs-btn-primary cs-btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
              {submitted ? 'Opening your email app…' : 'Send message'}
            </button>
            <p style={{ fontSize: '0.75rem', color: 'rgba(247, 243, 236, 0.3)', textAlign: 'center', marginTop: 4 }}>
              This will open your email app to send the message.
            </p>
          </form>

          {/* Info */}
          <div className="cs-contact-info">
            <div>
              <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--cs-ivory)', marginBottom: 20 }}>
                We're here to help
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(247, 243, 236, 0.55)', lineHeight: 1.7, marginBottom: 32 }}>
                Whether you're exploring CareSkin for personal use or interested in scan packages for your practice, reach out and we'll respond as soon as we can.
              </p>
            </div>

            <div className="cs-contact-item">
              <div className="cs-contact-icon">{Icons.mail}</div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(247, 243, 236, 0.4)', marginBottom: 4 }}>Email</div>
                <a href="mailto:careskinapp@gmail.com" style={{ color: 'var(--cs-ivory)', textDecoration: 'none', fontSize: '0.95rem' }}>careskinapp@gmail.com</a>
              </div>
            </div>

            <div style={{ padding: '24px', borderRadius: 16, background: 'rgba(255, 92, 71, 0.08)', border: '1px solid rgba(255, 92, 71, 0.2)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--cs-coral)', marginBottom: 10 }}>For clinics &amp; practices</div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(247, 243, 236, 0.6)', lineHeight: 1.65, marginBottom: 16 }}>
                To ask about scan packages for your clinic, include your practice name, estimated patient volume, and preferred package size in your message.
              </p>
              <a href="mailto:careskinapp@gmail.com?subject=Clinic Package Enquiry" className="cs-btn cs-btn-outline-coral cs-btn-sm">
                Ask about packages {Icons.arrowRight}
              </a>
            </div>

            <div style={{ padding: '20px 24px', borderRadius: 16, background: 'rgba(157, 127, 232, 0.08)', border: '1px solid rgba(157, 127, 232, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ color: 'var(--cs-lavender-light)' }}>{Icons.shield}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--cs-lavender-light)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Privacy & data</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(247, 243, 236, 0.4)', lineHeight: 1.6 }}>
                CareSkin does not store or share your face images with third parties. For details, see our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===========================
   Footer
   =========================== */
const CSFooter = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const year = new Date().getFullYear();

  return (
    <footer className="cs-footer" role="contentinfo">
      <div className="cs-container">
        <div className="cs-footer-grid">
          {/* Brand */}
          <div>
            <div className="cs-footer-logo">Care<span>Skin</span></div>
            <div className="cs-footer-tagline">"One image. A clearer view of your skin."</div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(247, 243, 236, 0.3)', lineHeight: 1.6, maxWidth: 300 }}>
              AI-powered skin analysis. Informational insights for everyone.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <div className="cs-footer-heading">Navigate</div>
            <ul className="cs-footer-links" role="list">
              {[
                { label: 'How it works', id: 'how-it-works' },
                { label: 'Skin insights', id: 'skin-insights' },
                { label: 'App preview', id: 'app-preview' },
                { label: 'For clinics', id: 'for-clinics' },
                { label: 'About', id: 'about' },
              ].map(l => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="cs-footer-link" onClick={e => { e.preventDefault(); scrollTo(l.id); }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <div className="cs-footer-heading">Support</div>
            <ul className="cs-footer-links" role="list">
              {[
                { label: 'FAQs', id: 'faqs' },
                { label: 'Get the app', id: 'install' },
                { label: 'Contact us', id: 'contact' },
              ].map(l => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="cs-footer-link" onClick={e => { e.preventDefault(); scrollTo(l.id); }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="cs-footer-heading">Legal</div>
            <ul className="cs-footer-links" role="list">
              <li><a href="#privacy-policy" className="cs-footer-link">Privacy Policy</a></li>
              <li><a href="#terms" className="cs-footer-link">Terms of Use</a></li>
            </ul>
            <div style={{ marginTop: 20 }}>
              <div className="cs-footer-heading">Contact</div>
              <a href="mailto:careskinapp@gmail.com" className="cs-footer-link" style={{ display: 'block', marginTop: 8 }}>careskinapp@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="cs-footer-bottom">
          <div className="cs-footer-disclaimer">
            <span style={{ color: 'var(--cs-coral)', opacity: 0.7 }}>{Icons.shield}</span>
            <span>Informational screening only — not a medical diagnosis.</span>
          </div>
          <div className="cs-footer-copy">
            © {year} CareSkin. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ===========================
   Main CareSkin Page
   =========================== */
const CareSkin = () => {
  return (
    <div className="cs-root">
      <CSNavbar />
      <main>
        <CSHero />
        <CSHowItWorks />
        <CSSkinInsights />
        <CSAppPreview />
        <CSTracking />
        <CSForClinics />
        <CSInstall />
        <CSAbout />
        <CSFAQs />
        <CSContact />
      </main>
      <CSFooter />
    </div>
  );
};

export default CareSkin;
