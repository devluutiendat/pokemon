import { Props } from "../type/typeDefault";
import { typeColors } from "@/componemt/typeColor";
import { formatId } from "@/componemt/formartId";

export default function List(props: Props) {
  const { pokemons } = props;

  return (
    <div className="section">
      {pokemons.map((element) => (
        <a
          href={`/${element.id}`} // Using anchor tag with href for SEO-friendly links
          className="aboutPoke about"
          key={element.id}
        >
          <div>
            <img
              width={170}
              height={170}
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
        </a>
      ))}
    </div>
  );
}
