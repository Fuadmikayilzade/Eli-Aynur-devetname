import React, { useState, useRef, useEffect } from 'react'
import './IntroScreen.css'

export default function IntroScreen({ onOpen, onFirstTap }) {
  const [stage, setStage] = useState('tap') // 'tap' | 'video1' | 'video2' | 'exit'
  const [loaded, setLoaded] = useState(false)
  const v1Ref = useRef(null)
  const v2Ref = useRef(null)

  useEffect(() => {
    const v = v1Ref.current
    if (!v) return
    v.load()
    const ok = () => setLoaded(true)
    v.addEventListener('canplaythrough', ok)
    v.addEventListener('loadeddata', ok)
    return () => {
      v.removeEventListener('canplaythrough', ok)
      v.removeEventListener('loadeddata', ok)
    }
  }, [])

  const handleTap = () => {
    if (stage !== 'tap') return
    onFirstTap?.() // start the invitation's own music right away
    setStage('video1')
    const p = v1Ref.current?.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => handleVideo1End()) // couldn't play — skip straight ahead
    }
  }

  const handleVideo1End = () => {
    setStage('video2')
  }

  // Once stage becomes 'video2', auto-play video2
  useEffect(() => {
    if (stage !== 'video2') return
    const v = v2Ref.current
    if (!v) return
    const p = v.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => handleVideo2End())
    }
  }, [stage])

  const handleVideo2End = () => {
    if (stage === 'exit') return
    setStage('exit')
    setTimeout(() => onOpen(), 700)
  }

  return (
    <div className={`intro-screen${stage === 'exit' ? ' exit' : ''}`} onClick={handleTap}>
      <video
        ref={v1Ref}
        src="/video1.mp4"
        playsInline
        preload="auto"
        webkit-playsinline="true"
        className={`intro-video ${stage === 'video1' ? 'active' : ''}`}
        onEnded={handleVideo1End}
        onError={handleVideo1End}
      />
      <video
        ref={v2Ref}
        src="/video2.mp4"
        playsInline
        muted
        preload="auto"
        webkit-playsinline="true"
        className={`intro-video ${stage === 'video2' || stage === 'exit' ? 'active' : ''}`}
        onEnded={handleVideo2End}
        onError={handleVideo2End}
      />

      {!loaded && stage === 'tap' && (
        <div className="intro-spinner-wrap"><div className="intro-spinner" /></div>
      )}
    </div>
  )
}