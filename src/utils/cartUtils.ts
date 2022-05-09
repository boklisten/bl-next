import { CartItem } from "../redux/cart";
import { get } from "../api/api";
import {
  Branch,
  BranchItem,
  CustomerItem,
  Item,
  OrderItem,
  OrderItemType,
  Period,
} from "@boklisten/bl-model";
import { CustomerItemAction } from "../redux/selectedCustomerItemActions";

export const getExtendTime = (branchInfo: Branch) =>
  (
    branchInfo.paymentInfo?.extendPeriods.find(
      (extendPeriod) => extendPeriod.type === "semester"
    ) ?? { date: Date.now() }
  ).date;

const getSelectedItems = (subjects: string[], branchItems: BranchItem[]) =>
  branchItems.filter((branchItem) =>
    subjects.some((subject) => branchItem.categories?.includes(subject))
  );

export const getRentPeriodDate = (
  branch: Branch,
  period: Period
): Date | undefined => {
  return branch.paymentInfo?.rentPeriods.find(
    (rentPeriod) => rentPeriod.type === period
  )?.date;
};

export const getPartlyPaymentPeriodDate = (
  branch: Branch,
  period: Period
): Date | undefined => {
  return branch.paymentInfo?.partlyPaymentPeriods?.find(
    (partlyPaymentPeriod) => partlyPaymentPeriod.type === period
  )?.date;
};

const sanitize = (sanitizeNumber: number): number => {
  return +sanitizeNumber.toFixed(0);
};

const roundDown = (roundDownNumber: number): number => {
  if (roundDownNumber <= 0) {
    // we should not round down if the number is under 0
    return roundDownNumber;
  }
  return Number.parseInt((roundDownNumber / 10).toString(), 10) * 10;
};

const calculatePartlyPaymentAmountLeftToPay = (
  branch: Branch,
  itemPrice: number,
  period: Period
) => {
  if (!branch.paymentInfo?.partlyPaymentPeriods) {
    return -1;
  }

  for (let partlyPaymentPeriod of branch.paymentInfo.partlyPaymentPeriods) {
    if (partlyPaymentPeriod.type === period) {
      return sanitize(
        roundDown(itemPrice * partlyPaymentPeriod.percentageBuyout)
      );
    }
  }
  return -1;
};

const calculatePriceBasedOnPeriodType = (
  item: Item,
  branch: Branch,
  type: OrderItemType,
  period: Period
): number => {
  if (branch.paymentInfo?.responsible) {
    return 0;
  }

  if (!branch.paymentInfo?.partlyPaymentPeriods) {
    return -1;
  }

  if (type === "rent") {
    for (const rentPeriod of branch.paymentInfo.rentPeriods) {
      if (rentPeriod.type === period) {
        return roundDown(item.price * rentPeriod.percentage);
      }
    }
  } else if (type === "partly-payment") {
    for (const partlyPaymentPeriod of branch.paymentInfo.partlyPaymentPeriods) {
      if (partlyPaymentPeriod.type === period) {
        return roundDown(item.price * partlyPaymentPeriod.percentageUpFront);
      }
    }
  }

  throw new Error(
    `could not find price for item "${item.id}" for period "${period}"`
  );
};

const calculateBuyPrice = (item: Item): number => {
  return roundDown(item.price);
};

const calculateItemUnitPrice = (
  item: Item,
  branch: Branch,
  type: OrderItemType,
  period: Period
): number => {
  if (type === "rent" || type === "partly-payment") {
    return sanitize(
      calculatePriceBasedOnPeriodType(item, branch, type, period)
    );
  } else if (type === "buy") {
    return sanitize(calculateBuyPrice(item));
  }

  return -1;
};

const calculateOrderItemTaxAmount = (unitPrice: number, taxRate: number) => {
  if (unitPrice <= 0) {
    // no point in calculating tax amount on a price below 0
    return 0;
  }
  return sanitize(unitPrice * taxRate);
};

const calculateOrderItemAmount = (unitPrice: number, taxAmount: number) => {
  return sanitize(unitPrice + taxAmount);
};

const calculateBuyoutPrice = (
  customerItem: CustomerItem,
  item: Item,
  branch: Branch
): number => {
  if (customerItem.type === "partly-payment") {
    return <number>customerItem.amountLeftToPay;
  }

  return roundDown(
    // @ts-ignore
    item.price * branch.paymentInfo.buyout.percentage
  );
};

const calculateExtendPrice = (
  item: Item,
  branch: Branch,
  periodType: "semester" | "year"
): number => {
  if (!branch?.paymentInfo) {
    return 50;
  }

  for (const extendPeriod of branch.paymentInfo.extendPeriods) {
    if (extendPeriod.type === periodType) {
      if (extendPeriod.percentage) {
        return roundDown(item.price * extendPeriod.percentage);
      }
      return extendPeriod.price;
    }
  }

  throw new Error(
    `could not find extend price for item "${item.id}" for period "${periodType}"`
  );
};

