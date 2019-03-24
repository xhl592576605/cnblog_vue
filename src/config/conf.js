export const ENV = "development"; //development|production
export const CNBLOG_API_URL =
    ENV === "development" ? "/api" : "https://api.cnblogs.com";
export const CNBLOG_CREDENTIALS_URL =
    ENV === "development" ? "/credentials" : "https://api.cnblogs.com";
export const CNBLOG_OAUTH_URL =
    ENV === "development" ? "/oauth" : "https://oauth.cnblogs.com";
export const CLIENT_ID = "3eeaf22f-d7c1-4ca0-8ccb-4bd907c3c246";
export const CLIENT_SECRET =
    "GcT-MWh778w9QCLZczMnbknK0I9qKeMTb84oB8lPAx9vRBwfLX0nwsDScYWuVX18aN3TWkRdgVskg8k6";

