import Detail from "@/componemt/detailPage/App";
import "@/css/detail.css";
import {
  fetchDisadvantage,
  fetchPokemonDetail,
  getSpeciesDetails,
} from "@/services/PokemonDetails";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const details = await fetchPokemonDetail(params.id);
  const species = await getSpeciesDetails(details.species.url);

  return {
    title: `${details.name} - ${species.genera}`,
    description: `${species.genera} - Learn about ${details.name}'s abilities, stats, and evolutions.`,
    openGraph: {
      title: `${details.name}`,
      description: `${species.genera} - Learn about ${details.name}'s abilities, stats, and evolutions.`,
      images: [
        {
          url: details.sprites.other["official-artwork"].front_default,
          width: 800,
          height: 800,
          alt: `${details.name} image`,
        },
      ],
    },
  };
}

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
