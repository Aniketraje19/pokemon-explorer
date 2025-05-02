import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-red-500 m-4 rounded-full shadow-lg p-4">
      <div className="text-center text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        Pokémon Explorer
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4 items-center">
        <Link to={"/"}>
          <button className="bg-white text-red-500 py-2 px-6 rounded-full hover:bg-red-100 transition-all duration-300">
            Home
          </button>
        </Link>
        <Link to={"/compare/"}>
          <button className="bg-white text-red-500 py-2 px-6 rounded-full hover:bg-red-100 transition-all duration-300">
            Compare Pokemon
          </button>
        </Link>
        <Link to={"/favorites/"}>
          <button className="bg-white text-red-500 py-2 px-6 rounded-full hover:bg-red-100 transition-all duration-300">
            Favorites
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
