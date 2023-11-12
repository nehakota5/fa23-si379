import './App.css';
import './ColorPicker.css';
import React, { useState, useCallback, useEffect } from 'react';
import Slider from './Slider';

const MIN = 0;
const MAX = 255;

function App() {
  const [red, setRed] = useState(getRandomIntegerBetween(MIN, MAX));
  const [green, setGreen] = useState(getRandomIntegerBetween(MIN, MAX));
  const [blue, setBlue] = useState(getRandomIntegerBetween(MIN, MAX));

  const [guessRed, setGuessRed] = useState(MIN);
  const [guessGreen, setGuessGreen] = useState(MIN);
  const [guessBlue, setGuessBlue] = useState(MIN);

  const [cheatRed, setCheatRed] = useState(MIN);
  const [cheatGreen, setCheatGreen] = useState(MIN);
  const [cheatBlue, setCheatBlue] = useState(MIN);

  const [showingFeedback, setShowingFeedback] = useState(false);
  const [cheatingMode, setCheatingMode] = useState(false);

  const onChangeRed = useCallback((value) => {
    if (!cheatingMode) {
      setGuessRed(value);
    } else {
      setCheatRed(value);
    }
  }, [cheatingMode]);

  const onChangeGreen = useCallback((value) => {
    if (!cheatingMode) {
      setGuessGreen(value);
    } else {
      setCheatGreen(value);
    }
  }, [cheatingMode]);

  const onChangeBlue = useCallback((value) => {
    if (!cheatingMode) {
      setGuessBlue(value);
    } else {
      setCheatBlue(value);
    }
  }, [cheatingMode]);

  useEffect(() => {
    if (cheatingMode) {
      // Set initial cheating values based on sliders
      setCheatRed(guessRed);
      setCheatGreen(guessGreen);
      setCheatBlue(guessBlue);
    }
  }, [cheatingMode, guessRed, guessGreen, guessBlue]);

  const doGuess = useCallback(() => {
    setShowingFeedback(true);
  }, []);

  const doAdvance = useCallback(() => {
    setRed(getRandomIntegerBetween(MIN, MAX));
    setGreen(getRandomIntegerBetween(MIN, MAX));
    setBlue(getRandomIntegerBetween(MIN, MAX));
    setGuessRed(MIN);
    setGuessGreen(MIN);
    setGuessBlue(MIN);
    setCheatRed(getRandomIntegerBetween(MIN, MAX));
    setCheatGreen(getRandomIntegerBetween(MIN, MAX));
    setCheatBlue(getRandomIntegerBetween(MIN, MAX));
    setShowingFeedback(false);
  }, []);

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      doGuess();
    }
  }, [doGuess]);

  const onChangeCheatingMode = useCallback((e) => {
    setCheatingMode(e.target.checked);
  }, []);

  return (
    <div className="color-guesser">
      <label id="cheating-mode">
        Cheating mode
        <input type="checkbox" checked={cheatingMode} onChange={onChangeCheatingMode} />
      </label>

      <p className="intro-text">
        Guess the color below
      </p>

      <div className="color-preview" style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }} />

      {cheatingMode && (
        <div className="cheating-rectangle" style={{ backgroundColor: `rgb(${cheatRed}, ${cheatGreen}, ${cheatBlue})` }} />
      )}

      <div className="input-section">
        <div className="slider-row">
          <label className="slider-label">Red:</label>
          <Slider min={MIN} max={MAX} startingValue={guessRed} onChange={onChangeRed} />
        </div>

        <div className="slider-row">
          <label className="slider-label">Green:</label>
          <Slider min={MIN} max={MAX} startingValue={guessGreen} onChange={onChangeGreen} />
        </div>

        <div className="slider-row">
          <label className="slider-label">Blue:</label>
          <Slider min={MIN} max={MAX} startingValue={guessBlue} onChange={onChangeBlue} />
        </div>
      </div>

      <div className="button-section">
        {!showingFeedback && <button className="action-button" onClick={doGuess}>Guess</button>}
        {showingFeedback && <button className="action-button" onClick={doAdvance}>Next</button>}
      </div>

      {showingFeedback && (
        <p className="feedback-text">
          Your guess: {guessRed}, {guessGreen}, {guessBlue}. Actual: {red}, {green}, {blue}
        </p>
      )}
    </div>
  );
}

export default App;

function getRandomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
