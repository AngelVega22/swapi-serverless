import { Character } from "./Character";
import { Planet } from "./Planet";
export interface SwapiPeopleResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[];
}

export interface SwapiPlanetsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Planet[];
}