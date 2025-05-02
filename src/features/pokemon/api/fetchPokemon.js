// api/fetchPokemon.js
export const fetchPokemon = async () => {
 

  try {
    console.log("Making API call!")
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=200`);
    const data = await res.json();

    const detailed = await Promise.all(
      data.results.map((p) => fetch(p.url).then((res) => res.json()))
    );

    const formatted = detailed.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.sprites.front_default,
      types: p.types.map((t) => t.type.name),
      // stats: p.stats,
      // abilities: p.abilities,
      // moves: p.moves,
    }));


    return formatted;
  } catch (error) {
    throw new Error("Failed to fetch Pokémon");
  }
};
