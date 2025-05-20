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
  const [name, setName] = useState('')
  const [hasEnteredName, setHasEnteredName] = useState(false)
  const [nameInput, setNameInput] = useState('')

  const [jokeCount, setJokeCount] = useState(0)
  const [strokeCount, setStrokeCount] = useState(0)
  const [strokeOutCount, setStrokeOutCount] = useState(0)
  const [routineCount, setRoutineCount] = useState(0)

  const flatlineAudio = useRef(new Audio('/flatline.wav'))
  const warningAudio = useRef(new Audio('/warning.wav'))
  const successAudio = useRef(new Audio('/success.flac'))
  const laughterAudio = useRef(new Audio('/laughter.wav'))

  useEffect(() => {
    const storedName = localStorage.getItem('username')
    if (storedName) {
      setName(storedName)
      setHasEnteredName(true)
      setMessage(`Welcome back, ${storedName}! Press a button to begin.`)
    }
  }, [])

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
      setMessage("That's going in the act!")
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
        setMessage(`Welcome back, ${name}! Press a button to begin.`)
        setShowFlatline(false)
      }, 5000)
    }
  }

  const handleReset = () => {
    if (buttonsDisabled) return
    setStrokePressCount(0)
    setBgColor('white')
    setMessage(`Welcome back, ${name}! Press a button to begin.`)
    setShowFlatline(false)
    setJokeCount(0)
    setStrokeCount(0)
    setStrokeOutCount(0)
    setRoutineCount(0)
  }

  const handleNameSave = () => {
    if (nameInput.trim()) {
      localStorage.setItem('username', nameInput.trim())
      setName(nameInput.trim())
      setHasEnteredName(true)
      setMessage(`Welcome, ${nameInput.trim()}! Press a button to begin.`)
    }
  }

  return (
    <div className="app">
      <img 
        src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Microphone/3D/microphone_3d.png" 
        alt="Microphone" 
        className="app-logo"
      />
      <h1>Joke or Stroke</h1>

      {hasEnteredName && (
        <div className="greeting">
          <p>Hello, <strong>{name}</strong> 👋</p>
          <small
            className="change-name-link"
            onClick={() => {
              setHasEnteredName(false)
              setNameInput(name)
            }}
          >
            Change name
          </small>
        </div>
      )}

      <p>{message}</p>

      <div className="buttons">
        <button onClick={handleJoke} disabled={buttonsDisabled}>JOKE</button>
        <button onClick={handleStroke} disabled={buttonsDisabled}>STROKE</button>
        <button onClick={handleReset} disabled={buttonsDisabled}>RESET</button>
      </div>

      <div className="scoreboard">
        <h2>Score</h2>
        <p>😂 Jokes: {jokeCount}</p>
        <p>⚠️ Strokes: {strokeCount}</p>
        <p>💀 Stroke-outs: {strokeOutCount}</p>
      </div>

      <button
        onClick={() => setMuted(prev => !prev)}
        className="mute-button"
        title={muted ? "Unmute" : "Mute"}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {showFlatline && (
        <div className="ecg-container">
          <div className="ecg-line" />
        </div>
      )}

      {showRoutineCelebration && (
        <div className="routine-pop">🎭 New Routine!</div>
      )}

      {!hasEnteredName && (
        <div className="username-modal">
          <div className="username-modal-content">
            <h2>Welcome! What's your name?</h2>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your name"
            />
            <button onClick={handleNameSave}>Start</button>
          </div>
        </div>
      )}

      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  )
}

export default App
