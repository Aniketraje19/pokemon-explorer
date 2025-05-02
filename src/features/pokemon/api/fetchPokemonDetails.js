

export const fetchPokemonDetails = async (id) => {
    try {
        // Step 1: Fetch Pokémon base data
        const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!pokemonRes.ok) throw new Error("Failed to fetch Pokémon details");
        const pokemon = await pokemonRes.json();
    
        // Step 2: Fetch species data (to get evolution chain URL)
        const speciesRes = await fetch(pokemon.species.url);
        if (!speciesRes.ok) throw new Error("Failed to fetch Pokémon species");
        const species = await speciesRes.json();
    
        // Step 3: Fetch evolution chain
        const evoRes = await fetch(species.evolution_chain.url);
        if (!evoRes.ok) throw new Error("Failed to fetch evolution chain");
        const evoData = await evoRes.json();
    
        // Step 4: Traverse evolution chain
        const evolutionChain = [];
        let current = evoData.chain;
    
        while (current) {
          evolutionChain.push(current.species.name);
          current = current.evolves_to?.[0];
        }
    
        return {
          pokemon,
          evolutionChain,
        };
      } catch (err) {
        throw new Error("Error fetching  Pokémon details: " + err.message);
      }
}