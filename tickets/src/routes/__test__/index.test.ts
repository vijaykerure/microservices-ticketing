import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
  return request(app).post('/api/tickets').set('Cookie', global.signin()).send({
    title: 'Iron Man',
    price: 100,
  });
};

it('Return the tickets if the ticket is found', async () => {
  await createTicket();
  await createTicket();
  const tickets = await request(app).get(`/api/tickets`).send().expect(200);
  expect(tickets.body.length).toEqual(2);
});
