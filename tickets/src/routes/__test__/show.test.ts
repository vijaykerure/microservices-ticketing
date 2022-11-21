import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';

it('It returns a 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('Return the ticket if the ticket is found', async () => {
  const title = 'Movie Time';
  const price = 100;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
    });

  const ticketRespnose = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketRespnose.body.title).toEqual(title);
  expect(ticketRespnose.body.price).toEqual(price);
});
