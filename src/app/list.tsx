'use client'

import { useRouter } from "next/navigation";
import { Pokemon } from "./interface";
import { typeColors,formatId } from "./compoment";
interface Props {
    pokemons: Pokemon[];
  }
  
  export default function Display(props: Props) {
    const { pokemons } = props;
    const router = useRouter();
    const handleClick = (id:number) => {
     router.push(`/${id}`);
    };
    return(
        <div className="section">
          {pokemons.map((element) => (
            <div    
              className="aboutPoke about"
              onClick={() => {handleClick(element.id)}}
              key={element.id}  
            >
              <div>
              <img
              width={170}
              height={170}
                src={element.sprites.other["official-artwork"].front_default ? element.sprites.other["official-artwork"].front_default : "" }
                alt={element.sprites.other["official-artwork"].front_default ? element.name : 'This image is still updated'}
              />
              </div>
              < p style={{color:"rgb(89 173 214)",borderTop:"1px solid rgb(89 173 214)",padding :"3px 15px "}}>{formatId(element.id)}</p>
              <p style={{padding:"3px 15px" , fontSize:"xx-large"}}>{element.name}</p>
              {element.types.map((item) => (
                <p key={item.type.name} className="type"style={{ backgroundColor: typeColors[item.type.name.toLowerCase()]}}
                >{item.type.name}</p>
              ))}
            </div>
          ))}
        </div>
      )
  }