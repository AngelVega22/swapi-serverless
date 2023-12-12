# Serverless API: Typescript and Jest 

## Getting up and running
First install `serverless` and get that up and running. documentation [here](https://serverless.com/framework/docs/providers/aws/guide/quick-start/).

You can use the standard `sls` commands or utilise the npm scripts in the project.

Then:

```
npm install
```

## Deployment - Dev

```
serverless deploy
```

## Deployment - Prod
```
serverless deploy:prod
```

## To remove:
```
npm run remove
```

# API interactions
The API url can be found either the console output, or programatically accessed via the `.serverless/output.json` object.

## GET: Healthcheck
Test the service is up

```
/healthcheck
```

### GET: List Translated People

Retrieve a list of character names translated to Spanish using https://swapi.py4e.com/api/people/?format=json endpoint.
```
/names
```
#### Deployed:
 List of translated characters [characters](https://mwy9htpnok.execute-api.us-east-1.amazonaws.com/names).

### GET: List Translated Planets

Retrieve information about planets with details translated to Spanish using https://swapi.py4e.com/api/planets/?format=json endpoint.
```
/planets
```
#### Deployed:
 List of translated planets [planets](https://mwy9htpnok.execute-api.us-east-1.amazonaws.com/planets).

# Testing
This template uses Jest (Typescript) to run its tests.

To test, first deploy the application to your desired AWS stack.
Then run
```
npm run test
```

This will use the generated API url to automatically test the application.