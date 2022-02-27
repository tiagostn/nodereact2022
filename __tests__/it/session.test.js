const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../utils/factories');

describe('Authentication', () => {

    beforeEach(async () => {
        await truncate();
    });

    it('should authenticate with valid credentials', async () => {
        const user = await factory.create('User', { password: '1234' });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '1234'
            });

        expect(response.status).toBe(200);
    });

    it('should not authenticate with invalid credentials', async () => {
        const user = await factory.create('User', { password: '1234', email: 'tiago.santana@gmail.com' });

    const response = await request(app)
        .post('/sessions')
        .send({
            email: user.email,
            password: '123'
        });

    expect(response.status).toBe(401);

    const response2 = await request(app)
        .post('/sessions')
        .send({
            email: 'zzz@gmail.com',
            password: '1234'
        });

    expect(response2.status).toBe(401);
});

it('should return JWT when authenticated', async () => {
    const user = await factory.create('User', { password: '1234', email: 'tiago.santana@gmail.com' });

    const response = await request(app)
        .post('/sessions')
        .send({
            email: user.email,
            password: '1234'
        });

    expect(response.body).toHaveProperty('token');
});

it('should access private routes when authenticated', async () => {
    const user = await factory.create('User', { password: '1234', email: 'tiago.santana@gmail.com' });

    const response = await request(app)
        .get('/dashboard')
        .set('Authorization', `Beare ${user.generateToken()}`)

    expect(response.status).toBe(200);
});

it('should not access private routes without JWT', async () => {
    const response = await request(app)
        .get('/dashboard');

    expect(response.status).toBe(401);
});

it('should not access private routes with invalid JWT', async () => {
    const response = await request(app)
        .get('/dashboard')
        .set('Authorization', `Beare 123123`)

    expect(response.status).toBe(401);
});
})