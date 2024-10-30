import { Props } from "@/type/typeDefault";
import { useWidthScreen } from "@/utils/GetWidth";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
export const Radomlist = memo((props: Props) => {
  const { pokemons } = props;
  let x = 2;
  const width = useWidthScreen();
  return (
    <div className="radom">
      {pokemons.map((element, index) => {
        if (index % 3 === 0) {
          x -= 1;
        }
        return (
          <Link
            className={`aboutPoke ${
              (index != 1 && width <= 425 ? "none" : "") ||
              (index > 6 && width <= 768 ? "none" : "")
            } `}
            href={`/${element.id}`}
            key={element.id}
            style={
              index % 3 === 0
                ? {
                    gridColumnStart: index + x,
                    gridRowStart: 1,
                    gridRowEnd: 4,
                  }
                : {}
            }
          >
            <div>
              <Image
                width={100}
                height={100}
                priority={true}
                sizes="100vw"
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
          </Link>
        );
      })}
    </div>
  );
});

export default Radomlist;
