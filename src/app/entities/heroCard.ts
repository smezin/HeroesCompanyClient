import { ability } from "./ability";

export interface HeroCard {
    id: string,
    name: string,
    startingPower: number,
    currentPower: number,
    trainingSince: Date,
    myTrainerId: string,
    ability?: ability,
    suitColors: string,
    stamina?: number;
}