import React, { useState, useRef, useEffect } from 'react'
import IntroScreen from './components/IntroScreen'
import InviteScreen from './components/InviteScreen'

export default function App() {
  const [screen, setScreen] = useState('intro') // 'intro' | 'invite'
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/music.mp3')
    audioRef.current.loop = true
    return () => { audioRef.current?.pause() }
  }, [])

  const handleFirstTap = () => {
    setStarted(true)
    audioRef.current?.play().then(() => setMusicPlaying(true)).catch(() => {})
  }

  const handleOpen = () => {
    setScreen('invite')
  }

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (musicPlaying) {
      audioRef.current.pause()
      setMusicPlaying(false)
    } else {
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {})
    }
  }

  return (
    <div className="app-root">
      {screen === 'intro' && <IntroScreen onOpen={handleOpen} onFirstTap={handleFirstTap} />}
      {screen === 'invite' && (
        <InviteScreen musicPlaying={musicPlaying} onToggleMusic={toggleMusic} />
      )}

      {/* Visible from the moment the guest taps to open, all the way through */}
      {started && screen === 'intro' && (
        <button className="music-btn" onClick={toggleMusic}>
          {musicPlaying ? '♪' : '♩'}
        </button>
      )}
    </div>
  )
}