
import userRoutes from '../server/routes/userRoutes';
import authMiddleware from '../server/middlewares/authMiddleware';
import * as userController from '../server/controllers/userController';
import * as express from 'express';
import * as request from 'supertest';


jest.mock('../server/middlewares/authMiddleware', () => jest.fn((req, res, next) => next()));
jest.mock('../server/controllers/userController', () => ({
    createUser: jest.fn((req, res) => res.status(201).json({ message: 'User created' })),
    loginUser: jest.fn((req, res) => res.status(200).json({ message: 'Login successful' })),
    getUsers: jest.fn((req, res) => res.status(200).json([])),
}));

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call createUser on POST /api/users', async () => {
        await request(app).post('/api/users').send({}).expect(201);
        expect(userController.createUser).toHaveBeenCalled();
    });

    it('should call loginUser on POST /api/users/login', async () => {
        await request(app).post('/api/users/login').send({}).expect(200);
        expect(userController.loginUser).toHaveBeenCalled();
    });

    it('should call getUsers on GET /api/users', async () => {
        await request(app).get('/api/users').expect(200);
        expect(authMiddleware).toHaveBeenCalled();
        expect(userController.getUsers).toHaveBeenCalled();
    });
});
