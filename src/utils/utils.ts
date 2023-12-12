import { SwapiPeopleResponse, SwapiPlanetsResponse } from "../interfaces/SwapiResponse";
import { peopleTranslationDictionary, planetTranslationDictionary } from "./translationDictionary";

export function translateData(data: SwapiPeopleResponse): SwapiPeopleResponse {
    const translatedResults = data.results.map((character) => {
        const translatedCharacter: any = {};

        for (const [key, value] of Object.entries(character)) {
            const translatedKey = peopleTranslationDictionary[key.toLowerCase()];
            if (translatedKey) {
                translatedCharacter[translatedKey] = value;
            }
        }
        return translatedCharacter;
    });
    return {
        ...data,
        results: translatedResults,
    };
}

export function translatePlanetInfo(data: SwapiPlanetsResponse): SwapiPlanetsResponse {
    const translatedResults = data.results.map((planet) => {
        const translatedPlanet: any = {};

        for (const [key, value] of Object.entries(planet)) {
            const translatedKey = planetTranslationDictionary[key.toLowerCase()];
            if (translatedKey) {
                translatedPlanet[translatedKey] = value;
            }
        }
        return translatedPlanet;
    });
    return {
        ...data,
        results: translatedResults,
    };
}

