import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Pokemon from "./components/pokemon/Pokemon.jsx";
import logo from './assets/logo.png'


function App() {
    const [pokemonList, setPokemonList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchPokemonList() {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
            setPokemonList(response.data.results); // results contains an array of Pokémon with names and URLs
        } catch (e) {
            console.log(e);
            setError(`Something went wrong: ` + e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPokemonList();
    }, []);


    return (
        <div className={'poke-deck'}>
            {pokemonList &&
                <>
                    <img alt="logo" width="400px" src={logo}/>
                    <h1>Gotta catch 'em all!</h1>
                    <section className={'button-bar'}
                             <Button >
                                 Previous
                             </Button>
                        <Button >
                            Next
                        </Button>
                        </section>


                    {/* Render the list of 20 Pokémon */}
                    {pokemonList.length > 0 && pokemonList.map((pokemon) => (
                        <Pokemon key={pokemon.name} endpoint={pokemon.url}/>
                    ))}
                </>
            }
            {loading && <p>Loading...</p>}
            {pokemonList.length === 0 && error && <p>Er ging iets mis bij het ophalen van de data...</p>}
        </div>


    )

}

export default App
