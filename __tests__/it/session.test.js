const { User } = require('../../src/app/models');


describe('Authentication', () => {
    // it('should return JWT when authenticated with valid credentials', () => {

    // });
    it('should sum two numbers', async () => {
        const user = await User.create({
            name: 'Tiago',
            email: 'tiago.santana@gmail.com',
            password_hash: '1234'
        });
        console.log(user);

        expect(user.email).toBe('tiago.santana@gmail.com');
    });
})