const calculateCustomerItemUnitPrice = (
  customerItem: CustomerItem,
  item: Item,
  branch: Branch,
  type: OrderItemType
) => {
  if (type === "extend") {
    return sanitize(calculateExtendPrice(item, branch, "semester"));
  } else if (type === "buyout") {
    return sanitize(calculateBuyoutPrice(customerItem, item, branch));
  }
  return -1;
};

const calculateOrderItemPrices = (
  unitPrice: number,
  taxRate: number
): {
  amount: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
} => {
  const taxAmount = calculateOrderItemTaxAmount(unitPrice, taxRate);

  return {
    amount: calculateOrderItemAmount(unitPrice, taxAmount),
    unitPrice: sanitize(unitPrice),
    taxRate: taxRate,
    taxAmount: taxAmount,
  };
};

const calculateInfo = (
  branch: Branch,
  item: Item,
  orderItemType: OrderItemType,
  period: Period,
  customerItem?: CustomerItem
) => {
  let info = {};
  switch (orderItemType) {
    case "rent": {
      info = {
        from: new Date(),
        to: getRentPeriodDate(branch, period),
        numberOfPeriods: 1,
        periodType: period,
      };

      break;
    }
    case "partly-payment": {
      info = {
        from: new Date(),
        to: getPartlyPaymentPeriodDate(branch, period),
        amountLeftToPay: calculatePartlyPaymentAmountLeftToPay(
          branch,
          item.price,
          period
        ),
        periodType: period,
      };

      break;
    }
    case "extend": {
      if (customerItem) {
        info = {
          from: new Date(),
          to: getExtendTime(branch),
          numberOfPeriods: 1,
          periodType: "semester",
          customerItem: customerItem.id,
        };
      }

      break;
    }
    // No default
  }
  return info;
};

export const createOrderItem = (
  branch: Branch,
  item: Item,
  orderItemType: OrderItemType,
  period: Period,
  customerItem?: CustomerItem
): OrderItem => {
  const info = calculateInfo(branch, item, orderItemType, period, customerItem);

  console.log("create order item");
  console.log(customerItem);
  const unitPrice = customerItem
    ? calculateCustomerItemUnitPrice(customerItem, item, branch, orderItemType)
    : calculateItemUnitPrice(item, branch, orderItemType, period);

  const calculatedPrice = calculateOrderItemPrices(unitPrice, item.taxRate);

  const customerItemInfo = customerItem
    ? {
        customerItem: customerItem.id,
      }
    : {};

  return {
    item: item.id,
    title: item.title,
    type: orderItemType,
    info,
    unitPrice: calculatedPrice.unitPrice,
    taxAmount: calculatedPrice.taxAmount,
    taxRate: calculatedPrice.taxRate,
    amount: calculatedPrice.amount,
    ...customerItemInfo,
  };
};
export const getOrderItemTypeFromBranch = (branch: Branch): OrderItemType => {
  if (branch.paymentInfo?.partlyPaymentPeriods?.length) {
    return "partly-payment";
  }
  if (branch.paymentInfo?.rentPeriods.length) {
    return "rent";
  }

  return "partly-payment";
};

export const generateCartItemsFromCustomerItemActions = async (
  customerItemActions: CustomerItemAction[],
  branchInfo: Branch
): Promise<CartItem[]> => {
  const branchItems = await get(`branchitems`, `?branch=${branchInfo.id}`).then(
    (response) => response.data.data as BranchItem[]
  );

  return customerItemActions.map((customerItemAction) => {
    return {
      item: customerItemAction.customerItem.item as Item,
      branchItem: branchItems.find(
        (branchItem) => branchItem.item === customerItemAction.customerItem.item
      ) as BranchItem,
      orderItem: createOrderItem(
        branchInfo,
        customerItemAction.customerItem.item as Item,
        customerItemAction.action as OrderItemType,
        "semester",
        customerItemAction.customerItem
      ),
      customerItem: customerItemAction.customerItem,
      branch: branchInfo,
    };
  });
};

export const generateCartItemsFromSubjects = async (
  subjects: string[],
  branchID: string
): Promise<CartItem[]> => {
  const [branch, branchItems] = await Promise.all([
    get(`branches/${branchID}`).then(
      (response) => response.data.data[0] as Branch
    ),
    get(`branchitems`, `?branch=${branchID}`).then(
      (response) => response.data.data as BranchItem[]
    ),
  ]);

  const selectedBranchItems = getSelectedItems(subjects, branchItems);
  const items = await Promise.all(
    selectedBranchItems.map((branchItem) =>
      get(`items/${branchItem.item}`).then(
        (response) => response.data.data[0] as Item
      )
    )
  );
  return items.map((item) => {
    return {
      item,
      branchItem: branchItems.find(
        (branchItem) => branchItem.item === item.id
      ) as BranchItem,
      orderItem: createOrderItem(
        branch,
        item,
        getOrderItemTypeFromBranch(branch),
        "semester"
      ),
      branch,
    };
  });
};
