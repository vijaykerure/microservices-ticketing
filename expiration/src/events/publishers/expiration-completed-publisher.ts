import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from '@vjticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
