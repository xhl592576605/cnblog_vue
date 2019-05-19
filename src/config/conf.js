export const DEVELOPMENT = "development";
export const PRODUCTION = "production"

export const ENV = DEVELOPMENT; //development|production
export const CNBLOG_API_URL =
    ENV === DEVELOPMENT ? "/api" : "https://api.cnblogs.com";
export const CNBLOG_CREDENTIALS_URL =
    ENV === DEVELOPMENT ? "/credentials" : "https://api.cnblogs.com";
export const CNBLOG_OAUTH_URL =
    ENV === DEVELOPMENT ? "/oauth" : "https://oauth.cnblogs.com";
export const CLIENT_ID = "3eeaf22f-d7c1-4ca0-8ccb-4bd907c3c246";
export const CLIENT_SECRET =
    "GcT-MWh778w9QCLZczMnbknK0I9qKeMTb84oB8lPAx9vRBwfLX0nwsDScYWuVX18aN3TWkRdgVskg8k6";


// export const CLIENT_ID = "5034af87-a13c-46a5-aa7e-f169b70a1e11";
// export const CLIENT_SECRET =
//     "jlOYY3VoHEKvmbJ1Fh8wd8oDghkjHkc-8MaWqu0dfnZPglJqW2BoDWoXzI3Go2ez1VKfrcYxgT5TnMCG";

export const LOGIN_ENV = PRODUCTION; //development|production

export const LOGIN_REDIRECT_URI = "http://cnblog.xuhuale.cn/auth/callback";//https://oauth.cnblogs.com/auth/callback

export const AUTHORIZE_URL = `https://oauth.cnblogs.com/connect/authorize?client_id=${CLIENT_ID}&scope=openid profile CnBlogsApi  offline_access&response_type=code id_token&redirect_uri=${LOGIN_REDIRECT_URI}&state=cnblogs.com&nonce=cnblogs.com`;
