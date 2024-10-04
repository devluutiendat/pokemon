
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

export interface detail extends Pokemon {
    height: number;
    weight: number;
    abilities: Ability[];
    stats: Stat[];  
}

interface Stat {
    stat: {

        
        name: string;
    }
    base_stat: number;
}

interface Ability {
    ability: {
        name: string;
        url: string;
    }
}

export interface TypeData {
    damage_relations: {
        double_damage_from: { name: string }[];
        half_damage_from: { name: string }[];
        no_damage_from: { name: string }[];
    };
}