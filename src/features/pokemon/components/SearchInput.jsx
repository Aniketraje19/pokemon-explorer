export default function SearchInput({ value, onChange }) {
    return (
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-lg w-64 shadow-sm"
      />
    );
  }
  