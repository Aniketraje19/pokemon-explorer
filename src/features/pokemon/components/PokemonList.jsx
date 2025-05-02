import PokemonCard from "./PokemonCard";
import SkeletonCard from "../../../ui/SkeletonCard";

export default function PokemonList({ pokemons, loading }) {
  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (pokemons.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No Pokémon found.</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {pokemons.map(p => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
