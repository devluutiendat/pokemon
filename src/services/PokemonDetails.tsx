import { Pokemon } from "@/type/typeDefault";
import { detail, TypeData } from "@/type/typeDetail";
import { extractIdFromUrl } from "@/utils/ExtraIdFromUrl";
import axios from "axios";
import { fetchPokemonById } from "./Pokemon";

export const fetchPokemonDetail = async (id: string): Promise<detail> => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.data;
};

//fecth disavantage
export const fetchDisadvantage = async (pokemonDetail: detail | null) => {
  if (pokemonDetail == null) {
    return [];
  }
  // Fetch type data for each type in pokemonDetail
  const promises = pokemonDetail.types.map(async (item) => {
    const response = await fetch(item.type.url);
    const data: TypeData = await response.json();
    return {
      name: item.type.name,
      y2: data.damage_relations.double_damage_from.map((type) => type.name),
      y1_2: data.damage_relations.half_damage_from.map((type) => type.name),
      y0: data.damage_relations.no_damage_from.map((type) => type.name),
    };
  });

  const typeData = await Promise.all(promises);

  // Filter disadvantages
  const disadvantages: string[] = [];
  for (let i = 0; i < typeData.length; i++) {
    const { y2 } = typeData[i];
    const nextTypeData = typeData[(i + 1) % typeData.length]; // Wrap around using modulo
    const { y2: x2, y1_2: x1_2, y0: x0 } = nextTypeData;

    // Find elements in `y2` that match the conditions
    y2.forEach((element) => {
      if (
        x2.includes(element) || // Element is a disadvantage against the next type
        (!x1_2.includes(element) && !x0.includes(element)) // Element is not a half or no damage type
      ) {
        disadvantages.push(element);
      }
    });
  }

  return disadvantages;
};

// Fetch species details
export const getSpeciesDetails = async (url: string) => {
  try {
    const res = await axios.get(url);

    const descriptions = extractDescriptions(res.data.flavor_text_entries);
    const highEvolution = await fetchHighEvolution(res.data.varieties);
    const chainPokemon = await fetchEvolutionChain(
      res.data.evolution_chain.url
    );
    const genera = extractGenera(res.data.genera);
    return {
      genera,
      chainPokemon,
      highEvolution,
      descriptions,
    };
  } catch (error) {
    console.error("Error fetching species details:", error);
    return {
      genera: null,
      chainPokemon: [],
      highEvolution: [],
      descriptions: [],
    };
  }
};

// Extract flavor text descriptions
const extractDescriptions = (entries: any[]): string[] => {
  const descriptions: string[] = [];
  entries.forEach((item) => {
    if (item.language.name === "en") {
      const text = item.flavor_text.replace(/[\n\f]/g, "");
      if (!descriptions.includes(text) && descriptions.length < 3) {
        descriptions.push(text);
      }
    }
  });
  return descriptions;
};

// Fetch high evolution data
const fetchHighEvolution = async (varieties: any[]): Promise<Pokemon[]> => {
  const promises = varieties.map(async (item) => {
    const res = await axios.get<Pokemon>(item.pokemon.url);
    return res.data;
  });
  return await Promise.all(promises);
};

// Fetch evolution chain data
const fetchEvolutionChain = async (url: string): Promise<Pokemon[]> => {
  const res = await axios.get(url);
  const chainPokemon: Pokemon[] = [];

  const addEvolutionStage = async (speciesUrl: string) => {
    const id = extractIdFromUrl(speciesUrl);
    const pokemon = await fetchPokemonById(`${id}`);
    chainPokemon.push(pokemon);
  };

  await addEvolutionStage(res.data.chain.species.url);
  if (res.data.chain.evolves_to.length > 0) {
    await addEvolutionStage(res.data.chain.evolves_to[0].species.url);
    if (res.data.chain.evolves_to[0].evolves_to.length > 0) {
      await addEvolutionStage(
        res.data.chain.evolves_to[0].evolves_to[0].species.url
      );
    }
  }

  return chainPokemon;
};

// Extract genera information
const extractGenera = (genera: any[]): string => {
  const englishGenera = genera.find((item) => item.language.name === "en");
  return englishGenera.genus;
};
