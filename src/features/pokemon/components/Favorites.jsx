import { useFavorites } from '../hooks/useFavorites';
import PokemonCard from './PokemonCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  const favoritePokemons = Object.values(favorites); // Convert object to array

  return (
    <div className="favorites p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Pokémon</h1>
      {favoritePokemons.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoritePokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default Favorites;
