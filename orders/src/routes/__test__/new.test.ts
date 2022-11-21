import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('Returns an error if the ticket does not exist', async () => {
  const ticketId = new mongoose.Types.ObjectId();
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId })
    .expect(404);
});

it('Returns an error if the ticket is already reserved', async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Kantara',
    price: 100,
  });
  await ticket.save();

  const order = Order.build({
    ticket,
    userId: '1234',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });

  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it('Reserve the ticket', async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Kantara',
    price: 100,
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it('Todo emits an event on created order', async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Kantara',
    price: 100,
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
