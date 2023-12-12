import fetch from 'node-fetch';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SwapiPeopleResponse, SwapiPlanetsResponse } from '../interfaces/SwapiResponse';
import { translateData, translatePlanetInfo } from '../utils/utils';
import { SWAPI_PEOPLE_ENDPOINT, SWAPI_PLANETS_ENDPOINT, headers } from '../constants';

export const listNames = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const response = await fetch(SWAPI_PEOPLE_ENDPOINT, { headers: headers });
        const data = (await response.json()) as SwapiPeopleResponse;
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

export const listPlanets = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const response = await fetch(SWAPI_PLANETS_ENDPOINT, { headers: headers });
        const data = (await response.json()) as SwapiPlanetsResponse;
        const translatedData = translatePlanetInfo(data);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(translatedData),
        };
    } catch (error) {
        console.error('Error al obtener nombres de planetas:', error);
        throw new Error('Error al obtener nombres de planetas');
    }
};

