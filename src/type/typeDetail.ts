import { Pokemon } from "./typeDefault";
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