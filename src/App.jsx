import { useEffect, useState } from "react";
import "./App.css"

async function fetchPoki(seed) {
  const poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${seed}`);
  const json = await poke.json();

  return json.sprites.front_default
}

async function createObj(obj = 5) {
  const prom = []

  const random = []
  let i = 0
  while (i < obj) {
    const gen = Math.floor(Math.random() * 100);
    if (random.includes(gen) || gen === 0) {
      continue;
    }

    random.push(gen);
    prom.push(fetchPoki(gen));
    i++;
  }

  return Promise.all(prom).then(res => {
    return res.map(e => {
      return {
        id: crypto.randomUUID(),
        sprite: e,
        clicked: false
      }
    })
  })
}

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loose, setLoose] = useState(false);

  useEffect(() => {
    (async () => {
      const bruh = await createObj(10);
      setData(bruh);
      setLoading(false)
    })()
  }, [])

  function handleClick(id) {
    setData(prev => prev.map(e =>
      e.id === id ? { ...e, clicked: true } : e
    ));

    setData(prev => shuffle(prev));
  }

  function shuffle(array) {
    return array.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
  }

  function handleLoose() {
    setLoose(true);
  }

  if (loose) {
    return (
      <div>YOU LOOSE</div>
    )
  }

  return (
    <div className="game">
      {data.map(e => {
        const img = loading ? <div >Loading</div> : <img src={e.sprite} alt="" />;
        if (e.clicked) {
          return (
            <div key={e.id} onClick={() => handleLoose()}>{img}</div>
          )
        }
        return (
          <div key={e.id} onClick={() => handleClick(e.id)}>{img}</div>
        )
      })}
    </div>
  )
}

export default App
