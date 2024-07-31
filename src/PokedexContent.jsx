import React, { createContext, useState } from "react";

export const PokedexContext = createContext();

export const PokedexProvider = ({ children }) => {
    const [pokedex, setPokedex] = useState([]);
    const [pokemonIds, setPokemonIds] = useState(new Set());
    const [showImages, setShowImages] = useState(false);
    const [pokemonImage, setPokemonImage] = useState('');

    const addToPokedex = (pokemon) => {
        if (!pokemonIds.has(pokemon.id)) {
            setPokedex(prevPokedex => [...prevPokedex, pokemon]);
            setPokemonIds(prevIds => new Set(prevIds).add(pokemon.id));
            setPokemonImage(pokemon.sprites.other.dream_world.front_default);
            setShowImages(true);
            setTimeout(() => setShowImages(false), 700);
        };
    };

    const clearPokedex = () => {
        setPokedex([]);
        setPokemonIds(new Set());
    }

    return (
        <PokedexContext.Provider value={{ pokedex, addToPokedex, clearPokedex }}>
            {children}
            {showImages && <ImagesOverlay pokemonImage={pokemonImage} />}
        </PokedexContext.Provider>
    );
};

const ImagesOverlay = ({ pokemonImage }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="relative flex flex-col items-center bg-white rounded-2xl">
                <img src="/pokedex.png" alt="Pokedex" className="w-full z-10 " />
                <img src={pokemonImage} alt="pokemon" className="w-28 absolute top-1/3 left-28 z-20 " />
            </div>
        </div>
    );
};
