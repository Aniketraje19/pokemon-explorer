export async function fetchAllPokemon(limit = 150) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await res.json();
  
    const detailed = await Promise.allSettled(
      data.results.map(p => fetch(p.url).then(res => res.json()))
    );
  
    return detailed
      .filter(d => d.status === "fulfilled")
      .map(({ value: p }) => ({
        id: p.id,
        name: p.name,
        image: p.sprites.front_default,
        types: p.types.map(t => t.type.name)
      }));
  }
  