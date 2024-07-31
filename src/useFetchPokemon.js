import { useState, useEffect } from "react";


const getRandomPokemons = (arr, num) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

const useFetchPokemon = (initialCategory = 'normal') => {
    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPoke = async (category) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=579&offset=0');
            const data = await response.json();
            const allPokemons = data.results;

            const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${category}`)
            const typeData = await typeResponse.json();

            const filteredPokemons = allPokemons.filter(pokemon =>
                typeData.pokemon.some(typePoke => typePoke.pokemon.name === pokemon.name)
            )

            const randomPokemons = getRandomPokemons(filteredPokemons, 4);

            const detailedPokemons = await Promise.all(randomPokemons.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                return await response.json();
            }))

            setPokemonData(detailedPokemons);
            console.log(randomPokemons)
            console.log(detailedPokemons)
        } catch (error) {
            setError("Error fetching the Pokémon data");
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchPoke(initialCategory);
    }, [initialCategory]);

    return { pokemonData, loading, error, fetchPoke };

};

export default useFetchPokemon;
