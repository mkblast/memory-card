import { useEffect, useState } from "react"
import Card from "./components/Card"
import { getPoki } from "./modules/request"


function shuffle(array) {
  return array.map(e => ({ sort: Math.random(), value: e }))
    .sort((a, b) => a.sort - b.sort)
    .map(e => e.value)
}


function App() {
  const [cards, setCards] = useState([])
  const [difficulty, setDifficulty] = useState(null)

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
  }

  return (
    <div>
      <div>
        <button onClick={() => setDifficulty(5)}>Easy</button>
        <button onClick={() => setDifficulty(10)}>Normal</button>
        <button onClick={() => setDifficulty(15)}>Hard</button>
      </div>

      <div>
        {difficulty != null &&
          <div>
            {console.log(cards)}
            {cards.map(c => {
              return (
                <div key={c.id} onClick={() => clickHandler(c.id)}>
                  <Card {...c} />
                </div>
              )
            })}
          </div>
        }
      </div>
    </div>
  )
}

export default App
