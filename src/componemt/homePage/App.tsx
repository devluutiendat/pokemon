"use client";
import React, { useEffect, useRef, useState } from "react";
import { Pokemon } from "../../type/typeDefault";
import Radomlist from "./RadomPokemoms";
import List from "../List";
import { CiSearch } from "react-icons/ci";
import { handleRandom } from "@/utils/RadomNumber";
import { fetchPokemonById, fetchPokemonListByLink } from "@/services/Pokemon";
import Link from "next/link";
interface AppProps {
  results: Pokemon[];
  next: string;
  random: Pokemon[];
}
const App: React.FC<AppProps> = ({ results, next, random }) => {
  const [formart, setformart] = useState<boolean>(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [defaultPokeRandom, setdefaultPokeRadom] = useState<Pokemon[]>([]);
  const [radomnumber, setradomnumber] = useState<number[]>([]);
  const [radomPokemon, setradomPokemon] = useState<Pokemon[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const fetchPokemon = async (url: string) => {
    setLoading(true);
    try {
      const { results, next } = await fetchPokemonListByLink(url);
      setNextUrl(next);
      setPokemons((prevPokemons) => prevPokemons.concat(results));
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
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
      ``;
    } catch (error) {
      console.error("Error fetching random Pokémon:", error);
    }
  };

  const loadMorePokemon = () => {
    if (nextUrl) {
      fetchPokemon(nextUrl);
    }
  };
  useEffect(() => {
    setNextUrl(next);
    setdefaultPokeRadom(random);
    setPokemons(results);
    console.log(1);
  }, []);

  const changeFormart = () => {
    setformart((prev) => {
      if (prev) {
        fetchRandom();
      } else {
        setPokemons(results);
      }
      return !prev;
    });
  };

  return (
    <div className="App">
      <p className="name">từ điển pokemon</p>
      <Radomlist pokemons={defaultPokeRandom} />
      <div className="search">
        <div>
          <input ref={searchRef} type="text" placeholder="enter id" />
          <Link href={`/${searchRef.current?.value}`}>
            <CiSearch />
          </Link>
        </div>
        <button
          className="button"
          onClick={() => {
            changeFormart();
          }}
        >
          {formart ? "show random" : "displayed in order"}
        </button>
      </div>
      <p className="name">pokemon</p>
      {formart ? (
        <List pokemons={pokemons} />
      ) : (
        <List pokemons={radomPokemon} />
      )}

      <button
        className="button"
        style={{ margin: "0 auto", display: "flex", width: "10%" }}
        onClick={formart ? loadMorePokemon : fetchRandom}
        disabled={loading}
      >
        {loading ? "Loading..." : "Load more"}
      </button>
    </div>
  );
};

export default App;
