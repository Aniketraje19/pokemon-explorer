const types = [
    "", "fire", "water", "grass", "electric", "bug",
    "normal", "poison", "fairy", "ground", "fighting",
    "psychic", "rock", "ghost", "ice", "dragon", "dark", "steel", "flying"
  ];
  
  export default function TypeFilter({ value, onChange }) {
    return (
      <select
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-lg w-48 shadow-sm"
      >
        <option value="">All Types</option>
        {types.map(type => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    );
  }
  