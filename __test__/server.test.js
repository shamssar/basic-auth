'use strict';
const { app } = require('../src/server'); 
const supertest = require('supertest');
const mockRequest = supertest(app);


const { db } = require('../src/models/index');
const basicAuth= require('../src/auth/basicAuth');


beforeAll(async () => {
  await db.sync();
});



describe('Web server', () => {
    it('POST to /signup to create a new user', async () => {
        const response = await mockRequest.post('/signup').send({
            name: "shams",
            password: "12abc"
        });
        expect(response.status).toBe(201);
      });


      it('POST to /signin to login as a user (use basic auth)', async () => {
        const response = await mockRequest.post('/signin').auth('shams','12abc');
        expect(response.status).toBe(200);
    });
    it('Sign in with wrong password', async () => {
        const response = await mockRequest.post('/signin').auth('shams','12');
        expect(response.status).toBe(500);
    });
    it('Sign in with wrong username', async () => {
        const response = await mockRequest.post('/signin').auth('ahmad','123');
        expect(response.status).toBe(500);
    });



    });


    afterAll(async () => {
        await db.drop();
      });









