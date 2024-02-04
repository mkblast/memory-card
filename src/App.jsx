import { useEffect, useState } from "react"
import Card from "./components/Card"
import { getPoki } from "./modules/request"
import "./App.css"
import Score from "./components/Score"
import Difficulty from "./components/Difficulty"
import Win from "./components/Win"
import Loose from "./components/Loose"


function shuffle(array) {
  return array.map(e => ({ sort: Math.random(), value: e }))
    .sort((a, b) => a.sort - b.sort)
    .map(e => e.value)
}

function App() {
  const [cards, setCards] = useState([])
  const [difficulty, setDifficulty] = useState(null)
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [loose, setLoose] = useState(false);

  useEffect(() => {
    (async () => {
      if (difficulty === null) {
        return
      }

      const req = await getPoki(difficulty);

      setCards(req);
    })()
  }, [difficulty])

  function clickHandler(id) {
    setCards(prev =>
      prev.map(e =>
        e.id === id ? { ...e, clicked: true } : e
      )
    )

    setCards(prev => shuffle(prev));
    handleScore();
  }

  function handleRestart() {
    setCards([]);
    setLoose(false);
    setScore(0);
    setDifficulty(null);
    setScore(0);
  }

  function handleScore() {
    if (score === highScore) {
      setHighScore(highScore + 1);
    }

    setScore(score + 1);

  }

  if (loose) {
    return (
      <>
        <Loose score={score} highScore={highScore} />
        <button onClick={handleRestart}>
          Try again
        </button>
      </>
    )
  }

  if (score === difficulty) {
    return (
      <div>
        <Win score={score} highScore={highScore} />
        <button onClick={handleRestart}>
          Restart
        </button>
      </div>
    )
  }

  if (difficulty != null) {
    return (
      <>
        <Score score={score} highScore={highScore} />
        {
          <div className="cards">
            {cards.map(c => {
              if (c.clicked === true) {
                return (
                  <div key={c.id} onClick={() => setLoose(true)}>
                    <Card {...c} />
                  </div>
                )
              }

              return (
                <div key={c.id} onClick={() => clickHandler(c.id)}>
                  <Card {...c} />
                </div>
              )
            })}
          </div>
        }
      </>
    )
  }

  return (
    <div>
      {cards.length === 0 &&
        <Difficulty handleClick={setDifficulty} />
      }

      <Score score={score} highScore={highScore} />
    </div>
  )
}

export default App
