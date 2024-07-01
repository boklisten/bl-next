const BL_CONFIG = {
  api: {
    basePath: process.env["API_URL"] ?? "http://localhost:1337/",
  },
  blWeb: {
    basePath: process.env["BL_WEB_URL"] ?? "http://localhost:4200/",
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
    editableText: "editableTexts",
    openingHour: "openingHours",
    userDetail: "userdetails",
    customerItem: "customerItems",
    order: "orders",
    orderItem: "orderItems",
    payment: "payments",
    delivery: "deliveries",
    pendingPasswordReset: "pendingpasswordresets",
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
