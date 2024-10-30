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
} from "@/services/PokemonDetails";
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
  return (
    <div className="App">
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
      </div>
      <p className="name">high evolution</p>
      {highEvolution.length > 1 ? <List pokemons={highEvolution} /> : ""}
    </div>
  );
}
