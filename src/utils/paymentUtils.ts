import { Delivery, Order, Payment } from "@boklisten/bl-model";

const calculatePaymentAmount = (order: Order, delivery?: Delivery): number => {
  if (!delivery) {
    return order.amount;
  }
  return order.amount + delivery.amount;
};

const calculateTaxAmount = (order: Order, delivery?: Delivery): number => {
  let taxAmount = 0;

  for (const orderItem of order.orderItems) {
    taxAmount += orderItem.taxAmount;
  }

  if (delivery && delivery.taxAmount) {
    return taxAmount + delivery.taxAmount;
  }

  return taxAmount;
};

export const createDibsPayment = (
  order: Order,
  delivery: Delivery,
): Payment => {
  return {
    id: "",
    method: "dibs",
    order: order.id,
    amount: calculatePaymentAmount(order, delivery),
    info: {},
    taxAmount: calculateTaxAmount(order, delivery),
    customer: order.customer,
    branch: order.branch,
  };
};
