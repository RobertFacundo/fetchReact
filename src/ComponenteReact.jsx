import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchPokemon from "./useFetchPokemon";
import useRandomTransform from "./useRandomTransform";
import { PokedexContext } from "./PokedexContent";

const Pokemon = ({ children }) => {
    const { category } = useParams();
    const navigate = useNavigate();
    const { pokemonData, loading, error, fetchPoke, setPokemonData } = useFetchPokemon();
    const getRandomTransform = useRandomTransform();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showDetails, setShowDetails] = useState({});
    const [randomTransforms, setRandomTransforms] = useState('');

    const { addToPokedex } = useContext(PokedexContext)

    const toggleDetails = (id) => {
        setShowDetails(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const categories = [
        { spa: "Normal", en: "normal" },
        { spa: "Fuego", en: "fire" },
        { spa: "Agua", en: "water" },
        { spa: "Planta", en: "grass" },
        { spa: "Eléctrico", en: "electric" },
        { spa: "Hielo", en: "ice" },
        { spa: "Lucha", en: "fighting" },
        { spa: "Veneno", en: "poison" },
        { spa: "Tierra", en: "ground" },
        { spa: "Volador", en: "flying" },
        { spa: "Psíquico", en: "psychic" },
        { spa: "Bicho", en: "bug" },
        { spa: "Roca", en: "rock" },
        { spa: "Fantasma", en: "ghost" },
        { spa: "Dragón", en: "dragon" },
        { spa: "Siniestro", en: "dark" },
        { spa: "Acero", en: "steel" },
        { spa: "Hada", en: "fairy" }
    ];

    const applyRandomTransforms = () => {
        const newTransforms = {};
        categories.forEach(category => {
            newTransforms[category.en] = getRandomTransform();
        })
        setRandomTransforms(newTransforms);
    };

    useEffect(() => {
        applyRandomTransforms();

        if (category) {
            fetchPoke(category); // Llama a fetchPoke con la categoría
        } 
    }, [category]);


    const handleOnClick = (category) => {
        fetchPoke(category);
        setSelectedCategory(category);
        applyRandomTransforms();
        navigate(`/${category}`);
    }

    const handleCombinedClick = (pokemonId, pokemon) => {
        toggleDetails(pokemonId);

        setTimeout(() => {
            addToPokedex(pokemon)
        }, 700)
    }


    return (
        <div >
            <div className="grid grid-cols-9 gap-2 overflow-hidden pt-3 bg-zinc-900 text-xl tracking-widest shadow-custom-xl shadow-slate-900 mx-3 mt-3 rounded-b-3xl rounded-t-3xl">
                {categories.map((category, index) => (
                    <button className={`text-slate-50 font-light  rounded-md font-serif m-5 p-3 hover:shadow-md hover:bg-zinc-800 transition duration-500 ease-in-out ${randomTransforms[category.en] || ''}`}
                        key={index}
                        onClick={() => handleOnClick(category.en)}>
                        {category.en.charAt(0).toUpperCase() + category.en.slice(1)}
                    </button>
                ))}
            </div>


            <div className=" flex flex-row justify-evenly w-screen mt-5 ">
                {loading ? (
                    <img src='/whos.webp' className="size-96 mt-6" alt="Loading..." />
                ) : error ? (
                    <p>{error}</p>
                ) : (pokemonData && pokemonData.map(pokemon => (
                    <section key={pokemon.id} className="flex flex-col">
                        <div className="bg-slate-50 text-shadow-2xl border-2 rounded-md pt-8 pb-1 w-64 rounded-b-none border-b-0" key={pokemon.id}>
                            <h3 className=" text-center text-xl font-semibold tracking-wider text-shadow-lg font-serif">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                            <img className="mt-6 size-32 mx-auto" src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} onClick={() => { handleCombinedClick(pokemon.id, pokemon) }} />
                        </div>
                        <div className="bg-slate-50 cursor-pointer text-shadow-2xl border-2 rounded-md w-64 rounded-t-none border-t-0 flex flex-col items-center justify-center">
                            <img className={`m-2 size-7 transition duration-700 ease-in-out ${showDetails[pokemon.id] ? 'rotate-12 translate-x-1.5' : '-rotate-12 -translate-x-1.5'}`} src="/pokeball.png" onClick={() => handleCombinedClick(pokemon.id, pokemon)} />
                            <div className={`transition-all duration-600 ease-in-out ${showDetails[pokemon.id] ? 'opacity-100' : 'opacity-0'}`}>
                                {showDetails[pokemon.id] && children && children(pokemon)}
                            </div>
                        </div>
                    </section>
                ))
                )}
            </div>
        </div>
    )
}

export default Pokemon;