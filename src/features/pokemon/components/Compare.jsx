import React, { useState, useEffect } from 'react';
import { fetchPokemonDetails } from '../api/fetchPokemonDetails';

const statIcons = {
  hp: "❤️",
  attack: "⚔️",
  defense: "🛡️",
  "special-attack": "✨",
  "special-defense": "🔮",
  speed: "💨",
};

const Compare = () => {
  const [id1, setId1] = useState('');
  const [id2, setId2] = useState('');
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [allNames, setAllNames] = useState([]);
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNames = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
      const data = await res.json();
      setAllNames(data.results.map(p => p.name));
    };
    fetchNames();
  }, []);

  useEffect(() => {
    if (id1 && id2) {
      handleCompare();
    }
  }, [id1, id2]); // Trigger handleCompare when either id1 or id2 changes

  const handleCompare = async () => {
    setLoading(true);
    setError('');

    try {
      const [data1, data2] = await Promise.all([
        fetchPokemonDetails(id1.toLowerCase().trim()),
        fetchPokemonDetails(id2.toLowerCase().trim()),
      ]);
      setPokemon1(data1.pokemon);
      setPokemon2(data2.pokemon);
    } catch (err) {
      console.error("Comparison failed", err);
      setError('There was an issue fetching the Pokémon details. Please check the names and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRandomPokemon = () => {
    if (!allNames.length) return '';
    const index = Math.floor(Math.random() * allNames.length);
    return allNames[index];
  };

  const handleRandomEntry = () => {
    const random1 = getRandomPokemon();
    const random2 = getRandomPokemon();
    setId1(random1);
    setId2(random2);
    setSuggestions1([]);
    setSuggestions2([]);
  };

  const getStat = (pokemon, statName) =>
    pokemon.stats.find(s => s.stat.name === statName)?.base_stat || 0;

  const filterSuggestions = (value) =>
    allNames.filter(name => name.startsWith(value.toLowerCase())).slice(0, 5);

  const statList = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Compare Pokémon</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Input 1 */}
        <div className="relative w-full sm:w-1/3">
          <input
            value={id1}
            onChange={(e) => {
              setId1(e.target.value);
              setSuggestions1(filterSuggestions(e.target.value));
            }}
            placeholder="Enter 1st Pokémon"
            className="border px-3 py-2 rounded w-full"
          />
          {suggestions1.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
              {suggestions1.map((name) => (
                <li
                  key={name}
                  onClick={() => {
                    setId1(name);
                    setSuggestions1([]);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Input 2 */}
        <div className="relative w-full sm:w-1/3">
          <input
            value={id2}
            onChange={(e) => {
              setId2(e.target.value);
              setSuggestions2(filterSuggestions(e.target.value));
            }}
            placeholder="Enter 2nd Pokémon"
            className="border px-3 py-2 rounded w-full"
          />
          {suggestions2.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
              {suggestions2.map((name) => (
                <li
                  key={name}
                  onClick={() => {
                    setId2(name);
                    setSuggestions2([]);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleCompare}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Compare
        </button>
        <button
          onClick={handleRandomEntry}
          className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
         🎲 Random
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {pokemon1 && pokemon2 && (
        <div className="grid grid-cols-3 gap-4 items-start text-center bg-[#FFF3DC] p-4 shadow rounded">
          {/* Pokémon 1 */}
          <div>
            <h3 className="text-xl font-semibold capitalize">{pokemon1.name}</h3>
            <img src={pokemon1.sprites.front_default} alt={pokemon1.name} className="mx-auto" />
            {statList.map(stat => {
              const val1 = getStat(pokemon1, stat);
              const val2 = getStat(pokemon2, stat);
              const higher = val1 > val2 ? 'left' : val1 < val2 ? 'right' : 'equal';

              return (
                <div
                  key={stat}
                  className={`my-1 ${higher === 'left' ? 'text-green-600 font-bold text-xl' : higher === 'right' ? 'text-red-600' : ''}`}
                >
                  {val1}
                </div>
              );
            })}
          </div>

          {/* Stat Labels */}
          <div className="flex flex-col h-full justify-end mt-2">
            {statList.map(stat => (
              <div key={stat} className="my-1 text-gray-800">
                <span className="mr-1">{statIcons[stat]}</span>
                <span className="capitalize">{stat.replace('-', ' ')}</span>
              </div>
            ))}
          </div>

          {/* Pokémon 2 */}
          <div>
            <h3 className="text-xl font-semibold capitalize">{pokemon2.name}</h3>
            <img src={pokemon2.sprites.front_default} alt={pokemon2.name} className="mx-auto" />
            {statList.map(stat => {
              const val1 = getStat(pokemon1, stat);
              const val2 = getStat(pokemon2, stat);
              const higher = val1 > val2 ? 'left' : val1 < val2 ? 'right' : 'equal';

              return (
                <div
                  key={stat}
                  className={`my-1 ${higher === 'right' ? 'text-green-600 font-bold text-xl' : higher === 'left' ? 'text-red-600' : ''}`}
                >
                  {val2}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;
