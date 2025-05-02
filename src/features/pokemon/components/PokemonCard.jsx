import { Link } from "react-router-dom";
import {useFavorites} from "../hooks/useFavorites";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

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

export default function Card({ pokemon }) {
  const {
    addPokemonToFavorites,
    removePokemonFromFavorites,
    isFavorite,
  } = useFavorites();

  const favorite = isFavorite(pokemon.id);

  const toggleFavorite = () => {
    favorite
      ? removePokemonFromFavorites(pokemon)
      : addPokemonToFavorites(pokemon);
  };

  return (
    <div className="relative bg-[#FFF3DC] rounded-xl shadow-md p-4 hover:scale-105 transition-transform duration-200 text-center">
      {/* Favorite Icon */}
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 text-4xl text-red-500"
        aria-label="Toggle Favorite"
      >
        {favorite ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>

      <img src={pokemon.image} alt={pokemon.name} className="mx-auto w-24 h-24" />
      <h2 className="mt-2 text-xl font-semibold capitalize">
        #{pokemon.id} {pokemon.name}
      </h2>

      <div className="mt-2 flex justify-center flex-wrap gap-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`text-sm px-3 py-1 rounded-full font-semibold ${typeColors[type] || "bg-gray-400 text-white"}`}
          >
            {type}
          </span>
        ))}
      </div>

      <div>
        <Link to={`/pokemon/${pokemon.id}`}>
          <button className="bg-blue-300 w-full mt-4 p-2 font-semibold rounded-full">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
