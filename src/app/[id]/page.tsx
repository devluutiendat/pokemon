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
    metadataBase: new URL("http://localhost:3000"),
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: details.name,
    image: details.sprites.other["official-artwork"].front_default,
    description: `${genera} - Learn about ${details.name}'s abilities, stats, and evolutions.`,
    url: `https://pokeapi.co/api/v2/pokemon/${params.id}`,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Detail
        pokemonDetail={details}
        disadvantages={disadvantage}
        descriptions={descriptions}
        chain={chainPokemon}
        highEvolution={highEvolution}
        genera={genera}
      />
    </>
  );
}
