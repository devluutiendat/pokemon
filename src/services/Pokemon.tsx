import axios from "axios";
import { Pokemon } from "../type/typeDefault";

export const fetchPokemonById = async (id: string): Promise<Pokemon> => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.data;
};
export const fetchPokemonListByLink = async (url: string) => {
  const response = await axios.get(url);
  const pokemonData = await Promise.all(
    response.data.results.map(async (result: { name: string }) => {
      const pokeRes = fetchPokemonById(result.name);
      return pokeRes;
    })
  );
  return {
    results: pokemonData,
    next: response.data.next,
  };
};
