'use client'

import { useRouter } from "next/navigation";
import { Pokemon } from "./interface";
import Image from "next/image";
interface Props {
    pokemons: Pokemon[];
  }
  
  export default function Radomlist(props: Props) {
    const { pokemons } = props;
    const router = useRouter();
    const handleClick = (id:number) => {
     router.push(`/${id}`);
    };
    
    return(
        <div className="radom">
          {pokemons.map((element,index) => (
            <div    
              className="aboutPoke"
              onClick={() => {handleClick(element.id)}}
              key={element.id}
              style={{
                gridColumnStart: index % 2 === 0 && index !==8 ? index + 1 : undefined,
                gridRowStart: index % 2 === 0 && index !==8 ? 1 : undefined,
                gridRowEnd: index % 2 === 0 && index !==8  ? 4 : undefined, 
              }}  
            >
              <div>
              <Image
              width={100}
              height={100}
              src={element.sprites.other["official-artwork"].front_default ? element.sprites.other["official-artwork"].front_default : "" }
              alt={element.sprites.other["official-artwork"].front_default ? element.name : 'This image is still updated'}/>
              </div>
              </div>
          ))}
        </div>
      )
  }