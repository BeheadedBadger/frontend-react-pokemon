import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import PokemonInfoCard from "./components/PokemonInfoCard.jsx";

function App() {
    let allPokemonData = [];
    const [endNumber, setEndNumber] = useState(20);
    const [startNumber, setStartNumber] = useState(1);
    const [fetchingCompleted, setfetchingCompleted] = useState(false);
    const [pokemonData, setpokemonData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setfetchingCompleted(false);

            try {
                for (let i = startNumber; i < endNumber; i++) {
                    const pokemonData = await axios.get("https://pokeapi.co/api/v2/pokemon/" + i + "/");
                    allPokemonData.push(pokemonData.data);
                }
                setpokemonData(allPokemonData);
            } catch (e) {
                console.error(e);
            }
            finally {
                setfetchingCompleted(true);
                console.log(allPokemonData[0]);
            }
        }
        fetchData();
    }, [startNumber]);

  return (
      <div className="content">
          <img className="logo" src="../src/assets/pokemon-logo-png-pokemon-logo-text-png-1428-1390-2569809720.png" alt="Pokemon" />
          <h1>Gotta catch em all!</h1>
          {!fetchingCompleted && <>Loading...</>}
          {fetchingCompleted && <><ul className="pokemon-card-container">
              {pokemonData.map((pokemon) => (
                  <li key={pokemon.name}>
                      <PokemonInfoCard nr={pokemon.id}
                                       name={pokemon.name}
                                       img={pokemon.sprites.other.home.front_default}
                                       moves={pokemon.moves.length}
                                       weight={pokemon.weight}
                                       abilities={pokemon.abilities}/>
                  </li>))}
          </ul>
          <div className="buttons"><button disabled={startNumber <= 1}
              onClick={() => {
                  setEndNumber(endNumber - 20);
                  setStartNumber(startNumber - 20);
              }}>
              <p>← previous 20</p>
          </button>
          <button disabled={endNumber >= 1019}
              onClick={() => {
                  setEndNumber(endNumber + 20);
                  setStartNumber(startNumber + 20);
              }}>
              <p>next 20 →</p>
          </button></div></>}
      </div>
  )
}

export default App
