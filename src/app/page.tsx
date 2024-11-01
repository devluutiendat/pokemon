import App from "@/componemt/homePage/App";
import { fetchPokemonById, fetchPokemonListByLink } from "@/services/Pokemon";
import { handleRandom } from "@/utils/RadomNumber";
import "../css/home.css";
export async function generateMetadata() {
  try {
    return {
      title: " Pokémons",
      description: "Get more information about the pokemon you like.",
      openGraph: {
        title: "Pokémons",
        description: "Get more information about the pokemon you like.",
        images: [
          {
            url: "/random_center_bg.webp",
            width: 800,
            height: 800,
            alt: "pokemon",
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {};
  }
}
export default async function HomePage() {
  // Fetch the initial list of Pokémon
  const { results, next } = await fetchPokemonListByLink(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
  );

  // Get random Pokémon IDs
  const randomIds = handleRandom({
    max: 10,
    radomnumber: [],
  });

  const requests = randomIds.map((id) => fetchPokemonById("${id}"));
  const randomResponses = await Promise.all(requests);

  return <App results={results} next={next} random={randomResponses} />;
}
