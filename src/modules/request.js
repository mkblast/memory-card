import { card } from "./card";

async function fetchPoki(seed) {
  const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${seed}`);
  const json = await req.json();

  return { name: json.name, sprite: json.sprites.front_default }
}

export async function getPoki(items) {
  const prom = [];

  let i = 0;
  let rand = []
  while (i < items) {
    const gen = Math.floor(Math.random() * 150);
    if (rand.includes(gen)) {
      continue;
    }

    prom.push(fetchPoki(gen));
    rand.push(gen);
    i++;
  }

  const res = await Promise.all(prom);
  return res.map(e => new card(e.name, e.sprite));
}
