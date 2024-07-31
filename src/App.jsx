
import './index.css';
import React, { useContext } from 'react';
import Pokemon from './ComponenteReact'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { PokedexProvider, PokedexContext } from './PokedexContent';
import Pokedex from './Pokedex';


const Navigation = () => {
  const { pokedex, clearPokedex } = useContext(PokedexContext);
  return (
    <nav className="bg-zinc-900 text-slate-50 p-4">
      <Link className="mr-4" to="/normal">Home</Link>
      <Link to="/pokedex">
        Pokedex {pokedex.length > 0 && <span className='text-xs text-orange-300'>{pokedex.length}</span>}
      </Link>
      {pokedex.length > 0 && (<button onClick={clearPokedex} className=" float-right">
        Free Pokemons
      </button>)}
    </nav>
  );
}


function App() {

  return (
    <PokedexProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/normal" />} />
          <Route path="/:category" element={<Pokemon>
            {pokemon => (
              <>
                <hr className='w-20 pl-5' />
                <div className='mt-2 p-1 '>
                  <p className='w-full p-1'><strong className='tracking-wide font-semibold'>Type: </strong><span className='italic pl-3 font-ligth'>{pokemon.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(", ")}</span></p>
                  <p className='w-full p-1'><strong className='tracking-wide font-semibold'>Abilities: </strong><span className='italic pl-3 font-ligth'>{pokemon.abilities.map(ability => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)).join(", ")}</span></p>
                </div>
              </>
            )}
          </Pokemon>} />
          <Route path='/pokedex' element={<Pokedex />} />
        </Routes>
      </Router>
    </PokedexProvider>
  )
}

export default App
