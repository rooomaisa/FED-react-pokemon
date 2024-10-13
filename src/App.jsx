import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Pokemon from "./components/pokemon/Pokemon.jsx";
import logo from './assets/logo.png'
import Button from './components/button/Button.jsx';


function App() {
    const [pokemonList, setPokemonList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPokemonList() {
            setLoading(true);
            setError('');

            try {
                const response = await axios.get(endpoint, {signal: controller.signal,});
                setPokemonList(response.data);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.error(`request is canceled`)
                } else {
                    console.error(e);
                    setError(`Something went wrong: ` + e.message + true);
                }
            } finally {
                setLoading(false);
            }
        }


        fetchPokemonList();

        return function cleanup() {
            controller.abort();
        }
    }, [endpoint]);


    return (
        <div className={'poke-deck'}>
            {pokemonList && pokemonList.results && (
                <>
                    <img alt="logo" width="400px" src={logo}/>
                    {/*<h1>Gotta catch 'em all!</h1>*/}
                    <section className={'button-bar'}>
                        <Button
                            disabled={!pokemonList.previous}
                            clickHandler={() => setEndpoint(pokemonList.previous)}
                        >
                            Previous
                        </Button>
                        <Button
                            disabled={!pokemonList.next}
                            clickHandler={() => setEndpoint(pokemonList.next)}
                        >
                            Next
                        </Button>
                    </section>


                    {/*{hier render je die 20}*/}
                    {pokemonList.results.length > 0 && pokemonList.results.map((pokemon) => (
                        <Pokemon key={pokemon.name} endpoint={pokemon.url}/>
                    ))}
                </>
            )}
            {loading && <p>Loading...</p>}
            {!pokemonList.results && error && <p>Something went wrong while fetching the data...</p>}
        </div>

    )

}

export default App
