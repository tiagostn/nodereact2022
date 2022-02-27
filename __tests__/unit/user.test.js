const request = require('supertest');
const bcrypt = require('bcryptjs');
const truncate = require('../utils/truncate');
const { User } = require('../../src/app/models');

describe('User', () => {

    beforeEach(async() => {
        await truncate();
    })

    it('should encrypt user password', async () => {
        const user = await User.create({
            name: 'Tiago',
            email: 'tiago.santana@gmail.com',
            password: '1234'
        });

        const hash = await bcrypt.hash('1234', 8);

        expect(await bcrypt.compare('1234', user.password_hash)).toBe(true);
    });
})