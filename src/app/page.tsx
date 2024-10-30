"use client";
import React, { useEffect, useRef, useState } from "react";
import { Pokemon } from "../type/typeDefault";
import Radomlist from "../componemt/homePage/RadomPokemoms";
import List from "../componemt/List";
import { CiSearch } from "react-icons/ci";
import { handleRandom } from "@/utils/RadomNumber";
import { fetchPokemonById, fetchPokemonListByLink } from "@/services/Pokemon";
import Link from "next/link";

const App: React.FC = () => {
  const [formart, setformart] = useState<boolean>(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
      if (radomnumber.length == 0) {
        setdefaultPokeRadom(responses);
      }
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
    fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
    fetchRandom();
  }, []);

  const changeFormart = () => {
    setformart((prev) => {
      if (prev) {
        fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
      } else {
        fetchRandom();
      }
      return !prev;
    });
    setPokemons([]);
    setradomPokemon([]);
  };

  return (
    <div className="App">
      <p className="name">từ điển pokemon</p>
      <Radomlist pokemons={defaultPokeRandom} />
      <div className="search">
        <div
          style={{
            width: "300px",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            ref={searchRef}
            type="text"
            style={{ textAlign: "left", color: "aqua" }}
            placeholder="enter id"
          />
          <Link
            style={{
              position: "absolute",
              right: "5%",
              filter: "drop-shadow(0 0 0.75rem rgb(89 173 214))",
              fontSize: "xx-large",
            }}
            href={`/${searchRef.current?.value}`}
          >
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
