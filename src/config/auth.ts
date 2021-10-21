export const authConfig = {
  jwt: {
    secretKey: process.env.TOKEN_SECRET_KEY as string,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    urlToAccessToken: 'https://github.com/login/oauth/access_token',
    urlToGetUser: 'https://api.github.com/user',
  },
};
