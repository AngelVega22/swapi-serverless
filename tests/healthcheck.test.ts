import axios from 'axios'
const API_URL = 'https://c04nvk5s5e.execute-api.us-east-1.amazonaws.com/'

test('healthcheck returns 200 OK', async () => {
    await axios.get(API_URL + '/healthcheck').then((response) => {
        expect(response.status).toBe(200)
    })
})

test('Invalid HTTP method returns 405 Method Not Allowed', async () => {
    try {
        await axios.post(API_URL + '/healthcheck');
    } catch (error) {
        expect(error.response.status).toBe(404);
    }
});

test('Invalid API endpoint returns 404 Not Found', async () => {
    try {
        await axios.get(API_URL + '/invalidEndpoint');
    } catch (error) {
        expect(error.response.status).toBe(404);
    }
});