import fetch from 'node-fetch';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SwapiPeopleResponse, SwapiPlanetsResponse } from '../interfaces/SwapiResponse';
import { translateData, translatePlanetInfo } from '../utils/utils';
import { SWAPI_PEOPLE_ENDPOINT, SWAPI_PLANETS_ENDPOINT, headers } from '../constants';
import { errorHandler } from '../utils/errorHandler'
import AWS from "aws-sdk";
import { v4 } from "uuid";
import * as yup from "yup";

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = "CarsTable";

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  brand: yup.string().required(),
  price: yup.number().required(),
  stock: yup.bool().required(),
});


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

export const createCar = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = JSON.parse(event.body as string);

    await schema.validate(reqBody, { abortEarly: false });

    const car = {
      ...reqBody,
      carID: v4(),
    };

    await docClient
      .put({
        TableName: tableName,
        Item: car,
      })
      .promise();

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify(car),
    };
  } catch (e) {
    return errorHandler(e);
  }
};
const fetchAllCars = async () => {
  const output = await docClient
    .scan({
      TableName: tableName,
    })
    .promise();

  return output.Items || [];
};

export const getAllCars = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const cars = await fetchAllCars()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(cars),
    };
  } catch (e) {
    return errorHandler(e);
  }
};