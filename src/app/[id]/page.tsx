"use client";
import { useEffect, useState } from "react";
import { Pokemon } from "@/type/typeDefault";
import { detail, TypeData } from "@/type/typeDetail";
import Link from "next/link";
import { formatId } from "@/utils/FormartId";
import List from "@/componemt/List";
import {
  fetchDisadvantage,
  fetchPokemonDetail,
  getSpeciesDetails,
} from "@/services/pokemonDetail";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import PokemonDetail from "@/componemt/detailPage/Detail";

export default function ListPoke({ params }: { params: { id: string } }) {
  const [chain, setChain] = useState<Pokemon[]>([]);
  const [pokemonDetail, setPokemonDetail] = useState<detail | null>(null);
  const [highEvolution, setHighEvolution] = useState<Pokemon[]>([]);
  const [descriptions, setDescript] = useState<string[]>([]);
  const [genera, setGenera] = useState<string | null>(null);
  const [desChoice, setDesChoice] = useState<number>(0);
  const [disadvantages, setdisadvantage] = useState<string[]>([]);

  //get detailpokemon
  const getpoke = async (name: string) => {
    try {
      const res = await fetchPokemonDetail(name);
      setPokemonDetail(res);
      gettype();
      const speciesUrl = res.species.url;
      return speciesUrl;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  };
  //get type
  const gettype = async () => {
    const res = await fetchDisadvantage(pokemonDetail);
    setdisadvantage(res);
  };
  //get data when selected change
  useEffect(() => {
    const fetchData = async () => {
      const speciesUrl = await getpoke(params.id);
      if (speciesUrl) {
        const res = await getSpeciesDetails(speciesUrl);
        setDescript(res.descriptions);
        setChain(res.chainPokemon);
        setHighEvolution(res.highEvolution);
        setGenera(res.genera);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    gettype();
  }, [pokemonDetail]);
  const renderSpans = () => {
    if (!pokemonDetail) {
      return <div>No data available</div>;
    }
    return (
      <div className="stat">
        <p className="name">stat</p>
        {pokemonDetail.stats.map((item, index) => (
          <div
            key={index}
            style={{ display: "flex", flexDirection: "column-reverse" }}
          >
            <p style={{ fontSize: "small" }}>{item.stat.name}</p>
            {Array.from({ length: 15 }, (_, index) => (
              <span
                key={index}
                style={{
                  display: "block",
                  height: 10,
                  width: "auto",
                  border: "1px solid aqua",
                  margin: "1%",
                }}
                className={
                  Math.ceil(item.base_stat / 17) > index ? "point" : ""
                }
              ></span>
            ))}
          </div>
        ))}
      </div>
    );
  };
  const descript = () => {
    if (!pokemonDetail) {
      return <p>have data</p>;
    }
    return (
      <div
        style={{
          width: "40%",
          display: "flex",
          flexWrap: "wrap",
          gap: "1%",
          padding: "0 3%",
        }}
      >
        <p className="name" style={{ margin: "0" }}>
          descript
        </p>
        {Array.from({ length: descriptions.length }, (_, index) => (
          <button
            className="des"
            key={index}
            style={
              index == desChoice
                ? {
                    filter: "drop-shadow(0 0 1rem rgb(14 0 255))",
                    borderRadius: "50%",
                  }
                : {}
            }
            onClick={() => setDesChoice(index)}
          >
            <img src="/random_center_bg.png" alt="" width={50} height={50} />
          </button>
        ))}
        <span style={{ fontSize: "x-large", margin: "3% 1%" }}>
          {descriptions[desChoice]}
        </span>
      </div>
    );
  };
  return (
    <>
      <div className="headdetail">
        <div className="path">
          <Link href={`/${parseInt(params.id) - 1}`}>
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
          <Link href={`/${parseInt(params.id) + 1}`}>
            <FaArrowRight />{" "}
          </Link>
        </div>
      </div>
      {/* <div className="detail">
        <div style={{ width: "35%" }}>
          <div>
            <p className="name">type</p>
            {pokemonDetail?.types.map((item, index) => (
              <p
                key={index}
                className="type"
                style={{
                  backgroundColor:
                    typeColors[item.type.name.toLocaleLowerCase()],
                }}
              >
                {item.type.name}
              </p>
            ))}
          </div>

          <div>
            <p className="name">disavantage</p>
            {dis.map((item) => (
              <p
                key={item}
                className="type"
                style={{ backgroundColor: typeColors[item] }}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        <img
          height={400}
          width={400}
          src={pokemonDetail?.sprites.other["official-artwork"].front_default}
        />
        <div className="detail base">
          <div>
            <p style={{ color: "rgb(89 173 214)" }}>height</p>
            <p>{pokemonDetail?.height}</p>
          </div>
          <div>
            <p style={{ color: "rgb(89 173 214)" }}>genera</p>
            <p>{genera}</p>
          </div>
          <div>
            <p style={{ color: "rgb(89 173 214)" }}>weight</p>
            <p>{pokemonDetail?.weight}</p>
          </div>
          <div>
            <p style={{ color: "rgb(89 173 214)" }}>ability</p>
            {pokemonDetail?.abilities.map((item, index) => (
              <p key={index}>{item.ability.name}</p>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {descript()}
        {renderSpans()}
      </div> */}
      <PokemonDetail
        disadvantage={disadvantages}
        pokemonDetail={pokemonDetail}
        descriptions={descriptions}
        desChoice={desChoice}
        genera={genera}
        setDesChoice={setDesChoice}
      />

      <div className="chain">
        <p className="name">chain</p>
        <List pokemons={chain} />
        <p className="name">high evolution</p>
      </div>
      {highEvolution.length > 1 ? <List pokemons={highEvolution} /> : ""}
    </>
  );
}
