import React, { useContext } from "react";
import { PokedexContext } from "./PokedexContent";

const Pokedex = () => {
    const { pokedex, clearPokedex } = useContext(PokedexContext);

    return (
        <div>
            <div  className="flex flex-wrap justify-center mt-6 pt-6">
           
                {pokedex.length === 0 ? (
                    <p>No hay pokemones para mostrar</p>
                ) : (
                    pokedex.map(pokemon => (
                        <div key={pokemon.id}>
                            <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Pokedex;