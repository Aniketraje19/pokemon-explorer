export default function SearchFilter({ searchTerm, setSearchTerm, selectedType, setSelectedType }) {
    const types = [
      "", "fire", "water", "grass", "electric", "bug",
      "normal", "poison", "fairy", "ground", "fighting",
      "psychic", "rock", "ghost", "ice", "dragon", "dark", "steel", "flying"
    ];
  
    return (
      <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-center">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-64 shadow-sm"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-48 shadow-sm"
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
    );
  }
  