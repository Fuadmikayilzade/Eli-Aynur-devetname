import React, { useState, useEffect } from 'react'
import { hero, columns, venueBuilding, curtain, dressCode, candles } from '../assets'
import Countdown from './Countdown'
import RSVPCard from './RSVPCard'
import './InviteScreen.css'

const MAP_LINK = 'https://maps.app.goo.gl/SkLFT5EeZd2TTUHJ7'

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function InviteScreen({ musicPlaying, onToggleMusic }) {
  const [showScrollHint, setShowScrollHint] = useState(true)

  useScrollReveal()

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollHint(false)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Edit this list with the real event schedule — time + title, shown in order.
  const PROGRAM = [
    { time: '18:00', title: 'Qonaqların qarşılanması' },
    { time: '19:00', title: 'Bəy və Gəlin girişi' },
    { time: '21:00', title: 'Musiqili şou' },
    { time: '22:00', title: 'Tort mərasimi' },
    { time: '23:00', title: 'Əyləncə' },
  ]

  return (
    <div className="invite">
      <button className="music-btn" onClick={onToggleMusic}>
        {musicPlaying ? '♪' : '♩'}
      </button>

      {/* ── HERO — full image, all text baked in ── */}
      <section className="hero-wrap">
        <img src={hero} alt="Əli & Aynur" className="hero-img" />
      </section>

      {showScrollHint && (
        <div className="scroll-hint" aria-hidden="true">
          <span className="scroll-hint-label">Sürüşdürün</span>
          <div className="scroll-hint-circle">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
              <path d="M12 3v16M12 19l-7-7M12 19l7-7" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      )}

      {/* ── COUNTDOWN ── */}
      <section className="cd-section reveal">
        <div className="cd-imgwrap">
          <img src={columns} alt="" className="cd-bg" />
          <div className="cd-overlay">
            <p className="cd-script">Xüsusi günə qalan vaxt</p>
            <Countdown />
          </div>
        </div>
      </section>

      <div className="ornament reveal">✦ ✦ ✦</div>

      {/* ── VENUE ── */}
      <section className="venue-section reveal">
        <p className="sec-label venue-label">Məkan</p>
        <img src={venueBuilding} alt="Ağ Saray" className="venue-building-img" />
        <p className="venue-city">Şirvan Şəhəri</p>
        <p className="venue-name-script"><span className="dropcap">A</span>ğ Saray</p>
        <p className="venue-datetime">03.10.2026 &nbsp;·&nbsp; Saat 18:00</p>
        <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="venue-btn">
          Məkana get
        </a>
      </section>

      <div className="ornament reveal">✦ ✦ ✦</div>

      {/* ── PROGRAM ── */}
      <section className="program-section reveal">
        <div className="pg-imgwrap">
          <img src={curtain} alt="" className="pg-bg" />
          <div className="pg-overlay">
            <p className="pg-script">Tədbirin Planı</p>
            <div className="pg-timeline">
              {PROGRAM.map((item, i) => (
                <div className="pg-item reveal" key={i} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="pg-dot-col">
                    <span className="pg-dot" />
                    <span className="pg-line" />
                  </div>
                  <div className="pg-text">
                    <p className="pg-time">{item.time}</p>
                    <p className="pg-desc">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="ornament reveal">✦ ✦ ✦</div>

      {/* ── DRESS CODE ── */}
      <section className="dc-section reveal">
        <img src={dressCode} alt="Dress Code" className="dc-full-img" />
      </section>

      <div className="ornament reveal">✦ ✦ ✦</div>

      {/* ── CANDLES DIVIDER ── */}
      <section className="candles-section reveal">
        <img src={candles} alt="" className="candles-img" />
      </section>

      {/* ── RSVP ── */}
      <section className="rsvp-section reveal">
        <p className="sec-label">İştirak Blankı</p>
        <RSVPCard />
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer reveal">
        <div className="g-divider"><div className="g-diamond" /></div>
        <p className="footer-names">Əli &amp; <span className="dropcap">A</span>ynur</p>
        <p className="footer-date">03 · X · MMXXVI</p>
        <p className="footer-sub">Sizinlə bu xoşbəxt günü bölüşmək arzusundayıq</p>

        <div className="footer-contacts">
          <a className="contact-btn" href="https://wa.me/994104195344" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
              <path d="M17.6 6.3A8.5 8.5 0 003.8 16.4L2.8 21l4.7-1a8.5 8.5 0 0010.1-13.7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.5 8.6c.2-.5.5-.5.8-.5h.6c.2 0 .4 0 .6.4.2.5.6 1.5.7 1.6.1.1.1.3 0 .5-.1.2-.2.3-.4.5-.2.2-.4.4-.2.7.2.4 1 1.4 2.1 2.2 1.4 1 1.7.8 2 .8.3-.1.6-.6.8-.9.2-.3.4-.2.6-.1.2.1 1.5.7 1.7.8.2.1.4.2.4.3 0 .1 0 .8-.3 1.3-.3.5-1.4 1-2 1-.6 0-1.8-.2-3.5-1.4-2.1-1.5-3.4-3.5-3.6-3.8-.1-.3-1-1.4-1-2.6 0-1.2.6-1.8.8-2z" fill="currentColor" />
            </svg>
          </a>
          <a className="contact-btn" href="https://instagram.com/digiinvite.elite" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="23" height="23" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}