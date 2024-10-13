import {useEffect, useState} from "react";
import axios from "axios";
import './Pokemon.css';

function Pokemon ( {endpoint}) {

    const [pokemon, setPokemon] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    async function fetchPokemonData() {
        setLoading(true);
        setError('')

        try {
            const response = await axios.get(endpoint)
            setPokemon(response.data);
        } catch (e) {
            console.log(e)
            setError(`Something went wrong:` + e.message);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchPokemonData();
    }, [endpoint]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    return (
        <article className={`poke-card`}>
            {pokemon ? (
                <>
            <h2>{pokemon.name}</h2>
            <img
                alt="Afbeelding pokémon"
                src={pokemon.sprites.front_default}
            />
            <p><strong>Moves: </strong>{pokemon.moves.length}</p>
            <p><strong>Weight: </strong>{pokemon.weight}</p>
            <p><strong>Abilities: </strong></p>
            <ul>
                {pokemon.abilities.map((ability) => {
                    return (
                        <li key={`${ability.ability.name}-${pokemon.name}`}>
                            {ability.ability.name}
                        </li>
                    )
                })}
            </ul>
                </>
                ) : (
                    <p> Loading Pokemon...</p>

                )}
        </article>
    );
}

export default Pokemon;