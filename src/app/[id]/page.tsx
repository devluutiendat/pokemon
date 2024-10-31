import Detail from "@/componemt/detailPage/App";
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
  const details = await fetchPokemonDetail(params.id);
  const disadvantage = await fetchDisadvantage(details);
  const { descriptions, chainPokemon, highEvolution, genera } =
    await getSpeciesDetails(details.species.url);

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
