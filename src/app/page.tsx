import App from "@/componemt/homePage/App";
import { fetchPokemonById, fetchPokemonListByLink } from "@/services/Pokemon";
import { handleRandom } from "@/utils/RadomNumber";
import "../css/home.css";

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

  const requests = randomIds.map((id) => fetchPokemonById(`${id}`));
  const randomResponses = await Promise.all(requests);

  return <App results={results} next={next} random={randomResponses} />;
}
