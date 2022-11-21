export enum OrderStatus {
  // When the order has beeen created, but the
  // ticket it is trying to order has not been reserved
  Created = 'created',

  // The ticket the order is trying to reserve has already
  // been reserved, or when the user cancelled the order
  // or The order expires before payment
  Cancelled = 'cancelled',

  // The order has successfully reserved the ticket
  AwaitingPayment = 'awaiting-payment',

  // The order has reserved the ticket and the user thas provided the payment
  Complete = 'complete',
}
