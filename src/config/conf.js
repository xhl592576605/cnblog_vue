export const DEVELOPMENT = "development";
export const PRODUCTION = "production"

export const ENV = DEVELOPMENT; //development|production
export const CNBLOG_API_URL =
    ENV === DEVELOPMENT ? "/api" : "https://api.cnblogs.com";
export const CNBLOG_CREDENTIALS_URL =
    ENV === DEVELOPMENT ? "/credentials" : "https://api.cnblogs.com";
export const CNBLOG_OAUTH_URL =
    ENV === DEVELOPMENT ? "/oauth" : "https://oauth.cnblogs.com";
export const CLIENT_ID = "";
export const CLIENT_SECRET =
    "";


// export const CLIENT_ID = "";
// export const CLIENT_SECRET =
//     "";

export const LOGIN_ENV = PRODUCTION; //development|production

export const LOGIN_REDIRECT_URI = "http://cnblog.xuhuale.cn/auth/callback";//https://oauth.cnblogs.com/auth/callback

export const AUTHORIZE_URL = `https://oauth.cnblogs.com/connect/authorize?client_id=${CLIENT_ID}&scope=openid profile CnBlogsApi  offline_access&response_type=code id_token&redirect_uri=${LOGIN_REDIRECT_URI}&state=cnblogs.com&nonce=cnblogs.com`;
