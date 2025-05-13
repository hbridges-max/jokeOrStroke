html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
}

.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  height: 100vh;
  transition: background-color 0.3s ease;
  position: relative;
}

.green {
  background-color: #38d9a9;
}

.red {
  background-color: #ff6b6b;
}

.black {
  background-color: #000;
  color: white;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  animation: fadeIn 0.5s ease-in-out;
}

.buttons {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 2rem;
}

button {
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.1s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.2);
}

button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

button:active {
  transform: scale(0.95);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* JOKE button */
button:nth-of-type(1) {
  background-color: #1dd1a1;
  color: white;
}

/* STROKE button */
button:nth-of-type(2) {
  background-color: #ff4757;
  color: white;
}

/* RESET button */
button:nth-of-type(3) {
  background-color: #f1f2f6;
  color: #2f3542;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
}

/* MUTE button */
.mute-button {
  background-color: #ccc;
  color: #333;
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  border-radius: 0.6rem;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.mute-button:hover {
  background-color: #bbb;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 🔊 ECG Flatline Animation */
.ecg-container {
  width: 80%;
  max-width: 600px;
  height: 100px;
  margin-top: 2rem;
  overflow: hidden;
  background: black;
}

.ecg-line {
  width: 200%;
  height: 100%;
  background: url('/ecg-flatline.gif') repeat-x;
  background-size: contain;
  animation: scroll-line 5s linear infinite;
}

@keyframes scroll-line {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* 📊 Scoreboard Section */
.scoreboard {
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: #f8f9fa;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 0.6rem rgba(0,0,0,0.1);
  text-align: center;
  max-width: 400px;
}

.scoreboard h2 {
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.scoreboard p {
  margin: 0.3rem 0;
  font-size: 1.2rem;
}

/* 🎉 Celebration Pop */
.routine-pop {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
  font-weight: bold;
  background: #fffbe6;
  padding: 1rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(255, 200, 0, 0.6);
  animation: popBounce 0.8s ease, fadeOut 3s ease forwards;
  z-index: 999;
}

@keyframes popBounce {
  0%   { transform: translateX(-50%) scale(0.3); opacity: 0; }
  50%  { transform: translateX(-50%) scale(1.1); opacity: 1; }
  70%  { transform: translateX(-50%) scale(0.95); }
  100% { transform: translateX(-50%) scale(1); }
}

@keyframes fadeOut {
  0%   { opacity: 1; }
  80%  { opacity: 1; }
  100% { opacity: 0; }
}

/* 🎊 Confetti animation (basic) */
.confetti {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='5' cy='5' r='5' fill='%23f00'/%3E%3C/svg%3E") repeat;
  background-size: 10px 10px;
  animation: confettiRain 2s linear forwards;
  z-index: 998;
}

@keyframes confettiRain {
  0% { background-position: 0 -100%; opacity: 1; }
  100% { background-position: 0 100%; opacity: 0; }
}

/* 📱 Mobile Portrait Optimisation */
@media (max-width: 768px) {
  .app {
    padding: 1rem;
    height: 100vh;
    overflow-y: auto;
  }

  h1 {
    font-size: 2.2rem;
  }

  p {
    font-size: 1rem;
  }

  .buttons {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    align-items: center;
  }

  button {
    width: 90%;
    font-size: 1.2rem;
    padding: 0.8rem 1.2rem;
  }

  .mute-button {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
    font-size: 1.4rem;
    padding: 0.5rem 0.8rem;
  }

  .scoreboard {
    width: 100%;
    max-width: 100%;
    font-size: 1rem;
    padding: 1rem;
  }

  .routine-pop {
    top: 30%;
    font-size: 2rem;
  }

  .ecg-container {
    height: 60px;
  }
}
