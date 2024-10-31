import { Props } from "../type/typeDefault";
import { typeColors } from "@/utils/TypeColor";
import { formatId } from "@/utils/FormartId";
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

const List = memo((props: Props) => {
  const { pokemons } = props;

  return (
    <div className="section">
      {pokemons.map((element) => (
        <Link
          href={`/${element.id}`} // Using anchor tag with href for SEO-friendly links
          className="aboutPoke about"
          key={element.id}
        >
          <div>
            <Image
              width={100}
              height={100}
              loading="lazy"
              sizes="100vw"
              src={
                element.sprites.other["official-artwork"].front_default || ""
              }
              alt={
                element.sprites.other["official-artwork"].front_default
                  ? element.name
                  : "This image is still updated"
              }
            />
          </div>
          <p
            style={{
              color: "rgb(89 173 214)",
              borderTop: "1px solid rgb(89 173 214)",
              padding: "3px 15px ",
            }}
          >
            {formatId(element.id)}
          </p>
          <p style={{ padding: "3px 15px", fontSize: "xx-large" }}>
            {element.name}
          </p>
          <div style={{ background: "none", justifyContent: "space-around" }}>
            {element.types.map((item) => (
              <p
                key={item.type.name}
                className="type"
                style={{
                  backgroundColor: typeColors[item.type.name.toLowerCase()],
                }}
              >
                {item.type.name}
              </p>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
});

export default List;
