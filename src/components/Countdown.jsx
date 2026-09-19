import React, { useState, useEffect } from 'react'
import './Countdown.css'

// October 3, 2026, 18:00 Baku time (UTC+4)
const TARGET = new Date('2026-10-03T18:00:00+04:00')

function calc() {
  const d = TARGET - new Date()
  if (d <= 0) return { d: 0, h: 0, m: 0, s: 0 }
  return {
    d: Math.floor(d / 86400000),
    h: Math.floor((d % 86400000) / 3600000),
    m: Math.floor((d % 3600000) / 60000),
    s: Math.floor((d % 60000) / 1000),
  }
}

export default function Countdown() {
  const [t, setT] = useState(calc())

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { v: t.d, l: 'Gün' },
    { v: t.h, l: 'Saat' },
    { v: t.m, l: 'Dəq' },
    { v: t.s, l: 'San' },
  ]

  return (
    <div className="cd-units">
      {units.map(({ v, l }, i) => (
        <React.Fragment key={l}>
          <div className="cd-unit">
            <span className="cd-val">{String(v).padStart(2, '0')}</span>
            <span className="cd-lbl">{l}</span>
          </div>
          {i < units.length - 1 && <span className="cd-col">:</span>}
        </React.Fragment>
      ))}
    </div>
  )
}
