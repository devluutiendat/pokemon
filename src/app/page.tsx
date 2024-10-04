'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pokemon } from './interface';
import Display from './list'
import Radomlist from './radom list';
import { useRouter } from 'next/navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { log } from 'console';

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [defaultPokeRandom ,setdefaultPokeRadom] = useState<Pokemon[]>([])
  const [radomnumber,setradomnumber] = useState<number[]>([]);
  const [radoms,setradoms] = useState<Pokemon[]>([]);
  const [formart,setformart] = useState<boolean>(true)
  const [search,setsearch] = useState<string>("")
  const route = useRouter()
  const fetchPokemon = async (url: string) => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setNextUrl(res.data.next);
      const pokemonData = await Promise.all(
        res.data.results.map(async (result: { name: string;}) => {
          const pokeRes = await axios.get<Pokemon>(
            `https://pokeapi.co/api/v2/pokemon/${result.name}`
          ); 
          return pokeRes.data;
        })
      );    
      setPokemons(prevPokemons => [...prevPokemons, ...pokemonData]);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const loadMorePokemon = () => {
    if (nextUrl) {
      fetchPokemon(nextUrl);
    }
  };
  //radom value
  const handleRandom = (max:number) => {
    const newRandoms: Set<number> = new Set(radomnumber);

    while (newRandoms.size < max) {
      let r = Math.floor(Math.random() * 1025) + 1;      
      newRandoms.add(r); 
    }

    const randomArray = Array.from(newRandoms).slice(radomnumber.length);
    setradomnumber((prevRandomIds) => [...prevRandomIds, ...randomArray]);
    return randomArray;
  };

  const fetchRandom = async () => {
    try {
      const randomIds = handleRandom(radomnumber.length + 10);
      const requests = randomIds.map((id: number) =>
        axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      );
      const responses = await Promise.all(requests);
      const randomPokemonData = responses.map((response) => response.data);
      setradoms((prev) => [...prev,...randomPokemonData])
      if (radomnumber.length ==   0) {
        setdefaultPokeRadom(randomPokemonData);
      }
      console.log(pokemons);
      
    } catch (error) {
      console.error("Error fetching random Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
    fetchRandom();
  }, []);
  useEffect(() =>{
    if (formart) {
    fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");   
    }else{
    fetchRandom();
    }
  },[formart])  
  return (
    <div className="App">
    <p className='name'>từ điển pokemon</p>
      <Radomlist pokemons={defaultPokeRandom}/>
      <input type='text' style={{textAlign:"left" , color:"aqua"}} onChange={(e) =>(setsearch(e.target.value))} placeholder="enter id"/>    
      <i className="fa-solid fa-magnifying-glass" style={{position: "absolute",left:"50%",filter: "drop-shadow(0 0 0.75rem rgb(89 173 214))", margin: "5% 0" ,fontSize:"xx-large"}} onClick={() => route.push(`/${search}`)}></i>
      <button 
      onClick={() => {setformart(!formart) ,setPokemons([]),setradoms([])}}>{formart ? "show random" : "displayed in order" }</button>
    <p className='name'>pokemon</p>
    <Display pokemons={ formart ? pokemons : radoms}/>
    <button style={{margin:"2% 45%"}} className="more" onClick={formart ? loadMorePokemon : fetchRandom} disabled={loading}>
      {loading ? "Loading..." : "Load more"}
    </button>    
    </div>
  );
};

export default App;
