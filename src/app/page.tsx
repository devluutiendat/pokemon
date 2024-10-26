"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon } from "../type/typeDefault";
import Radomlist from "../componemt/radomPokemon";
import "@fortawesome/fontawesome-free/css/all.min.css";
import List from "../componemt/list";
import { handleRandom } from "@/utils/radomNumber";
import {
  fetchPokemonById,
  fetchPokemonListByLink,
} from "@/services/pokemonServices";

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [defaultPokeRandom, setdefaultPokeRadom] = useState<Pokemon[]>([]);
  const [radomnumber, setradomnumber] = useState<number[]>([]);
  const [radomPokemon, setradomPokemon] = useState<Pokemon[]>([]);
  const [formart, setformart] = useState<boolean>(true);
  const [search, setsearch] = useState<string>("");
  const fetchPokemon = async (url: string) => {
    setLoading(true);
    try {
      const { results, next } = await fetchPokemonListByLink(url);
      setNextUrl(next);
      setPokemons((prevPokemons) => [...prevPokemons, ...results]);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePokemon = () => {
    if (nextUrl) {
      fetchPokemon(nextUrl);
    }
  };

  const fetchRandom = async () => {
    try {
      const randomIds = handleRandom({
        max: radomnumber.length + 10,
        radomnumber,
      });
      setradomnumber((prevNumber) => [...prevNumber, ...randomIds]);
      const requests = randomIds.map((id: number) => fetchPokemonById(`${id}`));
      const responses = await Promise.all(requests);
      setradomPokemon((prev) => [...prev, ...responses]);
      if (radomnumber.length == 0) {
        setdefaultPokeRadom(responses);
      }
      console.log(pokemons);
    } catch (error) {
      console.error("Error fetching random Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
    fetchRandom();
  }, []);
  useEffect(() => {
    if (formart) {
      fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
    } else {
      fetchRandom();
    }
  }, [formart]);
  return (
    <div className="App">
      <p className="name">từ điển pokemon</p>
      <Radomlist pokemons={defaultPokeRandom} />
      <input
        type="text"
        style={{ textAlign: "left", color: "aqua" }}
        onChange={(e) => setsearch(e.target.value)}
        placeholder="enter id"
      />
      <a
        className="fa-solid fa-magnifying-glass"
        style={{
          position: "absolute",
          left: "50%",
          filter: "drop-shadow(0 0 0.75rem rgb(89 173 214))",
          margin: "5% 0",
          fontSize: "xx-large",
        }}
        href={`/${search}`}
      ></a>
      <button
        onClick={() => {
          setformart(!formart), setPokemons([]), setradomPokemon([]);
        }}
      >
        {formart ? "show random" : "displayed in order"}
      </button>
      <p className="name">pokemon</p>
      {formart ? (
        <List pokemons={pokemons} />
      ) : (
        <List pokemons={radomPokemon} />
      )}
      <button
        style={{ margin: "2% 45%" }}
        className="more"
        onClick={formart ? loadMorePokemon : fetchRandom}
        disabled={loading}
      >
        {loading ? "Loading..." : "Load more"}
      </button>
    </div>
  );
};

export default App;
