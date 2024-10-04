
'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pokemon, detail ,TypeData } from '@/app/interface';
import Display from '../list';
import Link from 'next/link';
import { typeColors,formatId } from "../compoment";

export default function ListPoke({ params }: { params: { id: string } }) {
  
  const [chain, setChain] = useState<Pokemon[]>([]);
  const [pokemonDetail, setPokemonDetail] = useState<detail | null>(null);
  const [highEvolution, setHighEvolution] = useState<Pokemon[]>([]);
  const [des, setDes] = useState<string[]>([]);
  const [genera,setgenera] = useState<string>("");
  const [gene,setgene] = useState<number>(0);
  const [dis,setdis] = useState<string[]>([]);
  const extractIdFromUrl = (url: string): number => {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  };
  //get detailpokemon
  const getpoke = async (name: string) => {
    try {
      const res = await axios.get<detail>(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemonDetail(res.data);
      gettype()
      const speciesUrl = res.data.species.url;
      return speciesUrl;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  };
  //get data when selected change
  useEffect(() => {
    const fetchData = async () => {
        const speciesUrl = await getpoke(params.id);
        if (speciesUrl) {
          await getspecies( speciesUrl);
        }
    };
    
    fetchData();
  }, []);
  useEffect(() =>{
    gettype();
  },[pokemonDetail])
  //get type
  const gettype = async () => {
    if (pokemonDetail) {
      const promises = pokemonDetail.types.map(async (item) => {
        const response = await fetch(item.type.url);
        const data: TypeData = await response.json();
        return {
          name: item.type.name,
          y2: data.damage_relations.double_damage_from.map(type => type.name),
          y1_2: data.damage_relations.half_damage_from.map(type => type.name),
          y0: data.damage_relations.no_damage_from.map(type => type.name),
        };
      });
  
      const typeData = await Promise.all(promises);
      for (let i = 0; i < typeData.length; i++) {
        const { y2 } = typeData[i];
        let x = i + 1;
        if (x >= typeData.length) {
          x = 0;
        }  
        const { y2: x2, y1_2: x1_2, y0: x0 } = typeData[x];
        y2.forEach(element => {
          if (y2.includes(element) && (x2.includes(element) || (!x1_2.includes(element) && !x0.includes(element)))) {
            setdis(prev => [...prev, element]);
          }
        });
      }
    }
  };
  //get data by species
  const getspecies = async ( url: string) => {
    try {
      const res = await axios.get(url);

      //Get flavor text
      res.data.flavor_text_entries.forEach((item: any) => {
        const text = item.flavor_text.replace(/[\n\f]/g, '');
        setDes(prev => {
          if (!prev.includes(text) && prev.length < 3) {
            return [...prev, text];
          }
          return prev;
        });
      });

      //high
      try {       
        const request = res.data.varieties.map((item: any) => axios.get<Pokemon>(item.pokemon.url));
        const response = await Promise.all(request);
        const evolutions = response.map((response) => response.data);
        setHighEvolution(evolutions);

      } catch (error) {
        console.log("lỗi hight evlution" +error);
        
      }
        //evolution chain
        const evolutionUrl = res.data.evolution_chain.url;
        const chains = await axios.get(evolutionUrl);
        
        const pokeHight = async(id:number) =>{
          const resp =  await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)         
          return resp.data
        }   
        
        const firstId = extractIdFromUrl(chains.data.chain.species.url);
        const first = await pokeHight(firstId);      
        setChain((prev) => [...prev, first]);
        if (chains.data.chain.evolves_to.length > 0) {
          const secondid = extractIdFromUrl(chains.data.chain.evolves_to[0].species.url);
          const second = await pokeHight(secondid);
          setChain((prev) => [...prev, second]);;
          
          if (chains.data.chain.evolves_to[0].evolves_to.length > 0) {
            const thirdid  = extractIdFromUrl(chains.data.chain.evolves_to[0].evolves_to[0].species.url);
            const third  = await pokeHight(thirdid);
            setChain((prev) => [...prev, third]);
          }
        }

        //get genera
        res.data.genera.map((item:any) =>{
          if(item.language.name == "en"){
            console.log(1);
            
          setgenera(item.gerus)
            return;
          } 
        })
        
    } catch (error) {
      console.log("lỗi species" +error);
    }
  };
  const renderSpans = () => {
    if (!pokemonDetail ) {
      return <div>No data available</div>;
    }
    return <div className='stat'>
      <p className='name'>stat</p>
      {pokemonDetail.stats.map((item) => (
      <div style={{display:"flex",flexDirection:"column-reverse"}}>
        <p style={{fontSize:"small"}}>{item.stat.name}</p>
        {
      Array.from({ length:15 }, (_, index) => (
        <span
          key={index}
          style={{display:"block",height:10,width:"auto",border:"1px solid aqua",margin:"1%"}}
          className={Math.ceil(item.base_stat/17) > index ? "point" : "" }
        >
        </span>
      ))}
      </div>
    ))}</div> 
  }
  const descript = () =>{
    if(!des){
      return <p>have data</p>
    }
    return(
      <div style={{width:"40%",display:"flex",flexWrap:"wrap",gap:"1%",padding:"0 3%"}}>
        <p className='name' style={{margin:"0"}}>descript</p>
        {Array.from({length:des.length},(_, index) =>(
          <button className='des' key={index} style={index==gene ? {filter:"drop-shadow(0 0 1rem rgb(14 0 255))" ,borderRadius:"50%"} : {}} onClick={() => setgene(index)}>
            <img src="/random_center_bg.png" alt="" width={50} height={50} />
          </button>
        ))}
        <span style={{fontSize:"x-large",margin:"3% 1%"}}>{des[gene]}</span>
      </div>
      )
  }
  return (
    <>
    <div className='headdetail'>
    <div className='path'>
        <Link href={`/${parseInt(params.id) - 1}`}><i className="fa-solid fa-arrow-left"></i></Link>
        <p>{pokemonDetail ?formatId(pokemonDetail?.id) : ""}</p>
        <p >{pokemonDetail?.name}</p>
      </div>
      <div>
        <p style={{fontSize:"xx-large"}}>{pokemonDetail ?formatId(pokemonDetail?.id) : ""}</p>
        <p className='name' style={{fontSize:"xxx-large",margin:"0"}}>{pokemonDetail?.name}</p>
      </div>
      <div className='path'>
        <p>{pokemonDetail?.name}</p>
        <p>{pokemonDetail ?formatId(pokemonDetail?.id) : ""}</p>
        <Link href={`/${parseInt(params.id) + 1}`}><i className="fa-solid fa-arrow-right"></i></Link>
        </div>
    </div>  
    <div className='detail'>
    <div  style={{width:"35%"}}>
      <div><p className='name'>type</p>
      {pokemonDetail?.types.map((item)=>(
      <p className='type' style={{backgroundColor: typeColors[item.type.name.toLocaleLowerCase()]}}>{item.type.name}</p>
      ))}</div>
      
      <div><p className='name'>disavantage</p>
      {dis.map((item) =>(<p className='type' style={{backgroundColor: typeColors[item]}}>{item}</p>))}
    </div>
    </div>
    
      <img height={400} width={400} src={pokemonDetail?.sprites.other['official-artwork'].front_default}/>
    <div className='detail base'>
      <div><p style={{color:"rgb(89 173 214)"}}>height</p><p>{pokemonDetail?.height}</p></div>
      <div><p style={{color:"rgb(89 173 214)"}}>genera</p><p>{genera}</p></div>
      <div><p style={{color:"rgb(89 173 214)"}}>weight</p><p>{pokemonDetail?.weight}</p></div>
      <div><p style={{color:"rgb(89 173 214)"}}>ability</p>
          {pokemonDetail?.abilities.map((item) =>(
            <p>{item.ability.name}</p>
          ))}</div>
    </div>
    </div>
    <div style={{display:"flex" ,flexWrap:"wrap"}}>
    {descript()}   
    {renderSpans()}
    </div>
    <div className='chain'>
    <p className='name'>chain</p>
      <Display pokemons={chain}/>
    <p className='name'>high evolution</p>  
    </div>
      {highEvolution.length > 1 ? 
      <Display pokemons={highEvolution}/> : ""}
    </>
  );
}
