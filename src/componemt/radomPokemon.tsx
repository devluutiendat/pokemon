import { Props } from "@/type/typeDefault";
import Image from "next/image";

export default function Radomlist(props: Props) {
  const { pokemons } = props;

  return (
    <div className="radom">
      {pokemons.map((element, index) => (
        <a
          className="aboutPoke"
          href={`/${element.id}`}
          key={element.id}
          style={{
            gridColumnStart:
              index % 2 === 0 && index !== 8 ? index + 1 : undefined,
            gridRowStart: index % 2 === 0 && index !== 8 ? 1 : undefined,
            gridRowEnd: index % 2 === 0 && index !== 8 ? 4 : undefined,
          }}
        >
          <div>
            <Image
              width={100}
              height={100}
              src={
                element.sprites.other["official-artwork"].front_default
                  ? element.sprites.other["official-artwork"].front_default
                  : ""
              }
              alt={
                element.sprites.other["official-artwork"].front_default
                  ? element.name
                  : "This image is still updated"
              }
            />
          </div>
        </a>
      ))}
    </div>
  );
}
