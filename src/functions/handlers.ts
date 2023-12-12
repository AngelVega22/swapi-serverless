import fetch from 'node-fetch';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

interface Character {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

const swapiUrl = 'https://swapi.py4e.com/api/people/?format=json';
const translationDictionary: Record<string, string> = {
    'name': 'nombre',
    'height': 'altura',
    'mass': 'masa',
    'hair_color': 'color_del_cabello',
    'skin_color': 'color_de_piel',
    'eye_color': 'color_de_ojos',
    'birth_year': 'año_de_nacimiento',
    'gender': 'género',
    'homeworld': 'planeta_natal',
    'films': 'películas',
    'species': 'especies',
    'vehicles': 'vehículos',
    'starships': 'naves_estelares',
    'created': 'creado',
    'edited': 'editado',
    'url': 'URL'
};

export interface CharacterNamesResponse {
    characterNames: string[];
    translatedNames: string[];
}

interface SwapiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[];
}
const headers = {
    "content-type": "application/json",
};

export const listNames = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const response = await fetch(swapiUrl);
        const data = (await response.json()) as SwapiResponse;
        const translatedData = translateData(data);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(translatedData),
        };
    } catch (error) {
        console.error('Error al obtener nombres de personajes:', error);
        throw new Error('Error al obtener nombres de personajes');
    }
};

function translateData(data: SwapiResponse): SwapiResponse {
    const translatedResults = data.results.map((character) => {
        const translatedCharacter: any = {};

        for (const [key, value] of Object.entries(character)) {
            const translatedKey = translationDictionary[key.toLowerCase()];
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
