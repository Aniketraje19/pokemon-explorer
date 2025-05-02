import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../ui/Loader";
import { fetchPokemonDetails } from "../api/fetchPokemonDetails";
import { Link } from "react-router-dom";

const statIcons = {
  hp: "❤️",
  attack: "⚔️",
  defense: "🛡️",
  "special-attack": "🔮",
  "special-defense": "✨",
  speed: "💨",
};

const typeColors = {
  normal: "bg-[#A8A77A] text-white",
  fire: "bg-[#EE8130] text-white",
  water: "bg-[#6390F0] text-white",
  grass: "bg-[#7AC74C] text-white",
  electric: "bg-[#F7D02C] text-black",
  ice: "bg-[#96D9D6] text-black",
  fighting: "bg-[#C22E28] text-white",
  poison: "bg-[#A33EA1] text-white",
  ground: "bg-[#E2BF65] text-black",
  flying: "bg-[#A98FF3] text-black",
  psychic: "bg-[#F95587] text-white",
  bug: "bg-[#A6B91A] text-black",
  rock: "bg-[#B6A136] text-black",
  ghost: "bg-[#735797] text-white",
  dragon: "bg-[#6F35FC] text-white",
  dark: "bg-[#705746] text-white",
  steel: "bg-[#B7B7CE] text-black",
  fairy: "bg-[#D685AD] text-black",
};

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPokemonDetails(id)
      .then(({ pokemon, evolutionChain }) => {
        setPokemon(pokemon);
        setEvolutionChain(evolutionChain);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading || !pokemon) return <Loader />;

  return (
    <>
      <Link to="/"><button className="bg-gray-400 w-fit m-2 p-2 px-4 font-semibold rounded-xl">Back</button></Link>
    <div className="max-w-2xl mx-auto bg-[#FFF3DC] p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold capitalize mb-2 text-center">
        #{pokemon.id} {pokemon.name}
      </h2>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto w-32 h-32 mb-4"
      />

      {/* Types */}
      <div className="flex justify-center gap-2 mb-4">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              typeColors[t.type.name] || "bg-gray-400 text-white"
            }`}
          >
            {t.type.name}
          </span>
        ))}
      </div>

      {/* Stats */}
      <h3 className="text-xl font-semibold mt-6">Stats</h3>
      <ul className="grid grid-cols-2 gap-2 mt-2">
        {pokemon.stats.map((stat) => {
          const name = stat.stat.name;
          const value = stat.base_stat;
          return (
            <li
              key={name}
              className="flex items-center justify-between bg-gray-200 rounded-md px-3 py-1 text-sm font-medium"
            >
              <span>
                {statIcons[name] || "📊"} {name.replace("-", " ")}
              </span>
              <span className="text-right">{value}</span>
            </li>
          );
        })}
      </ul>

      {/* Abilities */}
      <h3 className="text-xl font-semibold mt-6">Abilities</h3>
      <ul className="flex flex-wrap gap-2 mt-2">
        {pokemon.abilities.map((a) => (
          <li
            key={a.ability.name}
            className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium capitalize"
          >
            {a.ability.name}
          </li>
        ))}
      </ul>

      {/* Moves */}
      <h3 className="text-xl font-semibold mt-6">Moves</h3>
      <ul className="h-40 overflow-y-scroll mt-2 p-3 border rounded-md bg-white shadow-inner grid grid-cols-2 gap-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {pokemon.moves.map((m) => (
          <li
            key={m.move.name}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium text-center capitalize"
          >
            {m.move.name}
          </li>
        ))}
      </ul>

      {/* Evolution Chain */}
      <h3 className="text-xl font-semibold mt-6">Evolution Chain</h3>
      <ul className="flex gap-3 mt-2 flex-wrap">
        {evolutionChain.map((name, i) => (
          <li
            key={i}
            className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium capitalize"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default PokemonDetail;
