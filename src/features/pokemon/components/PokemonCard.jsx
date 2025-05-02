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
    return (
      <div className="bg-[#FFF3DC] rounded-xl shadow-md p-4 hover:scale-105 transition-transform duration-200 text-center">
        <img src={pokemon.image} alt={pokemon.name} className="mx-auto w-24 h-24" />
        <h2 className="mt-2 text-xl font-semibold capitalize">
          #{pokemon.id} {pokemon.name}
        </h2>
        <div className="mt-2 flex justify-center flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`text-sm px-3 py-1 rounded-full text-white font-semibold ${typeColors[type] || "bg-gray-400"}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    );
  }
  