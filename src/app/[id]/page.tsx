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
  const detailPromise = fetchPokemonDetail(params.id);

  const speciesDetailsPromise = detailPromise.then((details) =>
    getSpeciesDetails(details.species.url)
  );

  const details = await detailPromise;
  const disadvantagePromise = fetchDisadvantage(details);

  const [disadvantage, { descriptions, chainPokemon, highEvolution, genera }] =
    await Promise.all([disadvantagePromise, speciesDetailsPromise]);

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
