import { Pokemon } from "@/type/typeDefault";
import { detail } from "@/type/typeDetail";
import Link from "next/link";
import { formatId } from "@/utils/FormartId";
import List from "@/componemt/List";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import PokemonDetail from "@/componemt/detailPage/Detail";
interface AppProps {
  pokemonDetail: detail;
  descriptions: string[];
  disadvantages: string[];
  genera: string;
  chain: Pokemon[];
  highEvolution: Pokemon[];
}
const Detail: React.FC<AppProps> = ({
  pokemonDetail,
  disadvantages,
  descriptions,
  genera,
  chain,
  highEvolution,
}) => {
  return (
    <div className="App">
      <div className="headdetail">
        <div className="path">
          <Link href={`/${pokemonDetail.id - 1}`}>
            <FaArrowLeftLong />
          </Link>
          <p>{pokemonDetail ? formatId(pokemonDetail?.id) : ""}</p>
          <p>{pokemonDetail?.name}</p>
        </div>
        <div>
          <p style={{ fontSize: "xx-large" }}>
            {pokemonDetail ? formatId(pokemonDetail?.id) : ""}
          </p>
          <p className="name" style={{ fontSize: "xxx-large", margin: "0" }}>
            {pokemonDetail?.name}
          </p>
        </div>
        <div className="path">
          <p>{pokemonDetail?.name}</p>
          <p>{pokemonDetail ? formatId(pokemonDetail?.id) : ""}</p>
          <Link href={`/${pokemonDetail.id + 1}`}>
            <FaArrowRight />{" "}
          </Link>
        </div>
      </div>
      <PokemonDetail
        disadvantage={disadvantages}
        pokemonDetail={pokemonDetail}
        descriptions={descriptions}
        genera={genera}
      />
      <div className="chain">
        <p className="name">chain</p>
        <List pokemons={chain} />
      </div>
      <p className="name">high evolution</p>
      {highEvolution.length > 1 ? <List pokemons={highEvolution} /> : ""}
    </div>
  );
};

export default Detail;
