import { Link } from "react-router-dom";
function Header() {
    return (
        <header className="bg-red-500 m-2 rounded-full shadow-lg">
        <div className="text-center  text-white p-4  text-3xl font-bold">
        Pokémon Explorer
        </div>
        <div>
          
          <button className="text-white">Compare Pokemon</button>
         
        </div>
        
      </header>
    );
  }
  
  export default Header;