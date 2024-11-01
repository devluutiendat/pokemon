import Detail from "@/componemt/detailPage/App";
import "@/css/detail.css";

import {
  fetchDisadvantage,
  fetchPokemonDetail,
  getSpeciesDetails,
} from "@/services/PokemonDetails";

export default async function detailPage({
  params,
}: {
  params: { id: string };
}) {
  let details;
  let disadvantage;
  let descriptions;
  let chainPokemon;
  let highEvolution;
  let genera;

  try {
    details = await fetchPokemonDetail(params.id);
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    return <div>Error fetching Pokemon details.</div>;
  }

  let speciesDetailsPromise;

  try {
    speciesDetailsPromise = getSpeciesDetails(details.species.url);
  } catch (error) {
    console.error("Error fetching species details:", error);
    // Handle the error accordingly
    return <div>Error fetching species details.</div>;
  }

  try {
    disadvantage = await fetchDisadvantage(details);
  } catch (error) {
    console.error("Error fetching disadvantages:");
    // Handle the error accordingly
    return <div>Error fetching disadvantages.</div>;
  }

  try {
    const speciesDetails = await speciesDetailsPromise;
    descriptions = speciesDetails.descriptions;
    chainPokemon = speciesDetails.chainPokemon;
    highEvolution = speciesDetails.highEvolution;
    genera = speciesDetails.genera;
  } catch (error) {
    console.error("Error resolving species details:");
    // Handle the error accordingly
    return <div>Error resolving species details.</div>;
  }

  return (
    <Detail
      pokemonDetail={details}
      disadvantages={disadvantage}
      descriptions={descriptions}
      chain={chainPokemon}
      highEvolution={highEvolution}
      genera={genera}
    />
  );
}
