const MESSAGE = {


  2000: "FCM token added successfully.",
  2001: "FCM token already exists.",


  4000: "User authentication failed.",
  4001: "Invalid token payload.",

  5001: "Failed to create watch.",
  5002: "Webhook processing failed.",
  5003: "Watch already exists for this form.",
  
  9001: "Unauthorized",
  9999: "Something went wrong.",
};

const getMessage = (messageCode) => MESSAGE[messageCode] || messageCode;

export { getMessage };
