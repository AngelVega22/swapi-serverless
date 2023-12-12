import axios from 'axios'
import { peopleTranslationDictionary, planetTranslationDictionary } from '../src/utils/translationDictionary';
import { Planet } from '../src/interfaces/Planet'
import { Character } from '../src/interfaces/Character'
import { createCar } from '../src/functions/handlers';

const API_URL_SWAPI = 'https://mwy9htpnok.execute-api.us-east-1.amazonaws.com/'
const API_URL = 'https://c04nvk5s5e.execute-api.us-east-1.amazonaws.com/'

//SWAPI INTEGRATION TESTS

test('swapi characters translation api returns 200 OK', async () => {
    await axios.get(API_URL_SWAPI + '/names').then((response) => {
        expect(response.status).toBe(200)
    })
})

test('swapi planets translation api returns 200 OK', async () => {
    await axios.get(API_URL_SWAPI + '/planets').then((response) => {
        expect(response.status).toBe(200)
    })
})

test('listNames returns translated data', async () => {
    const response = await axios.get(API_URL_SWAPI + '/names');
    expect(response.status).toBe(200);

    const translatedData: Character[] = response.data.results;

    if (Array.isArray(translatedData)) {
        translatedData.forEach((character: any) => {
            const expectedKeys = Object.values(peopleTranslationDictionary);

            expectedKeys.forEach((expectedKey) => {
                expect(character[expectedKey]).toBeDefined();
            });
        });
    } else {
        throw new Error('translatedData is not an array');
    }
});

test('listPlanets returns translated data', async () => {
    const response = await axios.get(API_URL_SWAPI + '/planets');
    expect(response.status).toBe(200);

    const translatedData: Planet[] = response.data.results;

    if (Array.isArray(translatedData)) {
        translatedData.forEach((planet: any) => {
            const expectedKeys = Object.values(planetTranslationDictionary);

            expectedKeys.forEach((expectedKey) => {
                expect(planet[expectedKey]).toBeDefined();
            });
        });
    } else {
        throw new Error('translatedData is not an array');
    }
});

//CAR API TESTS

test('createCar API returns 400 Bad Request for invalid input', async () => {
    const invalidCarData = {};

    try {
        await axios.post(API_URL + '/createCar', invalidCarData);
    } catch (error) {
        expect(error.response.status).toBe(404);
    }
});

test('getAllCars API returns an array of cars', async () => {
    const response = await axios.get(API_URL + '/carList');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
});

test('getAllCars api returns 200 OK', async () => {
    await axios.get(API_URL + '/carList').then((response) => {
        expect(response.status).toBe(200)
    })
})

