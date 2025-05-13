import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [bgColor, setBgColor] = useState('white')
  const [message, setMessage] = useState('Press a button to begin.')
  const [strokePressCount, setStrokePressCount] = useState(0)
  const [buttonsDisabled, setButtonsDisabled] = useState(false)
  const [showFlatline, setShowFlatline] = useState(false)
  const [showRoutineCelebration, setShowRoutineCelebration] = useState(false)
  const [muted, setMuted] = useState(() => localStorage.getItem('muted') === 'true')

  const [jokeCount, setJokeCount] = useState(0)
  const [strokeCount, setStrokeCount] = useState(0)
  const [strokeOutCount, setStrokeOutCount] = useState(0)
  const [routineCount, setRoutineCount] = useState(0)

  // Preload audio files
  const flatlineAudio = useRef(new Audio('/flatline.wav'))
  const warningAudio = useRef(new Audio('/warning.wav'))
  const successAudio = useRef(new Audio('/success.flac'))
  const laughterAudio = useRef(new Audio('/laughter.wav'))

  useEffect(() => {
    localStorage.setItem('muted', muted)
  }, [muted])

  useEffect(() => {
    flatlineAudio.current.load()
    warningAudio.current.load()
    successAudio.current.load()
    laughterAudio.current.load()
  }, [])

  const playSound = (audioRef) => {
    if (muted) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    audioRef.current.play()
  }

  const triggerCelebration = () => {
    setShowRoutineCelebration(true)
    setTimeout(() => setShowRoutineCelebration(false), 3000)
  }

  const handleJoke = () => {
    if (buttonsDisabled) return

    const newJokeCount = jokeCount + 1
    setJokeCount(newJokeCount)

    if (newJokeCount % 3 === 0) {
      setMessage("🎉 New Routine!")
      setRoutineCount(prev => prev + 1)
      playSound(laughterAudio)
      triggerCelebration()
    } else {
      setMessage("That’s going in the act!")
      playSound(successAudio)
    }

    setBgColor('green')
    if (navigator.vibrate) navigator.vibrate(100)
  }

  const handleStroke = () => {
    if (buttonsDisabled) return

    const newPressCount = strokePressCount + 1
    setStrokePressCount(newPressCount)
    setStrokeCount(prev => prev + 1)

    if (newPressCount < 3) {
      setBgColor('red')
      setMessage("Warning! Possible stroke symptoms!")
      playSound(warningAudio)
      if (navigator.vibrate) navigator.vibrate(200)
    }

    if (newPressCount === 3) {
      setBgColor('black')
      setMessage("🔊 Flatline... Please seek medical help.")
      setButtonsDisabled(true)
      setShowFlatline(true)
      setStrokeOutCount(prev => prev + 1)
      playSound(flatlineAudio)
      if (navigator.vibrate) navigator.vibrate([300, 100, 300])

      setTimeout(() => {
        setButtonsDisabled(false)
        setStrokePressCount(0)
        setBgColor('white')
        setMessage('Press a button to begin.')
        setShowFlatline(false)
      }, 5000)
    }
  }

  const handleReset = () => {
    if (buttonsDisabled) return
    setStrokePressCount(0)
    setBgColor('white')
    setMessage('Press a button to begin.')
    setShowFlatline(false)
    setJokeCount(0)
    setStrokeCount(0)
    setStrokeOutCount(0)
    setRoutineCount(0)
  }

  return (
    <div className={`app ${bgColor}`}>
      <h1>Joke or Stroke</h1>
      <p>{message}</p>

      <div className="buttons">
        <button onClick={handleJoke} disabled={buttonsDisabled}>JOKE</button>
        <button onClick={handleStroke} disabled={buttonsDisabled}>STROKE</button>
        <button onClick={handleReset} disabled={buttonsDisabled}>RESET</button>
        <button
          onClick={() => setMuted(prev => !prev)}
          className="mute-button"
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      <div className="scoreboard">
        <h2>Score</h2>
        <p>🤣 Jokes: <strong>{jokeCount}</strong></p>
        <p>⚠️ Strokes: <strong>{strokeCount}</strong></p>
        <p>💀 Stroke-outs: <strong>{strokeOutCount}</strong></p>
        <p>🎭 New Routines: <strong>{routineCount}</strong></p>
      </div>

      {showFlatline && (
        <div className="ecg-container">
          <div className="ecg-line" />
        </div>
      )}

      {showRoutineCelebration && (
        <div className="routine-pop">🎭 New Routine!</div>
      )}
    </div>
  )
}

export default App
