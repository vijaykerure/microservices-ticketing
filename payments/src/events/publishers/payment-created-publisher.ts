import { Subjects, Publisher, PaymentCreatedEvent } from '@vjticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
