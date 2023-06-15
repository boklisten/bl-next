import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const BL_CONFIG = {
  api: {
    basePath: publicRuntimeConfig.API_URL,
  },
  blWeb: {
    basePath: publicRuntimeConfig.BL_WEB_URL,
  },
  token: {
    accessToken: "bl-access-token",
    refreshToken: "bl-refresh-token",
  },
  login: {
    local: {
      url: "auth/local/login",
    },
    facebook: {
      url: "auth/facebook",
    },
    google: {
      url: "auth/google",
    },
    feide: {
      url: "auth/feide",
    },
  },
  register: {
    local: {
      url: "auth/local/register",
    },
    facebook: {
      url: "auth/facebook",
    },
    google: {
      url: "auth/google",
    },
    feide: {
      url: "auth/feide",
    },
  },
  order: {
    receipt: {
      operation: "receipt",
    },
    agreement: {
      operation: "agreement",
    },
  },
  passwordReset: {
    setNew: {
      operation: "new",
    },
  },
  emailValidation: {
    confirm: {
      operation: "confirm",
    },
  },
  collection: {
    item: "items",
    branch: "branches",
    branchItem: "branchitems",
    openingHour: "openingHours",
    userDetail: "userdetails",
    customerItem: "customerItems",
    order: "orders",
    orderItem: "orderItems",
    payment: "payments",
    delivery: "deliveries",
    passwordReset: "passwordresets",
    company: "companies",
    emailValidation: "email_validations",
    message: "messages",
    invoice: "invoices",
    match: "matches",
    booking: "bookings",
    uniqueItem: "uniqueitems",
  },
};

export default BL_CONFIG;
