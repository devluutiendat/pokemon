import { detail } from "@/type/typeDetail";
import { typeColors } from "@/utils/TypeColor";
import Image from "next/image";
import React from "react";
interface PokemonDetailProps {
  pokemonDetail: detail | null;
  descriptions: string[];
  desChoice: number;
  disadvantage: string[];
  genera: string | null;
  setDesChoice: (index: number) => void;
}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({
  pokemonDetail,
  descriptions,
  genera,
  disadvantage,
  desChoice,
  setDesChoice,
}) => {
  return (
    <div className="mainDetail">
      <div className="detail">
        <div className="typeDetail">
          <p className="name">type</p>
          <div className="groupType">
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
          <p className="name">disavantage</p>

          <div className="groupType">
            {disadvantage.map((item) => (
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
        <div style={{ width: "350px" }}>
          <Image
            height={300}
            width={300}
            priority={true}
            sizes="100vw"
            alt={pokemonDetail ? pokemonDetail?.name : ""}
            src={
              pokemonDetail
                ? pokemonDetail?.sprites.other["official-artwork"].front_default
                : "/random_center_bg.png"
            }
          />
        </div>
        <div className="base">
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
      <div className="secondDetail">
        <div className="descript">
          <p className="name" style={{ padding: "0 3rem" }}>
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
              <Image
                src="/random_center_bg.png"
                alt=""
                width={50}
                height={50}
              />
            </button>
          ))}
          <span style={{ fontSize: "x-large", margin: "3% 1%" }}>
            {descriptions[desChoice]}
          </span>
        </div>
        <div className="stat">
          <p className="name" style={{ width: "100%", padding: "5px 0" }}>
            stat
          </p>
          {pokemonDetail?.stats.map((item, index) => (
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
      </div>
    </div>
  );
};

export default PokemonDetail;
