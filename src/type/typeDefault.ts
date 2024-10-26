
export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    }
    types: Type[];
    species: {
        url: string;
    }
}

interface Type {
    type: {
        name: string;
        url: string;
    }
}

export interface Props {
    pokemons: Pokemon[];
  }